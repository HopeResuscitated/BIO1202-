// Sanity checks for the tutor content. Run with: npm run check
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { assignments } from '../src/tutor/index.js';
import { checkNumber } from '../src/lib-check.js';
import { summary } from '../src/tutor/summary.js';

const bank = JSON.parse(readFileSync(new URL('../src/tutor/exam1-review.json', import.meta.url)));
const root = fileURLToPath(new URL('..', import.meta.url));
const errors = [];
const ids = new Set();
for (const a of assignments) {
  if (ids.has(a.id)) errors.push(`duplicate id ${a.id}`);
  ids.add(a.id);
  for (const f of [a.files.assignment, a.files.key, ...(a.files.extra || [])].filter(Boolean))
    if (!existsSync(root + f)) errors.push(`${a.id}: missing file ${f}`);
  a.problems.forEach((p, pi) => p.steps.forEach((s, si) => {
    const at = `${a.id} problem ${pi + 1} step ${si + 1}`;
    if (!s.title || !s.ask || !s.show) errors.push(`${at}: needs title, ask and show`);
    if (s.check && !checkNumber(String(s.check.answer), s.check).ok) errors.push(`${at}: its own answer fails the check`);
  }));
}
for (const q of bank) {
  if (!q.options[q.answer]) errors.push(`review ${q.id}: answer ${q.answer} not among options`);
  if (!q.why) errors.push(`review ${q.id}: missing explanation`);
}
const byChapter = {};
for (const a of assignments) byChapter[a.chapter] = (byChapter[a.chapter] || 0) + 1;
if (summary.walkthroughs !== assignments.length || summary.practiceQuestions !== bank.length || JSON.stringify(summary.byChapter) !== JSON.stringify(byChapter))
  errors.push(`src/tutor/summary.js is out of date: expected ${JSON.stringify({ walkthroughs: assignments.length, byChapter, practiceQuestions: bank.length })}`);
const fileMap = Object.fromEntries(assignments.flatMap(a => [a.files.assignment, a.files.key, ...(a.files.extra || [])].filter(Boolean).map(f => [f, a.id])));
if (JSON.stringify(summary.fileToWalkthrough) !== JSON.stringify(fileMap)) errors.push('src/tutor/summary.js fileToWalkthrough is out of date');
const steps = assignments.reduce((n, a) => n + a.problems.reduce((m, p) => m + p.steps.length, 0), 0);
console.log(`${assignments.length} walkthroughs, ${steps} steps, ${bank.length} review questions`);
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log('All content checks passed.');
