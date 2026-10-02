import React, { useMemo, useState } from 'react';
import { Empty } from '../components/ui.jsx';
import courseFiles from '../course-files.json';

function fmtSize(bytes) {
  if (!bytes) return '';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1024 / 1024).toFixed(1) + ' MB';
}

function extClass(ext) {
  const e = String(ext || '').toLowerCase();
  if (['pdf'].includes(e)) return 'ext-pdf';
  if (['ppt', 'pptx'].includes(e)) return 'ext-ppt';
  if (['doc', 'docx'].includes(e)) return 'ext-doc';
  if (['xls', 'xlsx', 'csv'].includes(e)) return 'ext-xlsx';
  if (['html', 'htm'].includes(e)) return 'ext-html';
  return '';
}

export default function Resources() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const files = courseFiles.files || [];
  const categories = courseFiles.categories || [];

  const rows = useMemo(() => {
    return files.filter((f) => {
      if (category !== 'all' && f.category !== category) return false;
      if (query) {
        const q = query.toLowerCase();
        if (!(f.title.toLowerCase().includes(q) || f.filename.toLowerCase().includes(q) || f.category.toLowerCase().includes(q))) return false;
      }
      return true;
    });
  }, [files, category, query]);

  const grouped = useMemo(() => {
    const map = new Map();
    rows.forEach((f) => {
      if (!map.has(f.category)) map.set(f.category, []);
      map.get(f.category).push(f);
    });
    return [...map.entries()];
  }, [rows]);

  return (
    <section>
      <div className="eyebrow">— RESOURCES</div>
      <h1 className="pagetitle">Your actual course materials.</h1>
      <p className="intro">
        Every file from the BIOL 1202 course repository, grouped by the same folders your instructor uses. Open any file on GitHub — the tutor can cite these when it explains a topic.
      </p>

      <div className="searchrow">
        <div className="search">
          <span aria-hidden="true">⌕</span>
          <input aria-label="Search materials" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search materials…" />
          {query && <button aria-label="Clear search" onClick={() => setQuery('')}>×</button>}
        </div>
        <select aria-label="Filter by folder" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All folders ({files.length})</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="resulthead">
        <b>{rows.length} file{rows.length === 1 ? '' : 's'}</b>
        <span>{category === 'all' ? 'All folders' : category}</span>
      </div>

      {rows.length === 0 ? (
        <Empty title="No materials match" action={<button className="rowbtn" onClick={() => { setQuery(''); setCategory('all'); }}>Clear filters</button>}>
          Try another folder or clear the search.
        </Empty>
      ) : (
        grouped.map(([cat, items]) => (
          <div className="section" key={cat}>
            <div className="sectionhead">
              <div><label>FOLDER</label><h2>{cat}</h2></div>
              <span className="sectionnote">{items.length} file{items.length === 1 ? '' : 's'}</span>
            </div>
            <div className="resources">
              {items.map((f) => (
                <a className="resource" key={f.path} href={f.url} target="_blank" rel="noreferrer">
                  <span className={'fileicon ' + extClass(f.ext)}>{(f.ext || 'file').toUpperCase().slice(0, 4)}</span>
                  <span className="filecopy">
                    <b>{f.title}</b>
                    <small>{f.filename}</small>
                  </span>
                  <span className="filesize">{fmtSize(f.size)}</span>
                  <span className="arrow" aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>
        ))
      )}
    </section>
  );
}
