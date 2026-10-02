// Step-by-step walkthroughs for CH 22 and CH 23 assignments.
// Step fields: title, ask (the guiding question), hint, show (the worked step),
// check (optional numeric self-check: { answer, tol, unit }).
// `source` says where the answers come from: the instructor's posted key, or the tutor.

const F22 = '08 CH 22- Descent with Modification, A Darwinian View of Life (/';
const F23 = '09 CH 23- The Evolution of Populations/';

const hwKey = [
  ['p', 'frequency of the DOMINANT allele (A)'],
  ['q', 'frequency of the RECESSIVE allele (a)'],
  ['p²', 'homozygous dominant individuals (AA)'],
  ['2pq', 'heterozygous individuals (Aa) — carriers'],
  ['q²', 'homozygous recessive individuals (aa) — the only genotype you can SEE directly'],
  ['p + q = 1', 'all alleles add to 100%'],
  ['p² + 2pq + q² = 1', 'all individuals add to 100%'],
];

const hwRecipe = 'The recipe almost every problem uses: (1) find q² from the recessive phenotype, (2) q = √q², (3) p = 1 − q, (4) p² and 2pq, (5) check that p² + 2pq + q² = 1.';

export const ch22_23 = [
  {
    id: 'ch22-balls-coins',
    chapter: 22,
    title: 'Introductory Activity: Dichotomous keys (balls & coins)',
    kind: 'In-class activity',
    graded: false,
    source: 'key',
    files: { assignment: F22 + 'INTRODUCTORY ACTIVITY using balls and coins.pdf', key: F22 + 'ANSWER keys for BALL and COINS dichotomous keys.pdf', extra: [F22 + 'STEP by STEP ANSWER KEY for COINS.pptx'] },
    goal: 'Practice the systematics way of thinking: list observable characteristics, then use them to build a dichotomous key that identifies every object with yes/no splits. This skill is on the Exam 1 review sheet (CH 22, item 11).',
    concepts: [
      ['Systematics', 'Classifying things by their characteristics and relationships.'],
      ['Dichotomous key', 'A series of two-choice (A or B) questions. Each choice either names the object or says “go to” the next couplet.'],
      ['Couplet', 'One pair of opposite statements, like 1A “smaller than 2 in.” vs 1B “larger than 2 in.”.'],
      ['Good characters', 'Things you can see or measure without opinion: size, solid vs hollow, smooth vs fuzzy, color vs white.'],
    ],
    problems: [
      {
        title: 'Part 1 — List characteristics of the 9 balls',
        prompt: 'Watch the 9-ball video linked in the handout and list at least 5 characteristics you could use to tell the balls apart.',
        steps: [
          { title: 'Think in opposites', ask: 'For each ball, what could you say “yes or no” about?', hint: 'Size, inside (solid or hollow), surface (smooth or fuzzy), color, squishiness, holes.', show: 'Write each idea as a trait with two states, e.g. “solid vs hollow”. Two-state traits turn directly into couplets later.' },
          { title: 'Compare with the key', ask: 'Did you get at least 5?', hint: 'The key lists 11 — yours don’t need to match exactly.', show: 'Instructor’s list: solid, hollow, bounces, no color (white), has color, smooth, not smooth (fuzzy), less than 2 in. wide, more than 2 in. wide, squishy, firm. Any observable, either/or trait is acceptable.' },
        ],
      },
      {
        title: 'Part 2 — Build the ball key',
        prompt: 'Use your characteristics to build a key that ends with every ball identified.',
        steps: [
          { title: 'Pick the first split', ask: 'Which trait splits the 9 balls into two roughly equal groups?', hint: 'Size works well: 4 small and 5 large.', show: '1A: less than 2 in. wide → balls 5, 6, 7, 8, 9 (go to 2). 1B: more than 2 in. wide → balls 1, 2, 3, 4 (go to 3).' },
          { title: 'Split each group again', ask: 'For the small balls, what separates them?', hint: 'Color vs white.', show: '2A: has color → 6, 8 (go to 4). 2B: white → 5, 7, 9 (go to 5). For the large balls: 3A: solid → 1, 4 (go to 7). 3B: hollow → 2, 3 (go to 8).' },
          { title: 'Keep splitting until each group has one ball', ask: 'When does a couplet end?', hint: 'When only ONE ball is left on that side — write its name instead of “go to”.', show: '4A smooth → orange ping pong ball; 4B not smooth → practice golf ball. 5A has holes → small wiffle ball; 5B no holes → go to 6. 6A solid → golf ball; 6B hollow → ping pong ball. 7A firm → baseball; 7B squishy → therapy ball. 8A fuzzy → tennis ball; 8B not fuzzy → Mardi Gras ball.' },
          { title: 'Check yourself', ask: 'Can you trace every ball to exactly one name?', hint: 'Pick a ball and follow your key from couplet 1.', show: 'For n objects you need n − 1 couplets (9 balls → 8 couplets). If yours has more, a couplet probably doesn’t split anything.' },
        ],
      },
      {
        title: 'Part 3 — Build the coin key',
        prompt: 'Do the same for the coins: penny (C), nickel (N), dime (D), quarter (Q), half dollar (H), gold dollar (S), and two other dollars (B, P).',
        steps: [
          { title: 'First split by color', ask: 'Which coins are not silver?', hint: 'Copper and gold coins.', show: '1a: NOT silver → C, S (go to 2). 1b: silver → N, D, Q, H, B, P (go to 3). 2a: brown → penny (C). 2b: gold → gold dollar (S).' },
          { title: 'Split the silver coins', ask: 'What do B and P share that the others don’t?', hint: 'Look at whose portrait is on the front.', show: '3a: man on front → N, D, Q, H (go to 4). 3b: woman on front → B, P (go to 5). 5a: smaller than a half dollar → B. 5b: larger → P.' },
          { title: 'Finish the men-on-front coins', ask: 'What separates the nickel from D, Q and H?', hint: 'Feel the edge.', show: '4a: ridged edge → D, Q, H (go to 6). 4b: smooth edge → nickel (N). 6a: “Liberty” above the head → D, H (go to 7). 6b: “Liberty” below the head → quarter (Q). 7a: smaller than 1 in. → dime. 7b: larger → half dollar.' },
          { title: 'Main takeaway', ask: 'Is there only one correct key?', show: 'No. The instructor’s note says many keys are correct. A key is correct if it uses observable either/or traits and identifies every object.' },
        ],
      },
    ],
  },

  {
    id: 'ch23-hw-intro',
    chapter: 23,
    title: 'Hardy–Weinberg: simple in-class example (6 students)',
    kind: 'In-class example',
    graded: false,
    source: 'key',
    files: { assignment: F23 + 'simple HW example to work in class STUDENT HANDOUT.pdf', key: F23 + 'simple HW example to work in class ANSWERS.pdf' },
    goal: 'Learn the five-step Hardy–Weinberg recipe on the smallest possible example. Do this one first; every other CH 23 problem uses the same steps.',
    concepts: hwKey,
    recipe: hwRecipe,
    problems: [
      {
        title: '6 students: 2 blue-eyed, 4 brown-eyed (brown is dominant)',
        prompt: 'Find q², q, p, p² and 2pq, then check your answer.',
        steps: [
          { title: 'Which number can you trust?', ask: 'Which phenotype tells you a genotype for certain?', hint: 'A brown-eyed person could be BB or Bb. A blue-eyed person can only be…', show: 'Blue eyes can only be bb, so the blue-eyed fraction IS q². Brown includes two genotypes, so you can’t start there.' },
          { title: 'q²', ask: 'What fraction of the class is blue-eyed?', check: { answer: 0.333, tol: 0.005 }, hint: '2 out of 6.', show: 'q² = 2/6 = 0.333 (33.3%).' },
          { title: 'q', ask: 'Take the square root of q².', check: { answer: 0.575, tol: 0.004 }, hint: '√0.333', show: 'q = √0.333 ≈ 0.574–0.577, depending on how you rounded q² (the key uses 0.574). That means 57.4% of the eye-color alleles in the class are b.' },
          { title: 'p', ask: 'p + q = 1, so p = ?', check: { answer: 0.425, tol: 0.004 }, show: 'p = 1 − 0.574 = 0.426 (42.6% of alleles are B).' },
          { title: 'p² (BB)', ask: 'p × p = ?', check: { answer: 0.181, tol: 0.003 }, show: 'p² = 0.426 × 0.426 = 0.181. So 18.1% are BB (brown).' },
          { title: '2pq (Bb)', ask: '2 × p × q = ?', check: { answer: 0.489, tol: 0.003 }, hint: 'Don’t forget the 2.', show: '2pq = 2 × 0.426 × 0.574 = 0.489. So 48.9% are Bb (brown carriers).' },
          { title: 'Check', ask: 'Does p² + 2pq + q² = 1?', show: '0.181 + 0.489 + 0.333 ≈ 1.00. Solved. Also notice that BB + Bb = 0.181 + 0.489 = 0.67, the same as the 4/6 brown-eyed students.' },
        ],
      },
    ],
  },

  {
    id: 'ch23-hw-practice',
    chapter: 23,
    title: 'Hardy–Weinberg practice problems (#1–#4)',
    kind: 'Homework practice',
    graded: false,
    source: 'key',
    files: { assignment: F23 + 'HW practice problems.pdf', key: F23 + 'HW practice problems ANSWER KEY.pdf' },
    goal: 'The instructor says these are “the types of problems that you should be able to do for EXAM 1 and also for the QUIZ on MOODLE.” Answers are rounded to one decimal place as a percent (0.4768 → 47.7%).',
    concepts: hwKey,
    recipe: hwRecipe,
    problems: [
      {
        title: 'Problem 1 — Eye color in 20 people (6 blue, 14 brown)',
        prompt: 'Brown (A) is dominant and blue (a) is recessive. Find A) the recessive phenotype %, B) the dominant phenotype %, C) the a allele, D) the A allele, E) homozygous brown, F) heterozygous brown.',
        steps: [
          { title: 'A. Recessive phenotype', ask: 'What % have blue eyes?', check: { answer: 30.0, tol: 0.05, unit: '%' }, show: '6/20 = 0.300 = 30.0%.' },
          { title: 'B. Dominant phenotype', ask: 'What % have brown eyes?', check: { answer: 70.0, tol: 0.05, unit: '%' }, show: '14/20 = 70.0%. Check: 30.0 + 70.0 = 100.' },
          { title: 'C. Frequency of a (q)', ask: 'Blue eyes = q². What is q?', check: { answer: 54.8, tol: 0.1, unit: '%' }, hint: '√0.300', show: 'q² = 0.300, so q = √0.300 = 0.5477, which rounds to 54.8%.' },
          { title: 'D. Frequency of A (p)', ask: 'p = 1 − q', check: { answer: 45.2, tol: 0.1, unit: '%' }, show: 'p = 1 − 0.5477 = 0.4523, which rounds to 45.2%.' },
          { title: 'E. Homozygous brown (AA = p²)', ask: 'p × p = ?', check: { answer: 20.5, tol: 0.1, unit: '%' }, hint: 'Use the unrounded p = 0.4523 so the rounding stays accurate.', show: '0.4523 × 0.4523 = 0.2045, which rounds to 20.5%.' },
          { title: 'F. Heterozygous brown (Aa = 2pq)', ask: '2 × p × q = ?', check: { answer: 49.5, tol: 0.1, unit: '%' }, show: '2 × 0.4523 × 0.5477 = 0.4954, which rounds to 49.5%. Check: 20.5 + 49.5 + 30.0 = 100.0.' },
        ],
        mistakes: ['Starting from the 70% brown as if it were p². Brown includes AA AND Aa, so it is p² + 2pq.', 'Rounding p and q too early, which can change your last decimal place.'],
      },
      {
        title: 'Problem 2 — Sickle cell: 9% are born ss',
        prompt: 'What percentage are heterozygous (Ss) and therefore more resistant to malaria?',
        steps: [
          { title: 'q² from the recessive genotype', ask: 'Which value is q²?', show: 'ss = 9% = 0.09 = q².' },
          { title: 'q and p', ask: 'Find q, then p.', check: { answer: 0.3, tol: 0.001 }, hint: 'Enter q.', show: 'q = √0.09 = 0.3, and p = 1 − 0.3 = 0.7.' },
          { title: 'Heterozygotes', ask: '2pq = ?', check: { answer: 42.0, tol: 0.1, unit: '%' }, show: '2 × 0.7 × 0.3 = 0.42 = 42.0%.' },
          { title: 'The biology', ask: 'Why are heterozygotes favored here?', show: 'Ss people have red blood cells that don’t sickle enough to be fatal, and malaria can’t grow well in them. Both homozygotes die more often (SS from malaria, ss from sickle-cell disease). That’s heterozygote advantage, a form of balancing selection that keeps both alleles in the population.' },
        ],
      },
      {
        title: 'Problem 3 — Butterflies: 40% are white (recessive)',
        prompt: 'Find A) the percentage heterozygous and B) the frequency of homozygous dominant.',
        steps: [
          { title: 'q', ask: 'q² = 0.40. What is q?', check: { answer: 0.632, tol: 0.002 }, show: 'q = √0.40 = 0.632.' },
          { title: 'p', ask: 'p = 1 − q', check: { answer: 0.368, tol: 0.002 }, show: 'p = 0.368.' },
          { title: 'A. Heterozygous', ask: '2pq = ?', check: { answer: 46.5, tol: 0.15, unit: '%' }, show: '2 × 0.368 × 0.632 = 0.465 = 46.5%.' },
          { title: 'B. Homozygous dominant', ask: 'p² = ?', check: { answer: 13.5, tol: 0.15, unit: '%' }, show: '0.368² = 0.135 = 13.5%. Check: 13.5 + 46.5 + 40.0 = 100.' },
        ],
      },
      {
        title: 'Problem 4 — 396 red-sided (recessive) and 557 tan-sided',
        prompt: 'Find allele frequencies, genotype frequencies, the number of heterozygotes, phenotype frequencies, and predictions for 1,245 offspring.',
        steps: [
          { title: 'Total first', ask: 'How many individuals are there in total?', check: { answer: 953, tol: 0 }, show: '396 + 557 = 953. You need this because the problem gives counts, not percentages.' },
          { title: 'A. q² and q', ask: 'q² = 396/953. Find q.', check: { answer: 0.645, tol: 0.002 }, show: 'q² = 0.416, so q = 0.645 (red allele 64.5%). p = 1 − 0.645 = 0.355 (tan allele 35.5%).' },
          { title: 'B. Genotypes', ask: 'Find AA (p²) and Aa (2pq).', check: { answer: 0.458, tol: 0.003 }, hint: 'Enter 2pq.', show: 'AA = 0.355² = 0.126 (12.6%). Aa = 2 × 0.355 × 0.645 = 0.458 (45.8%). aa = 0.416 (41.6%).' },
          { title: 'C. Number of heterozygotes', ask: '0.458 × 953 = ?', check: { answer: 436, tol: 2 }, show: 'About 436 heterozygous individuals.' },
          { title: 'D. Phenotype frequencies', ask: 'Tan = AA + Aa', show: 'Tan = 0.126 + 0.458 = 0.584 (58.4%). Red = 0.416 (41.6%). These match the observed 557/953 and 396/953.' },
          { title: 'E. Next generation of 1,245', ask: 'How many red-sided offspring?', check: { answer: 518, tol: 2 }, show: 'If the population is in Hardy–Weinberg equilibrium, frequencies don’t change. Red = 0.416 × 1,245 ≈ 518 and tan = 0.584 × 1,245 ≈ 727.' },
        ],
      },
    ],
  },

  {
    id: 'ch23-quiz',
    chapter: 23,
    title: 'Hardy–Weinberg QUIZ (graded on Moodle)',
    kind: 'Graded quiz',
    graded: true,
    source: 'key',
    files: { assignment: F23 + 'QUIZ Hardy Weinberg problems homework.pdf', key: F23 + 'QUIZ Hardy Weinberg problems homework ANSWERS EMBEDDED.pdf' },
    goal: 'This is graded. Moodle only accepts a percentage with ONE decimal place and no % sign: type 36.0, not 36, 36%, or 0.36. Try each step yourself before revealing it.',
    concepts: hwKey,
    recipe: hwRecipe,
    problems: [
      {
        title: 'Problem 1 — aa is 36% of the population',
        prompt: 'Find A) aa, B) the a allele, C) the A allele, D) AA and Aa, E) both phenotypes.',
        steps: [
          { title: 'A. aa', ask: 'Which value is given?', check: { answer: 36.0, tol: 0.05, unit: '%' }, show: 'aa = q² = 36.0% (given). Moodle answer: 36.0' },
          { title: 'B. a allele (q)', ask: '√0.36 = ?', check: { answer: 60.0, tol: 0.05, unit: '%' }, show: 'q = 0.6, so 60.0.' },
          { title: 'C. A allele (p)', ask: '1 − q = ?', check: { answer: 40.0, tol: 0.05, unit: '%' }, show: 'p = 0.4, so 40.0.' },
          { title: 'D. AA (p²)', ask: '0.4 × 0.4 = ?', check: { answer: 16.0, tol: 0.05, unit: '%' }, show: '0.16, so 16.0.' },
          { title: 'D. Aa (2pq)', ask: '2 × 0.4 × 0.6 = ?', check: { answer: 48.0, tol: 0.05, unit: '%' }, show: '0.48, so 48.0.' },
          { title: 'E. Dominant phenotype', ask: 'Which genotypes show the dominant trait?', check: { answer: 64.0, tol: 0.05, unit: '%' }, hint: 'AA + Aa', show: '16.0 + 48.0 = 64.0. The recessive phenotype is aa = 36.0.' },
        ],
      },
      {
        title: 'Problem 2 — Cystic fibrosis: 1 in 2,500 babies',
        prompt: 'Find A) the recessive allele, B) the dominant allele, C) carriers (heterozygotes).',
        steps: [
          { title: 'Turn “1 in 2,500” into q²', ask: '1 ÷ 2,500 = ?', check: { answer: 0.0004, tol: 0.00001 }, show: 'q² = 0.0004.' },
          { title: 'A. Recessive allele', ask: '√0.0004 = ?', check: { answer: 2.0, tol: 0.05, unit: '%' }, show: 'q = 0.02, so 2.0.' },
          { title: 'B. Dominant allele', ask: '1 − 0.02 = ?', check: { answer: 98.0, tol: 0.05, unit: '%' }, show: 'p = 0.98, so 98.0.' },
          { title: 'C. Carriers', ask: '2pq = ?', check: { answer: 3.9, tol: 0.05, unit: '%' }, show: '2 × 0.98 × 0.02 = 0.0392, so 3.9. That’s about 1 in 25 people.' },
          { title: 'Main takeaway', ask: 'Why does this matter?', show: 'Only 1 in 2,500 people has the disease, but about 1 in 25 carries the allele. Most recessive alleles are “hidden” in heterozygotes.' },
        ],
      },
      {
        title: 'Problem 3 — Blood types with only A and B alleles: 200 A, 50 AB, 50 B',
        prompt: 'Find p (A allele) and q (B allele).',
        steps: [
          { title: 'Why the shortcut doesn’t apply', ask: 'Is there a recessive phenotype here?', show: 'No. A and B are codominant, so every genotype is visible: type A = AA, AB = AB, type B = BB. Count alleles directly instead of using √q².' },
          { title: 'Count A alleles', ask: 'Each AA person has 2 A alleles and each AB person has 1.', check: { answer: 450, tol: 0 }, show: '2 × 200 + 50 = 450 A alleles.' },
          { title: 'Total alleles', ask: 'Each person has 2 alleles.', check: { answer: 600, tol: 0 }, show: '2 × (200 + 50 + 50) = 600.' },
          { title: 'p and q', ask: 'p = 450 / 600', check: { answer: 75.0, tol: 0.05, unit: '%' }, show: 'p = 0.750, so 75.0. q = 1 − 0.750 = 0.250, so 25.0.' },
        ],
      },
    ],
  },

  {
    id: 'ch23-more-hw',
    chapter: 23,
    title: 'MORE Hardy–Weinberg problems (class activity #1–#19)',
    kind: 'Class activity',
    graded: false,
    source: 'key',
    files: { assignment: F23 + 'MORE HW problems CLASS ACTIVITY.pdf', key: F23 + 'MORE HW problems CLASS ACTIVITY ANSWER KEY.pdf' },
    goal: 'These go from easy to hard. The easy ones drill the formula. The hard ones change the starting point: true-breeding, dominant mutations, incomplete dominance, selection, and X-linked genes. Use the hard ones to practice deciding where to start.',
    concepts: hwKey,
    recipe: hwRecipe,
    problems: [
      {
        title: '#1–#3 — Given p or q directly',
        prompt: 'Geese p = 0.25; fish p = 0.65; elephants q = 0.65. Find all three genotypes and both phenotypes.',
        steps: [
          { title: 'Geese: get q', ask: 'q = 1 − 0.25', check: { answer: 0.75, tol: 0.001 }, show: 'q = 0.75.' },
          { title: 'Geese: genotypes', ask: 'Find p², 2pq and q².', check: { answer: 0.375, tol: 0.001 }, hint: 'Enter 2pq.', show: 'AA = 0.0625, Aa = 0.375, aa = 0.5625. Dominant phenotype = 0.0625 + 0.375 = 0.4375 and recessive = 0.5625.' },
          { title: 'Fish (p = 0.65)', ask: 'Find 2pq.', check: { answer: 0.455, tol: 0.001 }, show: 'q = 0.35. AA = 0.4225, Aa = 0.455, aa = 0.1225. Dominant = 0.8775, recessive = 0.1225.' },
          { title: 'Elephants (q = 0.65)', ask: 'Careful: this time you’re given q. Find p².', check: { answer: 0.1225, tol: 0.001 }, show: 'p = 0.35. AA = 0.1225, Aa = 0.455, aa = 0.4225. Notice it’s the fish answer flipped.' },
        ],
      },
      {
        title: '#4 — 300 goats, 12 homozygous recessive',
        prompt: 'Find genotype frequencies and the expected NUMBER of each genotype and phenotype.',
        steps: [
          { title: 'q²', ask: '12/300 = ?', check: { answer: 0.04, tol: 0.001 }, show: 'q² = 0.04, so q = 0.2 and p = 0.8.' },
          { title: 'Frequencies', ask: 'Find 2pq.', check: { answer: 0.32, tol: 0.001 }, show: 'AA = 0.64, Aa = 0.32, aa = 0.04.' },
          { title: 'Numbers', ask: 'Multiply each frequency by 300. How many Aa?', check: { answer: 96, tol: 0 }, show: 'AA = 192, Aa = 96, aa = 12. Dominant phenotype = 192 + 96 = 288 and recessive = 12. Check: 288 + 12 = 300.' },
        ],
      },
      {
        title: '#5 — 86 sea stars, 24 fluorescent pink (recessive)',
        prompt: 'Find frequencies and numbers.',
        steps: [
          { title: 'q', ask: 'q² = 24/86. Find q.', check: { answer: 0.528, tol: 0.002 }, show: 'q² = 0.279, q = 0.528, p = 0.472.' },
          { title: 'Genotype numbers', ask: 'How many heterozygotes? (2pq × 86)', check: { answer: 43, tol: 1 }, show: 'AA = 0.223 × 86 ≈ 19, Aa = 0.498 × 86 ≈ 43, aa = 24. Gray = 62 and pink = 24.' },
        ],
      },
      {
        title: '#6 — 125 canaries, 15 gold (recessive)',
        prompt: 'Find frequencies and numbers.',
        steps: [
          { title: 'q', ask: 'q² = 15/125. Find q.', check: { answer: 0.346, tol: 0.002 }, show: 'q² = 0.12, q = 0.346, p = 0.654.' },
          { title: 'Numbers', ask: 'How many AA? (p² × 125)', check: { answer: 53, tol: 1 }, show: 'p² = 0.427 → 53 AA. 2pq = 0.453 → 57 Aa. q² = 0.12 → 15 aa. Scarlet = 110 and gold = 15. (The key mislabels the last genotype “Aa”; it should be aa.)' },
        ],
      },
      {
        title: '#7 — 68 tanagers, 14 white-capped; 94 chicks',
        prompt: 'How many chicks should have a white cap?',
        steps: [
          { title: 'Recessive frequency', ask: '14/68 = ?', check: { answer: 0.206, tol: 0.002 }, show: 'q² = 0.206.' },
          { title: 'Predict', ask: 'If Hardy–Weinberg holds, q² stays the same next generation. 0.206 × 94 = ?', check: { answer: 19, tol: 1 }, show: 'About 19 white-capped chicks. You don’t need q at all here.' },
        ],
      },
      {
        title: '#8 — 120 orange bills (true-breeding) and 63 brown bills',
        prompt: 'Which phenotype is recessive? Then find p, q, p², 2pq and q².',
        steps: [
          { title: 'Decode “true-breeding”', ask: 'Which birds always produce offspring just like themselves?', hint: 'Only homozygotes breed true. A dominant phenotype can hide a recessive allele.', show: 'Orange breeds true and brown doesn’t, so brown birds include heterozygotes. Brown is dominant and orange is recessive (aa).' },
          { title: 'q²', ask: '120/183 = ?', check: { answer: 0.656, tol: 0.002 }, show: 'q² = 0.656, q = 0.810, p = 0.190.' },
          { title: 'Genotypes', ask: 'Find 2pq.', check: { answer: 0.308, tol: 0.003 }, show: 'p² = 0.036, 2pq = 0.308. Check: 0.036 + 0.308 + 0.656 = 1.0.' },
        ],
      },
      {
        title: '#9 — 3,428 blue petals and 1,853 black (black is true-breeding)',
        prompt: 'Same logic as #8.',
        steps: [
          { title: 'Recessive', ask: 'Which is aa?', show: 'Black breeds true, so black = aa.' },
          { title: 'q²', ask: '1853 / 5281 = ?', check: { answer: 0.351, tol: 0.002 }, show: 'q² = 0.351, q = 0.592, p = 0.408, p² = 0.166, 2pq = 0.483.' },
        ],
      },
      {
        title: '#10 — 342 crows, 102 with green legs (a DOMINANT mutation)',
        prompt: 'Find allele frequencies and expected phenotypes.',
        steps: [
          { title: 'Watch out', ask: 'Are the 102 green-legged birds q²?', show: 'No. The mutation is dominant, so the green birds are AA + Aa. The recessive class is the normal-legged birds: 342 − 102 = 240.' },
          { title: 'q²', ask: '240/342 = ?', check: { answer: 0.702, tol: 0.002 }, show: 'q² = 0.702, q = 0.838, p = 0.162.' },
          { title: 'Check with numbers', ask: '(p² + 2pq) × 342 = ?', check: { answer: 102, tol: 1 }, show: 'p² = 0.026, 2pq = 0.272. Their total of 0.298 × 342 ≈ 102 green birds matches the data.' },
        ],
      },
      {
        title: '#11 — 1,200 seagulls, 867 homozygous DOMINANT',
        prompt: 'This time you start from p².',
        steps: [
          { title: 'p', ask: 'p² = 867/1200. Find p.', check: { answer: 0.85, tol: 0.002 }, show: 'p² = 0.7225, so p = 0.85 and q = 0.15.' },
          { title: 'Rest', ask: 'How many birds show the recessive trait? (q² × 1200)', check: { answer: 26, tol: 1 }, show: 'q² = 0.0225 → about 26-27 birds. 2pq = 0.255. Dominant = 0.978 × 1200 ≈ 1,174.' },
        ],
      },
      {
        title: '#12 — Lab mice, all homozygous: 25 long tails (dominant), 75 short',
        prompt: 'A) p and q. B) The mice escape and breed randomly, producing 400 pups. How many have long tails?',
        steps: [
          { title: 'Why √ doesn’t work here', ask: 'Is this population in Hardy–Weinberg proportions right now?', show: 'No. Every mouse is homozygous (no heterozygotes), so count alleles directly. Each mouse has 2 alleles.' },
          { title: 'A. Count alleles', ask: 'L alleles = 25 × 2. What is p?', check: { answer: 0.25, tol: 0.001 }, show: 'L = 50 and l = 150 out of 200 total, so p = 0.25 and q = 0.75.' },
          { title: 'B. After random mating', ask: 'Random mating restores HW proportions. Long-tailed fraction = p² + 2pq. How many of 400?', check: { answer: 175, tol: 1 }, show: 'p² = 0.0625 and 2pq = 0.375, total 0.4375 × 400 = 175 long. Short = 0.5625 × 400 = 225.' },
        ],
      },
      {
        title: '#13 — Snapdragons: 103 red, 382 pink, 355 white (incomplete dominance)',
        prompt: 'Find the allele frequencies.',
        steps: [
          { title: 'Genotypes are visible', ask: 'What are the genotypes of red, pink and white?', show: 'Red = RR, pink = Rr, white = rr. As in Quiz #3, count alleles.' },
          { title: 'Count R', ask: '2 × 103 + 382 = ?', check: { answer: 588, tol: 0 }, show: '588 R alleles.' },
          { title: 'Count r and total', ask: 'Total alleles = 2 × 840 = 1680. Find p (R).', check: { answer: 0.35, tol: 0.002 }, show: 'r = 2 × 355 + 382 = 1,092. p = 588/1680 = 0.35 and q = 1092/1680 = 0.65.' },
        ],
      },
      {
        title: '#14 — 750 palmetto bugs, 35 albino (recessive) are killed; 15,123 babies',
        prompt: 'How many babies will be albino?',
        steps: [
          { title: 'Before selection', ask: 'q² = 35/750. Find q.', check: { answer: 0.216, tol: 0.003 }, show: 'q² = 0.047, q = 0.216, p = 0.784. Aa = 2pq ≈ 0.34 × 750 ≈ 255 carriers.' },
          { title: 'After killing albinos', ask: 'Who is left?', show: '715 bugs (AA and Aa) = 1,430 alleles. The only a alleles left are the 255 inside carriers.' },
          { title: 'New q', ask: '255 / 1430 = ?', check: { answer: 0.178, tol: 0.003 }, show: 'q drops to 0.178. Selection changed the allele frequency, which is evolution.' },
          { title: 'Babies', ask: 'q² × 15,123 = ?', check: { answer: 479, tol: 6 }, show: '0.0317 × 15,123 ≈ 479 albino babies. The key accepts 474–484 because of rounding.' },
        ],
      },
      {
        title: '#15 — Gerbils with two genes (B/b color, D/d dilution)',
        prompt: 'After adding the new gerbils, find the frequencies of B/b and D/d.',
        steps: [
          { title: 'Decode the phenotypes', ask: 'Which phenotypes are bb? Which are dd?', show: 'Grey = bbdd, black = bbD_, cinnamon = B_dd, brown = B_D_. bb = grey + black. dd = grey + cinnamon.' },
          { title: 'Total', ask: 'Total gerbils = 35+24+22+12 + 5+3+5+3', check: { answer: 109, tol: 0 }, show: '109.' },
          { title: 'A. b allele', ask: 'bb = 35+24+3+5 = 67. q² = 67/109. Find q.', check: { answer: 0.784, tol: 0.003 }, show: 'q² = 0.615, q(b) = 0.784, p(B) = 0.216.' },
          { title: 'B. d allele', ask: 'dd = 35+22+3+3 = 63. Find q.', check: { answer: 0.760, tol: 0.003 }, show: 'q² = 0.578, q(d) = 0.760, p(D) = 0.240. Treat each gene separately.' },
        ],
      },
      {
        title: '#16 — Color blindness (X-linked): 1 in 15 males',
        prompt: 'How many women would you test to find one color-blind woman?',
        steps: [
          { title: 'Males are different', ask: 'Men have one X. What does the male color-blind frequency equal?', show: 'Males have only one copy, so the fraction of color-blind males = q directly (no square root). q = 1/15 = 0.0667.' },
          { title: 'Females need two copies', ask: 'q² = ?', check: { answer: 0.0044, tol: 0.0002 }, show: '0.0667² ≈ 0.0044.' },
          { title: 'Answer', ask: '1 / 0.0044 = ?', check: { answer: 227, tol: 3 }, show: 'About 1 in 227 women, so you’d test about 227 women.' },
        ],
      },
      {
        title: '#17 — Hereford (white face, AA) × Angus (aa)',
        prompt: 'What % of offspring have white faces?',
        steps: [
          { title: 'Punnett square', ask: 'AA × aa gives…?', show: 'Every calf is Aa. White face is dominant, so 100% have white faces. No Hardy–Weinberg needed; it’s a simple cross.' },
        ],
      },
      {
        title: '#19 (challenge, no posted key) — City of Angels ABO blood types',
        prompt: 'Population 10⁶: B = 450,000, O = 360,000, A = 130,000, AB = 60,000. Find the allele frequencies.',
        steps: [
          { title: 'Three alleles', ask: 'How does Hardy–Weinberg extend to three alleles?', show: 'Let p = Iᴬ, q = Iᴮ, r = i. Then (p + q + r)² = 1. O = r², A = p² + 2pr, B = q² + 2qr, AB = 2pq.' },
          { title: 'r from type O', ask: 'O = 0.36 = r². r = ?', check: { answer: 0.6, tol: 0.001 }, show: 'r = 0.6.' },
          { title: 'Trick for p', ask: 'A + O = p² + 2pr + r² = (p + r)². What is p?', check: { answer: 0.1, tol: 0.001 }, hint: '0.13 + 0.36 = 0.49, and √0.49 = 0.7.', show: 'p + r = 0.7, so p = 0.1.' },
          { title: 'q and check', ask: 'q = 1 − p − r', check: { answer: 0.3, tol: 0.001 }, show: 'q = 0.3. Check: B = 0.09 + 2(0.3)(0.6) = 0.45 ✓, AB = 2(0.1)(0.3) = 0.06 ✓. (Tutor-worked answer; there is no instructor key for this one.)' },
        ],
      },
    ],
  },
];
