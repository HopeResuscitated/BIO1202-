import React from 'react';
import { useMemo, useState } from 'react';
import catalog from './course-files.json';

const chapters = catalog.categories.filter(c => /^\d{2} CH/.test(c));
const icon = ext => ({pdf:'PDF',pptx:'PPT',ppt:'PPT',docx:'DOC',doc:'DOC',xlsx:'XLS',html:'WEB',txt:'TXT'}[ext] || 'FILE');
const size = n => n > 1e6 ? (n/1e6).toFixed(1)+' MB' : n > 1000 ? Math.round(n/1000)+' KB' : '';
export default function App() {
 const [page,setPage]=useState('Overview'), [query,setQuery]=useState(''), [category,setCategory]=useState('All materials');
 const essentials=catalog.categories.filter(c=>/SYLLABUS|EXAM INFORMATION|ANNOUNCEMENTS|GENERAL COURSE/.test(c));
 const files=useMemo(()=>catalog.files.filter(f=>{
  const q=query.toLowerCase().trim();
  const text=(f.filename+' '+f.category+' '+f.path).toLowerCase();
  const chapter=/^\d{2} CH/.test(f.category);
  const info=/GENERAL COURSE|SYLLABUS|EXAM INFORMATION|ANNOUNCEMENTS|Class Docs/i.test(f.category);
  const exam=/EXAM 1|EXAM INFORMATION/i.test(f.category);
  return (!q||text.includes(q))&&(category==='All materials'||category===f.category)&&(page!=='Chapters 22–28'||chapter)&&(page!=='Course information'||info)&&(page!=='Exam 1'||exam);
 }),[query,category,page]);
 const go=p=>{setPage(p);setQuery('');setCategory('All materials')};
 const openCat=c=>{setPage('Course materials');setCategory(c);setQuery('')};
 return <div className="shell">
 <aside className="sidebar">
  <button className="brand" onClick={()=>go('Overview')}><span className="brandmark">b<span>.</span></span><span><b>BioStudy</b><small>STUDENT WORKSPACE</small></span></button>
  <div className="course"><i/> <span><b>BIOL 1202</b><small>General Biology II · Fall 2026</small></span></div>
  <label className="navlabel">WORKSPACE</label>
  {['Overview','Course materials','Chapters 22–28','Course information','Exam 1'].map((p,i)=><button key={p} className={'navitem '+(page===p?'selected':'')} onClick={()=>go(p)}><span>{['◫','▤','◉','ⓘ','✎'][i]}</span>{p}{p==='Course materials'&&<small>{catalog.files.length}</small>}</button>)}
  <label className="navlabel chapterlabel">CHAPTER LIBRARY</label>
  {chapters.map(c=><button key={c} className={'chapterlink '+(category===c?'selected':'')} onClick={()=>openCat(c)}><span>{c.match(/CH\s*(\d+)/)?.[1]}</span>{c.replace(/^\d+\s+/,'').replace(/\s*\($/,'')}</button>)}
  <div className="sidebottom"><b>Keep moving forward.</b><p>Small study sessions add up. Start with one resource today.</p><a href={catalog.repository} target="_blank" rel="noreferrer">↗ View course repository</a></div>
 </aside>
 <main><header className="topbar"><span>My courses <i>/</i> <b>BIOL 1202</b></span><label>FALL SEMESTER 2026</label></header><div className="content">
 {page==='Overview'?<>
  <section className="hero"><div><div className="eyebrow">— YOUR COURSE HUB</div><h1>Learn biology.<br/><em>One concept at a time.</em></h1><p>Everything you need for BIOL 1202, organized in one place.</p></div><div className="heroart"><div className="circle"></div><div className="circle2"></div><span>✳</span><small>OBSERVE · CONNECT · DISCOVER</small></div></section>
  <section className="stats"><div><label>COURSE RESOURCES</label><strong>{catalog.files.length}</strong><small>Files in your course library</small></div><div><label>CHAPTERS</label><strong>{chapters.length}</strong><small>Lecture topics to explore</small></div><div><label>FILE FORMATS</label><strong>{new Set(catalog.files.map(f=>f.ext)).size}</strong><small>Slides, PDFs, docs & more</small></div></section>
  <section className="section"><div className="sectionhead"><div><label>YOUR LEARNING PATH</label><h2>Explore your course</h2></div><button className="linkbtn" onClick={()=>go('Course materials')}>Browse all materials →</button></div><div className="chaptergrid">{chapters.map((c,i)=><button className="chaptercard" key={c} onClick={()=>openCat(c)}><span className={'chapterbadge tint'+(i%5)}>CH {c.match(/CH\s*(\d+)/)?.[1]}</span><strong>{c.replace(/^\d+\s+CH\s*\d+[-:]?\s*/,'').replace(/\s*\($/,'')}</strong><small>{catalog.files.filter(f=>f.category===c).length} resources <span>↗</span></small></button>)}</div></section>
  <section className="section"><div className="sectionhead"><div><label>QUICK ACCESS</label><h2>Course essentials</h2></div></div><div className="essentials">{[{title:'Syllabus & registration',desc:'Course policies, syllabus, and Mastering Biology setup.',cat:essentials.find(c=>/SYLLABUS/.test(c))},{title:'Exam information',desc:'Exam scheduling and preparation resources.',cat:essentials.find(c=>/EXAM INFORMATION/.test(c))},{title:'Announcements & calendar',desc:'Important updates and semester calendar.',cat:essentials.find(c=>/ANNOUNCEMENTS/.test(c))}].map((x,i)=><button key={x.title} onClick={()=>x.cat?openCat(x.cat):go('Course information')}><span className={'essentialicon tint'+i}>{['▧','✎','◷'][i]}</span><span><b>{x.title}</b><small>{x.desc}</small><em>Open resources →</em></span></button>)}</div></section>
  <div className="banner"><span>✦</span><div><b>Your next breakthrough starts with a question.</b><p>Search lecture outlines, activities, answer keys, and course guidance.</p></div><button onClick={()=>go('Course materials')}>Find a resource →</button></div>
 </>:<>
  <div className="eyebrow">— {page==='Chapters 22–28'?'CHAPTER LIBRARY':page==='Exam 1'?'ASSESSMENT PREP':page==='Course information'?'COURSE GUIDE':'RESOURCE LIBRARY'}</div>
  <h1 className="pagetitle">{category!=='All materials'?category.replace(/^\d+\s+/,''):page==='Chapters 22–28'?'Chapters 22–28':page==='Course information'?'Course information':page==='Exam 1'?'Exam resources':'All course materials'}</h1>
  <p className="intro">Browse the files provided for BIOL 1202. Select any resource to open the original file in GitHub.</p>
  <div className="searchrow"><div className="search"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search outlines, worksheets, answer keys…"/>{query&&<button onClick={()=>setQuery('')}>×</button>}</div><select value={category} onChange={e=>setCategory(e.target.value)}><option>All materials</option>{catalog.categories.map(c=><option key={c}>{c}</option>)}</select></div>
  {page==='Chapters 22–28'&&category==='All materials'&&<div className="pills">{chapters.map(c=><button key={c} onClick={()=>setCategory(c)}>{c.match(/CH\s*(\d+)/)?.[1]} · {c.replace(/^\d+\s+CH\s*\d+[-:]?\s*/,'').slice(0,32)}</button>)}</div>}
  <div className="resulthead"><b>{files.length} {files.length===1?'resource':'resources'}</b><span>Files open in a new tab ↗</span></div>
  <div className="resources">{files.length?files.map(f=><a className="resource" key={f.path} href={f.url} target="_blank" rel="noreferrer"><span className={'fileicon ext-'+f.ext}>{icon(f.ext)}</span><span className="filecopy"><b>{f.title}</b><small>{f.category}</small></span><small className="filesize">{size(f.size)}</small><span className="arrow">↗</span></a>):<div className="empty"><b>No resources found</b><p>Try another search or clear your filters.</p><button onClick={()=>{setQuery('');setCategory('All materials')}}>Clear filters</button></div>}</div>
 </>}
 <footer>BIOL 1202 · Fall 2026 <span>Course content from your class repository · <a href={catalog.repository} target="_blank" rel="noreferrer">View on GitHub ↗</a></span></footer>
 </div></main></div>
}