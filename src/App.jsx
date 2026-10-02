import React, { useMemo, useState } from 'react';
import catalog from './course-files.json';

const chapters = catalog.categories.filter(c => /^\d{2} CH/.test(c));
const icon = ext => ({pdf:'PDF',pptx:'PPT',ppt:'PPT',docx:'DOC',doc:'DOC',xlsx:'XLS',html:'WEB',txt:'TXT'}[ext] || 'FILE');
const size = n => n > 1e6 ? (n/1e6).toFixed(1)+' MB' : n > 1000 ? Math.round(n/1000)+' KB' : '';
const isAnswerKey = f => /answer|answers|answer key/i.test(f.filename);
const isAssignment = f => /homework|activity|exercise|worksheet|puzzle|quiz|review questions|practice problems|student handout/i.test(f.filename) && !isAnswerKey(f);
const assignmentType = f => { const n=f.filename.toLowerCase(); if(n.includes('quiz'))return'Quiz / practice'; if(n.includes('homework'))return'Homework'; if(n.includes('activity'))return'Class activity'; if(n.includes('exercise'))return'Exercise'; if(n.includes('review'))return'Review'; if(n.includes('puzzle'))return'Activity'; return'Assignment'; };
const getStored = key => { try{return JSON.parse(localStorage.getItem(key)||'[]')}catch{return[]} };
const setStored = (key,value) => { try{localStorage.setItem(key,JSON.stringify(value))}catch{} };
const tutorSteps = [
 {title:'Understand the assignment',body:'Before answering anything, identify exactly what this assignment is asking you to produce. Read the instructions in the class file and restate the task in your own words.'},
 {title:'Gather the right class material',body:'Use the course materials already provided for this chapter. Open the student outline, lecture material, or related activity before looking at an answer key.'},
 {title:'Work the first problem yourself',body:'Do not jump to the answer key. Try the first question or problem. Identify what concept it is testing and why your answer makes sense.'},
 {title:'Check your understanding',body:'Explain the concept behind your answer without looking at the answer. If you can explain why it is correct, continue. If not, review the class material before moving on.'},
 {title:'Finish the assignment',body:'Continue one question at a time. When you get stuck, identify the exact concept blocking you instead of skipping the whole assignment.'},
 {title:'Verify your work',body:'Only after you have attempted the work, use the instructor-provided answer key when one exists. Compare your reasoning, not just the final answer.'},
 {title:'Teach it back',body:'Explain the main concept from this assignment as if you were teaching it to someone else. If you can do that, you are ready to move on.'}
];

