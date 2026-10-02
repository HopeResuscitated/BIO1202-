import React, { useMemo, useState } from 'react';
import catalog from './course-files.json';
import { buildTutorGuide, initialProgress } from './tutorGuides';

const chapters = catalog.categories.filter(c => /^\d{2} CH/.test(c));
const icon = ext => ({pdf:'PDF',pptx:'PPT',ppt:'PPT',docx:'DOC',doc:'DOC',xlsx:'XLS',html:'WEB',txt:'TXT'}[ext] || 'FILE');
const size = n => n > 1e6 ? (n/1e6).toFixed(1)+' MB' : n > 1000 ? Math.round(n/1000)+' KB' : '';
const isAnswerKey = f => /answer|answers|answer key/i.test(f.filename);
const isAssignment = f => /homework|activity|exercise|worksheet|puzzle|quiz|review questions|practice problems|student handout/i.test(f.filename) && !isAnswerKey(f);
const assignmentType = f => { const n=f.filename.toLowerCase(); if(n.includes('quiz'))return'Quiz / practice'; if(n.includes('homework'))return'Homework'; if(n.includes('activity'))return'Class activity'; if(n.includes('exercise'))return'Exercise'; if(n.includes('review'))return'Review'; if(n.includes('puzzle'))return'Activity'; return'Assignment'; };
const getStored = key => { try{return JSON.parse(localStorage.getItem(key)||'{}')}catch{return{}} };
const setStored = (key,value) => { try{localStorage.setItem(key,JSON.stringify(value))}catch{} };

