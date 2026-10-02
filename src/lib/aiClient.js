// Client for the serverless LLM routes with a graceful, no-dead-end fallback.
// If /api/tutor is unavailable — no key, timeout, rate limit,
// offline — we stream a deterministic reply instead so the UI always works.

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function chunkText(text) {
  // word-ish chunks so the fallback still streams token-by-token visually
  return String(text).match(/\S+\s*/g) || [String(text)];
}

export async function streamChat({ endpoint, payload, localFallback, onToken, onStatus, signal }) {
  try {
    onStatus?.('connecting');
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal,
    });

    if (!res.ok || !res.body) {
      let detail = '';
      try { detail = (await res.json()).error || ''; } catch { /* ignore */ }
      const err = new Error(detail || `Request failed (${res.status})`);
      err.status = res.status;
      throw err;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let sawAny = false;
    onStatus?.('streaming');

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const parts = buffer.split('\n\n');
      buffer = parts.pop() || '';
      for (const part of parts) {
        const line = part.split('\n').find((l) => l.startsWith('data:'));
        if (!line) continue;
        const data = line.slice(5).trim();
        if (data === '[DONE]') continue;
        try {
          const evt = JSON.parse(data);
          if (evt.error) { const e = new Error(evt.error); e.status = evt.status; throw e; }
          if (evt.token) { sawAny = true; onToken(evt.token); }
        } catch (e) {
          if (e && e.message && !e.status) continue; // ignore partial JSON
          throw e;
        }
      }
    }
    onStatus?.('done');
    return { ok: true, source: 'llm', streamed: sawAny };
  } catch (e) {
    if (e.name === 'AbortError') { onStatus?.('aborted'); return { ok: false, aborted: true }; }
    // Fallback: deterministic engine, streamed visually.
    onStatus?.('fallback');
    const text = typeof localFallback === 'function' ? localFallback() : String(localFallback || '');
    for (const chunk of chunkText(text)) {
      if (signal?.aborted) { onStatus?.('aborted'); return { ok: false, aborted: true }; }
      onToken(chunk);
      await sleep(14);
    }
    onStatus?.('done');
    return { ok: false, source: 'local', error: e.message };
  }
}
