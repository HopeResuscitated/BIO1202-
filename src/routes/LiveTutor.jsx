import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ASSIGNMENTS, getAssignment, getChapter } from '../data/curriculum.js';
import { localTutorReply } from '../lib/tutorEngine.js';
import { streamChat } from '../lib/aiClient.js';
import { useStore, weakTopics } from '../state/store.jsx';
import { Badge, Markdown, Empty } from '../components/ui.jsx';
import courseFiles from '../course-files.json';

const SUGGESTIONS = [
  'Give me a hint for the current question.',
  'Explain my mistake on the last attempt.',
  'Quiz me on this topic one question at a time.',
  'Why does genetic drift matter more in small populations?',
];

function sourcesFor(assignment) {
  if (!assignment) return [];
  return (courseFiles.files || [])
    .filter((f) => f.category === assignment.category)
    .slice(0, 3);
}

export default function LiveTutor() {
  const { state } = useStore();
  const [params, setParams] = useSearchParams();
  const weak = useMemo(() => weakTopics(state, ASSIGNMENTS), [state]);

  const assignmentId = params.get('assignment') || ASSIGNMENTS[0].id;
  const assignment = getAssignment(assignmentId) || ASSIGNMENTS[0];
  const chapter = getChapter(assignment.chapter);
  const sectionId = params.get('section') || assignment.sections[0].id;
  const section = assignment.sections.find((s) => s.id === sectionId) || assignment.sections[0];
  const sec = state.study[assignment.id]?.sections?.[section.id] || {};

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('idle');
  const [notice, setNotice] = useState('');
  const abortRef = useRef(null);
  const scrollRef = useRef(null);

  const sources = sourcesFor(assignment);

  useEffect(() => {
    setMessages([
      {
        role: 'assistant',
        text: `Hi — I'm your BIOL 1202 tutor. We're on **${section.title}** in *${assignment.title}*.\n\nI won't just hand you answers; I'll ask you a question first and build from what you already know. What's your current understanding of **${(section.concepts[0] || '').replace(/-/g, ' ')}**?`,
      },
    ]);
    setNotice('');
    setStatus('idle');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignmentId, sectionId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  function setContext(nextAssignment, nextSection) {
    const next = new URLSearchParams();
    next.set('assignment', nextAssignment);
    if (nextSection) next.set('section', nextSection);
    setParams(next);
  }

  async function send(text, mode = 'chat') {
    const message = (text ?? input).trim();
    if (!message) return;
    if (mode === 'chat') setInput('');
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const userMsg = { role: 'user', text: mode === 'explain-mistake' ? `Explain my mistake. ${message}` : message };
    const assistantMsg = { role: 'assistant', text: '', streaming: true };
    setMessages((m) => [...m, userMsg, assistantMsg]);
    setStatus('connecting');
    setNotice('');

    const history = {
      missed: sec.missed || [],
      transcript: messages.slice(-6).map((m) => `${m.role}: ${m.text}`),
    };

    const payload = {
      action: 'chat',
      mode,
      course: 'BIOL 1202',
      term: 'Fall 2026',
      assignment: { id: assignment.id, title: assignment.title, chapter: assignment.chapter },
      section: { id: section.id, title: section.title, prompt: section.prompt, concepts: section.concepts },
      message,
      history,
      revealCount: sec.revealCount || 0,
      sources: sources.map((s) => ({ title: s.title, url: s.url, category: s.category })),
    };

    const localFallback = () =>
      localTutorReply({
        assignment,
        section,
        chapterId: assignment.chapter,
        message,
        history,
        revealCount: sec.revealCount || 0,
        mode,
      });

    const res = await streamChat({
      endpoint: '/api/tutor',
      payload,
      localFallback,
      signal: controller.signal,
      onStatus: setStatus,
      onToken: (t) =>
        setMessages((m) => {
          const copy = m.slice();
          const last = copy[copy.length - 1];
          copy[copy.length - 1] = { ...last, text: last.text + t };
          return copy;
        }),
    });

    setMessages((m) => {
      const copy = m.slice();
      const last = copy[copy.length - 1];
      copy[copy.length - 1] = { ...last, streaming: false };
      return copy;
    });

    if (res.source === 'local' && res.error) {
      setNotice('Live model unavailable — answering from the built-in study engine (still Socratic).');
    }
    setStatus('done');
  }

  function stop() {
    abortRef.current?.abort();
    setStatus('idle');
  }

  return (
    <section>
      <div className="eyebrow">— LIVE TUTOR</div>
      <h1 className="pagetitle">Ask first. Then we'll reason it out.</h1>
      <p className="intro">
        The tutor reads your current question and topic, leads with a guiding question instead of the answer, and cites the course material it's using. It won't write your homework for you.
      </p>

      <div className="livetutor-grid">
        <div className="chatpanel">
          <div className="chatcontext">
            <label className="field">
              <span className="fieldlabel">Topic context</span>
              <select value={assignmentId} onChange={(e) => setContext(e.target.value, getAssignment(e.target.value).sections[0].id)}>
                {ASSIGNMENTS.map((a) => (
                  <option key={a.id} value={a.id}>{a.title}</option>
                ))}
              </select>
            </label>
            <label className="field">
              <span className="fieldlabel">Current question</span>
              <select value={section.id} onChange={(e) => setContext(assignmentId, e.target.value)}>
                {assignment.sections.map((s) => (
                  <option key={s.id} value={s.id}>{s.title}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="chatlog" ref={scrollRef} aria-live="polite">
            {messages.map((m, i) => (
              <div key={i} className={'msg ' + m.role}>
                <span className="avatar" aria-hidden="true">{m.role === 'assistant' ? '✦' : 'You'}</span>
                <div className="bubble">
                  <Markdown>{m.text || (m.streaming ? '…' : '')}</Markdown>
                  {m.streaming && <span className="cursor" aria-hidden="true" />}
                </div>
              </div>
            ))}
          </div>

          {notice && <div className="inlinewarn" role="status">{notice}</div>}

          <div className="suggestions">
            {SUGGESTIONS.map((s) => (
              <button key={s} className="chipbtn" onClick={() => send(s)} disabled={status === 'connecting' || status === 'streaming'}>{s}</button>
            ))}
          </div>

          <div className="composer">
            <textarea
              aria-label="Message the tutor"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Ask a question — or say what you think the answer is…"
            />
            <div className="composerbar">
              <button
                className="rowbtn tutorbtn"
                onClick={() => send('Explain my mistake on my last attempt.', 'explain-mistake')}
                disabled={status === 'connecting' || status === 'streaming' || !(sec.missed || []).length}
                title={(sec.missed || []).length ? 'Uses your last checked answer' : 'Check an answer first'}
              >
                Explain my mistake
              </button>
              {status === 'streaming' || status === 'connecting' ? (
                <button className="primary" onClick={stop}>Stop</button>
              ) : (
                <button className="primary" onClick={() => send()} disabled={!input.trim()}>Send</button>
              )}
            </div>
          </div>
          <p className="chatfoot">
            {status === 'connecting' && 'Connecting…'}
            {status === 'streaming' && 'Streaming…'}
            {status === 'fallback' && 'Using the built-in study engine…'}
            {status === 'done' && 'Socratic mode — ask twice if you are truly stuck and I will walk the full reasoning.'}
            {status === 'idle' && 'Enter to send · Shift+Enter for a new line'}
          </p>
        </div>

        <aside className="tutorside">
          <div className="sidecard">
            <b>Current question</b>
            <p>{section.prompt}</p>
            <div className="chips">
              {section.concepts.map((c) => <span className="chip" key={c}>{c.replace(/-/g, ' ')}</span>)}
            </div>
            <Link className="linkbtn" to={`/tutor/${assignment.id}?section=${section.id}`}>Open in checked practice →</Link>
          </div>

          <div className="sidecard">
            <b>Grounded in your course</b>
            {sources.length ? (
              <ul className="sourcelist">
                {sources.map((s) => (
                  <li key={s.path}>
                    <a href={s.url} target="_blank" rel="noreferrer">{s.title} ↗</a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="muted">No linked file for this section — the tutor will say so rather than invent a source.</p>
            )}
          </div>

          <div className="sidecard">
            <b>Weak topics · targeted drills</b>
            {weak.length ? (
              <ul className="weaklist">
                {weak.slice(0, 4).map((w) => (
                  <li key={w.assignment.id + w.section.id}>
                    <span>
                      <b>{w.section.title}</b>
                      <small>{w.missed.length} concept(s) to shore up</small>
                    </span>
                    <Link className="rowbtn" to={`/tutor/${w.assignment.id}?section=${w.section.id}`}>Drill →</Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="muted">No weak spots yet. Miss a concept in checked practice and it will show up here for a targeted drill.</p>
            )}
          </div>

          <div className="sidecard">
            <b>How this tutor behaves</b>
            <ul className="ruleslist">
              <li>Leads with a guiding question, not the answer.</li>
              <li>Reveals full reasoning only after you attempt or ask twice.</li>
              <li>Refuses to hand over graded homework answers.</li>
              <li>Says “I don't know” rather than inventing biology.</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
