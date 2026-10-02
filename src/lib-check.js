// Numeric answer checking: accepts "36", "36.0", "36%", "0.36" (when a % is expected), "1,024".
export function checkNumber(input, { answer, tol, unit }) {
  const raw = String(input).replace(/,/g, '').replace('%', '').trim();
  if (raw === '' || Number.isNaN(Number(raw))) return { ok: false, msg: 'Enter a number.' };
  const v = Number(raw);
  // tol given -> use it exactly (tol: 0 means an exact count); no tol -> allow 0.2% rounding slack.
  const slack = tol ?? Math.abs(answer) * 0.002;
  if (Math.abs(v - answer) <= slack) return { ok: true, msg: 'Correct!' };
  if (unit === '%' && Math.abs(v * 100 - answer) <= slack) return { ok: false, msg: 'Right value, wrong format: give it as a percentage (multiply by 100).' };
  if (unit !== '%' && Math.abs(v / 100 - answer) <= slack) return { ok: false, msg: 'Right value, but as a decimal (divide by 100).' };
  return { ok: false, msg: 'Not quite. Try the hint, or reveal the step.' };
}
