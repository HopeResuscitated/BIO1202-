// Step-by-step walkthroughs for CH 25–28 assignments.
// source: 'key' = answers follow the instructor's posted key.
//         'tutor' = no key posted yet; explanations written from the Campbell Biology chapter content.

const F25 = '11 CH 25- The History of Life on Earth/';
const F26 = '13 CH 26- Phylogeny and the Tree of Life/';
const F27 = '14 CH 27- Bacteria and Archaea/';
const F28 = '15 CH 28- Protists/';

const cladeConcepts = [
  ['Outgroup', 'The species that branched off first. Its traits show the ANCESTRAL state, the starting point for every other branch.'],
  ['Shared derived character', 'A change from the outgroup’s state that a group of species has in common. These are the only traits that define branches.'],
  ['Mark on a branch', 'Where a trait changed. Every species above that mark has the change. Use “+” if the trait appeared and “−” if it was lost.'],
  ['Recipe', '1) Read the outgroup’s traits. 2) For each trait, list who DIFFERS from the outgroup. 3) The change shared by the most species goes lowest on the tree. 4) Work upward to the change shared by the fewest.'],
];

export const ch25_28 = [
  {
    id: 'ch25-activity',
    chapter: 25,
    title: 'Activity CH 25: Origin of life & dating fossils',
    kind: 'Class activity',
    graded: false,
    source: 'key',
    files: { assignment: F25 + 'ACTIVITY CH 25 questions.pdf', key: F25 + 'ACTIVITY CH 25 questions ANSWERS.pdf' },
    goal: 'Part 25.1 links early-Earth conditions to the origin of life. Part 25.2 is half-life math, which is on the Exam 1 review sheet (CH 25, item 5c).',
    concepts: [
      ['Reducing atmosphere', 'An early atmosphere with little or no free O₂, rich in gases like CH₄, NH₃ and H₂ that give up electrons easily.'],
      ['Miller–Urey experiment', 'Sparks through early-Earth gases produced amino acids, showing that organic molecules can form without life.'],
      ['Half-life', 'The time for HALF of a radioactive isotope to decay into its stable daughter product. After n half-lives, (½)ⁿ of the parent is left.'],
      ['K–Ar vs C-14', 'Potassium-argon (half-life 1.25 billion years) dates volcanic rock. Carbon-14 (half-life about 5,730 years) dates once-living material up to about 50,000 years old.'],
    ],
    problems: [
      {
        title: '25.1 Q1–Q2 — Early Earth: no oxygen, and its energy sources',
        prompt: 'Why do we think the early atmosphere had no oxygen? What energy sources existed?',
        steps: [
          { title: 'Evidence: rocks', ask: 'What happens to iron when oxygen is around?', hint: 'Think rust.', show: 'Rocks older than about 2.7 billion years have little oxidized iron (rust). Once oxygenic photosynthesis evolved, O₂ first reacted with iron in the oceans (iron oxides settled out as banded layers). Only after that did O₂ build up in the air.' },
          { title: 'Energy sources', ask: 'With no life yet, what could power chemical reactions?', show: 'Lightning (electrical discharge), volcanic and geothermal heat, and UV sunlight. There was no ozone layer yet to block UV.' },
        ],
      },
      {
        title: '25.1 Q3a–d — Stanley Miller’s experiment',
        prompt: 'Design, controls, results, and what it implies.',
        steps: [
          { title: 'a. Design', ask: 'What went into the flask?', show: 'A sealed, sterile system with water plus the gases thought to be in the early atmosphere (methane, ammonia, hydrogen). Heated water made steam, electrodes sparked it like lightning, a condenser cooled it, and the liquid recirculated.' },
          { title: 'b. Controls', ask: 'How do you show the molecules weren’t contamination?', show: 'Sterilize everything and pump out the air first. Run an identical setup with NO energy source. Later runs varied which gases were present to see what each one was needed for.' },
          { title: 'c. Results', ask: 'What formed?', show: 'Within about a week, organic molecules including amino acids. Later runs also made sugars, nucleotide bases and more.' },
          { title: 'd. Meaning', ask: 'So what?', show: 'Life’s building blocks can form on their own in a reducing, oxygen-free atmosphere. Abiotic synthesis is plausible, which is the first step toward life.' },
        ],
      },
      {
        title: '25.1 Q3e–f — Ocean first, then land; the oxygen revolution',
        prompt: 'Why did life start in water, and what did rising O₂ do to existing organisms?',
        steps: [
          { title: 'e. Water first', ask: 'What was missing that made land dangerous?', show: 'No O₂ meant no ozone layer, so strong UV light reached the surface and damaged DNA. Water shielded cells. Land life became possible only once O₂ (roughly 10%) and an ozone layer built up.' },
          { title: 'f. Oxygen as a poison', ask: 'Why would O₂ harm early cells?', show: 'O₂ is a strong oxidizer. Most anaerobic prokaryotes had no defenses (like antioxidant enzymes), so many died. Survivors lived in O₂-free places or carried mutations that protected them.' },
        ],
      },
      {
        title: '25.2 Q1 — Potassium-40 → Argon-40 (half-life 1.25 billion years)',
        prompt: 'A new rock has 100 units of ⁴⁰K.',
        steps: [
          { title: 'Why no argon at the start', ask: 'Why does a newly formed rock contain no ⁴⁰Ar?', show: 'Argon is a gas that escapes while rock is molten. Any ⁴⁰Ar you measure later came from ⁴⁰K decaying inside the solid rock.' },
          { title: 'a. After 1.25 billion years', ask: 'How much ⁴⁰K is left after ONE half-life?', check: { answer: 50, tol: 0 }, show: '50 units.' },
          { title: 'b. Argon', ask: '⁴⁰Ar at 0 years vs at 1.25 billion years?', check: { answer: 50, tol: 0 }, show: '0 units when formed and 50 units after one half-life, because every decayed K atom becomes an Ar atom.' },
          { title: 'c. Ratio after 1.25 billion years', ask: 'K : Ar = ?', show: '50 : 50 = 1 : 1.' },
          { title: 'd. After 2.5 billion years (2 half-lives)', ask: 'How much K is left?', check: { answer: 25, tol: 0 }, show: '¼ of the original = 25 K and 75 Ar, so the ratio is 1 : 3.' },
        ],
        mistakes: ['Thinking the decay is linear. It halves each time: 100 → 50 → 25 → 12.5, not 100 → 50 → 0.'],
      },
      {
        title: '25.2 Q2 — A trilobite fossil dated at 275 million years',
        prompt: 'How many ⁴⁰K half-lives have passed, and what’s the K : Ar ratio?',
        steps: [
          { title: 'a. Count half-lives', ask: '275 million ÷ 1.25 billion = ?', check: { answer: 0.22, tol: 0.005 }, hint: 'Use the same units: 0.275 billion ÷ 1.25 billion.', show: 'About 0.22 half-lives.' },
          { title: 'b. The key’s method', ask: 'The key rounds to 0.2 half-lives and decays 0.2 × ½ = 0.1 of the K.', show: 'Key answer: about 1/10 of the K became Ar, so the K : Ar ratio is about 9 : 1. Use this on assignments graded by this key.' },
          { title: 'Going deeper (optional)', ask: 'What does the exact formula give?', show: 'Fraction of K left = (½)^0.22 ≈ 0.86, so about 14% decayed and K : Ar ≈ 6 : 1. The key’s straight-line shortcut slightly underestimates decay over part of a half-life. Both show that very little K has decayed in 275 million years.' },
        ],
      },
      {
        title: '25.2 Q3 — Dating cloth from an archaeological dig',
        prompt: 'Which method, and how much carbon-14 is left after 2,000 years?',
        steps: [
          { title: 'a. Method', ask: 'Cloth is organic and young. Which isotope?', show: 'Carbon-14. Living things keep the same ¹⁴C:¹²C ratio as the air. After death no new carbon comes in and ¹⁴C decays, so the ratio drops at a known rate.' },
          { title: 'b. The key’s method', ask: '2,000 ÷ 5,730 ≈ ?', check: { answer: 0.35, tol: 0.03 }, show: 'The key writes 5,370, but the half-life of C-14 is 5,730 years. The key gets about 0.37 of a half-life, multiplies by ½, and concludes about 19% decayed, leaving about 81% of normal ¹⁴C.' },
          { title: 'Going deeper (optional)', ask: 'Exact value?', show: '(½)^(2000/5730) ≈ 0.785, so about 78% of the ¹⁴C remains. Either way: most of it is still there after 2,000 years.' },
        ],
      },
    ],
  },

  {
    id: 'ch26-systematics',
    chapter: 26,
    title: 'CH 26 Systematics exercise (graded on Moodle)',
    kind: 'Graded Moodle exercise',
    graded: true,
    source: 'key',
    files: { assignment: F26 + 'Ch 26 Systematics MOODLE exercise.pdf', key: F26 + 'CH 26 Systematics MOODLE exercise ANSWERS.pdf' },
    goal: 'Phyletic groupings, Linnaean ranks, and building a cladogram from a trait table. Answers are entered in Moodle. Work each step before you reveal it.',
    concepts: [
      ['Monophyletic (a clade)', 'An ancestor plus ALL of its descendants. This is the only kind of group cladistics accepts.'],
      ['Paraphyletic', 'An ancestor plus SOME of its descendants, with at least one lineage left out (for example, “reptiles” without birds).'],
      ['Polyphyletic', 'Groups species from different branches WITHOUT their common ancestor (for example, “warm-blooded animals” = birds + mammals).'],
      ...cladeConcepts,
    ],
    problems: [
      {
        title: 'Q1 — Name the three groupings (trees A, B, C)',
        prompt: 'Open the PDF to see the trees. Each tree shows one kind of grouping.',
        steps: [
          { title: 'Test each bubble', ask: 'Does the bubble include the common ancestor? Does it include EVERY descendant of that ancestor?', show: 'Yes and yes → monophyletic. Yes but some descendants left out → paraphyletic. No common ancestor inside → polyphyletic.' },
          { title: 'Answers', ask: 'A, B, C = ?', show: '1a (tree A) = MONOphyletic, 1b (tree B) = PARAphyletic, 1c (tree C) = POLYphyletic.' },
        ],
      },
      {
        title: 'Q2–Q3 — Linnaeus and the ranks',
        prompt: 'Who developed the classification system? Put the 8 ranks in order from most to least inclusive.',
        steps: [
          { title: 'Q2', ask: 'Who in the 1700s?', show: 'Carolus LINNAEUS (binomial names, nested ranks).' },
          { title: 'Q3 memory trick', ask: 'A mnemonic helps: “Dear King Philip Came Over For Good Soup.”', show: 'A Domain, B Kingdom, C Phylum, D Class, E Order, F Family, G Genus, H Species.' },
        ],
      },
      {
        title: 'Q4 — Dwarf cladogram (Doc = outgroup)',
        prompt: 'Traits: Beard (1), Blue eyes (2), High IQ (3), >5 ft (4), Big nose (5). Place G, S, H, D, B and label the changes.',
        steps: [
          { title: 'Step 1: Read the outgroup', ask: 'What does Doc have?', show: 'Doc: beard YES; blue eyes, high IQ, tall and big nose all NO. That’s the ancestral state.' },
          { title: 'Step 2: What changed for everyone else?', ask: 'Which trait do ALL four others differ on from Doc?', show: 'Beard: Doc has one and nobody else does. So the lowest mark is 1− (beard disappeared). It sits on the branch leading to everyone except Doc (4i).' },
          { title: 'Step 3: Next most-shared change', ask: 'Who has a big nose (5)?', show: 'Grumpy, Happy and Bashful (not Sleepy). So 5+ goes on the branch above Sleepy’s split (4h). Sleepy branches off right after Doc.' },
          { title: 'Step 4', ask: 'Who has blue eyes (2)?', show: 'Happy and Bashful. 2+ goes above Grumpy’s split (4g).' },
          { title: 'Step 5', ask: 'Who has high IQ (3)?', show: 'Only Bashful. 3+ goes on Bashful’s own branch (4f).' },
          { title: 'Final answer', ask: 'Left-to-right tips and arrows?', show: 'Tips 4a–4e: D, S, G, H, B. Arrows: 4f = 3+, 4g = 2+, 4h = 5+, 4i = 1−. Trait 4 (>5 ft) is “no” for everyone, so it isn’t used.' },
        ],
        mistakes: ['Only marking traits that APPEAR. A trait can also be lost (1−).', 'Using a trait nobody varies on. If everyone is the same, it can’t define a branch.'],
      },
    ],
  },

  {
    id: 'ch26-reindeer',
    chapter: 26,
    title: 'Reindeer cladogram (in-class exercise)',
    kind: 'In-class exercise',
    graded: false,
    source: 'key',
    files: { assignment: F26 + 'Reindeer cladogram in-class exercise.pdf', key: F26 + 'Reindeer cladogram in-class exercise and ANSWER KEY.pdf' },
    goal: 'Same recipe as the dwarfs. Rudolph is the outgroup. Traits: thick hooves (1), big teeth (2), soft fur (3), squeaky voice (4), red nose (5).',
    concepts: cladeConcepts,
    problems: [
      {
        title: 'Build the reindeer tree',
        prompt: 'Place D, P, V, C, B and mark each change as + or −.',
        steps: [
          { title: 'Outgroup state', ask: 'What does Rudolph have?', show: 'Rudolph: thick hooves Y, big teeth N, soft fur Y, squeaky voice N, red nose Y.' },
          { title: 'Lowest change', ask: 'Which of Rudolph’s traits does NOBODY else have?', show: 'Red nose. 5− (red nose disappears) goes on the lowest branch. Dasher (D) splits off next.' },
          { title: 'Next', ask: 'Dasher still has soft fur. Who lost it?', show: 'C, B, V and P have no soft fur, so 3− goes above Dasher’s split. Comet (C) splits next.' },
          { title: 'Next', ask: 'Comet has small teeth. Who gained big teeth?', show: 'B, V, P have big teeth: 2+. Blitzen (B) splits next.' },
          { title: 'Next', ask: 'Blitzen still has thick hooves. Who lost them?', show: 'V and P: 1−.' },
          { title: 'Top', ask: 'What makes Prancer unique?', show: 'Squeaky voice: 4+ on Prancer’s branch only.' },
          { title: 'Final answer', ask: 'Order of tips, left to right?', show: 'R, D, C, B, V, P. From bottom to top: 5−, 3−, 2+, 1−, 4+.' },
        ],
      },
    ],
  },

  {
    id: 'ch26-cladogram-v8',
    chapter: 26,
    title: 'Cladogram building exercise (fish: Alex, Tish, Barb, Polly, Sandi, Rue)',
    kind: 'In-class exercise',
    graded: false,
    source: 'key',
    files: { key: F26 + 'Cladogram building exercise v8 ANSWERS.pdf', extra: [F26 + 'Tree Building Exercise Example Men In Hats.pptx'] },
    goal: 'Only the answer page for this one is in the course files. Use it to practice reading a finished cladogram: what each mark means and which species share it.',
    concepts: cladeConcepts,
    problems: [
      {
        title: 'Read the answer cladogram',
        prompt: 'Open the ANSWERS PDF and follow along.',
        steps: [
          { title: 'Outgroup', ask: 'Which fish branches off first?', show: 'Rue. Its mark (stripe color BLACK) is a change found only on Rue’s branch.' },
          { title: 'Next split', ask: 'What separates Sandi?', show: 'Sandi has its own unique change: tooth length LONG.' },
          { title: 'Big group', ask: 'Which change unites Alex, Tish, Barb and Polly?', show: 'Fin size BIG. All four have it, so it sits below where they split.' },
          { title: 'Two pairs', ask: 'What unites each pair?', show: 'Alex + Tish: scale shape FLAT. Barb + Polly: gill texture CURLY. Polly alone also has 20 lines.' },
          { title: 'Self-test', ask: 'Which fish has the most derived changes?', show: 'Polly: big fins + curly gills + 20 lines. Fish further up the tree carry every change on the branches below them.' },
        ],
      },
    ],
  },

  {
    id: 'ch27-activity',
    chapter: 27,
    title: 'Activity CH 27: Archaea diversity & why small size matters',
    kind: 'Class activity',
    graded: false,
    source: 'tutor',
    files: { assignment: F27 + 'ACTIVITY CH 27 questions.pdf' },
    goal: 'The answer key hasn’t been posted yet, so this walkthrough comes from Campbell Biology Ch. 27. The core idea: small cells have a large surface area for their volume, which limits their shapes but drives huge metabolic diversity. Compare with the official key when it’s posted.',
    concepts: [
      ['SA/V ratio', 'Surface area ÷ volume. Materials cross the membrane (surface), but the whole volume needs them. The smaller the cell, the larger the ratio.'],
      ['Cube formulas', 'SA = 6s², V = s³, so SA/V = 6/s.'],
      ['Sphere formulas', 'SA = 4πr², V = (4/3)πr³, so SA/V = 3/r.'],
      ['Nutritional modes', 'Energy source (light = photo, chemicals = chemo) + carbon source (CO₂ = auto, organic = hetero).'],
    ],
    problems: [
      {
        title: '27.1 Q1 — The four archaeal groups',
        prompt: 'What places organisms in each group?',
        steps: [
          { title: 'Euryarchaeotes', ask: '“Eury” = broad. Which extremophiles?', show: 'A broad group: methanogens (make methane; strict anaerobes) and extreme halophiles (salt lovers), plus some thermophiles.' },
          { title: 'Crenarchaeotes', ask: 'Where were they first found?', show: 'Mostly extreme thermophiles (hot, acidic springs), though many live in ordinary soil and ocean too.' },
          { title: 'Korarchaeotes', ask: 'How were they discovered?', show: 'Found in hot springs, mostly from their DNA (rRNA gene sequences). They share traits with both groups above and may be close to the archaeal root.' },
          { title: 'Nanoarchaeotes', ask: 'Hint: “nano.”', show: 'Very small cells (about 400 nm) with tiny genomes, such as Nanoarchaeum equitans, which lives attached to another archaeon (Ignicoccus) in hot vents.' },
          { title: 'Main takeaway', ask: 'What do the groupings depend on most today?', show: 'Mostly molecular data (DNA sequences), supported by habitat and metabolism. Newer editions merge some of these into the “TACK” supergroup.' },
        ],
      },
      {
        title: '27.1 Q2 — Nutritional-mode table',
        prompt: 'Fill in energy source, carbon source and mode for plants, animals and prokaryotes.',
        steps: [
          { title: 'Plants', ask: 'Energy? Carbon?', show: 'Light + CO₂ = photoautotroph.' },
          { title: 'Animals', ask: 'Energy? Carbon?', show: 'Organic compounds for both = chemoheterotroph.' },
          { title: 'Prokaryotes', ask: 'Which of the four modes do prokaryotes use?', show: 'All four. Photoautotroph (cyanobacteria), photoheterotroph (light + organic C; some marine prokaryotes), chemoautotroph (energy from inorganic chemicals like H₂S, NH₃ or Fe²⁺ + CO₂; ONLY prokaryotes do this), chemoheterotroph (most bacteria). This is the “biochemical diversity” the activity builds toward.' },
        ],
      },
      {
        title: '27.1 Q3–Q4 — “More evolved?” and searching for life elsewhere',
        prompt: 'These are argument questions. There’s no single right answer, but a strong answer uses evidence.',
        steps: [
          { title: 'Q3 frame it', ask: 'Does “more evolved” have a meaning in biology?', show: 'Every living lineage has evolved for exactly the same amount of time since the common ancestor. Both bacteria and humans are well adapted to their own niches.' },
          { title: 'Q3a bacteria', ask: 'Arguments for bacteria?', show: 'Far more generations (minutes per generation vs. about 25 years), huge populations, every metabolic mode, survival in extreme environments, and they’ve lasted about 3.5 billion years.' },
          { title: 'Q3b humans', ask: 'Arguments for humans?', show: 'More complex body organization, cell specialization, and nervous systems and behavior. But “complex” isn’t the same as “more evolved.”' },
          { title: 'Q4 a–c life elsewhere', ask: 'What would you look for?', show: 'a) Liquid water, an energy source (light or chemical gradients), carbon and other elements, and some protection from radiation. b) Microbial, prokaryote-like, probably anaerobic chemoautotrophs, as on the early Earth. c) Look for biosignatures: gases like methane out of chemical balance, organic molecules, isotope ratios suggesting metabolism, and microscopy or culture of samples.' },
        ],
      },
      {
        title: '27.2 Q1 — Cubes of 1, 2, 4 (SA/V)',
        prompt: 'The handout prints “mm”; the original Campbell activity uses µm. The math is the same in either unit.',
        steps: [
          { title: '1-unit cube', ask: 'SA = 6 × 1² and V = 1³. SA/V = ?', check: { answer: 6, tol: 0 }, show: 'SA = 6, V = 1, ratio 6.' },
          { title: '2-unit cube', ask: 'SA = 6 × 2² and V = 2³. SA/V = ?', check: { answer: 3, tol: 0 }, show: 'SA = 24, V = 8, ratio 3.' },
          { title: '4-unit cube', ask: 'SA = 6 × 4² and V = 4³. SA/V = ?', check: { answer: 1.5, tol: 0 }, show: 'SA = 96, V = 64, ratio 1.5.' },
          { title: 'b–d. The pattern', ask: 'When side length doubles, what happens to SA, V and SA/V?', show: 'SA × 4 (squared), V × 8 (cubed), so SA/V is cut in HALF. Volume grows faster than surface.' },
        ],
      },
      {
        title: '27.2 Q2 — 10 µm bacterium vs 100 µm eukaryote',
        prompt: 'Find SA, V and SA/V for a 10 µm cube, a 10 µm sphere and a 100 µm cube.',
        steps: [
          { title: 'a. 10 µm cube', ask: 'SA/V = ?', check: { answer: 0.6, tol: 0.001 }, show: 'SA = 600 µm², V = 1,000 µm³, ratio 0.6.' },
          { title: 'b. 10 µm sphere (r = 5)', ask: 'SA = 4π(5)² and V = (4/3)π(5)³. SA/V = ?', check: { answer: 0.6, tol: 0.001 }, hint: 'For a sphere, SA/V = 3/r.', show: 'SA ≈ 314 µm², V ≈ 524 µm³, ratio 0.6, the same as the cube.' },
          { title: 'c. 100 µm cube', ask: 'SA/V = ?', check: { answer: 0.06, tol: 0.0001 }, show: 'SA = 60,000 µm², V = 1,000,000 µm³, ratio 0.06, ten times smaller.' },
        ],
      },
      {
        title: '27.2 Q3–Q4 — Oxygen supply and membrane limits',
        prompt: 'Each µm³ needs 1 unit of O₂ per second.',
        steps: [
          { title: 'Bacterium', ask: 'O₂ per µm² per second = V ÷ SA = ?', check: { answer: 1.67, tol: 0.02 }, show: '1,000 ÷ 600 ≈ 1.67 units per µm² per second.' },
          { title: 'Eukaryote', ask: 'V ÷ SA = ?', check: { answer: 16.7, tol: 0.1 }, show: '1,000,000 ÷ 60,000 ≈ 16.7, ten times more per patch of membrane.' },
          { title: 'Effect on metabolism', ask: 'Which cell can sustain a faster metabolic rate?', show: 'The bacterium. Its membrane easily supplies its small volume. A big cell would hit its membrane’s transport limit, so it needs a slower metabolism, internal membranes, or folded surfaces.' },
          { title: 'Q4 upper limit', ask: 'Can a patch of membrane move unlimited molecules?', show: 'No. It’s limited by the number of transport proteins and channels, how fast each one works (they saturate), the concentration gradient, and how fast diffusion is. So size limits cells.' },
        ],
      },
      {
        title: '27.2 Q5–Q7 — Genomes, doubling and mutations',
        prompt: 'Genome size, growth after 10 hours, and how many mutants to expect.',
        steps: [
          { title: 'Q5 genomes', ask: 'Prokaryote vs eukaryote genome?', show: 'Prokaryotes: one circular chromosome, about 1–6 million base pairs, HAPLOID (plus plasmids). Eukaryotes: often hundreds to thousands of times more DNA (human ≈ 3 billion bp per set), often DIPLOID.' },
          { title: 'Q6 doubling', ask: 'Starting with 1 cell/mL and doubling every hour for 10 hours: 2¹⁰ = ?', check: { answer: 1024, tol: 0 }, show: '1,024 bacteria per mL.' },
          { title: 'Q7 whole liter', ask: '1 L = 1,000 mL. Total cells = ?', check: { answer: 1024000, tol: 0 }, show: 'About 1.02 × 10⁶ cells.' },
          { title: 'Q7 mutations', ask: 'At 1 per 10⁶ to 1 per 10⁸ cells?', show: 'About 1 mutation at 10⁻⁶, down to about 0.01 (probably none) at 10⁻⁸. Scale that to the trillions of cells in nature and new mutations show up constantly. That’s why prokaryotes adapt so fast.' },
        ],
      },
      {
        title: '27.2 Q8 — The argument',
        prompt: '“How small size in prokaryotes limited their morphological diversity and promoted their biochemical diversity.”',
        steps: [
          { title: 'Outline', ask: 'Connect the activity’s pieces in order.', show: '1) Small size means a high SA/V, so materials get in and out fast and metabolism can be fast (Q1–Q3). 2) But membrane transport has an upper limit (Q4), so cells must stay small, which leaves little room for complex structures and organelles. Their shapes stay simple (rods, spheres, spirals): limited MORPHOLOGICAL diversity. 3) Small haploid genomes plus doubling every 20–60 minutes produce huge populations (Q5–Q6). Mutations show their effects immediately, and many arise quickly (Q7). 4) Selection then acts mostly on chemistry, giving every nutritional mode and extreme-environment metabolism: high BIOCHEMICAL diversity.' },
        ],
      },
    ],
  },

  {
    id: 'ch28-activity',
    chapter: 28,
    title: 'Activity CH 28: Protists & endosymbiosis',
    kind: 'Class activity',
    graded: false,
    source: 'tutor',
    files: { assignment: F28 + 'ACTIVITY CH 28 questions.pdf' },
    goal: 'The answer key hasn’t been posted yet, so this walkthrough comes from Campbell Biology Ch. 28. Compare with the official key when it’s posted. The main idea: eukaryotic cells were assembled by engulfing other cells.',
    concepts: [
      ['Protist', 'Any eukaryote that isn’t a plant, animal or fungus. It’s a category of convenience, not a clade.'],
      ['Four supergroups', 'Excavata, SAR (Stramenopiles, Alveolates, Rhizarians), Archaeplastida, Unikonta.'],
      ['Primary endosymbiosis', 'A eukaryote engulfs a PROKARYOTE that becomes an organelle: an alpha-proteobacterium → mitochondria, a cyanobacterium → chloroplasts.'],
      ['Secondary endosymbiosis', 'A eukaryote engulfs a EUKARYOTIC alga that already had a chloroplast.'],
    ],
    problems: [
      {
        title: 'Q1–Q2 — “Catch-all” and the four themes',
        prompt: 'Explain “catch-all” and give two examples for each theme.',
        steps: [
          { title: 'Q1', ask: 'What do protists share besides being eukaryotes?', show: 'Not much. The group is everything left over after plants, animals and fungi, so it’s paraphyletic. Some protists are closer to plants or animals than to other protists.' },
          { title: 'a. Complex cell structure', ask: 'Examples?', show: 'Paramecium (two kinds of nuclei, cilia, contractile vacuole, oral groove); diatoms (glass silica walls); dinoflagellates (cellulose plates and two flagella); Euglena (eyespot, pellicle).' },
          { title: 'b. Genetic recombination', ask: 'Examples?', show: 'Ciliates use conjugation: two cells swap micronuclei and recombine without reproducing. Plasmodium and many algae combine sexual and asexual stages.' },
          { title: 'c. Complex life cycles', ask: 'Examples?', show: 'Plasmodium (malaria), with stages in both a mosquito and a human; brown algae like kelp, with alternation of generations; cellular slime molds, where single cells gather into a multicellular slug.' },
          { title: 'd. Ecological importance', ask: 'Examples?', show: 'Diatoms and other phytoplankton do much of Earth’s photosynthesis and form the base of ocean food webs. Dinoflagellates cause red tides and live inside corals. Pathogens include Plasmodium, Phytophthora (Irish potato famine) and Trypanosoma (sleeping sickness).' },
        ],
      },
      {
        title: 'Q3 — The endosymbiotic theory',
        prompt: 'What is it, which organelles, and what evidence?',
        steps: [
          { title: 'a. Theory', ask: 'In one sentence?', show: 'Mitochondria and plastids came from free-living prokaryotes that were engulfed by an ancestral host cell and lived on inside it, eventually becoming permanent organelles.' },
          { title: 'b. Organelles', ask: 'Which two?', show: 'Mitochondria (from an alpha-proteobacterium) and chloroplasts/plastids (from a cyanobacterium).' },
          { title: 'c. Evidence', ask: 'List as many as you can.', show: 'Double membrane (the inner one is bacteria-like); their own circular DNA; their own bacteria-type ribosomes (70S); they divide by a binary-fission-like process; inner-membrane enzymes and transporters resemble bacterial ones; and DNA sequences group them with alpha-proteobacteria and cyanobacteria.' },
        ],
      },
      {
        title: 'Q4 — Secondary endosymbiosis',
        prompt: 'Euglenids and chlorarachniophytes.',
        steps: [
          { title: 'a. Definition', ask: 'What was engulfed the second time?', show: 'A heterotrophic eukaryote engulfed a eukaryotic ALGA (green or red) that already had a chloroplast and kept it.' },
          { title: 'b. Evidence', ask: 'How many membranes would you expect around the plastid?', show: 'More than two: three in euglenids and four in chlorarachniophytes. The extras are the alga’s cell membrane and the host’s food-vacuole membrane. Chlorarachniophytes still have a NUCLEOMORPH, a tiny leftover nucleus of the engulfed alga, between the membranes.' },
        ],
      },
      {
        title: 'Q5 — Giardia and the order of organelle evolution',
        prompt: 'What Giardia once suggested, and what we know now.',
        steps: [
          { title: 'a. Old idea', ask: 'If Giardia (no mitochondria) were like the first eukaryotes, which organelles came first?', show: 'The nucleus and cytoskeleton evolved first, then mitochondria, then chloroplasts in some lineages.' },
          { title: 'b-i. Modified mitochondria', ask: 'What do diplomonads and parabasalids actually have?', show: 'Diplomonads (Giardia) have MITOSOMES: tiny remnants with no electron transport chain. Parabasalids (Trichomonas) have HYDROGENOSOMES, which make ATP anaerobically and give off H₂.' },
          { title: 'b-ii. New conclusion', ask: 'What does that mean for the timeline?', show: 'Their ancestors HAD mitochondria and later reduced them. So mitochondria were acquired very early, probably in the common ancestor of all living eukaryotes, about the same time as the nucleus or soon after. Chloroplasts came later, in only some lineages.' },
        ],
      },
    ],
  },
];
