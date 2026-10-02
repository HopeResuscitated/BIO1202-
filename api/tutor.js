import pdfParse from 'pdf-parse'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  if (!process.env.OPENAI_API_KEY) return res.status(503).json({ error: 'Set OPENAI_API_KEY in the Vercel project environment to enable the live tutor.' })

  try {
    const body = req.body || {}
    const action = body.action || 'chat'
    const assignment = body.assignment
    const step = body.step
    const message = body.message || ''
    const answer = body.answer || ''
    const course = body.course || 'BIOL 1202'
    const term = body.term || 'Fall 2026'
    const related = Array.isArray(body.related) ? body.related : []
    const hintLevel = Number(body.hintLevel || 0)

    if (!assignment || !step || (action !== 'hint' && !(message || answer))) {
      return res.status(400).json({ error: 'Assignment and step are required.' })
    }

    const rawUrl = (url) => {
      try {
        const u = new URL(url)
        if (u.hostname !== 'github.com') return null
        const p = u.pathname.split('/').filter(Boolean)
        if (p.length < 5 || p[2] !== 'blob') return null
        return 'https://raw.githubusercontent.com/' + p[0] + '/' + p[1] + '/' + p.slice(4).join('/')
      } catch { return null }
    }

    const sources = [assignment].concat(related)
      .filter(Boolean)
      .filter((f, i, a) => a.findIndex(x => x.path === f.path) === i)
      .slice(0, 10)

    const material = (await Promise.all(sources.map(async (f) => {
      const url = rawUrl(f.url)
      if (!url || !['txt', 'html', 'md', 'pdf'].includes(String(f.ext || '').toLowerCase())) return ''
      try {
        const r = await fetch(url)
        if (!r.ok) return ''
        const ext = String(f.ext || '').toLowerCase()
        const buf = Buffer.from(await r.arrayBuffer())
        const t = ext === 'pdf' ? (await pdfParse(buf)).text : buf.toString('utf8')
        return 'SOURCE: ' + f.title + '\nCATEGORY: ' + f.category + '\nCONTENT:\n' + t.slice(0, 18000)
      } catch { return '' }
    }))).filter(Boolean).join('\n\n---\n\n').slice(0, 85000)

    const instructions = [
      'You are the dedicated BIOL 1202 Fall 2026 tutor inside a student course workspace.',
      'Use supplied assignment/course material as the source of truth. Never invent assignment requirements, due dates, grading rules, or biology facts.',
      'Teach rather than simply give answers. Make the student do the reasoning.',
      'Give feedback about what is missing or incorrect without writing the finished answer for the student.',
      'For CHECK return JSON only: {"passed":boolean,"feedback":["specific gap"],"hint":"one short hint that does not give the answer"}.',
      'For HINT return JSON only: {"hint":"one useful hint that does not give the finished answer"}.',
      'For CHAT return concise tutoring prose.',
      'If the material is insufficient, say exactly what is missing rather than guessing.'
    ].join('\n')

    const input = [
      'COURSE: ' + course + ' — ' + term,
      'ASSIGNMENT: ' + assignment.title,
      'CATEGORY: ' + assignment.category,
      'CURRENT STEP: ' + step.title,
      'STEP GUIDANCE: ' + (step.body || step.detail || ''),
      'STEP TYPE: ' + (step.kind || 'concept'),
      'STUDENT RESPONSE:\n' + (answer || message),
      'HINT LEVEL: ' + hintLevel,
      '\nCOURSE MATERIAL:\n' + (material || '[No readable course source was available. Ask the student to open or paste the relevant question.]')
    ].join('\n')

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + process.env.OPENAI_API_KEY },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-6-luna',
        instructions,
        input,
        max_output_tokens: 800
      })
    })

    const data = await response.json()
    if (!response.ok) return res.status(response.status).json({ error: data?.error?.message || 'Tutor request failed.' })

    const outputText = data.output_text || (data.output || []).flatMap(x => x.content || []).map(x => x.text || '').filter(Boolean).join('\n')
    if (action === 'check' || action === 'hint') {
      const cleaned = String(outputText || '').replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim()
      try {
        return res.status(200).json(JSON.parse(cleaned))
      } catch {
        return res.status(200).json(action === 'hint'
          ? { hint: cleaned || 'Re-read the step and identify the biology relationship it is asking you to use.' }
          : { passed: false, feedback: ['The tutor could not reliably check this response yet.'], hint: 'Re-read the step and explain the biology idea in your own words.' })
      }
    }

    return res.status(200).json({ reply: outputText || 'I could not generate a tutor response. Try again.' })
  } catch (e) {
    return res.status(500).json({ error: e?.message || 'Tutor request failed.' })
  }
}
