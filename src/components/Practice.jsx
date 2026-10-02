import { useMemo, useState } from 'react';
import bank from '../tutor/exam1-review.json';
import { href, viewUrl, useProgress } from '../lib.js';

const CHS = [22, 23, 24, 25];

export default function Practice({ params }) {
  const ch = Number(params.get('ch')) || 'all';
  const [progress, setProgress] = useProgress();
  const answers = progress.exam1 || {};
  const [onlyMissed, setOnlyMissed] = useState(false);
  const list = useMemo(() => bank.filter(q => (ch === 'all' || q.chapter === ch) && (!onlyMissed || (answers[q.id] && answers[q.id] !== q.answer))), [ch, onlyMissed, answers]);
  const pick = (q, opt) => !answers[q.id] && setProgress(p => ({ ...p, exam1: { ...(p.exam1 || {}), [q.id]: opt } }));
  const scope = bank.filter(q => ch === 'all' || q.chapter === ch);
  const tried = scope.filter(q => answers[q.id]), right = tried.filter(q => answers[q.id] === q.answer);

  return (
    <>
      <div className="eyebrow">— EXAM 1 PRACTICE (CH 22–25)</div>
      <h1 className="pagetitle">Review questions</h1>
      <p className="intro">These are the instructor’s review questions. Pick an answer to lock it in, then read why it’s right. A few questions need a figure; open the PDF for those.</p>
      <div className="pills">
        <a className={ch === 'all' ? 'on' : ''} href={href('/practice')}>All chapters</a>
        {CHS.map(c => <a key={c} className={ch === c ? 'on' : ''} href={href('/practice', { ch: c })}>CH {c}</a>)}
        <label className="toggle"><input type="checkbox" checked={onlyMissed} onChange={e => setOnlyMissed(e.target.checked)} /> Only ones I missed</label>
      </div>
      <div className="scorebar"><b>{right.length}/{tried.length}</b> correct so far · {scope.length - tried.length} left
        {tried.length > 0 && <button className="linkbtn" onClick={() => setProgress(p => ({ ...p, exam1: Object.fromEntries(Object.entries(p.exam1 || {}).filter(([k]) => !scope.some(q => q.id === k))) }))}>Start over</button>}
      </div>
      <ol className="quiz">
        {list.map(q => {
          const mine = answers[q.id];
          return (
            <li key={q.id} className="qcard">
              <div className="qhead"><span>CH {q.chapter} · Q{q.n}</span>{q.figure && <a href={viewUrl(q.file)} target="_blank" rel="noreferrer">Needs figure: open PDF ↗</a>}</div>
              <p className="stem">{q.stem}</p>
              <div className="options">
                {Object.entries(q.options).map(([k, v]) => {
                  const cls = !mine ? '' : k === q.answer ? 'right' : k === mine ? 'wrong' : 'dim';
                  return <button key={k} className={'opt ' + cls} onClick={() => pick(q, k)} disabled={!!mine}><b>{k}</b><span>{v}</span></button>;
                })}
              </div>
              {mine && <div className={'why ' + (mine === q.answer ? 'good' : 'bad')}><b>{mine === q.answer ? 'Correct.' : `The answer is ${q.answer}.`}</b> {q.why}</div>}
            </li>
          );
        })}
      </ol>
      {!list.length && <div className="empty"><b>Nothing here</b><p>{onlyMissed ? 'You haven’t missed any yet.' : 'No questions.'}</p></div>}
    </>
  );
}