export default function App(){
 const [page,setPage]=useState('Overview'),[query,setQuery]=useState(''),[category,setCategory]=useState('All materials'),[active,setActive]=useState(null),[step,setStep]=useState(0);
 const [understood,setUnderstood]=useState(()=>{const x=getStored('biostudy-understood');return Array.isArray(x)?x:[]});
 const [hidden,setHidden]=useState(()=>{const x=getStored('biostudy-hidden');return Array.isArray(x)?x:[]});
 const [showHidden,setShowHidden]=useState(false);
 const [progress,setProgress]=useState(()=>getStored('biostudy-tutor-progress'));
 const [answer,setAnswer]=useState('');
 const [feedback,setFeedback]=useState([]);
 const [hint,setHint]=useState('');
 const [busy,setBusy]=useState(false);
 const [tutorError,setTutorError]=useState('');

 const essentials=catalog.categories.filter(c=>/SYLLABUS|EXAM INFORMATION|ANNOUNCEMENTS|GENERAL COURSE/.test(c));
 const assignments=useMemo(()=>catalog.files.filter(isAssignment).filter(f=>!hidden.includes(f.path)),[hidden]);
 const visibleFiles=useMemo(()=>catalog.files.filter(f=>{
   const q=query.toLowerCase().trim(),text=(f.filename+' '+f.category+' '+f.path).toLowerCase(),chapter=/^\d{2} CH/.test(f.category),info=/GENERAL COURSE|SYLLABUS|EXAM INFORMATION|ANNOUNCEMENTS|Class Docs/i.test(f.category),exam=/EXAM 1|EXAM INFORMATION/i.test(f.category);
   return(!hidden.includes(f.path)||showHidden)&&(!q||text.includes(q))&&(category==='All materials'||category===f.category)&&(page!=='Chapters 22–28'||chapter)&&(page!=='Course information'||info)&&(page!=='Exam 1'||exam)
 }),[query,category,page,hidden,showHidden]);

 const go=p=>{setPage(p);setQuery('');setCategory('All materials');setActive(null)};
 const openCat=c=>{setPage('Course materials');setCategory(c);setQuery('');setActive(null)};
 const hideFile=f=>{const n=[...new Set([...hidden,f.path])];setHidden(n);setStored('biostudy-hidden',n)};
 const restoreFile=f=>{const n=hidden.filter(x=>x!==f.path);setHidden(n);setStored('biostudy-hidden',n)};
 const saveProgress=(path,next)=>{const all={...progress,[path]:next};setProgress(all);setStored('biostudy-tutor-progress',all)};
 const currentGuide=active?buildTutorGuide(active):null;
 const currentStep=currentGuide?.steps[step];

 const startTutor=f=>{
   const guide=buildTutorGuide(f);
   const saved=progress[f.path]||initialProgress();
   const nextIndex=Math.min(saved.stepIndex||0,guide.steps.length-1);
   setActive(f);setStep(nextIndex);setAnswer(saved.answers?.[guide.steps[nextIndex].id]||'');setFeedback(saved.feedback?.[guide.steps[nextIndex].id]||[]);setHint(saved.hints?.[guide.steps[nextIndex].id]||'');setTutorError('');setPage('Tutor');
 };
 const writeStep=(path,stepId,patch)=>{
   const base=progress[path]||initialProgress();
   const next={...base,...patch,answers:{...base.answers,...(patch.answer!==undefined?{[stepId]:patch.answer}: {})},feedback:{...base.feedback,...(patch.feedback!==undefined?{[stepId]:patch.feedback}: {})},hints:{...base.hints,...(patch.hint!==undefined?{[stepId]:patch.hint}: {})}};
   delete next.answer; delete next.feedback; delete next.hint;
   saveProgress(path,next);
 };
 const moveNext=(status='passed')=>{
   if(!active||!currentGuide||!currentStep)return;
   const nextStatus={...(progress[active.path]?.status||{}),[currentStep.id]:status};
   const nextIndex=Math.min(step+1,currentGuide.steps.length-1);
   const done=step>=currentGuide.steps.length-1;
   const base=progress[active.path]||initialProgress();
   const next={...base,status:nextStatus,stepIndex:done?step:nextIndex,complete:done};
   saveProgress(active.path,next);
   if(done){
     const n=[...new Set([...understood,active.path])];setUnderstood(n);setStored('biostudy-understood',n);setActive(null);setFeedback([]);setHint('');
   } else {
     const ns=currentGuide.steps[nextIndex];
     setStep(nextIndex);setAnswer(next.answers?.[ns.id]||'');setFeedback(next.feedback?.[ns.id]||[]);setHint(next.hints?.[ns.id]||'');
   }
 };
 const checkStep=async()=>{
   if(!active||!currentStep||!answer.trim()||busy)return;
   setBusy(true);setTutorError('');setFeedback([]);
   const draft={...(progress[active.path]||initialProgress()),answers:{...((progress[active.path]||initialProgress()).answers||{}),[currentStep.id]:answer}};
   saveProgress(active.path,draft);
   try{
     const related=catalog.files.filter(f=>f.category===active.category).filter(f=>!isAnswerKey(f)).slice(0,8);
     const r=await fetch('/api/tutor',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'check',assignment:active,step:currentStep,answer,course:'BIOL 1202',term:'Fall 2026',related})});
     const d=await r.json(); if(!r.ok)throw new Error(d.error||'Tutor check failed');
     setFeedback(Array.isArray(d.feedback)?d.feedback:[]);
     setHint(d.hint||'');
     const base=progress[active.path]||initialProgress();
     const status=d.passed?'passed':'needs-work';
     saveProgress(active.path,{...base,answers:{...base.answers,[currentStep.id]:answer},feedback:{...base.feedback,[currentStep.id]:(d.feedback||[])},hints:{...base.hints,[currentStep.id]:(d.hint||'')},status:{...base.status,[currentStep.id]:status}});
     if(d.passed)setTutorError('Step checked. You can continue.');
   }catch(e){setTutorError(e.message||'Tutor check failed. Your answer is saved.');}
   finally{setBusy(false);}
 };
 const skipStep=()=>moveNext('skipped');
 const requestHint=async()=>{
   if(!active||!currentStep||busy)return;
   setBusy(true);setTutorError('');
   try{
     const related=catalog.files.filter(f=>f.category===active.category).filter(f=>!isAnswerKey(f)).slice(0,8);
     const r=await fetch('/api/tutor',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'hint',assignment:active,step:currentStep,answer,course:'BIOL 1202',term:'Fall 2026',related,hintLevel:((progress[active.path]?.hints||{})[currentStep.id]||'').length?2:1})});
     const d=await r.json();if(!r.ok)throw new Error(d.error||'Hint unavailable');
     setHint(d.hint||'');writeStep(active.path,currentStep.id,{hint:d.hint||''});
   }catch(e){setTutorError(e.message||'Hint unavailable.');}
   finally{setBusy(false);}
 };

 return <div className="shell">
  <aside className="sidebar">
   <button className="brand" onClick={()=>go('Overview')}><span className="brandmark">b<span>.</span></span><span><b>BioStudy</b><small>STUDENT WORKSPACE</small></span></button>
   <div className="course"><i/><span><b>BIOL 1202</b><small>General Biology II · Fall 2026</small></span></div>
   <label className="navlabel">WORKSPACE</label>
   {['Overview','Tutor','Organizer','Course materials','Chapters 22–28','Course information','Exam 1'].map((p,i)=><button key={p} className={'navitem '+(page===p?'selected':'')} onClick={()=>go(p)}><span>{['◫','✦','✓','▤','◉','ⓘ','✎'][i]}</span>{p}{p==='Organizer'&&<small>{assignments.length}</small>}{p==='Course materials'&&<small>{catalog.files.length-hidden.length}</small>}</button>)}
   <label className="navlabel chapterlabel">CHAPTER LIBRARY</label>
   {chapters.map(c=><button key={c} className={'chapterlink '+(category===c?'selected':'')} onClick={()=>openCat(c)}><span>{c.match(/CH\s*(\d+)/)?.[1]}</span>{c.replace(/^\d+\s+/,'').replace(/\s*\($/,'')}</button>)}
   <div className="sidebottom"><b>Study at your pace.</b><p>Skip what you already understand. Come back to anything that needs more work.</p><a href={catalog.repository} target="_blank" rel="noreferrer">↗ View course repository</a></div>
  </aside>
  <main><header className="topbar"><span>My courses <i>/</i> <b>BIOL 1202</b></span><label>FALL SEMESTER 2026</label></header><div className="content">

 {page==='Overview'&&<><section className="hero"><div><div className="eyebrow">— YOUR COURSE HUB</div><h1>Learn biology.<br/><em>One concept at a time.</em></h1><p>Work through your actual BIOL 1202 activities step by step, get your reasoning checked, and skip anything you already understand.</p></div><div className="heroart"><div className="circle"></div><div className="circle2"></div><span>✦</span><small>UNDERSTAND · PRACTICE · VERIFY</small></div></section>
  <section className="stats"><div><label>ASSIGNMENTS</label><strong>{assignments.length}</strong><small>Activities and review work ready for tutoring</small></div><div><label>IN PROGRESS</label><strong>{assignments.filter(f=>!understood.includes(f.path)).length}</strong><small>Assignments still needing attention</small></div><div><label>COURSE RESOURCES</label><strong>{catalog.files.length-hidden.length}</strong><small>Class files currently visible</small></div></section>
  <section className="section"><div className="sectionhead"><div><label>START HERE</label><h2>Choose an assignment</h2></div><button className="linkbtn" onClick={()=>go('Tutor')}>Open tutor →</button></div><div className="assignmentgrid">{assignments.slice(0,4).map(f=><div className="assignmentcard" key={f.path}><div className="assignmenttop"><span className={'fileicon ext-'+f.ext}>{icon(f.ext)}</span><span><b>{f.title}</b><small>{assignmentType(f)} · {f.category}</small></span></div><div className="assignmentactions"><a href={f.url} target="_blank" rel="noreferrer">Open class file ↗</a><button onClick={()=>startTutor(f)}>Tutor this →</button></div></div>)}</div></section>
  <section className="section"><div className="sectionhead"><div><label>YOUR LEARNING PATH</label><h2>Explore your course</h2></div><button className="linkbtn" onClick={()=>go('Course materials')}>Browse all materials →</button></div><div className="chaptergrid">{chapters.map((c,i)=><button className="chaptercard" key={c} onClick={()=>openCat(c)}><span className={'chapterbadge tint'+(i%5)}>CH {c.match(/CH\s*(\d+)/)?.[1]}</span><strong>{c.replace(/^\d+\s+CH\s*\d+[-:]?\s*/,'').replace(/\s*\($/,'')}</strong><small>{catalog.files.filter(f=>f.category===c).length} resources <span>↗</span></small></button>)}</div></section>
 </>}

 {page==='Tutor'&&<section><div className="eyebrow">— ASSIGNMENT TUTOR</div><h1 className="pagetitle">{active?active.title:'Work through it with me.'}</h1><p className="intro">{active?'Each step is checked against the assignment/course material. Fix gaps, ask for a hint, or skip a step you already understand.':'Choose a real BIOL 1202 assignment. The tutor turns it into a checked walkthrough rather than a generic chat.'}</p>
 {!active?<div className="assignmentgrid">{assignments.map(f=>{const p=progress[f.path];return <div className="assignmentcard" key={f.path}><div className="assignmenttop"><span className={'fileicon ext-'+f.ext}>{icon(f.ext)}</span><span><b>{f.title}</b><small>{assignmentType(f)} · {f.category}</small></span></div><div className="assignmentstatus">{p?.complete||understood.includes(f.path)?'Understood / complete':p?'In progress':'Not started'}</div><div className="assignmentactions"><a href={f.url} target="_blank" rel="noreferrer">Open class file ↗</a><button onClick={()=>startTutor(f)}>{p?'Resume tutor →':'Start tutor →'}</button></div></div>})}</div>
 :<div className="tutorbox"><div className="tutorhead"><div><span className="eyebrow">NOW WORKING ON · STEP {step+1} OF {currentGuide.steps.length}</span><h2>{currentStep.title}</h2><small>{active.category} · <a className="classlink" href={active.url} target="_blank" rel="noreferrer">Open assignment ↗</a></small></div><button onClick={()=>{setActive(null);setFeedback([]);setHint('');}}>← Choose another</button></div>
  <div className="progress"><span style={{width:(((step+1)/currentGuide.steps.length)*100)+'%'}}/></div>
  <div className="stepmeta">STEP {step+1} OF {currentGuide.steps.length} · {currentGuide.steps.filter((x,i)=>progress[active.path]?.status?.[x.id]&&i<=step).length} CHECKED</div>
  <article className="tutorstep"><div className="stepnum">{step+1}</div><div className="stepbody"><p className="stepinstruction">{currentStep.detail}</p><div className="why"><b>Why this matters</b><span>Being able to explain this step is what tells us you understand the assignment rather than only following an answer.</span></div>
   <label className="stepask">{currentStep.task}</label><textarea className="stepanswer" value={answer} onChange={e=>{setAnswer(e.target.value);writeStep(active.path,currentStep.id,{answer:e.target.value})}} placeholder="Type your answer or reasoning here…"/>
   <div className="stepactions"><button className="primary" disabled={busy||!answer.trim()} onClick={checkStep}>{busy?'Checking…':'Check this step'}</button><button className="skip" disabled={busy} onClick={skipStep}>I understand this — skip</button>{answer&&<button disabled={busy} onClick={requestHint}>Give me a hint</button>}</div>
   {hint&&<div className="hintbox"><b>Hint</b><p>{hint}</p></div>}{feedback.length>0&&<div className="feedbackbox"><b>Not there yet</b><ul>{feedback.map(x=><li key={x}>{x}</li>)}</ul></div>}{tutorError&&<div className="tutornotice">{tutorError}</div>}
  </div></article>
  <div className="tutorcontrols"><button disabled={step===0||busy} onClick={()=>{const s=Math.max(0,step-1);setStep(s);setAnswer((progress[active.path]?.answers||{})[currentGuide.steps[s].id]||'');setFeedback((progress[active.path]?.feedback||{})[currentGuide.steps[s].id]||[]);setHint((progress[active.path]?.hints||{})[currentGuide.steps[s].id]||'')}}>← Back</button><div><button disabled={busy||!['passed','skipped'].includes(progress[active.path]?.status?.[currentStep.id])} onClick={()=>moveNext(progress[active.path]?.status?.[currentStep.id]||'passed')}>{step===currentGuide.steps.length-1?'Finish assignment →':'Next step →'}</button></div></div>
 </div>}
 </section>}

 {page==='Organizer'&&<section><div className="eyebrow">— WORKSPACE ORGANIZER</div><h1 className="pagetitle">Keep only what you need.</h1><p className="intro">Hide old activities without deleting the original class files. Tutor progress and understood status stay saved.</p>
  <div className="organizerbar"><div><b>{assignments.length}</b><small>active assignments</small></div><div><b>{hidden.length}</b><small>hidden from hub</small></div><div><b>{Object.values(progress).filter(x=>x.complete).length}</b><small>completed tutoring paths</small></div><button onClick={()=>setShowHidden(!showHidden)}>{showHidden?'Hide archived':'Show archived'}</button></div>
  <div className="resources">{(showHidden?catalog.files.filter(isAssignment):assignments).map(f=><div className="resource" key={f.path}><span className={'fileicon ext-'+f.ext}>{icon(f.ext)}</span><span className="filecopy"><b>{f.title}</b><small>{f.category} · {assignmentType(f)}</small></span>{understood.includes(f.path)&&<span className="donebadge">UNDERSTOOD</span>}<a className="arrow" href={f.url} target="_blank" rel="noreferrer">↗</a>{showHidden&&hidden.includes(f.path)?<button className="rowbtn" onClick={()=>restoreFile(f)}>Restore</button>:<button className="rowbtn danger" onClick={()=>hideFile(f)}>Hide</button>}</div>)}</div>
 </section>}

 {page!=='Overview'&&page!=='Tutor'&&page!=='Organizer'&&<><div className="eyebrow">— {page==='Chapters 22–28'?'CHAPTER LIBRARY':page==='Exam 1'?'ASSESSMENT PREP':page==='Course information'?'COURSE GUIDE':'RESOURCE LIBRARY'}</div><h1 className="pagetitle">{category!=='All materials'?category.replace(/^\d+\s+/,''):page==='Chapters 22–28'?'Chapters 22–28':page==='Course information'?'Course information':page==='Exam 1'?'Exam resources':'All course materials'}</h1><p className="intro">Browse the files provided for BIOL 1202. Assignment-type resources can be opened directly or sent through the checked tutor.</p>
  <div className="searchrow"><div className="search"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search outlines, worksheets, answer keys…"/>{query&&<button onClick={()=>setQuery('')}>×</button>}</div><select value={category} onChange={e=>setCategory(e.target.value)}><option>All materials</option>{catalog.categories.map(c=><option key={c}>{c}</option>)}</select></div>
  {page==='Chapters 22–28'&&category==='All materials'&&<div className="pills">{chapters.map(c=><button key={c} onClick={()=>setCategory(c)}>{c.match(/CH\s*(\d+)/)?.[1]} · {c.replace(/^\d+\s+CH\s*\d+[-:]?\s*/,'').slice(0,32)}</button>)}</div>}
  <div className="resulthead"><b>{visibleFiles.length} {visibleFiles.length===1?'resource':'resources'}</b><span>Files open in a new tab ↗</span></div>
  <div className="resources">{visibleFiles.length?visibleFiles.map(f=><div className="resource" key={f.path}><span className={'fileicon ext-'+f.ext}>{icon(f.ext)}</span><span className="filecopy"><b>{f.title}</b><small>{f.category}</small></span><small className="filesize">{size(f.size)}</small>{isAssignment(f)&&<button className="rowbtn tutorbtn" onClick={()=>startTutor(f)}>Tutor</button>}<button className="rowbtn danger" onClick={()=>hideFile(f)}>Hide</button><a className="arrow" href={f.url} target="_blank" rel="noreferrer">↗</a></div>):<div className="empty"><b>No resources found</b><p>Try another search or clear your filters.</p><button onClick={()=>{setQuery('');setCategory('All materials')}}>Clear filters</button></div>}</div>
 </>}
 <footer>BIOL 1202 · Fall 2026 <span>Course content from your class repository · <a href={catalog.repository} target="_blank" rel="noreferrer">View on GitHub ↗</a></span></footer>
 </div></main></div>
}
