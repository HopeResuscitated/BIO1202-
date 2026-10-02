import React from 'react';
import { Link } from 'react-router-dom';
import { ASSIGNMENTS, CHAPTERS } from '../data/curriculum.js';
import { assignmentStats, reviewsDue, useStore } from '../state/store.jsx';
import { teachProgress } from '../lib/teachEngine.js';
import { Badge } from '../components/ui.jsx';

export default function Dashboard() {
  const { state } = useStore();
  const due = reviewsDue(state, ASSIGNMENTS);
  const stats = ASSIGNMENTS.map((a) => ({ a, s: assignmentStats(state, a) }));
  const masteredSections = stats.reduce((n, x) => n + x.s.mastered, 0);
  const totalSections = stats.reduce((n, x) => n + x.s.total, 0);
  const conceptsCovered = stats.reduce((n, x) => n + x.s.conceptsCovered, 0);
  const conceptsTotal = stats.reduce((n, x) => n + x.s.conceptsTotal, 0);

  return (
    <>
      <section className="hero">
        <div>
          <div className="eyebrow">— YOUR COURSE HUB</div>
          <h1>Learn biology.<br /><em>One concept at a time.</em></h1>
          <p>Work through your actual BIOL 1202 material step by step. Answer first, get concept-level feedback, and let weak spots come back as spaced reviews.</p>
        </div>
        <div className="heroart" aria-hidden="true">
          <div className="circle" /><div className="circle2" /><span>✦</span>
          <small>UNDERSTAND · PRACTICE · VERIFY</small>
        </div>
      </section>

      <section className="stats">
        <div><label>ASSIGNMENTS</label><strong>{ASSIGNMENTS.length}</strong><small>Checked-practice sets across CH 22–28 + Exam 1</small></div>
        <div><label>SECTIONS MASTERED</label><strong>{masteredSections}<span className="statof">/{totalSections}</span></strong><small>Recall a section again at a later review to keep it</small></div>
        <div><label>REVIEWS DUE</label><strong>{due.length}</strong><small>Spaced 1 → 3 → 7 days after you master a section</small></div>
      </section>

      {due.length > 0 && (
        <section className="section">
          <div className="sectionhead">
            <div><label>START HERE</label><h2>Reviews due · {due.length}</h2></div>
            <span className="sectionnote">Recall these from memory first — a few minutes each. Weak spots come back sooner.</span>
          </div>
          <div className="reviewlist">
            {due.slice(0, 4).map((d) => (
              <Link key={d.assignment.id + d.section.id} className="reviewrow" to={`/tutor/${d.assignment.id}?section=${d.section.id}`}>
                <span className="reviewdot" aria-hidden="true" />
                <span className="reviewcopy">
                  <b>{d.assignment.title}</b>
                  <small>{d.section.title} · review due</small>
                </span>
                <span className="reviewgo">Review →</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="section">
        <div className="sectionhead">
          <div><label>CHECKED PRACTICE</label><h2>Choose an assignment</h2></div>
          <Link className="linkbtn" to="/tutor">Open all assignments →</Link>
        </div>
        <div className="assignmentgrid">
          {stats.slice(0, 4).map(({ a, s }) => (
            <div className="assignmentcard" key={a.id}>
              <div className="assignmenttop">
                <span className="fileicon ext-drill">CH{a.chapter.replace('ch', '')}</span>
                <span>
                  <b>{a.title}</b>
                  <small>{a.kind} · {s.total} sections · ~{a.minutes} min</small>
                </span>
              </div>
              <div className="assignmentstatus">
                {s.status} · {s.mastered}/{s.total} mastered · {s.conceptsCovered}/{s.conceptsTotal} concepts
              </div>
              <div className="assignmentactions">
                <span className="muted">{a.chapter.toUpperCase()}</span>
                <Link className="primary" to={`/tutor/${a.id}`}>{s.mastered || s.practicing ? 'Resume →' : 'Start →'}</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="sectionhead">
          <div><label>TEACH ME THIS CHAPTER</label><h2>Learn a chapter, concept by concept</h2></div>
          <Link className="linkbtn" to="/teach">Open all lessons →</Link>
        </div>
        <div className="chaptergrid">
          {CHAPTERS.map((c, i) => {
            const p = teachProgress(state, c.id);
            return (
              <Link className="chaptercard" key={c.id} to={`/teach/${c.id}`}>
                <span className={'chapterbadge tint' + (i % 5)}>CH {c.num}</span>
                <strong>{c.title}</strong>
                <small>{p.understood}/{p.total} concepts understood <span>↗</span></small>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section">
        <div className="sectionhead">
          <div><label>YOUR LEARNING PATH</label><h2>Explore your course</h2></div>
          <Link className="linkbtn" to="/resources">Browse all materials →</Link>
        </div>
        <div className="chaptergrid">
          {CHAPTERS.map((c, i) => {
            const chAssign = ASSIGNMENTS.filter((a) => a.chapter === c.id);
            return (
              <Link className="chaptercard" key={c.id} to={`/tutor?chapter=${c.id}`}>
                <span className={'chapterbadge tint' + (i % 5)}>CH {c.num}</span>
                <strong>{c.title}</strong>
                <small>{chAssign.length} practice set{chAssign.length === 1 ? '' : 's'} · {c.concepts.length} concepts <span>↗</span></small>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="banner">
        <span aria-hidden="true">✦</span>
        <div>
          <b>Two ways to get help</b>
          <p><strong>Live Tutor</strong> leads with a question, not the answer. <strong>Teach me this chapter</strong> breaks every concept into plain language with the vocabulary — then has you teach it back.</p>
        </div>
        <Link className="primary" to="/teach">Teach me a chapter →</Link>
      </section>
    </>
  );
}
