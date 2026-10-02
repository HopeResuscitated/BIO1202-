const common = {
  understand: {
    id: 'understand',
    title: 'Understand the assignment',
    detail: 'Before solving anything, identify what the instructor is asking you to produce and what concept the assignment is testing.',
    task: 'In your own words, what are you being asked to do?',
    kind: 'concept',
  },
  setup: {
    id: 'setup',
    title: 'Set up the problem',
    detail: 'Identify the information you were given, the unknown you need to find, and the biology concept or relationship you will use.',
    task: 'List the given information, the unknown, and the rule or concept you will use.',
    kind: 'concept',
  },
  attempt: {
    id: 'attempt',
    title: 'Work the first problem',
    detail: 'Make your own attempt before looking at an answer key. Show the reasoning, not just the final answer.',
    task: 'Work the first problem in your own words and show your reasoning.',
    kind: 'concept',
  },
  check: {
    id: 'check',
    title: 'Check your reasoning',
    detail: 'A correct answer is not enough. Explain why the method you used fits the biology question.',
    task: 'Why does your method or answer make biological sense?',
    kind: 'concept',
  },
  verify: {
    id: 'verify',
    title: 'Verify your work',
    detail: 'Only after you have attempted the work, compare it with the instructor-provided answer key when one exists. Look for reasoning differences, not just different numbers.',
    task: 'What did you verify, and what—if anything—did you change?',
    kind: 'concept',
  },
  teach: {
    id: 'teach',
    title: 'Teach it back',
    detail: 'Explain the main concept without looking back at the assignment. This is the final understanding check.',
    task: 'Teach this concept to a classmate in 2–4 sentences.',
    kind: 'concept',
  },
};

const chapterConcepts = {
  ch22: ['variation', 'natural selection', 'differential reproduction', 'adaptation'],
  ch23: ['allele frequency', 'population', 'p', 'q', 'hardy-weinberg', 'p²', '2pq', 'q²'],
  ch24: ['speciation', 'reproductive isolation', 'gene flow', 'allopatric', 'sympatric'],
  ch25: ['geologic time', 'mass extinction', 'adaptive radiation', 'fossil', 'macroevolution'],
  ch26: ['phylogeny', 'common ancestor', 'monophyletic', 'sister taxon', 'synapomorphy'],
  ch27: ['bacteria', 'archaea', 'prokaryote', 'horizontal gene transfer', 'peptidoglycan'],
  ch28: ['protist', 'eukaryote', 'endosymbiosis', 'algae', 'heterotroph', 'autotroph'],
};

function conceptsFor(file) {
  const c = String(file.category || '');
  if (c.includes('CH 22')) return chapterConcepts.ch22;
  if (c.includes('CH 23')) return chapterConcepts.ch23;
  if (c.includes('CH 24')) return chapterConcepts.ch24;
  if (c.includes('CH 25')) return chapterConcepts.ch25;
  if (c.includes('CH 26')) return chapterConcepts.ch26;
  if (c.includes('CH 27')) return chapterConcepts.ch27;
  if (c.includes('CH 28')) return chapterConcepts.ch28;
  return [];
}

function cloneStep(step, concepts) {
  return {
    ...step,
    requiredAny: concepts.slice(0, 4),
    hints: [
      'Name the biology idea the assignment is testing before you try to solve it.',
      'Use the chapter outline or student handout and define the key terms in your own words.',
      'Show the relationship between the information you were given and the conclusion you are trying to reach.',
    ],
  };
}

export function buildTutorGuide(file) {
  const title = file.title || file.filename;
  const lower = title.toLowerCase();
  const concepts = conceptsFor(file);
  let special = [];

  if (lower.includes('hardy weinberg') || lower.includes('practice problems') || lower.includes('simple hw')) {
    special = [
      cloneStep({
        id: 'identify-values',
        title: 'Identify p and q',
        detail: 'For Hardy-Weinberg problems, determine whether the problem gives an allele frequency, genotype frequency, or phenotype frequency before calculating anything.',
        task: 'State what p and q represent in this problem and identify which value you know first.',
        kind: 'concept',
      }, ['p', 'q', 'allele frequency']),
      cloneStep({
        id: 'equation',
        title: 'Choose the equation',
        detail: 'Use p + q = 1 for allele frequencies and p² + 2pq + q² = 1 for genotype frequencies. Do not substitute phenotype percentages directly unless dominance is clear.',
        task: 'Write the equation you will use and explain why it fits this problem.',
        kind: 'concept',
      }, ['p + q', 'p²', '2pq', 'q²']),
    ];
  } else if (lower.includes('systematics') || lower.includes('cladogram') || lower.includes('reindeer') || lower.includes('tree building')) {
    special = [
      cloneStep({
        id: 'read-tree',
        title: 'Read the cladogram',
        detail: 'Start at the branch points. Determine which taxa share the most recent common ancestor instead of comparing how close labels look on the page.',
        task: 'Identify one sister pair or most-recent common ancestor and explain how you know.',
        kind: 'concept',
      }, ['common ancestor', 'sister']),
      cloneStep({
        id: 'character',
        title: 'Use shared derived characters',
        detail: 'A synapomorphy is a shared derived character that supports a clade. Use character states, not overall appearance, to justify a relationship.',
        task: 'Name a shared derived character or explain how one would support a clade.',
        kind: 'concept',
      }, ['synapomorphy', 'derived']),
    ];
  } else if (lower.includes('activity') || lower.includes('exercise') || lower.includes('review')) {
    special = [
      cloneStep({
        id: 'predict',
        title: 'Predict before checking',
        detail: 'Before opening an answer key, predict what the biology should show based on the chapter concept.',
        task: 'Make a prediction and state the biology idea that supports it.',
        kind: 'concept',
      }, concepts),
    ];
  }

  const ordered = special.concat([common.understand, common.setup, common.attempt, common.check, common.verify, common.teach]);
  const seen = new Set();
  return {
    id: file.path,
    title,
    steps: ordered.filter(step => {
      if (seen.has(step.id)) return false;
      seen.add(step.id);
      return true;
    }),
    concepts,
  };
}

export function initialProgress() {
  return { stepIndex: 0, status: {}, answers: {}, feedback: {}, hints: {}, complete: false };
}
