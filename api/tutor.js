export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!process.env.OPENAI_API_KEY) return res.status(503).json({ error: 'Set OPENAI_API_KEY in the Vercel project environment to enable the live tutor.' });
  try {
    const { assignment, step, message, course, term, related = [] } = req.body || {};
    if (!assignment || !step || !message) return res.status(400).json({ error: 'Assignment, step, and message are required.' });
    const rawUrl = url => {
      try {
        const u = new URL(url);
        if (u.hostname !== 'github.com') return null;
        const p = u.pathname.split('/').filter(Boolean);
        if (p.length < 5 || p[2] !== 'blob') return null;
        return 'https://raw.githubusercontent.com/' + p[0] + '/' + p[1] + '/' + p.slice(4).join('/');
      } catch { return null; }
    };
    const sources = [assignment, ...related].filter(Boolean).filter((f,i,a)=>a.findIndex(x=>x.path===f.path)===i).slice(0,9);
    const material = (await Promise.all(sources.map(async f => {
      const url=rawUrl(f.url);
      if(!url || !['txt','html','md'].includes(String(f.ext||'').toLowerCase())) return '';
      try { const r=await fetch(url); if(!r.ok)return ''; const t=await r.text(); return 'SOURCE: '+f.title+'\nCATEGORY: '+f.category+'\nCONTENT:\n'+t.slice(0,12000); } catch { return ''; }
    }))).filter(Boolean).join('\n\n---\n\n').slice(0,70000);
    const instructions=`You are the dedicated BIOL 1202 Fall 2026 tutor inside a student's course workspace.
Use supplied course material as the source of truth. Do not invent requirements, due dates, grading rules, or answers.
Teach rather than simply give answers. Make the student attempt the work, ask one focused question at a time, identify misconceptions, give hints before answers, and explain why an answer is correct or incorrect.
Respect the current tutoring step. If the student says they understand, briefly verify with a small transfer question before declaring mastery.
Never use an answer key to shortcut learning unless the student has already attempted the problem.
If material is insufficient, say exactly what is missing and tell the student what course resource or question needs to be opened/pasted.
Keep responses concise and actionable.`;
    const input=`COURSE: ${course||'BIOL 1202'} — ${term||'Fall 2026'}
ASSIGNMENT: ${assignment.title}
CATEGORY: ${assignment.category}
CURRENT STEP: ${step.title}
STEP GUIDANCE: ${step.body}

STUDENT MESSAGE:
${message}

COURSE MATERIAL:
${material||'[No text-readable source was available. Ask the student to open or paste the relevant question rather than guessing.]'}`;
    const response=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+process.env.OPENAI_API_KEY},body:JSON.stringify({model:process.env.OPENAI_MODEL||'gpt-5-mini',instructions,input,max_output_tokens:700})});
    const data=await response.json();
    if(!response.ok)return res.status(response.status).json({error:data?.error?.message||'Tutor request failed.'});
    const reply=data.output_text||(data.output||[]).flatMap(x=>x.content||[]).map(x=>x.text||'').filter(Boolean).join('\n');
    return res.status(200).json({reply:reply||'I could not generate a tutor response. Try again.'});
  } catch(e) { return res.status(500).json({error:e?.message||'Tutor request failed.'}); }
}