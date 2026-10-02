import { useMemo, useState } from 'react';
import { catalog, chapters, chapterNum, chapterTitle, isChapter, fileIcon, fileSize, viewUrl, rawUrl, href } from '../lib.js';
import { summary } from '../tutor/summary.js';

const VIEWS = {
  all: { label: 'All course materials', eyebrow: 'RESOURCE LIBRARY', test: () => true },
  chapters: { label: 'Chapter materials', eyebrow: 'CHAPTER LIBRARY', test: f => isChapter(f.category) },
  info: { label: 'Course information', eyebrow: 'COURSE GUIDE', test: f => /GENERAL COURSE|SYLLABUS|EXAM INFORMATION|ANNOUNCEMENTS|First Day|Course home/i.test(f.category) },
  exam: { label: 'Exam resources', eyebrow: 'ASSESSMENT PREP', test: f => /EXAM/i.test(f.category) },
};
const tutorFor = summary.fileToWalkthrough;

export default function Library({ params }) {
  const view = VIEWS[params.get('view')] ? params.get('view') : 'all';
  const cat = params.get('cat') || '';
  const [query, setQuery] = useState('');
  const files = useMemo(() => {
    const q = query.toLowerCase().trim();
    return catalog.files.filter(f => VIEWS[view].test(f) && (!cat || f.category === cat) && (!q || (f.filename + ' ' + f.category).toLowerCase().includes(q)));
  }, [query, view, cat]);
  const setCat = c => { window.location.hash = href('/materials', { ...(view !== 'all' && { view }), ...(c && { cat: c }) }).slice(1); };

  return (
    <>
      <div className="eyebrow">— {VIEWS[view].eyebrow}</div>
      <h1 className="pagetitle">{cat ? cat.replace(/^\d+\s+/, '').replace(/\s*\($/, '') : VIEWS[view].label}</h1>
      <p className="intro">Open a file on GitHub, or download it. Files with a 🎓 have a step-by-step tutor walkthrough.</p>
      <div className="searchrow">
        <div className="search"><span aria-hidden="true">⌕</span><input aria-label="Search files" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search outlines, worksheets, answer keys…" />{query && <button aria-label="Clear search" onClick={() => setQuery('')}>×</button>}</div>
        <select aria-label="Filter by section" value={cat} onChange={e => setCat(e.target.value)}><option value="">All sections</option>{catalog.categories.filter(c => catalog.files.some(f => f.category === c && VIEWS[view].test(f))).map(c => <option key={c} value={c}>{c}</option>)}</select>
      </div>
      {view === 'chapters' && !cat && <div className="pills">{chapters.map(c => <button key={c} onClick={() => setCat(c)}>CH {chapterNum(c)} · {chapterTitle(c).slice(0, 32)}</button>)}</div>}
      <div className="resulthead"><b>{files.length} {files.length === 1 ? 'resource' : 'resources'}</b><span>Opens on GitHub ↗</span></div>
      <div className="resources">
        {files.length ? files.map(f => (
          <div className="resource" key={f.path}>
            <span className={'fileicon ext-' + f.ext}>{fileIcon(f.ext)}</span>
            <a className="filecopy" href={viewUrl(f.path)} target="_blank" rel="noreferrer"><b>{f.title}</b><small>{f.category}</small></a>
            {tutorFor[f.path] && <a className="tutorlink" href={href('/tutor/' + tutorFor[f.path])} title="Step-by-step walkthrough">🎓 Tutor</a>}
            <small className="filesize">{fileSize(f.size)}</small>
            <a className="arrow" href={rawUrl(f.path)} title="Download" aria-label={'Download ' + f.filename}>⇩</a>
          </div>
        )) : <div className="empty"><b>No resources found</b><p>Try another search or clear your filters.</p><button onClick={() => { setQuery(''); setCat(''); }}>Clear filters</button></div>}
      </div>
    </>
  );
}
