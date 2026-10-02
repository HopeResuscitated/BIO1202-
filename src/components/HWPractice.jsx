import { useState } from 'react';
import { checkNumber, href } from '../lib.js';

const ORGS = [
  ['moths', 'dark wings', 'pale wings'], ['frogs', 'green skin', 'blue skin'], ['beetles', 'black shells', 'red shells'],
  ['rabbits', 'brown fur', 'white fur'], ['snails', 'striped shells', 'plain shells'], ['lizards', 'long tails', 'short tails'],
];
const r1 = x => Math.round(x * 1000) / 10; // fraction -> % with one decimal

function makeProblem() {
  const [org, dom, rec] = ORGS[Math.floor(Math.random() * ORGS.length)];
  const total = 100 + Math.floor(Math.random() * 900);
  const recN = Math.max(5, Math.floor(total * (0.04 + Math.random() * 0.5)));
  const q2 = recN / total, q = Math.sqrt(q2), p = 1 - q;
  return {
    text: `A population of ${total} ${org} has ${recN} individuals with ${rec} (recessive) and ${total - recN} with ${dom} (dominant). Give each answer as a percentage with one decimal place, like Moodle expects.`,
    steps: [
      { title: 'q² (recessive phenotype)', ask: `What % of the ${org} have ${rec}?`, answer: r1(q2), show: `${recN} ÷ ${total} = ${q2.toFixed(4)} → ${r1(q2)}%` },
      { title: 'q (recessive allele)', ask: 'Take the square root of q² (as a decimal), then convert to %.', answer: r1(q), show: `√${q2.toFixed(4)} = ${q.toFixed(4)} → ${r1(q)}%` },
      { title: 'p (dominant allele)', ask: 'p = 1 − q', answer: r1(p), show: `1 − ${q.toFixed(4)} = ${p.toFixed(4)} → ${r1(p)}%` },
      { title: 'p² (homozygous dominant)', ask: 'p × p', answer: r1(p * p), show: `${p.toFixed(4)}² = ${(p * p).toFixed(4)} → ${r1(p * p)}%` },
      { title: '2pq (heterozygous carriers)', ask: '2 × p × q', answer: r1(2 * p * q), show: `2 × ${p.toFixed(4)} × ${q.toFixed(4)} = ${(2 * p * q).toFixed(4)} → ${r1(2 * p * q)}%` },
      { title: 'Number of carriers', ask: `How many of the ${total} ${org} are heterozygous? (Round to a whole number.)`, answer: Math.round(2 * p * q * total), tol: 1, unit: '', show: `${(2 * p * q).toFixed(4)} × ${total} ≈ ${Math.round(2 * p * q * total)}` },
    ],
  };
}

function Row({ s, i }) {
  const [v, setV] = useState(''), [res, setRes] = useState(null), [shown, setShown] = useState(false);
  const unit = s.unit ?? '%';
  return (
    <li className={'step' + (shown || res?.ok ? ' done' : '')}>
      <div className="stepnum">{shown || res?.ok ? '✓' : i + 1}</div>
      <div className="stepbody">
        <h4>{s.title}</h4><p className="ask">{s.ask}</p>
        <form className="checkrow" onSubmit={e => { e.preventDefault(); setRes(checkNumber(v, { answer: s.answer, tol: s.tol ?? 0.1, unit })); }}>
          <input inputMode="decimal" value={v} onChange={e => { setV(e.target.value); setRes(null); }} placeholder="Your answer" aria-label={s.title} />
          {unit && <span className="unit">{unit}</span>}<button type="submit">Check</button>
        </form>
        {res && <p className={'feedback ' + (res.ok ? 'good' : 'bad')} role="status">{res.msg}</p>}
        {(shown || res?.ok) ? <div className="show">{s.show}</div> : <div className="stepactions"><button className="ghost" onClick={() => setShown(true)}>Show me</button></div>}
      </div>
    </li>
  );
}

export default function HWPractice() {
  const [prob, setProb] = useState(makeProblem);
  const [n, setN] = useState(0);
  return (
    <>
      <a className="back" href={href('/tutor')}>← All assignments</a>
      <div className="eyebrow">— CH 23 PRACTICE GENERATOR</div>
      <h1 className="pagetitle">Hardy–Weinberg drills</h1>
      <p className="intro">Every click makes a brand-new problem. Do all six steps without peeking. Once that feels easy, you’re ready for the Moodle quiz and the Exam 1 HW question.</p>
      <section className="problem">
        <p className="prompt">{prob.text}</p>
        <ol className="steps" key={n}>{prob.steps.map((s, i) => <Row key={i} s={s} i={i} />)}</ol>
        <div className="problemnav"><button className="primary" onClick={() => { setProb(makeProblem()); setN(n + 1); }}>New problem →</button></div>
      </section>
    </>
  );
}
