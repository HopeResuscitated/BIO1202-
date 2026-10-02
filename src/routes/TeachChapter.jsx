import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getChapter } from '../data/curriculum.js';
import { LESSON_LIST, lessonVocabCount, lessonGlossary } from '../data/teach.js';
import { buildLesson, teachProgress, overallTeachProgress, buildQuiz, teachBackFeedback } from '../lib/teachEngine.js';
import { useStore } from '../state/store.jsx';
import { Badge, Empty, ProgressBar } from '../components/ui.jsx';

// "Teach me this chapter" — a per-chapter lesson that breaks every concept down
// into plain language (what it means, a quotable definition, an analogy, an
// example, its vocabulary, and a self-check), then asks the student to teach the
// chapter back in their own words. Fully deterministic — no API key required.
export default function TeachChapter() {
  const { chapterId } = useParams();
  if (!chapterId) return <TeachPicker />;
  return <Lesson chapterId={chapterId} />;
}

function TeachPicker() {
  const { state } = useStore();
  const overall = overallTeachProgress(state);

  return (
    <section>
      <div className="eyebrow">— TEACH ME THIS CHAPTER</div>
      <h1 className="pagetitle">Every concept, in plain language.</h1>
      <p className="intro">
        Pick a chapter and I'll break it down concept by concept — what it really means, a definition you can
        quote, an analogy, a concrete example, and the vocabulary you need to master it. Mark each idea as
        understood, then teach the whole chapter back in your own words.
      </p>

      <div className="stats">
        <div><label>CHAPTERS</label><strong>{overall.chapters}</strong><small>CH 22–28, each fully broken down</small></div>
        <div><label>CONCEPTS</label><strong>{overall.total}</strong><small>Each with a plain-language explainer</small></div>
        <div><label>UNDERSTOOD</label><strong>{overall.understood}<span className="statof">/{overall.total}</span></strong><small>{overall.chaptersMastered} chapter{overall.chaptersMastered === 1 ? '' : 's'} mastered</small></div>
      </div>

      <div className="section">
        <div className="sectionhead">
          <div><label>CHAPTER LESSONS</label><h2>Choose a chapter to learn</h2></div>
          <span className="sectionnote">Work top to bottom — each concept builds on the last.</span>
        </div>
        <div className="teachgrid">
          {LESSON_LIST.map((l, i) => {
            const p = teachProgress(state, l.id);
            return (
              <Link className="teachcard" key={l.id} to={`/teach/${l.id}`}>
                <div className="teachcardtop">
                  <span className={'chapterbadge tint' + (i % 5)}>CH {l.num}</span>
                  {p.mastered ? <Badge tone="good">Mastered</Badge> : p.understood > 0 ? <Badge tone="warn">{p.pct}%</Badge> : null}
                </div>
                <strong>{l.title}</strong>
                <small>{l.subtitle}</small>
                <div className="teachcardmeta">{l.concepts.length} concepts · {lessonVocabCount(l.id)} key terms</div>
                <ProgressBar value={p.understood} max={p.total} label={`${l.title} progress`} />
                <em>{p.understood ? 'Continue lesson' : 'Teach me this chapter'} →</em>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Lesson({ chapterId }) {
  const { state, actions } = useStore();
  const lesson = useMemo(() => buildLesson(chapterId), [chapterId]);
  const [tab, setTab] = useState('overview');
  const [teachback, setTeachback] = useState('');
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    setTab('overview');
    setTeachback(state.teach?.[chapterId]?.teachback || '');
    setFeedback(null);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterId]);

  if (!lesson) {
    return (
      <section>
        <div className="eyebrow">— TEACH ME THIS CHAPTER</div>
        <h1 className="pagetitle">Chapter not found.</h1>
        <Empty title="No lesson for that chapter" action={<Link className="linkbtn" to="/teach">Back to chapter lessons →</Link>}>
          That chapter isn't part of the BIOL 1202 lesson set.
        </Empty>
      </section>
    );
  }

  const record = state.teach?.[chapterId] || {};
  const done = record.concepts || {};
  const progress = teachProgress(state, chapterId);
  const glossary = lessonGlossary(chapterId);
  const quiz = buildQuiz(chapterId);
  const chapter = getChapter(chapterId);
  const idx = LESSON_LIST.findIndex((l) => l.id === chapterId);
  const prev = idx > 0 ? LESSON_LIST[idx - 1] : null;
  const next = idx >= 0 && idx < LESSON_LIST.length - 1 ? LESSON_LIST[idx + 1] : null;
  const allDone = lesson.concepts.every((c) => done[c.id]);

  function toggleAll() {
    actions.teachSetConcepts(chapterId, lesson.concepts.map((c) => c.id), !allDone);
  }

  function checkTeachback() {
    const fb = teachBackFeedback(chapterId, teachback);
    setFeedback(fb);
    actions.teachSaveTeachback(chapterId, teachback);
  }

  const TABS = [
    { id: 'overview', label: 'Overview' },
    { id: 'concepts', label: 'Concepts', count: lesson.concepts.length },
    { id: 'vocabulary', label: 'Vocabulary', count: glossary.length },
    { id: 'teachback', label: 'Teach it back' },
    { id: 'check', label: 'Self-check', count: quiz.length },
  ];

  return (
    <section>
      <div className="crumbrow">
        <div className="eyebrow">— TEACH ME THIS CHAPTER · CH {lesson.num}</div>
        <Link className="linkbtn" to="/teach">All chapters →</Link>
      </div>
      <h1 className="pagetitle">{lesson.title}</h1>
      <p className="intro">{lesson.subtitle}{chapter ? ` · ${chapter.concepts.length} concepts in the course map` : ''}</p>

      <div className="bigidea">
        <label>THE BIG IDEA</label>
        <p>{lesson.bigIdea}</p>
      </div>

      <div className="teachprogress">
        <div className="teachprogressbar">
          <ProgressBar value={progress.understood} max={progress.total} label="Concepts understood" />
        </div>
        <div className="teachprogresstats">
          <span><b>{progress.understood}</b>/{progress.total} concepts understood</span>
          <span><b>{glossary.length}</b> key terms</span>
          {progress.mastered
            ? <Badge tone="good">Chapter mastered</Badge>
            : <Badge tone={progress.understood ? 'warn' : 'neutral'}>{progress.pct}%</Badge>}
          {progress.teachbackDone && <Badge tone="good">Teach-back saved</Badge>}
        </div>
      </div>

      <div className="tabs">
        {TABS.map((t) => (
          <button key={t.id} className={'tab' + (tab === t.id ? ' selected' : '')} onClick={() => setTab(t.id)}>
            {t.label}{t.count != null ? <small>{t.count}</small> : null}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="teachpanel">
          <div className="teachsection">
            <h2>What this chapter is really about</h2>
            {lesson.overview.map((p, i) => <p key={i} className="teachpara">{p}</p>)}
          </div>
          <div className="teachsection">
            <h2>By the end you should be able to</h2>
            <ul className="objectives">
              {lesson.objectives.map((o, i) => <li key={i}>{o}</li>)}
            </ul>
          </div>
          <div className="teachsection">
            <h2>Concept map</h2>
            <div className="chips">
              {lesson.concepts.map((c) => (
                <button key={c.id} className={'chip chipbtn' + (done[c.id] ? ' covered' : '')} onClick={() => setTab('concepts')}>
                  {c.label}
                </button>
              ))}
            </div>
          </div>
          <div className="teachactions">
            <button className="primary" onClick={() => setTab('concepts')}>Start with the concepts →</button>
          </div>
        </div>
      )}

      {tab === 'concepts' && (
        <div className="teachpanel">
          <div className="teachconceptbar">
            <span className="muted">{progress.understood} of {progress.total} marked understood</span>
            <button className="rowbtn" onClick={toggleAll}>{allDone ? 'Clear all' : 'Mark all understood'}</button>
          </div>
          {lesson.concepts.map((c, i) => (
            <ConceptCard
              key={c.id}
              index={i + 1}
              concept={c}
              understood={!!done[c.id]}
              onToggle={() => actions.teachToggleConcept(chapterId, c.id)}
            />
          ))}
          <div className="teachactions">
            <button className="primary" onClick={() => setTab('teachback')}>Now teach it back →</button>
          </div>
        </div>
      )}

      {tab === 'vocabulary' && (
        <div className="teachpanel">
          <p className="teachpara">
            Every term you need for this chapter, in one place — the chapter-level terms first, then the
            vocabulary attached to each concept. Learn the word, the plain meaning, and where it lives.
          </p>
          <dl className="glossary">
            {glossary.map((v) => (
              <div className="glossaryrow" key={v.term}>
                <dt>{v.term}<span className="glossaryscope">{v.scope}</span></dt>
                <dd>{v.definition}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {tab === 'teachback' && (
        <div className="teachpanel">
          <div className="teachsection">
            <h2>Teach it back in your own words</h2>
            <p className="teachpara">
              The best test of understanding is explaining it simply. Write a short explanation of this chapter
              as if you were teaching a classmate — name the key ideas and use the vocabulary. I'll tell you
              which big ideas you covered and which are still thin.
            </p>
            <textarea
              className="teachbackinput"
              value={teachback}
              onChange={(e) => setTeachback(e.target.value)}
              placeholder="Start with the big idea, then walk through each concept in plain language…"
            />
            <div className="teachactions">
              <button className="primary" onClick={checkTeachback} disabled={teachback.trim().length < 10}>Check my teach-back</button>
              <span className="muted">{teachback.trim() ? teachback.trim().split(/\s+/).length : 0} words</span>
            </div>
          </div>
          {feedback && (
            <div className={'feedbackbox' + (feedback.enough ? ' pass' : '')}>
              <b>{feedback.enough ? 'Teach-back check' : 'Keep going'}</b>
              <p className="feedbacksummary">{feedback.summary}</p>
              {feedback.covered.length > 0 && (
                <>
                  <span className="feedbacklabel">Ideas you named</span>
                  <div className="chips">{feedback.covered.map((c) => <span className="chip covered" key={c.id}>{c.label}</span>)}</div>
                </>
              )}
              {feedback.missing.length > 0 && (
                <>
                  <span className="feedbacklabel">Still to add</span>
                  <div className="chips">{feedback.missing.map((c) => <span className="chip missed" key={c.id}>{c.label}</span>)}</div>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {tab === 'check' && (
        <div className="teachpanel">
          <p className="teachpara">
            Answer each in your head (or on paper) first, then reveal the model answer. If you can say it
            before revealing it, you've mastered that concept.
          </p>
          {quiz.map((q, i) => <CheckCard key={q.conceptId} index={i + 1} item={q} />)}
        </div>
      )}

      <div className="teachnav">
        {prev ? <Link className="rowbtn" to={`/teach/${prev.id}`}>← CH {prev.num} · {prev.title}</Link> : <span />}
        {next ? <Link className="rowbtn" to={`/teach/${next.id}`}>CH {next.num} · {next.title} →</Link> : <span />}
      </div>
    </section>
  );
}

function ConceptCard({ index, concept, understood, onToggle }) {
  const [reveal, setReveal] = useState(false);
  return (
    <article className={'conceptcard' + (understood ? ' understood' : '')}>
      <div className="concepthead">
        <span className="conceptnum">{index}</span>
        <div className="concepttitle">
          <h3>{concept.label}</h3>
          <small>Concept {index}</small>
        </div>
        <button className={'understandbtn' + (understood ? ' on' : '')} onClick={onToggle} aria-pressed={understood}>
          {understood ? '✓ Understood' : 'Mark understood'}
        </button>
      </div>

      <div className="conceptbody">
        <p className="conceptplain">{concept.plain}</p>

        <div className="conceptblock">
          <label>DEFINITION</label>
          <p>{concept.definition}</p>
        </div>
        {concept.analogy && (
          <div className="conceptblock analogy">
            <label>THINK OF IT LIKE THIS</label>
            <p>{concept.analogy}</p>
          </div>
        )}
        {concept.example && (
          <div className="conceptblock example">
            <label>EXAMPLE</label>
            <p>{concept.example}</p>
          </div>
        )}
        {concept.vocabulary?.length > 0 && (
          <div className="conceptblock">
            <label>VOCABULARY</label>
            <ul className="vocablist">
              {concept.vocabulary.map((v) => (
                <li key={v.term}><b>{v.term}</b><span>{v.definition}</span></li>
              ))}
            </ul>
          </div>
        )}
        {concept.check?.q && (
          <div className="conceptblock check">
            <label>CHECK YOURSELF</label>
            <p className="checkq">{concept.check.q}</p>
            {reveal ? (
              <p className="checka">{concept.check.a}</p>
            ) : (
              <button className="rowbtn" onClick={() => setReveal(true)}>Reveal answer</button>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

function CheckCard({ index, item }) {
  const [reveal, setReveal] = useState(false);
  return (
    <div className="checkcard">
      <div className="checkhead"><span className="conceptnum">{index}</span><b>{item.label}</b></div>
      <p className="checkq">{item.q}</p>
      {reveal ? <p className="checka">{item.a}</p> : <button className="rowbtn" onClick={() => setReveal(true)}>Reveal answer</button>}
    </div>
  );
}
