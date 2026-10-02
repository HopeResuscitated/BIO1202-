// BIOL 1202 — General Biology II (Fall 2026) curriculum model.
// Chapters 22–28 (evolution, phylogeny, prokaryotes, protists) plus the Exam 1 review.
// Each concept carries aliases used by the deterministic tutor engine to score coverage.

export const CHAPTERS = [
  {
    id: 'ch22',
    num: 22,
    title: 'Descent with Modification',
    subtitle: 'A Darwinian view of life',
    concepts: [
      { id: 'variation', label: 'Heritable variation', aliases: ['variation', 'heritable', 'differences among individuals'] },
      { id: 'natural-selection', label: 'Natural selection', aliases: ['natural selection', 'selection', 'differential survival'] },
      { id: 'differential-reproduction', label: 'Differential reproduction', aliases: ['differential reproduction', 'reproductive success', 'more offspring', 'fitness'] },
      { id: 'adaptation', label: 'Adaptation', aliases: ['adaptation', 'adapted', 'trait that increases'] },
      { id: 'homology', label: 'Homology', aliases: ['homology', 'homologous', 'common ancestry', 'shared ancestry'] },
      { id: 'convergent', label: 'Convergent evolution', aliases: ['convergent', 'analogous', 'same function different origin'] },
      { id: 'fossil-record', label: 'Fossil record', aliases: ['fossil', 'fossil record', 'paleontolog'] },
    ],
  },
  {
    id: 'ch23',
    num: 23,
    title: 'The Evolution of Populations',
    subtitle: 'Microevolution and Hardy–Weinberg',
    concepts: [
      { id: 'population', label: 'Population', aliases: ['population', 'interbreeding', 'same species same area'] },
      { id: 'allele-frequency', label: 'Allele frequency', aliases: ['allele frequency', 'allele frequencies', 'frequency of alleles'] },
      { id: 'hardy-weinberg', label: 'Hardy–Weinberg equilibrium', aliases: ['hardy-weinberg', 'hardy weinberg', 'hw equilibrium', 'equilibrium'] },
      { id: 'p-q', label: 'p + q = 1', aliases: ['p + q', 'p+q', 'allele equation'] },
      { id: 'genotype-frequency', label: 'p² + 2pq + q² = 1', aliases: ['p2 + 2pq + q2', 'p² + 2pq + q²', '2pq', 'genotype frequency', 'p squared'] },
      { id: 'genetic-drift', label: 'Genetic drift', aliases: ['genetic drift', 'drift', 'sampling error', 'random change in allele', 'bottleneck', 'founder effect'] },
      { id: 'gene-flow', label: 'Gene flow', aliases: ['gene flow', 'migration', 'movement of alleles'] },
      { id: 'selection-pressure', label: 'Selection as a change agent', aliases: ['selection pressure', 'directional', 'stabilizing', 'disruptive', 'natural selection'] },
    ],
  },
  {
    id: 'ch24',
    num: 24,
    title: 'The Origin of Species',
    subtitle: 'Speciation and reproductive isolation',
    concepts: [
      { id: 'speciation', label: 'Speciation', aliases: ['speciation', 'new species', 'splitting of lineages'] },
      { id: 'reproductive-isolation', label: 'Reproductive isolation', aliases: ['reproductive isolation', 'isolated', 'cannot interbreed', 'barrier to gene flow'] },
      { id: 'allopatric', label: 'Allopatric speciation', aliases: ['allopatric', 'geographic separation', 'geographic barrier'] },
      { id: 'sympatric', label: 'Sympatric speciation', aliases: ['sympatric', 'same geographic', 'without geographic'] },
      { id: 'gene-flow', label: 'Gene flow', aliases: ['gene flow', 'migration', 'gene exchange'] },
      { id: 'hybrid', label: 'Hybrid zones', aliases: ['hybrid', 'hybrid zone', 'reinforcement'] },
    ],
  },
  {
    id: 'ch25',
    num: 25,
    title: 'The History of Life on Earth',
    subtitle: 'Macroevolution and deep time',
    concepts: [
      { id: 'geologic-time', label: 'Geologic time scale', aliases: ['geologic time', 'eon', 'era', 'period', 'millions of years', 'mya'] },
      { id: 'radiometric', label: 'Radiometric dating', aliases: ['radiometric', 'carbon-14', 'half-life', 'radioactive decay'] },
      { id: 'mass-extinction', label: 'Mass extinction', aliases: ['mass extinction', 'extinction event', 'permian', 'cretaceous'] },
      { id: 'adaptive-radiation', label: 'Adaptive radiation', aliases: ['adaptive radiation', 'rapid diversification', 'many niches'] },
      { id: 'macroevolution', label: 'Macroevolution', aliases: ['macroevolution', 'large-scale', 'above the species level'] },
      { id: 'fossil', label: 'Fossils as evidence', aliases: ['fossil', 'strata', 'rock layers'] },
    ],
  },
  {
    id: 'ch26',
    num: 26,
    title: 'Phylogeny and the Tree of Life',
    subtitle: 'Reading and building trees',
    concepts: [
      { id: 'phylogeny', label: 'Phylogeny', aliases: ['phylogeny', 'phylogenetic', 'evolutionary history'] },
      { id: 'common-ancestor', label: 'Common ancestor', aliases: ['common ancestor', 'common ancestry', 'most recent ancestor'] },
      { id: 'monophyletic', label: 'Monophyletic group', aliases: ['monophyletic', 'clade', 'ancestor and all descendants'] },
      { id: 'sister-taxon', label: 'Sister taxa', aliases: ['sister taxon', 'sister taxa', 'sister group', 'closest relative'] },
      { id: 'synapomorphy', label: 'Shared derived character', aliases: ['synapomorphy', 'shared derived', 'derived character', 'shared character'] },
      { id: 'cladogram', label: 'Cladogram / branch points', aliases: ['cladogram', 'branch point', 'node', 'tree'] },
      { id: 'parsimony', label: 'Maximum parsimony', aliases: ['parsimony', 'fewest changes', 'simplest explanation'] },
    ],
  },
  {
    id: 'ch27',
    num: 27,
    title: 'Bacteria and Archaea',
    subtitle: 'Prokaryotic diversity',
    concepts: [
      { id: 'prokaryote', label: 'Prokaryote', aliases: ['prokaryote', 'prokaryotic', 'no nucleus', 'nucleoid'] },
      { id: 'peptidoglycan', label: 'Peptidoglycan', aliases: ['peptidoglycan', 'cell wall', 'gram positive', 'gram negative'] },
      { id: 'hgt', label: 'Horizontal gene transfer', aliases: ['horizontal gene transfer', 'hgt', 'conjugation', 'transformation', 'transduction'] },
      { id: 'archaea', label: 'Archaea', aliases: ['archaea', 'archaeal', 'extremophile', 'methanogen'] },
      { id: 'binary-fission', label: 'Binary fission', aliases: ['binary fission', 'asexual', 'rapid reproduction'] },
      { id: 'metabolic', label: 'Metabolic diversity', aliases: ['autotroph', 'heterotroph', 'photoautotroph', 'nitrogen fix', 'metabolic'] },
    ],
  },
  {
    id: 'ch28',
    num: 28,
    title: 'Protists',
    subtitle: 'Eukaryotic origins and diversity',
    concepts: [
      { id: 'protist', label: 'Protist', aliases: ['protist', 'protista', 'mostly unicellular eukaryote'] },
      { id: 'eukaryote', label: 'Eukaryote', aliases: ['eukaryote', 'eukaryotic', 'true nucleus', 'membrane-bound'] },
      { id: 'endosymbiosis', label: 'Endosymbiosis', aliases: ['endosymbiosis', 'endosymbiotic', 'mitochondria from', 'chloroplast from'] },
      { id: 'algae', label: 'Algae', aliases: ['algae', 'algal', 'photosynthetic protist'] },
      { id: 'heterotroph', label: 'Heterotrophy', aliases: ['heterotroph', 'heterotrophic', 'ingest', 'consume'] },
      { id: 'autotroph', label: 'Autotrophy', aliases: ['autotroph', 'autotrophic', 'photosynthes'] },
      { id: 'secondary-endosymbiosis', label: 'Secondary endosymbiosis', aliases: ['secondary endosymbiosis', 'secondary', 'engulfed a red alga', 'engulfed a green alga'] },
    ],
  },
];

