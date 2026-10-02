import { lazy, Suspense, useEffect } from 'react';
import { catalog, chapters, chapterNum, chapterTitle, useRoute, href } from './lib.js';
import Overview from './components/Overview.jsx';
import Library from './components/Library.jsx';

// The tutor screens are split into their own bundle so the home page loads fast.
const TutorHome = lazy(() => import('./components/TutorHome.jsx'));
const Walkthrough = lazy(() => import('./components/Walkthrough.jsx'));
const Practice = lazy(() => import('./components/Practice.jsx'));
const HWPractice = lazy(() => import('./components/HWPractice.jsx'));

const NAV = [
  ['/', 'Overview', '◫'],
  ['/tutor', 'Step-by-step tutor', '🎓'],
  ['/practice', 'Exam 1 practice', '✎'],
  ['/materials', 'All materials', '▤'],
  ['/materials?view=chapters', 'Chapter materials', '◉'],
  ['/materials?view=info', 'Course information', 'ⓘ'],
];

export default function App() {
  const { path, params } = useRoute();
  const current = path + (params.get('view') ? '?view=' + params.get('view') : '');
  const cat = params.get('cat');

  let page, title = 'BioStudy — BIOL 1202';
  if (path === '/tutor') { page = <TutorHome />; title = 'Tutor · BioStudy'; }
  else if (path.startsWith('/tutor/')) { page = <Walkthrough id={path.slice(7)} params={params} />; title = 'Walkthrough · BioStudy'; }
  else if (path === '/practice/hw') { page = <HWPractice />; title = 'Hardy–Weinberg drills · BioStudy'; }
  else if (path === '/practice') { page = <Practice params={params} />; title = 'Exam 1 practice · BioStudy'; }
  else if (path === '/materials') { page = <Library key={current + (cat || '')} params={params} />; title = 'Materials · BioStudy'; }
  else page = <Overview />;
  useEffect(() => { document.title = title; }, [title]);

  const active = to => to === current || (to === '/tutor' && path.startsWith('/tutor')) || (to === '/practice' && path.startsWith('/practice'));

  return (
    <div className="shell">
      <a className="skip" href="#main">Skip to content</a>
      <aside className="sidebar">
        <a className="brand" href={href('/')}><span className="brandmark">b<span>.</span></span><span><b>BioStudy</b><small>STUDENT WORKSPACE</small></span></a>
        <div className="course"><i /> <span><b>BIOL 1202</b><small>General Biology II · Fall 2026</small></span></div>
        <nav aria-label="Main">
          <div className="navlabel">WORKSPACE</div>
          {NAV.map(([to, label, icon]) => (
            <a key={to} href={'#' + to} className={'navitem ' + (active(to) ? 'selected' : '')} aria-current={active(to) ? 'page' : undefined}>
              <span aria-hidden="true">{icon}</span>{label}{to === '/materials' && <small>{catalog.files.length}</small>}
            </a>
          ))}
          <div className="navlabel chapterlabel">CHAPTER LIBRARY</div>
          {chapters.map(c => (
            <a key={c} href={href('/materials', { view: 'chapters', cat: c })} className={'chapterlink ' + (cat === c ? 'selected' : '')}>
              <span>{chapterNum(c)}</span>{chapterTitle(c)}
            </a>
          ))}
        </nav>
        <div className="sidebottom"><b>Keep moving forward.</b><p>Small study sessions add up. Start with one walkthrough today.</p><a href={catalog.repository} target="_blank" rel="noreferrer">↗ View course repository</a></div>
      </aside>
      <main id="main">
        <header className="topbar"><span>My courses <i>/</i> <b>BIOL 1202</b></span><span className="term">FALL SEMESTER 2026</span></header>
        <div className="content">
          <Suspense fallback={<p className="intro">Loading…</p>}>{page}</Suspense>
          <footer>BIOL 1202 · Fall 2026 <span>Course content from your class repository · <a href={catalog.repository} target="_blank" rel="noreferrer">View on GitHub ↗</a></span></footer>
        </div>
      </main>
    </div>
  );
}
