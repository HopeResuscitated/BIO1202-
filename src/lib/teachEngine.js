// Deterministic "Teach me this chapter" engine.
// Assembles the lesson view-model from src/data/teach.js, tracks per-concept
// understanding, and gives plain-language feedback on a student's teach-back.
// No API key is required — this always works.

import { CHAPTER_LESSONS, getLesson } from '../data/teach.js';
import { getChapter } from '../data/curriculum.js';
import { normalize } from './tutorEngine.js';

// Merge authored lesson content with curriculum metadata (numbers, aliases).
export function buildLesson(chapterId) {
  const lesson = getLesson(chapterId);
  if (!lesson) return null;
  const chapter = getChapter(chapterId);
  return {
    ...lesson,
    num: lesson.num ?? chapter?.num,
    title: lesson.title || chapter?.title,
    subtitle: lesson.subtitle || chapter?.subtitle,
    conceptCount: lesson.concepts.length,
  };
}

export function teachProgress(state, chapterId) {
  const lesson = getLesson(chapterId);
  const total = lesson ? lesson.concepts.length : 0;
  const record = state.teach?.[chapterId] || {};
  const concepts = record.concepts || {};
  const understood = lesson ? lesson.concepts.filter((c) => concepts[c.id]).length : 0;
  const teachbackDone = !!(record.teachback && record.teachback.trim().length >= 20);
  return {
    total,
    understood,
    pct: total ? Math.round((understood / total) * 100) : 0,
    teachbackDone,
    mastered: total > 0 && understood === total,
  };
}

// Overall progress across every chapter (used by the picker + dashboard).
export function overallTeachProgress(state) {
  const ids = Object.keys(CHAPTER_LESSONS);
  let total = 0;
  let understood = 0;
  let chaptersMastered = 0;
  ids.forEach((id) => {
    const p = teachProgress(state, id);
    total += p.total;
    understood += p.understood;
    if (p.mastered) chaptersMastered += 1;
  });
  return { total, understood, chapters: ids.length, chaptersMastered, pct: total ? Math.round((understood / total) * 100) : 0 };
}

// Build a self-check quiz: one question per concept, in chapter order.
export function buildQuiz(chapterId) {
  const lesson = getLesson(chapterId);
  if (!lesson) return [];
  return lesson.concepts
    .filter((c) => c.check && c.check.q)
    .map((c) => ({ conceptId: c.id, label: c.label, q: c.check.q, a: c.check.a }));
}

// Deterministic feedback on a "teach it back" answer: which key ideas the
// student named, and which are still missing. Mirrors the tutor's coverage idea.
export function teachBackFeedback(chapterId, text) {
  const lesson = getLesson(chapterId);
  if (!lesson) return { covered: [], missing: [], summary: '' };
  const normalized = normalize(text);
  const perConcept = lesson.concepts.map((c) => {
    const needles = [c.label, ...(c.vocabulary || []).map((v) => v.term)]
      .map(normalize)
      .filter((n) => n.length >= 4);
    const covered = needles.some((n) => normalized.includes(n));
    return { id: c.id, label: c.label, covered };
  });
  const covered = perConcept.filter((c) => c.covered);
  const missing = perConcept.filter((c) => !c.covered);
  const enough = normalized.length >= 60 && covered.length >= Math.max(1, Math.ceil(lesson.concepts.length * 0.4));
  const summary = enough
    ? missing.length
      ? 'Strong teach-back — you named most of the big ideas. Add the missing ones and it is airtight.'
      : 'Excellent. You named every major idea in this chapter in your own words.'
    : 'Good start — write a few more sentences and try to name the key terms below in plain language.';
  return { covered, missing, summary, enough };
}

// A short, deterministic "walk me through it" narration for a single concept,
// used by the lesson's optional streamed explanation.
export function conceptNarration(chapterId, conceptId) {
  const lesson = getLesson(chapterId);
  const concept = lesson?.concepts.find((c) => c.id === conceptId);
  if (!concept) return '';
  return [
    `**${concept.label}**`,
    concept.plain,
    `**Definition.** ${concept.definition}`,
    concept.analogy ? `**Think of it like this.** ${concept.analogy}` : '',
    concept.example ? `**Example.** ${concept.example}` : '',
  ]
    .filter(Boolean)
    .join('\n\n');
}
