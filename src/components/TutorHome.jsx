import { assignments, stepCount } from '../tutor/index.js';
import { href, useProgress } from '../lib.js';

export default function TutorHome() {
  const [progress] = useProgress();
  const chapters = [...new Set(assignments.map(a => a.chapter))];
  return (
    <>
      <div className="eyebrow">— STEP-BY-STEP TUTOR</div>
      <h1 className="pagetitle">Assignment walkthroughs</h1>
      <p className="intro">Each walkthrough asks you a guiding question at every step. Try it yourself, check your number, ask for a hint, then reveal the worked step. Your progress is saved in this browser.</p>
      <div className="tutorcallouts">
        <a href={href('/practice/hw')}><b>🧮 Unlimited Hardy–Weinberg practice</b><span>New random problems, checked step by step.</span></a>
        <a href={href('/practice')}><b>📝 Exam 1 practice questions</b><span>80 review questions with an explanation for every answer.</span></a>
      </div>
      {chapters.map(ch => (
        <section className="section" key={ch}>
          <div className="sectionhead"><div><label>CHAPTER {ch}</label></div></div>
          <div className="assignlist">
            {assignments.filter(a => a.chapter === ch).map(a => {
              const done = Object.keys(progress[a.id] || {}).length, total = stepCount(a);
              return (
                <a className="assigncard" key={a.id} href={href('/tutor/' + a.id)}>
                  <span className="assignmeta">{a.kind}{a.graded && <em className="badge warn">Graded</em>}{a.source === 'tutor' && <em className="badge info">No key posted yet</em>}</span>
                  <b>{a.title}</b>
                  <span className="meter" aria-label={`${done} of ${total} steps done`}><i style={{ width: (100 * done / total) + '%' }} /></span>
                  <small>{a.problems.length} {a.problems.length === 1 ? 'part' : 'parts'} · {done}/{total} steps</small>
                </a>
              );
            })}
          </div>
        </section>
      ))}
    </>
  );
}