const C = Object.fromEntries(CHAPTERS.map((c) => [c.id, c]));

// Assignments mirror the reference app's "checked practice" model:
// an assignment contains short sections; each section has a prompt, a set of
// concepts the answer should cover, and a 3-step Socratic hint ladder.
export const ASSIGNMENTS = [
  {
    id: 'a-ch22-descent',
    title: 'Descent with Modification — concept drill',
    chapter: 'ch22',
    category: '08 CH 22- Descent with Modification, A Darwinian View of Life (',
    kind: 'Concept drill',
    minutes: 15,
    sections: [
      {
        id: 's1',
        title: 'The four postulates',
        prompt: 'In your own words, state the four postulates of natural selection and explain what each one requires.',
        concepts: ['variation', 'differential-reproduction', 'natural-selection', 'adaptation'],
        hints: [
          'Start with the raw material every population has before selection can act.',
          'Two of the postulates are about survival and reproduction — how do they differ?',
          'Write them as: variation exists → variation is heritable → more offspring are produced than survive → survivors reproduce non-randomly.',
        ],
      },
      {
        id: 's2',
        title: 'Homology vs. convergence',
        prompt: 'A bat wing and a bird wing both allow flight. Explain why one is homologous and the other is not, using the idea of common ancestry.',
        concepts: ['homology', 'convergent', 'common-ancestor'],
        hints: [
          'Ask which structures trace back to the same ancestral structure.',
          'Same function does not mean same origin — name the term for that.',
          'Homologous = shared ancestry (forelimb bones); analogous = convergent evolution (independent flight solutions).',
        ],
      },
      {
        id: 's3',
        title: 'Apply it',
        prompt: 'Antibiotic resistance spreads quickly in a hospital. Explain how this is natural selection acting on variation, not "bacteria choosing to adapt."',
        concepts: ['variation', 'natural-selection', 'differential-reproduction', 'adaptation'],
        hints: [
          'Where does the resistance variation come from in the first place?',
          'What does the antibiotic do to the population, not to an individual?',
          'Random mutation creates variation; the antibiotic selects survivors, which then reproduce — the population adapts.',
        ],
      },
    ],
  },
  {
    id: 'a-ch23-hardy-weinberg',
    title: 'Hardy–Weinberg problem set',
    chapter: 'ch23',
    category: '09 CH 23- The Evolution of Populations',
    kind: 'Problem set',
    minutes: 20,
    sections: [
      {
        id: 's1',
        title: 'Identify p and q',
        prompt: 'A population of 1000 has 160 individuals with the recessive phenotype. Explain what p and q represent and state which value you can find first.',
        concepts: ['allele-frequency', 'p-q', 'population'],
        hints: [
          'p and q are allele frequencies, not genotype or phenotype frequencies.',
          'Which genotype matches the recessive phenotype exactly?',
          'q² = 160/1000 = 0.16, so q = 0.4 and p = 0.6.',
        ],
      },
      {
        id: 's2',
        title: 'Choose the equation',
        prompt: 'Explain when you use p + q = 1 versus p² + 2pq + q² = 1, and what each term of the second equation represents.',
        concepts: ['p-q', 'genotype-frequency', 'hardy-weinberg'],
        hints: [
          'One equation is about alleles; the other is about genotypes.',
          'What do the two homozygote terms and the middle term stand for?',
          'p+q=1 for alleles; p² (AA), 2pq (Aa), q² (aa) for genotypes under H–W equilibrium.',
        ],
      },
      {
        id: 's3',
        title: 'Name the change agents',
        prompt: 'List the five conditions required for Hardy–Weinberg equilibrium, and name the evolutionary force that each condition rules out.',
        concepts: ['hardy-weinberg', 'genetic-drift', 'gene-flow', 'selection-pressure'],
        hints: [
          'Equilibrium is a null model — what must be absent for it to hold?',
          'Think: no mutation, no migration, no selection, large population, random mating.',
          'Each condition corresponds to a force: mutation, gene flow, selection, genetic drift, non-random mating.',
        ],
      },
    ],
  },
  {
    id: 'a-ch23-populations',
    title: 'Evolution of Populations — concept drill',
    chapter: 'ch23',
    category: '09 CH 23- The Evolution of Populations',
    kind: 'Concept drill',
    minutes: 12,
    sections: [
      {
        id: 's1',
        title: 'Drift vs. selection',
        prompt: 'Explain how genetic drift differs from natural selection, and why drift is stronger in small populations.',
        concepts: ['genetic-drift', 'selection-pressure', 'population'],
        hints: [
          'One is random; the other is non-random. Which is which?',
          'What does population size have to do with sampling error?',
          'Drift = random change in allele frequency (strong in small populations); selection = non-random, fitness-based.',
        ],
      },
      {
        id: 's2',
        title: 'Gene flow',
        prompt: 'Two populations exchange migrants each generation. Explain the effect on allele frequencies and on the potential for speciation.',
        concepts: ['gene-flow', 'allele-frequency', 'speciation'],
        hints: [
          'What does migration physically move between populations?',
          'Does mixing make populations more alike or more different?',
          'Gene flow homogenizes allele frequencies and tends to prevent divergence/speciation.',
        ],
      },
    ],
  },
  {
    id: 'a-ch24-speciation',
    title: 'The Origin of Species — speciation drill',
    chapter: 'ch24',
    category: '10 CH 24- The Origin of Species',
    kind: 'Concept drill',
    minutes: 14,
    sections: [
      {
        id: 's1',
        title: 'Allopatric vs. sympatric',
        prompt: 'Compare allopatric and sympatric speciation. What role does a geographic barrier play in each?',
        concepts: ['allopatric', 'sympatric', 'reproductive-isolation'],
        hints: [
          'The prefixes "allo-" and "sym-" are about geography.',
          'In one case gene flow is interrupted by distance/barrier; in the other it is not.',
          'Allopatric = geographic separation; sympatric = divergence without a geographic barrier.',
        ],
      },
      {
        id: 's2',
        title: 'Isolating mechanisms',
        prompt: 'Give one prezygotic and one postzygotic reproductive barrier, and explain how each reduces gene flow.',
        concepts: ['reproductive-isolation', 'gene-flow', 'speciation'],
        hints: [
          'Pre- means before fertilization; post- means after.',
          'Examples: timing/behavior vs. hybrid inviability/sterility.',
          'Prezygotic (e.g., temporal isolation) blocks mating; postzygotic (e.g., sterile hybrids) blocks gene flow after mating.',
        ],
      },
    ],
  },
  {
    id: 'a-ch25-history',
    title: 'The History of Life — timeline drill',
    chapter: 'ch25',
    category: '11 CH 25- The History of Life on Earth',
    kind: 'Concept drill',
    minutes: 14,
    sections: [
      {
        id: 's1',
        title: 'Reading deep time',
        prompt: 'Explain how radiometric dating lets us place fossils on the geologic time scale, and why the scale is not linear in our intuition.',
        concepts: ['radiometric', 'geologic-time', 'fossil'],
        hints: [
          'What decays, and at what rate?',
          'What is a half-life, and how does it give an absolute age?',
          'Radioactive isotopes decay at known rates (half-lives); measuring parent/daughter ratios dates the rock layer.',
        ],
      },
      {
        id: 's2',
        title: 'Extinction and radiation',
        prompt: 'Explain how a mass extinction can set the stage for an adaptive radiation.',
        concepts: ['mass-extinction', 'adaptive-radiation', 'macroevolution'],
        hints: [
          'What happens to available niches after many species disappear?',
          'What does a surviving lineage do with empty ecological space?',
          'Mass extinction frees niches; survivors diversify rapidly into them = adaptive radiation.',
        ],
      },
    ],
  },
  {
    id: 'a-ch26-phylogeny',
    title: 'Phylogeny — read the tree',
    chapter: 'ch26',
    category: '13 CH 26- Phylogeny and the Tree of Life',
    kind: 'Exercise',
    minutes: 16,
    sections: [
      {
        id: 's1',
        title: 'Read the cladogram',
        prompt: 'On a cladogram, explain how to find which two taxa are sister taxa, and why "how close the labels look" is the wrong method.',
        concepts: ['cladogram', 'sister-taxon', 'common-ancestor'],
        hints: [
          'Start at the branch points (nodes), not the tips.',
          'Sister taxa share the most recent common ancestor.',
          'Follow the branches back to the nearest shared node — that node defines sister taxa.',
        ],
      },
      {
        id: 's2',
        title: 'Shared derived characters',
        prompt: 'Explain what a synapomorphy is and how it is used to define a monophyletic group.',
        concepts: ['synapomorphy', 'monophyletic', 'common-ancestor'],
        hints: [
          'Derived means it arose in the ancestor of the group, not before.',
          'Shared by which organisms?',
          'A synapomorphy is a shared derived character that unites a clade (ancestor + all descendants).',
        ],
      },
      {
        id: 's3',
        title: 'Parsimony',
        prompt: 'Two trees explain the same data with different numbers of character changes. Explain how maximum parsimony chooses between them.',
        concepts: ['parsimony', 'cladogram'],
        hints: [
          'Which explanation is "simpler"?',
          'Count the evolutionary changes each tree requires.',
          'Parsimony prefers the tree requiring the fewest independent character changes.',
        ],
      },
    ],
  },
  {
    id: 'a-ch27-prokaryotes',
    title: 'Bacteria and Archaea — concept drill',
    chapter: 'ch27',
    category: '14 CH 27- Bacteria and Archaea',
    kind: 'Concept drill',
    minutes: 12,
    sections: [
      {
        id: 's1',
        title: 'Prokaryote basics',
        prompt: 'Describe two structural features that distinguish prokaryotes from eukaryotes, and explain what peptidoglycan is and where it is found.',
        concepts: ['prokaryote', 'peptidoglycan', 'eukaryote'],
        hints: [
          'What is missing in a prokaryotic cell?',
          'Where is the cell wall, and what is it made of in bacteria?',
          'Prokaryotes lack a membrane-bound nucleus/organelles; peptidoglycan is the bacterial cell-wall polymer (Gram +/-).',
        ],
      },
      {
        id: 's2',
        title: 'Horizontal gene transfer',
        prompt: 'Explain horizontal gene transfer and why it complicates the idea of a simple tree of life for prokaryotes.',
        concepts: ['hgt', 'prokaryote', 'phylogeny'],
        hints: [
          'Genes moving sideways, not just parent to offspring.',
          'Name the three classic mechanisms.',
          'HGT (conjugation/transformation/transduction) moves genes between lineages, so genes can have different histories than organisms.',
        ],
      },
    ],
  },
  {
    id: 'a-ch28-protists',
    title: 'Protists — concept drill',
    chapter: 'ch28',
    category: '15 CH 28- Protists',
    kind: 'Concept drill',
    minutes: 12,
    sections: [
      {
        id: 's1',
        title: 'Endosymbiosis',
        prompt: 'Explain the theory of endosymbiosis and the evidence that mitochondria and chloroplasts were once free-living prokaryotes.',
        concepts: ['endosymbiosis', 'eukaryote', 'prokaryote'],
        hints: [
          'One cell engulfed another and kept it.',
          'What do mitochondria and chloroplasts still carry that suggests independence?',
          'Evidence: their own circular DNA, double membranes, and bacteria-like ribosomes — they descend from engulfed prokaryotes.',
        ],
      },
      {
        id: 's2',
        title: 'Nutritional diversity',
        prompt: 'Contrast autotrophic and heterotrophic protists, and give an example of each feeding strategy.',
        concepts: ['autotroph', 'heterotroph', 'algae', 'protist'],
        hints: [
          'One makes its own food; the other consumes it.',
          'Photosynthetic protists vs. ingesting/parasitic protists.',
          'Autotrophs (algae) photosynthesize; heterotrophs ingest or absorb nutrients (e.g., amoebas, some parasites).',
        ],
      },
    ],
  },
  {
    id: 'a-exam1',
    title: 'Exam 1 review (CH 22–25)',
    chapter: 'ch22',
    category: '12 EXAM 1',
    kind: 'Review',
    minutes: 25,
    sections: [
      {
        id: 's1',
        title: 'Evolution synthesis',
        prompt: 'Explain how mutation, selection, drift, and gene flow together produce evolutionary change in a population.',
        concepts: ['variation', 'natural-selection', 'genetic-drift', 'gene-flow'],
        hints: [
          'Mutation creates; the others sort and move.',
          'Which forces are random and which are non-random?',
          'Mutation supplies variation; selection and drift change frequencies; gene flow moves alleles between populations.',
        ],
      },
      {
        id: 's2',
        title: 'Speciation synthesis',
        prompt: 'Describe the sequence of events that turns one population into two species, and name the key barrier at each stage.',
        concepts: ['reproductive-isolation', 'allopatric', 'gene-flow', 'speciation'],
        hints: [
          'Start with interrupted gene flow.',
          'Then divergence, then reinforcement of isolation.',
          'Barrier → reduced gene flow → divergence (drift/selection) → reproductive isolation → distinct species.',
        ],
      },
      {
        id: 's3',
        title: 'Deep-time synthesis',
        prompt: 'Explain how the fossil record and radiometric dating together support macroevolutionary patterns such as adaptive radiation.',
        concepts: ['fossil', 'radiometric', 'adaptive-radiation', 'macroevolution'],
        hints: [
          'One gives order; the other gives absolute dates.',
          'What pattern would you look for after a mass extinction?',
          'Fossils show the sequence of forms; radiometric dating anchors them in time; together they reveal radiations after extinctions.',
        ],
      },
    ],
  },
];

export function getAssignment(id) {
  return ASSIGNMENTS.find((a) => a.id === id) || null;
}

export function getChapter(id) {
  return C[id] || null;
}

export function assignmentsForChapter(chapterId) {
  return ASSIGNMENTS.filter((a) => a.chapter === chapterId);
}

export function conceptById(chapterId, conceptId) {
  const ch = C[chapterId];
  if (!ch) return null;
  return ch.concepts.find((c) => c.id === conceptId) || null;
}

export const ALL_CONCEPTS = Object.fromEntries(
  CHAPTERS.map((c) => [c.id, Object.fromEntries(c.concepts.map((k) => [k.id, k]))]),
);

export function totalConceptCount(chapterId) {
  const ch = C[chapterId];
  return ch ? ch.concepts.length : 0;
}
