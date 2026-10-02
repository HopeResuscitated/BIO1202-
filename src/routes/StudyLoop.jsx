import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ASSIGNMENTS, getAssignment, getChapter, conceptById } from '../data/curriculum.js';
import { evaluateAnswer, hintLadder, nextReview, localTutorReply, REVIEW_INTERVALS } from '../lib/tutorEngine.js';
import { streamChat } from '../lib/aiClient.js';
import { useStore } from '../state/store.jsx';
import { Badge, Markdown, ProgressBar, ErrorState } from '../components/ui.jsx';

function sectionState(st, id) {
  return st?.sections?.[id] || {};
}

function statusLabel(s) {
  if (s.status === 'mastered') return 'Mastered';
  if (s.status === 'practicing') return 'Practicing';
  return 'Not started';
}

export default function StudyLoop() {
  const { assignmentId } = useParams();
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const { state, actions } = useStore();

  const assignment = getAssignment(assignmentId);
  const chapter = assignment ? getChapter(assignment.chapter) : null;

  const st = assignment ? state.study[assignment.id] : null;

  const firstOpen = useMemo(() => {
    if (!assignment) return null;
    const notMastered = assignment.sections.find((s) => sectionState(st, s.id).status !== 'mastered');
    return (notMastered || assignment.sections[0]).id;
  }, [assignment, st]);

  // Sticky active section: initialize from the URL or the first open section, but
  // don't jump when mastery changes — the student should read the feedback first.
  const [active, setActive] = useState(() => params.get('section') || firstOpen);

  useEffect(() => {
    const p = params.get('section');
    if (p) setActive(p);
  }, [params]);

  useEffect(() => {
    if (!assignment) return;
    if (!assignment.sections.some((s) => s.id === active)) {
      setActive(params.get('section') || assignment.sections[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignmentId]);

  const activeId = active;
  const section = assignment?.sections.find((s) => s.id === activeId) || assignment?.sections[0];

  const [draft, setDraft] = useState('');
  const [checking, setChecking] = useState(false);
  const [reply, setReply] = useState('');
  const [tutorStatus, setTutorStatus] = useState('idle');
  const [tutorError, setTutorError] = useState('');
  const abortRef = useRef(null);

  const sec = sectionState(st, section?.id);

  // Keep the draft in sync with the stored answer for the active section.
  useEffect(() => {
    setDraft(sec.answer || '');
    setReply('');
    setTutorError('');
    setTutorStatus('idle');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, assignmentId]);

  if (!assignment) {
    return (
      <section>
        <div className="eyebrow">— CHECKED PRACTICE</div>
        <h1 className="pagetitle">That assignment isn't here.</h1>
        <p className="intro">It may have been renamed or removed. Pick another from the list.</p>
        <div className="empty" style={{ marginTop: 20 }}>
          <b>Assignment not found</b>
          <p>The id “{assignmentId}” doesn't match anything in the workspace.</p>
          <Link className="linkbtn" to="/tutor">Back to all assignments →</Link>
        </div>
      </section>
    );
  }

  const masteredCount = assignment.sections.filter((s) => sectionState(st, s.id).status === 'mastered').length;
  const total = assignment.sections.length;
  const passed = !!sec.passed;
  const attempts = sec.attempts || 0;

  function selectSection(id) {
    const next = new URLSearchParams(params);
    next.set('section', id);
    setParams(next);
  }

  function handleCheck() {
    if (!draft.trim()) return;
    setChecking(true);
    const result = evaluateAnswer(section, assignment.chapter, draft);
    const prevStage = sec.reviewStage || 0;
    const patch = {
      answer: draft,
      covered: result.covered,
      missed: result.missed,
      passed: result.passed,
      status: result.passed ? 'mastered' : 'practicing',
      attempts: attempts + 1,
      summary: result.summary,
    };
    if (result.passed) {
      const rev = nextReview(prevStage);
      patch.reviewStage = rev.stage;
      patch.reviewDueAt = rev.dueAt;
    } else {
      // Weak spots come back sooner: due immediately so they surface on the dashboard.
      patch.reviewDueAt = new Date().toISOString();
      patch.reviewStage = 0;
    }
    actions.saveSection(assignment.id, section.id, patch);
    setChecking(false);
  }

  function handleHint() {
    const used = sec.hintCount || 0;
    actions.saveSection(assignment.id, section.id, { hintCount: used + 1 });
  }

  async function askTutor(mode) {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setReply('');
    setTutorError('');
    setTutorStatus('connecting');

    const revealCount = sec.revealCount || 0;
    const history = { missed: sec.missed || [] };

    const payload = {
      action: 'chat',
      mode,
      course: 'BIOL 1202',
      term: 'Fall 2026',
      assignment: { id: assignment.id, title: assignment.title, chapter: assignment.chapter },
      section: { id: section.id, title: section.title, prompt: section.prompt, concepts: section.concepts },
      message: mode === 'explain-mistake'
        ? `Explain what I got wrong. I answered: "${draft}". The check flagged: ${(sec.missed || []).join(', ')}.`
        : 'I need help understanding this prompt. Explain it like I am new to biology.',
      history,
      revealCount,
    };

    const localFallback = () =>
      localTutorReply({
        assignment,
        section,
        chapterId: assignment.chapter,
        message: payload.message,
        history,
        revealCount,
        mode,
      });

    const res = await streamChat({
      endpoint: '/api/tutor',
      payload,
      localFallback,
      signal: controller.signal,
      onStatus: setTutorStatus,
      onToken: (t) => setReply((prev) => prev + t),
    });

    if (res.ok) {
      actions.saveSection(assignment.id, section.id, { revealCount: revealCount + 1 });
    }
    if (res.error && res.source === 'local') {
      setTutorError('Live model unavailable — answered from the built-in study engine.');
    }
  }

  function endSession() {
    actions.setLastSession(assignment.id, `Reviewed ${masteredCount}/${total} sections`);
    navigate('/tutor');
  }

  const hint = hintLadder(section, sec.hintCount || 0);
  const showHint = (sec.hintCount || 0) > 0;
  const missedLabels = (sec.missed || []).map((id) => conceptById(assignment.chapter, id)?.label || id);
  const coveredLabels = (sec.covered || []).map((id) => conceptById(assignment.chapter, id)?.label || id);

  return (
    <section>
      <div className="crumbrow">
        <Link className="linkbtn" to="/tutor">← All assignments</Link>
        <span className="muted">{chapter?.title} · {assignment.kind}</span>
      </div>

      <div className="tutorbox">
        <div className="tutorhead">
          <div>
            <div className="eyebrow">— CHECKED PRACTICE · CH {chapter?.num}</div>
            <h2>{assignment.title}</h2>
            <small>{total} sections · ~{assignment.minutes} min · answer in your own words</small>
          </div>
          <div className="tutorheadmeta">
            <Badge tone={masteredCount === total ? 'good' : masteredCount ? 'warn' : 'neutral'}>
              {masteredCount}/{total} mastered
            </Badge>
            <button className="rowbtn" onClick={endSession}>End session</button>
          </div>
        </div>
        <ProgressBar value={masteredCount} max={total} label="Sections mastered" />

        <div className="sectionlist" role="tablist" aria-label="Assignment sections">
          {assignment.sections.map((s, i) => {
            const ss = sectionState(st, s.id);
            const isActive = s.id === section.id;
            return (
              <button
                key={s.id}
                role="tab"
                aria-selected={isActive}
                className={'sectionitem' + (isActive ? ' selected' : '')}
                onClick={() => selectSection(s.id)}
              >
                <span className={'statusdot ' + (ss.status || 'none')} aria-hidden="true" />
                <span className="sectionitemcopy">
                  <b>{i + 1}. {s.title}</b>
                  <small>{statusLabel(ss)}</small>
                </span>
              </button>
            );
          })}
        </div>

        <div className="stepmeta">SECTION {assignment.sections.findIndex((s) => s.id === section.id) + 1} OF {total}</div>
        <div className="tutorstep">
          <div className="stepnum">{assignment.sections.findIndex((s) => s.id === section.id) + 1}</div>
          <div className="stepbody">
            <h3>{section.title}</h3>
            <p className="stepinstruction">{section.prompt}</p>

            <div className="why">
              <b>What a strong answer covers</b>
              <span>{section.concepts.map((id) => conceptById(assignment.chapter, id)?.label || id).join(' · ')}</span>
            </div>

            <label className="stepask" htmlFor="answer">Your answer</label>
            <textarea
              id="answer"
              className="stepanswer"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Explain it the way you'd say it out loud — no need to be polished."
            />

            <div className="stepactions">
              <button className="primary" onClick={handleCheck} disabled={!draft.trim() || checking}>
                {checking ? 'Checking…' : 'Check my answer'}
              </button>
              <button onClick={handleHint} disabled={attempts === 0}>
                {showHint ? `Next hint (${Math.min((sec.hintCount || 0), hint.total)}/${hint.total})` : 'Get a hint'}
              </button>
              <button onClick={() => askTutor('explain-new')} disabled={tutorStatus === 'connecting' || tutorStatus === 'streaming'}>
                Explain like I'm new
              </button>
              {attempts > 0 && !passed && (
                <button onClick={() => askTutor('explain-mistake')} disabled={tutorStatus === 'connecting' || tutorStatus === 'streaming'}>
                  Explain my mistake
                </button>
              )}
            </div>
            {attempts === 0 && (
              <p className="tutornotice">Attempt the question first — hints unlock after your first check, so you do the thinking.</p>
            )}

            {showHint && (
              <div className="hintbox">
                <b>Hint {Math.min(sec.hintCount || 0, hint.total)} of {hint.total}</b>
                <p>{hint.hint}</p>
              </div>
            )}

            {(sec.attempts || 0) > 0 && (
              <div className={'feedbackbox' + (passed ? ' pass' : '')}>
                <b>{passed ? '✓ Passing' : '✕ Not there yet'}</b>
                <p className="feedbacksummary">{sec.summary}</p>
                <div className="coverage">
                  <span>You covered <b>{coveredLabels.length}</b> of <b>{section.concepts.length}</b> concepts.</span>
                </div>
                {coveredLabels.length > 0 && (
                  <div className="chips">
                    {coveredLabels.map((l) => <span className="chip covered" key={l}>✓ {l}</span>)}
                    {missedLabels.map((l) => <span className="chip missed" key={l}>✕ {l}</span>)}
                  </div>
                )}
                {missedLabels.length > 0 && (
                  <div className="why">
                    <b>Why this was wrong / thin</b>
                    <span>The grader looks for these ideas: {missedLabels.join(', ')}. Name each one and tie it back to the prompt.</span>
                  </div>
                )}
                {passed && sec.reviewDueAt && (
                  <p className="tutornotice">
                    Scheduled for spaced review in {REVIEW_INTERVALS[Math.min((sec.reviewStage || 1) - 1, REVIEW_INTERVALS.length - 1)]} day(s) — recall it from memory then to lock it in.
                  </p>
                )}
              </div>
            )}

            {(tutorStatus !== 'idle' || reply) && (
              <div className="live-tutor">
                <b>Live Tutor</b>
                <small>
                  {tutorStatus === 'connecting' && 'Connecting…'}
                  {tutorStatus === 'streaming' && 'Streaming…'}
                  {tutorStatus === 'fallback' && 'Using the built-in study engine…'}
                  {tutorStatus === 'done' && 'Socratic mode — it leads with a question, not the answer.'}
                  {tutorStatus === 'aborted' && 'Stopped.'}
                </small>
                {tutorError && <div className="inlinewarn" role="status">{tutorError}</div>}
                <Markdown className="stream">{reply || '…'}</Markdown>
              </div>
            )}

            <div className="teachback">
              <b>Teach it back (Feynman check)</b>
              <small>Explain this concept to a friend in two sentences. If you can't, you don't own it yet.</small>
              <textarea
                value={sec.teachback || ''}
                onChange={(e) => actions.saveSection(assignment.id, section.id, { teachback: e.target.value })}
                placeholder="Two sentences, plain language…"
              />
            </div>
          </div>
        </div>

        <div className="tutorcontrols">
          <div>
            <button
              onClick={() => {
                const idx = assignment.sections.findIndex((s) => s.id === section.id);
                if (idx > 0) selectSection(assignment.sections[idx - 1].id);
              }}
              disabled={assignment.sections.findIndex((s) => s.id === section.id) === 0}
            >
              ← Previous
            </button>
            <button
              className="primary"
              onClick={() => {
                const idx = assignment.sections.findIndex((s) => s.id === section.id);
                if (idx < total - 1) selectSection(assignment.sections[idx + 1].id);
                else endSession();
              }}
            >
              {assignment.sections.findIndex((s) => s.id === section.id) < total - 1 ? 'Next section →' : 'Finish →'}
            </button>
          </div>
          <button className="skip" onClick={() => actions.resetAssignment(assignment.id)}>Reset this assignment</button>
        </div>
      </div>
    </section>
  );
}
