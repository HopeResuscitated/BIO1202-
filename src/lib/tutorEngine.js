// Deterministic tutor engine — mirrors the reference app's "checked practice":
// concept-coverage scoring, a 3-step Socratic hint ladder, mastery state, and
// spaced-review scheduling. Works with no API key. The LLM route is an optional
// upgrade layered on top (see src/lib/aiClient.js).

import { ALL_CONCEPTS } from '../data/curriculum.js';

export const REVIEW_INTERVALS = [1, 3, 7]; // days

export function normalize(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[\u00b2]/g, '2')
    .replace(/[\u00b3]/g, '3')
    .replace(/\u2013|\u2014/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
}

function conceptFor(chapterId, conceptId) {
  const map = ALL_CONCEPTS[chapterId];
  return (map && map[conceptId]) || { id: conceptId, label: conceptId, aliases: [conceptId] };
}

export function conceptCovered(chapterId, conceptId, normalizedAnswer) {
  const concept = conceptFor(chapterId, conceptId);
  const needles = [concept.label, ...(concept.aliases || [])].map(normalize).filter(Boolean);
  return needles.some((n) => n.length >= 3 && normalizedAnswer.includes(n));
}

// Score an answer against a section's concepts.
export function evaluateAnswer(section, chapterId, answer) {
  const normalized = normalize(answer);
  const conceptIds = section.concepts || [];
  const perConcept = conceptIds.map((id) => {
    const c = conceptFor(chapterId, id);
    return { id, label: c.label, covered: conceptCovered(chapterId, id, normalized) };
  });
  const covered = perConcept.filter((c) => c.covered).map((c) => c.id);
  const missed = perConcept.filter((c) => !c.covered).map((c) => c.id);
  const needed = Math.max(1, Math.ceil(conceptIds.length * 0.6));
  const passed = covered.length >= needed && normalized.length >= 12;
  const summary = passed
    ? covered.length === conceptIds.length
      ? 'Every concept is there. Nicely reasoned.'
      : 'You covered the core ideas. A couple of details are still thin.'
    : 'Not there yet — the gaps below are what the grader will look for.';
  return { covered, missed, passed, needed, summary, perConcept, normalizedLength: normalized.length };
}

// Progressive hint ladder. Returns the next hint and the total count.
export function hintLadder(section, usedCount = 0) {
  const hints = section.hints || [];
  const index = Math.min(usedCount, Math.max(0, hints.length - 1));
  return {
    hint: hints[index] || 'Re-read the prompt and name the biology idea it is testing.',
    index,
    total: hints.length,
    exhausted: usedCount >= hints.length - 1,
  };
}

export function nextReview(stage = 0) {
  const days = REVIEW_INTERVALS[Math.min(stage, REVIEW_INTERVALS.length - 1)];
  const due = new Date(Date.now() + days * 86400000);
  return { stage: stage + 1, dueAt: due.toISOString(), days };
}

export function isReviewDue(sectionState) {
  if (!sectionState || !sectionState.reviewDueAt) return false;
  return new Date(sectionState.reviewDueAt).getTime() <= Date.now();
}

export function masteryLabel(sectionState) {
  if (!sectionState || !sectionState.status) return 'Not started';
  if (sectionState.status === 'mastered') return 'Mastered';
  if (sectionState.status === 'practicing') return 'Practicing';
  return 'Not started';
}

// ---- Deterministic Socratic chat (used when the LLM route is unavailable) ----

function pickConceptLabels(section, chapterId, ids) {
  return (ids || []).map((id) => conceptFor(chapterId, id).label);
}

export function localTutorReply({ assignment, section, chapterId, message, history = [], revealCount = 0, mode = 'chat' }) {
  const conceptIds = section?.concepts || [];
  const labels = pickConceptLabels(section, chapterId, conceptIds);
  const text = normalize(message);
  const asksForAnswer = /(just tell me|give me the answer|what.s the answer|tell me the answer|answer it for me)/.test(text);
  const effectiveReveal = revealCount + (asksForAnswer ? 1 : 0);

  if (mode === 'explain-mistake') {
    const missed = history?.missed?.length ? history.missed : conceptIds;
    const missedLabels = pickConceptLabels(section, chapterId, missed);
    return [
      `Let's diagnose it. The check flagged these as missing: ${missedLabels.join(', ')}.`,
      `Work through them one at a time — for **${missedLabels[0]}**, what does the term actually mean in your own words?`,
      'Once you can define it, connect it back to the prompt. I will not hand you the finished answer, but I will confirm each piece as you get it.',
    ].join('\n\n');
  }

  if (effectiveReveal >= 2) {
    const concept = conceptFor(chapterId, conceptIds[0]);
    return [
      `Okay — since you've asked twice, here is the model reasoning, not a copy-paste answer.`,
      `The prompt is testing: ${labels.join(', ')}.`,
      `A complete response would (1) name each idea, (2) define it in one sentence, and (3) apply it to the specific scenario in the prompt. For example, start from **${concept.label}** and build outward.`,
      `Now say it back in your own words — that's the part that actually earns the mark.`,
    ].join('\n\n');
  }

  if (asksForAnswer) {
    return [
      `I can get you there, but I won't just hand it over — that's not what makes it stick.`,
      `Try this first: in one sentence, what is **${labels[0] || 'the core idea'}**?`,
      `Answer that and I'll fill the next gap. (Ask again if you're truly stuck and I'll walk the full reasoning.)`,
    ].join('\n\n');
  }

  // Default Socratic lead: a guiding question + a nudge, never the finished answer.
  return [
    `Good question. Before I answer, let's locate what you already know.`,
    `The prompt is really about **${labels[0] || 'the concept'}**. ${section?.prompt ? `Re-read it: "${section.prompt}"` : ''}`,
    `So — what's your current one-sentence definition of ${labels[0] || 'that idea'}? Give me that and I'll point at the gap.`,
  ].join('\n\n');
}
