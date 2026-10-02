import { useState } from 'react';
import { byId, stepCount } from '../tutor/index.js';
import { href, viewUrl, fileName, checkNumber, useProgress } from '../lib.js';

function Step({ step, index, revealed, onReveal }) {
  const [hint, setHint] = useState(false);
  const [value, setValue] = useState('');
  const [result, setResult] = useState(null);
  const check = e => {
    e.preventDefault();
    const r = checkNumber(value, step.check);
    setResult(r);
    if (r.ok) onReveal();
  };
  return (
    <li className={'step' + (revealed ? ' done' : '')}>
      <div className="stepnum" aria-hidden="true">{revealed ? '✓' : index + 1}</div>
      <div className="stepbody">
        <h4>{step.title}</h4>
        <p className="ask">{step.ask}</p>
        {!revealed && step.check && (
          <form className="checkrow" onSubmit={check}>
            <label className="sr-only" htmlFor={'in-' + step.title + index}>Your answer</label>
            <input id={'in-' + step.title + index} inputMode="decimal" value={value} onChange={e => { setValue(e.target.value); setResult(null); }} placeholder={step.check.unit === '%' ? 'e.g. 36.0' : 'Your answer'} />
            {step.check.unit && <span className="unit">{step.check.unit}</span>}
            <button type="submit">Check</button>
          </form>
        )}
        {result && <p className={'feedback ' + (result.ok ? 'good' : 'bad')} role="status">{result.msg}</p>}
        {hint && step.hint && !revealed && <p className="hint">💡 {step.hint}</p>}
        {revealed && <div className="show">{step.show}</div>}
        {!revealed && (
          <div className="stepactions">
            {step.hint && !hint && <button className="ghost" onClick={() => setHint(true)}>Hint</button>}
            <button className="ghost" onClick={onReveal}>{step.check ? 'Show me' : 'Reveal step'}</button>
          </div>
        )}
      </div>
    </li>
  );
}

export default function Walkthrough({ id, params }) {
  const a = byId(id);
  const [progress, setProgress] = useProgress();
  if (!a) return <div className="empty"><b>Assignment not found</b><p><a href={href('/tutor')}>Back to the tutor</a></p></div>;

  const requested = Number.parseInt(params.get('p'), 10);
  const pi = Number.isInteger(requested) ? Math.min(Math.max(requested, 0), a.problems.length - 1) : 0;
  const problem = a.problems[pi];
  const done = progress[a.id] || {};
  const key = (p, s) => `${p}.${s}`;
  const reveal = s => setProgress(prev => ({ ...prev, [a.id]: { ...(prev[a.id] || {}), [key(pi, s)]: true } }));
  const revealAll = () => setProgress(prev => ({ ...prev, [a.id]: { ...(prev[a.id] || {}), ...Object.fromEntries(problem.steps.map((_, s) => [key(pi, s), true])) } }));
  const reset = () => setProgress(prev => ({ ...prev, [a.id]: {} }));
  // Steps unlock in order: show every revealed step plus the next one.
  const firstOpen = problem.steps.findIndex((_, s) => !done[key(pi, s)]);
  const visible = firstOpen === -1 ? problem.steps.length : firstOpen + 1;
  const total = stepCount(a), finished = Object.keys(done).length;
  const problemDone = p => a.problems[p].steps.every((_, s) => done[key(p, s)]);

  return (
    <article className="walk">
      <a className="back" href={href('/tutor')}>← All assignments</a>
      <div className="eyebrow">CH {a.chapter} · {a.kind.toUpperCase()}</div>
      <h1 className="pagetitle">{a.title}</h1>
      <div className="badges">
        {a.graded && <span className="badge warn">Graded: try each step before revealing</span>}
        <span className={'badge ' + (a.source === 'key' ? 'ok' : 'info')}>{a.source === 'key' ? 'Answers follow the instructor’s posted key' : 'Tutor explanation: no official key posted yet'}</span>
        <span className="badge">{finished}/{total} steps done</span>
      </div>
      <div className="filelinks">
        {a.files.assignment && <a href={viewUrl(a.files.assignment)} target="_blank" rel="noreferrer">📄 Assignment: {fileName(a.files.assignment)}</a>}
        {a.files.key && <a href={viewUrl(a.files.key)} target="_blank" rel="noreferrer">🔑 Answer key: {fileName(a.files.key)}</a>}
        {(a.files.extra || []).map(f => <a key={f} href={viewUrl(f)} target="_blank" rel="noreferrer">📎 {fileName(f)}</a>)}
      </div>

      <section className="goal"><b>What this assignment is for</b><p>{a.goal}</p></section>
      <details className="concepts" open={finished === 0}>
        <summary>Key ideas before you start</summary>
        <dl>{a.concepts.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}</dl>
        {a.recipe && <p className="recipe">{a.recipe}</p>}
      </details>

      <nav className="problemtabs" aria-label="Problems">
        {a.problems.map((p, i) => (
          <a key={i} href={href('/tutor/' + a.id, { p: i })} className={(i === pi ? 'active ' : '') + (problemDone(i) ? 'complete' : '')} aria-current={i === pi ? 'step' : undefined}>
            {problemDone(i) ? '✓ ' : ''}{p.title.split(' — ')[0]}
          </a>
        ))}
      </nav>

      <section className="problem">
        <h2>{problem.title}</h2>
        <p className="prompt">{problem.prompt}</p>
        <ol className="steps">
          {problem.steps.slice(0, visible).map((s, i) => <Step key={pi + '-' + i} step={s} index={i} revealed={!!done[key(pi, i)]} onReveal={() => reveal(i)} />)}
        </ol>
        {firstOpen === -1 && problem.mistakes && (
          <div className="mistakes"><b>Common mistakes</b><ul>{problem.mistakes.map(m => <li key={m}>{m}</li>)}</ul></div>
        )}
        <div className="problemnav">
          {pi > 0 && <a className="ghost" href={href('/tutor/' + a.id, { p: pi - 1 })}>← Previous problem</a>}
          {firstOpen !== -1 && <button className="ghost" onClick={revealAll}>Reveal the whole solution</button>}
          {pi < a.problems.length - 1 ? <a className="primary" href={href('/tutor/' + a.id, { p: pi + 1 })}>Next problem →</a> : firstOpen === -1 && <a className="primary" href={href('/tutor')}>Done, pick another assignment →</a>}
        </div>
      </section>
      {finished > 0 && <button className="linkbtn reset" onClick={reset}>Reset my progress on this assignment</button>}
    </article>
  );
}
