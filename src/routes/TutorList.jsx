import React, { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ASSIGNMENTS, CHAPTERS, getChapter } from '../data/curriculum.js';
import { assignmentStats, reviewsDue, useStore } from '../state/store.jsx';
import { Empty } from '../components/ui.jsx';

const TABS = ['All', 'To do', 'In progress', 'Done'];

export default function TutorList() {
  const { state } = useStore();
  const [params, setParams] = useSearchParams();
  const chapterFilter = params.get('chapter') || 'all';
  const [tab, setTab] = useState('All');
  const [query, setQuery] = useState('');

  const due = reviewsDue(state, ASSIGNMENTS);

  const rows = useMemo(() => {
    return ASSIGNMENTS.map((a) => ({ a, s: assignmentStats(state, a) })).filter(({ a, s }) => {
      if (chapterFilter !== 'all' && a.chapter !== chapterFilter) return false;
      if (tab === 'To do' && (s.mastered || s.practicing)) return false;
      if (tab === 'In progress' && !(s.practicing && !s.mastered === s.total)) { /* fallthrough */ }
      if (tab === 'In progress' && !(s.practicing > 0 || (s.mastered > 0 && s.mastered < s.total))) return false;
      if (tab === 'Done' && !(s.mastered === s.total && s.total > 0)) return false;
      if (query) {
        const q = query.toLowerCase();
        if (!(a.title.toLowerCase().includes(q) || a.chapter.includes(q) || a.kind.toLowerCase().includes(q))) return false;
      }
      return true;
    });
  }, [state, chapterFilter, tab, query]);

  const counts = {
    All: ASSIGNMENTS.length,
    'To do': ASSIGNMENTS.filter((a) => { const s = assignmentStats(state, a); return !(s.mastered || s.practicing); }).length,
    'In progress': ASSIGNMENTS.filter((a) => { const s = assignmentStats(state, a); return s.practicing > 0 || (s.mastered > 0 && s.mastered < s.total); }).length,
    Done: ASSIGNMENTS.filter((a) => { const s = assignmentStats(state, a); return s.mastered === s.total && s.total > 0; }).length,
  };

  return (
    <section>
      <div className="eyebrow">— ASSIGNMENTS WITH TUTOR ASSIST</div>
      <h1 className="pagetitle">Every assignment in one place.</h1>
      <p className="intro">Due dates and status, step-by-step checked practice, and spaced reviews. Answer in your own words, see which concepts you covered, and come back until each section is mastered.</p>

      {due.length > 0 && (
        <div className="reviewbanner">
          <b>Reviews due · {due.length}</b>
          <span>Recall these from memory first — a few minutes each. Weak spots come back sooner.</span>
          <Link className="rowbtn" to={`/tutor/${due[0].assignment.id}?section=${due[0].section.id}`}>Start review →</Link>
        </div>
      )}

      <div className="searchrow">
        <div className="search">
          <span aria-hidden="true">⌕</span>
          <input aria-label="Search assignments" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search title or concept…" />
          {query && <button aria-label="Clear search" onClick={() => setQuery('')}>×</button>}
        </div>
        <select aria-label="Filter by chapter" value={chapterFilter} onChange={(e) => { const v = e.target.value; if (v === 'all') { params.delete('chapter'); setParams(params); } else { setParams({ chapter: v }); } }}>
          <option value="all">All chapters</option>
          {CHAPTERS.map((c) => <option key={c.id} value={c.id}>CH {c.num} · {c.title}</option>)}
        </select>
      </div>

      <div className="tabs" role="tablist" aria-label="Assignment status">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} className={'tab' + (tab === t ? ' selected' : '')} onClick={() => setTab(t)}>
            {t} <small>{counts[t]}</small>
          </button>
        ))}
      </div>

      {rows.length === 0 ? (
        <Empty title="No assignments match" action={<button className="rowbtn" onClick={() => { setQuery(''); setTab('All'); setParams({}); }}>Clear filters</button>}>
          Try another chapter or clear the search.
        </Empty>
      ) : (
        <div className="assignmentgrid">
          {rows.map(({ a, s }) => (
            <div className="assignmentcard" key={a.id}>
              <div className="assignmenttop">
                <span className="fileicon ext-drill">CH{a.chapter.replace('ch', '')}</span>
                <span>
                  <b>{a.title}</b>
                  <small>{a.kind} · {getChapter(a.chapter)?.title} · ~{a.minutes} min</small>
                </span>
              </div>
              <div className="assignmentstatus">{s.status} · {s.mastered}/{s.total} mastered · {s.conceptsCovered}/{s.conceptsTotal} concepts</div>
              <div className="assignmentactions">
                <Link className="muted" to={`/live?assignment=${a.id}`}>Ask the tutor →</Link>
                <Link className="primary" to={`/tutor/${a.id}`}>{s.mastered || s.practicing ? 'Resume →' : 'Start →'}</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
