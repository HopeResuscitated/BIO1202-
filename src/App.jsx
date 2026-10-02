import React from 'react';
import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { CHAPTERS } from './data/curriculum.js';
import Dashboard from './routes/Dashboard.jsx';
import TutorList from './routes/TutorList.jsx';
import StudyLoop from './routes/StudyLoop.jsx';
import LiveTutor from './routes/LiveTutor.jsx';
import TeachChapter from './routes/TeachChapter.jsx';
import Resources from './routes/Resources.jsx';
import CourseInfo from './routes/CourseInfo.jsx';
import Settings from './routes/Settings.jsx';
import { useStore } from './state/store.jsx';

const NAV = [
  { to: '/', label: 'Dashboard', icon: '◫', end: true },
  { to: '/tutor', label: 'Assignments with Tutor Assist', icon: '✦' },
  { to: '/live', label: 'Live Tutor', icon: '◍' },
  { to: '/teach', label: 'Teach me this chapter', icon: '◈' },
  { to: '/resources', label: 'Resources', icon: '▤' },
  { to: '/courses', label: 'Course Info', icon: 'ⓘ' },
  { to: '/settings', label: 'Settings', icon: '⚙' },
];

const TITLES = {
  '/': 'Dashboard',
  '/tutor': 'Assignments with Tutor Assist',
  '/live': 'Live Tutor',
  '/teach': 'Teach me this chapter',
  '/resources': 'Resources',
  '/courses': 'Course Info',
  '/settings': 'Settings',
};

export default function App() {
  const { state } = useStore();
  const location = useLocation();
  const crumb = TITLES[location.pathname]
    || (location.pathname.startsWith('/tutor/') ? 'Checked practice'
      : location.pathname.startsWith('/teach/') ? 'Teach me this chapter'
      : 'BioStudy');

  return (
    <div className="shell">
      <a className="skiplink" href="#main">Skip to content</a>
      <aside className="sidebar" aria-label="Primary">
        <NavLink to="/" className="brand">
          <span className="brandmark">b<span>.</span></span>
          <span><b>BioStudy</b><small>BIOL 1202 WORKSPACE</small></span>
        </NavLink>
        <div className="course"><i /><span><b>BIOL 1202</b><small>General Biology II · Fall 2026</small></span></div>
        <nav aria-label="Workspace">
          <span className="navlabel">WORKSPACE</span>
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => 'navitem' + (isActive ? ' selected' : '')}>
              <span aria-hidden="true">{n.icon}</span>{n.label}
            </NavLink>
          ))}
        </nav>
        <span className="navlabel chapterlabel">CHAPTER LIBRARY</span>
        <nav aria-label="Chapters">
          {CHAPTERS.map((c) => (
            <NavLink key={c.id} to={`/tutor?chapter=${c.id}`} className="chapterlink">
              <span>{c.num}</span>{c.title}
            </NavLink>
          ))}
        </nav>
        <div className="sidebottom">
          <b>Study at your pace.</b>
          <p>Skip what you already understand. Weak spots come back sooner as spaced reviews.</p>
          <a href="https://github.com/HopeResuscitated/BIO1202-" target="_blank" rel="noreferrer">↗ View course repository</a>
        </div>
      </aside>

      <main id="main">
        <header className="topbar">
          <span>My courses <i>/</i> <b>{crumb}</b></span>
          <label>FALL SEMESTER 2026</label>
        </header>
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tutor" element={<TutorList />} />
            <Route path="/tutor/:assignmentId" element={<StudyLoop />} />
            <Route path="/live" element={<LiveTutor />} />
            <Route path="/teach" element={<TeachChapter />} />
            <Route path="/teach/:chapterId" element={<TeachChapter />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/courses" element={<CourseInfo />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <footer>
            BIOL 1202 · Fall 2026
            <span>Course content from your class repository · <a href="https://github.com/HopeResuscitated/BIO1202-" target="_blank" rel="noreferrer">View on GitHub ↗</a></span>
          </footer>
        </div>
      </main>
    </div>
  );
}

function NotFound() {
  return (
    <section>
      <div className="eyebrow">— NOT FOUND</div>
      <h1 className="pagetitle">That page doesn't exist.</h1>
      <p className="intro">The route you tried isn't part of the workspace. Use the sidebar to get back on track.</p>
      <div className="empty" style={{ marginTop: 20 }}>
        <b>Nothing here</b>
        <p>Check the URL or pick a destination from the left.</p>
        <NavLink className="linkbtn" to="/">Go to Dashboard →</NavLink>
      </div>
    </section>
  );
}
