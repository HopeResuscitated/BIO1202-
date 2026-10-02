// Live Tutor — serverless SSE streaming endpoint.
// The API key lives ONLY here (server side); it is never shipped to the client.
// If no key is configured we return 503 and the client transparently falls back
// to the deterministic tutor engine, so the UI never dead-ends.

import pdfParse from 'pdf-parse';

const MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

function rawUrl(url) {
  try {
    const u = new URL(url);
    if (u.hostname !== 'github.com') return null;
    const p = u.pathname.split('/').filter(Boolean);
    if (p.length < 5 || p[2] !== 'blob') return null;
    return 'https://raw.githubusercontent.com/' + p[0] + '/' + p[1] + '/' + p.slice(4).join('/');
  } catch {
    return null;
  }
}

async function loadMaterial(sources) {
  const unique = (sources || [])
    .filter(Boolean)
    .filter((f, i, a) => a.findIndex((x) => x.path === f.path) === i)
    .slice(0, 6);
  const parts = await Promise.all(
    unique.map(async (f) => {
      const url = rawUrl(f.url);
      if (!url) return '';
      const ext = String(f.ext || '').toLowerCase();
      if (!['txt', 'html', 'md', 'pdf'].includes(ext)) return '';
      try {
        const r = await fetch(url);
        if (!r.ok) return '';
        const buf = Buffer.from(await r.arrayBuffer());
        const t = ext === 'pdf' ? (await pdfParse(buf)).text : buf.toString('utf8');
        return `SOURCE: ${f.title}\nCATEGORY: ${f.category}\nCONTENT:\n${t.slice(0, 8000)}`;
      } catch {
        return '';
      }
    })
  );
  return parts.filter(Boolean).join('\n\n---\n\n').slice(0, 40000);
}

function buildInstructions() {
  return [
    'You are the dedicated BIOL 1202 (General Biology II, Fall 2026) tutor inside a student course workspace.',
    'Be Socratic by default: lead with a guiding question or a small hint, and make the student do the reasoning. Do NOT open with the finished answer.',
    'Only reveal full model reasoning if the student has attempted the question or has explicitly asked twice. Even then, explain the reasoning rather than writing a copy-paste answer.',
    'Refuse to simply hand over answers to graded homework or exam questions. Coach instead.',
    'When the student gets something wrong, diagnose the specific missing concept and explain WHY it matters — never just say "incorrect".',
    'Ground every biology claim in the supplied COURSE MATERIAL. When you use a source, name it (e.g., "per your CH 23 notes"). If the material does not cover something, say so plainly instead of guessing.',
    'Render math and chemistry notation in LaTeX: inline as $...$ and display as $$...$$.',
    'Keep replies concise and warm — a few short paragraphs at most.',
  ].join('\n');
}

function buildInput(body) {
  const { assignment = {}, section = {}, message = '', history = {}, mode = 'chat', course = 'BIOL 1202', term = 'Fall 2026', sources = [], material = '' } = body;
  const transcript = Array.isArray(history.transcript) ? history.transcript.join('\n') : '';
  return [
    `COURSE: ${course} — ${term}`,
    `ASSIGNMENT: ${assignment.title || '(none)'} [${assignment.chapter || ''}]`,
    `CURRENT SECTION: ${section.title || '(none)'}`,
    `SECTION PROMPT: ${section.prompt || ''}`,
    `SECTION CONCEPTS TO COVER: ${(section.concepts || []).join(', ')}`,
    mode === 'explain-mistake' ? 'MODE: explain the student\'s mistake (diagnose the missing concept).' : 'MODE: normal tutoring.',
    history.missed?.length ? `CONCEPTS THE CHECK FLAGGED AS MISSING: ${history.missed.join(', ')}` : '',
    transcript ? `RECENT TRANSCRIPT:\n${transcript}` : '',
    `STUDENT MESSAGE:\n${message}`,
    sources.length ? `AVAILABLE SOURCES: ${sources.map((s) => s.title).join(' | ')}` : '',
    `\nCOURSE MATERIAL:\n${material || '[No readable course source was available. Say what is missing rather than guessing.]'}`,
  ]
    .filter(Boolean)
    .join('\n');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return res.status(503).json({ error: 'Live tutor disabled: set OPENAI_API_KEY in the project environment to enable the model. Falling back to the built-in study engine.' });
  }

  try {
    const body = req.body || {};
    if (!body.message) return res.status(400).json({ error: 'A message is required.' });

    const material = await loadMaterial(body.sources);

    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');
    if (typeof res.flushHeaders === 'function') res.flushHeaders();

    const upstream = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + key },
      body: JSON.stringify({
        model: MODEL,
        stream: true,
        temperature: 0.4,
        max_tokens: 700,
        messages: [
          { role: 'system', content: buildInstructions() },
          { role: 'user', content: buildInput({ ...body, material }) },
        ],
      }),
    });

    if (!upstream.ok || !upstream.body) {
      const detail = await upstream.text().catch(() => '');
      res.write(`data: ${JSON.stringify({ error: 'Tutor request failed.', status: upstream.status, detail: detail.slice(0, 300) })}\n\n`);
      res.write('data: [DONE]\n\n');
      return res.end();
    }

    const reader = upstream.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith('data:')) continue;
        const data = trimmed.slice(5).trim();
        if (data === '[DONE]') continue;
        try {
          const evt = JSON.parse(data);
          const token = evt.choices?.[0]?.delta?.content;
          if (token) res.write(`data: ${JSON.stringify({ token })}\n\n`);
        } catch {
          /* ignore keep-alive / partial frames */
        }
      }
    }
    res.write('data: [DONE]\n\n');
    return res.end();
  } catch (e) {
    try {
      if (!res.headersSent) return res.status(500).json({ error: e?.message || 'Tutor request failed.' });
      res.write(`data: ${JSON.stringify({ error: e?.message || 'Tutor request failed.' })}\n\n`);
      res.write('data: [DONE]\n\n');
      res.end();
    } catch {
      /* noop */
    }
  }
}
