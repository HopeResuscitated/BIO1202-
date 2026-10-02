import { catalog, chapters, chapterNum, chapterTitle, href } from '../lib.js';
import { summary } from '../tutor/summary.js';

const essentials = [
  { title: 'Syllabus & Mastering Biology', desc: 'Course policies, the syllabus, and Mastering Biology setup.', cat: catalog.categories.find(c => /SYLLABUS/.test(c)) },
  { title: 'Exam information', desc: 'How to schedule exams and how to prepare.', cat: catalog.categories.find(c => /EXAM INFORMATION/.test(c)) },
  { title: 'Announcements & calendar', desc: 'Important updates and the semester calendar.', cat: catalog.categories.find(c => /ANNOUNCEMENTS/.test(c)) },
];

export default function Overview() {
  return (
    <>
      <section className="hero">
        <div><div className="eyebrow">— YOUR COURSE HUB</div><h1>Learn biology.<br /><em>One step at a time.</em></h1><p>Every BIOL 1202 file in one place, plus a tutor that walks you through each assignment.</p></div>
        <div className="heroart" aria-hidden="true"><div className="circle"></div><div className="circle2"></div><span>✳</span><small>OBSERVE · CONNECT · DISCOVER</small></div>
      </section>
      <a className="banner tutorbanner" href={href('/tutor')}>
        <span>🎓</span>
        <div><b>Step-by-step tutor: {summary.walkthroughs} assignment walkthroughs</b><p>Guided questions, hints and answer checks for every activity, quiz and exercise from CH 22–28.</p></div>
        <em>Start learning →</em>
      </a>
      <section className="stats">
        <div><label>COURSE RESOURCES</label><strong>{catalog.files.length}</strong><small>Files in your course library</small></div>
        <div><label>WALKTHROUGHS</label><strong>{summary.walkthroughs}</strong><small>Assignments explained step by step</small></div>
        <div><label>PRACTICE QUESTIONS</label><strong>{summary.practiceQuestions}</strong><small>Exam 1 review, with explanations</small></div>
      </section>
      <section className="section">
        <div className="sectionhead"><div><label>YOUR LEARNING PATH</label><h2>Explore your course</h2></div><a className="linkbtn" href={href('/materials')}>Browse all materials →</a></div>
        <div className="chaptergrid">{chapters.map((c, i) => {
          const n = chapterNum(c), walks = summary.byChapter[n] || 0;
          return (
            <a className="chaptercard" key={c} href={href('/materials', { view: 'chapters', cat: c })}>
              <span className={'chapterbadge tint' + (i % 5)}>CH {n}</span>
              <strong>{chapterTitle(c)}</strong>
              <small>{catalog.files.filter(f => f.category === c).length} resources{walks ? ` · ${walks} walkthrough${walks > 1 ? 's' : ''}` : ''} <span>↗</span></small>
            </a>
          );
        })}</div>
      </section>
      <section className="section">
        <div className="sectionhead"><div><label>QUICK ACCESS</label><h2>Course essentials</h2></div></div>
        <div className="essentials">{essentials.map((x, i) => (
          <a key={x.title} href={href('/materials', { view: 'info', cat: x.cat })}>
            <span className={'essentialicon tint' + i} aria-hidden="true">{['▧', '✎', '◷'][i]}</span>
            <span><b>{x.title}</b><small>{x.desc}</small><em>Open resources →</em></span>
          </a>
        ))}</div>
      </section>
    </>
  );
}