export default function App(){
 const [page,setPage]=useState('Overview'),[query,setQuery]=useState(''),[category,setCategory]=useState('All materials'),[active,setActive]=useState(null),[step,setStep]=useState(0);
 const [understood,setUnderstood]=useState(()=>getStored('biostudy-understood')), [hidden,setHidden]=useState(()=>getStored('biostudy-hidden')), [showHidden,setShowHidden]=useState(false);
 const essentials=catalog.categories.filter(c=>/SYLLABUS|EXAM INFORMATION|ANNOUNCEMENTS|GENERAL COURSE/.test(c));
 const assignments=useMemo(()=>catalog.files.filter(isAssignment).filter(f=>!hidden.includes(f.path)),[hidden]);
 const visibleFiles=useMemo(()=>catalog.files.filter(f=>{const q=query.toLowerCase().trim(),text=(f.filename+' '+f.category+' '+f.path).toLowerCase(),chapter=/^\d{2} CH/.test(f.category),info=/GENERAL COURSE|SYLLABUS|EXAM INFORMATION|ANNOUNCEMENTS|Class Docs/i.test(f.category),exam=/EXAM 1|EXAM INFORMATION/i.test(f.category);return(!hidden.includes(f.path)||showHidden)&&(!q||text.includes(q))&&(category==='All materials'||category===f.category)&&(page!=='Chapters 22–28'||chapter)&&(page!=='Course information'||info)&&(page!=='Exam 1'||exam)}),[query,category,page,hidden,showHidden]);
 const go=p=>{setPage(p);setQuery('');setCategory('All materials');setActive(null)}; const openCat=c=>{setPage('Course materials');setCategory(c);setQuery('');setActive(null)};
 const hideFile=f=>{const n=[...new Set([...hidden,f.path])];setHidden(n);setStored('biostudy-hidden',n)}; const restoreFile=f=>{const n=hidden.filter(x=>x!==f.path);setHidden(n);setStored('biostudy-hidden',n)};
 const markUnderstood=path=>{const n=[...new Set([...understood,path])];setUnderstood(n);setStored('biostudy-understood',n)}; const startTutor=f=>{setActive(f);setStep(0);setPage('Tutor')};

 return <div className="shell">
  <aside className="sidebar">
   <button className="brand" onClick={()=>go('Overview')}><span className="brandmark">b<span>.</span></span><span><b>BioStudy</b><small>STUDENT WORKSPACE</small></span></button>
   <div className="course"><i/><span><b>BIOL 1202</b><small>General Biology II · Fall 2026</small></span></div>
   <label className="navlabel">WORKSPACE</label>
   {[['Overview','◫'],['Tutor','✦'],['Organizer','✓'],['Course materials','▤'],['Chapters 22–28','◉'],['Course information','ⓘ'],['Exam 1','✎']].map(([p,ico])=><button key={p} className={'navitem '+(page===p?'selected':'')} onClick={()=>go(p)}><span>{ico}</span>{p}{p==='Organizer'&&<small>{assignments.length}</small>}{p==='Course materials'&&<small>{catalog.files.length-hidden.length}</small>}</button>)}
   <label className="navlabel chapterlabel">CHAPTER LIBRARY</label>
   {chapters.map(c=><button key={c} className={'chapterlink '+(category===c?'selected':'')} onClick={()=>openCat(c)}><span>{c.match(/CH\s*(\d+)/)?.[1]}</span>{c.replace(/^\d+\s+/,'').replace(/\s*\($/,'')}</button>)}
   <div className="sidebottom"><b>Study at your pace.</b><p>Skip what you already understand. Come back to anything that needs more work.</p><a href={catalog.repository} target="_blank" rel="noreferrer">↗ View course repository</a></div>
  </aside>
  <main><header className="topbar"><span>My courses <i>/</i> <b>BIOL 1202</b></span><label>FALL SEMESTER 2026</label></header><div className="content">

  {page==='Overview'&&<><section className="hero"><div><div className="eyebrow">— YOUR COURSE HUB</div><h1>Your tutor.<br/><em>Your organizer.</em></h1><p>Use the class material already here to work through assignments one step at a time, while keeping the workspace clean.</p></div><div className="heroart"><div className="circle"></div><div className="circle2"></div><span>✦</span><small>UNDERSTAND · PRACTICE · VERIFY</small></div></section>
   <section className="stats"><div><label>ASSIGNMENTS</label><strong>{assignments.length}</strong><small>Activities and practice work ready for tutoring</small></div><div><label>IN PROGRESS</label><strong>{assignments.filter(f=>!understood.includes(f.path)).length}</strong><small>Assignments still needing your attention</small></div><div><label>COURSE RESOURCES</label><strong>{catalog.files.length-hidden.length}</strong><small>Class files currently visible</small></div></section>
   <section className="section"><div className="sectionhead"><div><label>START HERE</label><h2>What do you need?</h2></div></div><div className="modegrid">
    <button onClick={()=>go('Tutor')}><span>✦</span><b>Walk me through an assignment</b><small>One step at a time. Skip steps you already understand.</small><em>Start tutoring →</em></button>
    <button onClick={()=>go('Organizer')}><span>✓</span><b>Clean up my workspace</b><small>Hide old activities and keep the course library focused on what you still need.</small><em>Open organizer →</em></button>
   </div></section>
   <section className="section"><div className="sectionhead"><div><label>YOUR LEARNING PATH</label><h2>Explore your course</h2></div><button className="linkbtn" onClick={()=>go('Course materials')}>Browse all materials →</button></div><div className="chaptergrid">{chapters.map((c,i)=><button className="chaptercard" key={c} onClick={()=>openCat(c)}><span className={'chapterbadge tint'+(i%5)}>CH {c.match(/CH\s*(\d+)/)?.[1]}</span><strong>{c.replace(/^\d+\s+CH\s*\d+[-:]?\s*/,'').replace(/\s*\($/,'')}</strong><small>{catalog.files.filter(f=>f.category===c).length} resources <span>↗</span></small></button>)}</div></section>
  </>}

  {page==='Tutor'&&<section><div className="eyebrow">— ASSIGNMENT TUTOR</div><h1 className="pagetitle">Work through it with me.</h1><p className="intro">Choose an assignment. The tutor follows a repeatable sequence: understand the task → find the right class material → attempt → explain → verify.</p>
   {!active?<div className="assignmentgrid">{assignments.map(f=><div className="assignmentcard" key={f.path}><div className="assignmenttop"><span className={'fileicon ext-'+f.ext}>{icon(f.ext)}</span><span><b>{f.title}</b><small>{assignmentType(f)} · {f.category}</small></span></div><div className="assignmentactions"><a href={f.url} target="_blank" rel="noreferrer">Open class file ↗</a><button onClick={()=>startTutor(f)}>Start tutor →</button></div></div>)}</div>
   :<div className="tutorbox"><div className="tutorhead"><div><span className="eyebrow">NOW WORKING ON</span><h2>{active.title}</h2><small>{active.category}</small></div><button onClick={()=>setActive(null)}>← Choose another</button></div>
    <div className="progress"><span style={{width:((step+1)/tutorSteps.length*100)+'%'}}/></div><div className="stepmeta">STEP {step+1} OF {tutorSteps.length}</div>
    <article className="tutorstep"><div className="stepnum">{step+1}</div><div><h3>{tutorSteps[step].title}</h3><p>{tutorSteps[step].body}</p>
     {step===0&&<a className="classlink" href={active.url} target="_blank" rel="noreferrer">Open the actual class assignment ↗</a>}
     {step===1&&<div className="related"><b>Use the course library</b><small>Search or open the chapter resources below. The tutor does not invent outside course requirements.</small><button onClick={()=>openCat(active.category)}>Open {active.category.replace(/^\d+\s+/,'')} materials →</button></div>}
     {step===3&&<div className="checkbox"><b>Can you explain why your answer makes sense?</b><small>If yes, continue. If no, stay here and review the class material before moving on.</small></div>}
     {step===6&&<div className="teachback"><b>Teach it back</b><textarea placeholder="In your own words, explain the main idea you learned…"/></div>}
    </div></article>
    <div className="tutorcontrols"><button className="skip" onClick={()=>setStep(Math.min(step+1,tutorSteps.length-1))}>I understand this — skip →</button><div><button disabled={step===0} onClick={()=>setStep(step-1)}>Back</button>{step<tutorSteps.length-1?<button className="primary" onClick={()=>setStep(step+1)}>I’m ready — next step</button>:<button className="primary" onClick={()=>{markUnderstood(active.path);setActive(null)}}>Finish & mark understood</button>}</div></div>
   </div>}
  </section>}

  {page==='Organizer'&&<section><div className="eyebrow">— WORKSPACE ORGANIZER</div><h1 className="pagetitle">Keep only what you need.</h1><p className="intro">Hiding an old activity cleans up this hub. It does not delete or alter the original class file in your course repository.</p>
   <div className="organizerbar"><div><b>{assignments.length}</b><small>active assignments</small></div><div><b>{hidden.length}</b><small>hidden from hub</small></div><button onClick={()=>setShowHidden(!showHidden)}>{showHidden?'Hide archived':'Show archived'}</button></div>
   <div className="resources">{(showHidden?catalog.files.filter(isAssignment):assignments).map(f=><div className="resource" key={f.path}><span className={'fileicon ext-'+f.ext}>{icon(f.ext)}</span><span className="filecopy"><b>{f.title}</b><small>{f.category} · {assignmentType(f)}</small></span>{understood.includes(f.path)&&<span className="donebadge">UNDERSTOOD</span>}<a className="arrow" href={f.url} target="_blank" rel="noreferrer">↗</a>{showHidden&&hidden.includes(f.path)?<button className="rowbtn" onClick={()=>restoreFile(f)}>Restore</button>:<button className="rowbtn danger" onClick={()=>hideFile(f)}>Hide</button>}</div>)}</div>
  </section>}

  {page!=='Overview'&&page!=='Tutor'&&page!=='Organizer'&&<><div className="eyebrow">— {page==='Chapters 22–28'?'CHAPTER LIBRARY':page==='Exam 1'?'ASSESSMENT PREP':page==='Course information'?'COURSE GUIDE':'RESOURCE LIBRARY'}</div>
   <h1 className="pagetitle">{category!=='All materials'?category.replace(/^\d+\s+/,''):page==='Chapters 22–28'?'Chapters 22–28':page==='Course information'?'Course information':page==='Exam 1'?'Exam resources':'All course materials'}</h1><p className="intro">Browse the files provided for BIOL 1202. Assignments can be opened in the original class repository or sent to the tutor.</p>
   <div className="searchrow"><div className="search"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search outlines, worksheets, answer keys…"/>{query&&<button onClick={()=>setQuery('')}>×</button>}</div><select value={category} onChange={e=>setCategory(e.target.value)}><option>All materials</option>{catalog.categories.map(c=><option key={c}>{c}</option>)}</select></div>
   {page==='Chapters 22–28'&&category==='All materials'&&<div className="pills">{chapters.map(c=><button key={c} onClick={()=>setCategory(c)}>{c.match(/CH\s*(\d+)/)?.[1]} · {c.replace(/^\d+\s+CH\s*\d+[-:]?\s*/,'').slice(0,32)}</button>)}</div>}
   <div className="resulthead"><b>{visibleFiles.length} {visibleFiles.length===1?'resource':'resources'}</b><span>Files open in a new tab ↗</span></div>
   <div className="resources">{visibleFiles.length?visibleFiles.map(f=><div className="resource" key={f.path}><span className={'fileicon ext-'+f.ext}>{icon(f.ext)}</span><span className="filecopy"><b>{f.title}</b><small>{f.category}</small></span><small className="filesize">{size(f.size)}</small>{isAssignment(f)&&<button className="rowbtn tutorbtn" onClick={()=>startTutor(f)}>Tutor</button>}{!showHidden&&<button className="rowbtn danger" onClick={()=>hideFile(f)}>Hide</button>}{showHidden&&hidden.includes(f.path)&&<button className="rowbtn" onClick={()=>restoreFile(f)}>Restore</button>}<a className="arrow" href={f.url} target="_blank" rel="noreferrer">↗</a></div>):<div className="empty"><b>No resources found</b><p>Try another search or clear your filters.</p><button onClick={()=>{setQuery('');setCategory('All materials')}}>Clear filters</button></div>}</div>
  </>}
  <footer>BIOL 1202 · Fall 2026 <span>Course content from your class repository · <a href={catalog.repository} target="_blank" rel="noreferrer">View on GitHub ↗</a></span></footer>
  </div></main></div>;
}
