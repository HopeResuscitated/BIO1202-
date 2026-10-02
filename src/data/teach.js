// BIOL 1202 — "Teach me this chapter" lesson content.
// For every chapter (CH 22–28) this file authors a complete, plain-language
// lesson: the big idea, a short overview, learning objectives, a chapter
// glossary, and a per-concept breakdown (plain explanation + precise
// definition + analogy + example + its own vocabulary + a self-check).
//
// Concept ids match src/data/curriculum.js so progress and cross-links line up.
// Everything here is deterministic — no API key is ever required.

export const CHAPTER_LESSONS = {
  ch22: {
    id: 'ch22',
    num: 22,
    title: 'Descent with Modification',
    subtitle: 'A Darwinian view of life',
    bigIdea:
      'Evolution is descent with modification: all species are related by common ancestry, and populations change over time because individuals with advantageous heritable traits leave more offspring.',
    overview: [
      "Charles Darwin's central claim was not just that life changes — it was that all living things share common ancestors and that the differences among them accumulate over vast spans of time. He called this pattern “descent with modification.”",
      'The mechanism he proposed, natural selection, is simple in outline: populations vary, some of that variation is heritable, more offspring are produced than can survive, and the survivors reproduce non-randomly. Over generations, the traits that improve survival and reproduction become more common.',
      'The evidence all points the same direction: fossils, comparative anatomy, embryology, and biogeography each reveal shared ancestry with modification. In this chapter you learn to think like Darwin — starting from variation and ending with adaptation.',
    ],
    objectives: [
      'State the four postulates of natural selection and what each one requires.',
      'Distinguish homology from convergent (analogous) evolution.',
      'Explain how the fossil record documents descent with modification.',
      'Describe what an adaptation is — and why populations adapt, not individuals.',
    ],
    vocabulary: [
      { term: 'Evolution', definition: 'Change in the heritable characteristics of a population over generations; descent with modification.' },
      { term: 'Descent with modification', definition: 'The principle that species are related by common ancestry and change over time.' },
      { term: 'Natural selection', definition: 'The non-random survival and reproduction of individuals with favorable heritable traits.' },
      { term: 'Fitness', definition: "An organism's ability to survive and reproduce relative to others; measured by reproductive output." },
      { term: 'Adaptation', definition: "A heritable trait that increases an organism's fitness in its environment." },
      { term: 'Homology', definition: 'Similarity in structure, genes, or development due to shared ancestry.' },
      { term: 'Analogous structure', definition: 'Similarity in function but not ancestry; the result of convergent evolution.' },
      { term: 'Vestigial structure', definition: 'A reduced remnant of a structure that was functional in an ancestor (e.g., the human tailbone).' },
      { term: 'Fossil', definition: 'Preserved remains or traces of an organism from the past.' },
      { term: 'Biogeography', definition: 'The geographic distribution of species.' },
    ],
    concepts: [
      {
        id: 'variation',
        label: 'Heritable variation',
        plain: 'For evolution to happen, individuals in a population must differ from one another — and those differences must be at least partly passed on to offspring. If everyone were identical, or if the differences were not inherited, selection would have nothing to act on.',
        definition: 'Heritable variation is differences among individuals in a population that are caused by genes and can be transmitted to offspring.',
        analogy: 'Think of a deck of cards: every player holds a different hand (variation), and each hand is dealt again next round (heritability). Selection can only “play” the cards actually in the deck.',
        example: 'In a beetle population, some beetles are green and some are brown because they carry different alleles for body color. Green beetles produce green offspring.',
        vocabulary: [
          { term: 'Heritable', definition: 'Able to be passed from parents to offspring through genes.' },
          { term: 'Population', definition: 'A group of individuals of the same species living in the same area at the same time.' },
          { term: 'Allele', definition: 'One of the alternative versions of a gene.' },
        ],
        check: {
          q: 'Why must variation be heritable for natural selection to cause evolution?',
          a: 'Because selection can only change the population if the favored traits are passed to offspring. Non-heritable variation (like a suntan) is not inherited, so it cannot accumulate across generations.',
        },
      },
      {
        id: 'natural-selection',
        label: 'Natural selection',
        plain: 'Natural selection is not random. Individuals with traits that help them survive and reproduce leave more offspring, so those traits become more common in the next generation. The environment “selects” which variants do best.',
        definition: 'Natural selection is the process by which individuals with certain heritable traits survive and reproduce at higher rates than others, causing those traits to increase in frequency over generations.',
        analogy: 'It is a sieve, not a sculptor. The sieve does not create the pebbles; it just lets the small ones through. Selection does not create variation — it filters it.',
        example: 'In a beetle population, birds spot green beetles more easily on brown soil. Brown beetles survive and reproduce more, so brown becomes more common.',
        vocabulary: [
          { term: 'Selection', definition: 'The differential survival and reproduction of individuals based on heritable traits.' },
          { term: 'Selective pressure', definition: 'An environmental factor that affects which traits are favored.' },
        ],
        check: {
          q: 'Does natural selection act on individuals or on populations, and what is the result?',
          a: 'It acts on individuals (they survive and reproduce, or do not), but the result — evolution — is a change in the population’s traits over generations.',
        },
      },
      {
        id: 'differential-reproduction',
        label: 'Differential reproduction',
        plain: 'Surviving is not enough — you have to reproduce. Individuals that leave more offspring pass on more of their genes. This unequal reproductive success is what actually shifts trait frequencies.',
        definition: 'Differential reproduction is the unequal production of offspring by individuals in a population, such that some individuals contribute more genes to the next generation than others.',
        analogy: 'A race where only the top finishers get to run again next year. Survival gets you to the finish line; reproduction decides whose traits continue.',
        example: 'Two male elephant seals: one defends a large territory and mates with many females; the other mates with none. The successful male’s genes dominate the next generation.',
        vocabulary: [
          { term: 'Reproductive success', definition: 'The number of viable offspring an individual produces.' },
          { term: 'Fitness', definition: 'Relative reproductive success compared with other individuals.' },
        ],
        check: {
          q: 'A trait helps an organism survive much longer, but it never reproduces. Will the trait spread? Why or why not?',
          a: 'No. Fitness is measured by reproduction, not lifespan. If the individual leaves no offspring, the trait is not passed on and cannot increase in the population.',
        },
      },
      {
        id: 'adaptation',
        label: 'Adaptation',
        plain: 'An adaptation is a trait that fits an organism to its environment and boosts its reproductive success. Importantly, populations adapt over generations — an individual cannot “decide” to adapt.',
        definition: "An adaptation is a heritable characteristic that improves an organism's ability to survive and reproduce in its environment.",
        analogy: 'A key that fits a lock. The environment is the lock; an adaptation is a key that happens to fit — and gets copied because it opens the door to more offspring.',
        example: 'The thick, insulating blubber of a seal is an adaptation to cold water; seals with more blubber survive cold better and leave more offspring.',
        vocabulary: [
          { term: 'Adaptation', definition: 'A heritable trait that increases fitness in a particular environment.' },
          { term: 'Acclimation', definition: 'A non-heritable, short-term adjustment by an individual — not evolution.' },
        ],
        check: {
          q: 'A lizard moves to a colder area and its body adjusts over a few weeks. Is that an adaptation? Explain.',
          a: 'No — that is acclimation, a physiological adjustment within one lifetime. An adaptation is a heritable trait that evolves in a population across generations.',
        },
      },
      {
        id: 'homology',
        label: 'Homology',
        plain: 'Homologous structures share a common origin even if they do different jobs now. The same bones build a human arm, a whale flipper, and a bat wing — inherited from a shared ancestor and modified for different uses.',
        definition: 'Homology is similarity in structure, genes, or development resulting from shared ancestry.',
        analogy: 'The same paragraph edited into three different stories. The underlying text (bones) is shared; the endings (functions) diverge.',
        example: 'The forelimbs of humans, cats, whales, and bats all contain the same bones (humerus, radius, ulna, carpals), inherited from a common tetrapod ancestor.',
        vocabulary: [
          { term: 'Homologous structure', definition: 'A structure shared by species because of common ancestry.' },
          { term: 'Vestigial structure', definition: 'A reduced remnant of a structure that had a function in an ancestor.' },
          { term: 'Common ancestor', definition: 'An ancestral species from which two or more later species descend.' },
        ],
        check: {
          q: 'Why is homology considered evidence for evolution?',
          a: 'Because the simplest explanation for shared structures and DNA is inheritance from a common ancestor — the more similar the structures and genes, the more recently the species shared an ancestor.',
        },
      },
      {
        id: 'convergent',
        label: 'Convergent evolution',
        plain: 'Sometimes unrelated species evolve similar traits because they face similar challenges. These are analogous structures — same function, different origins. Convergence happens when natural selection solves the same problem twice.',
        definition: 'Convergent evolution is the independent evolution of similar traits in distantly related lineages, usually because of similar selective pressures; the resulting structures are analogous.',
        analogy: 'Two chefs who never met both invent the same recipe because they had the same ingredients and the same hungry customers.',
        example: 'The streamlined bodies and fins of dolphins (mammals) and sharks (fish) evolved independently for swimming — analogous, not homologous.',
        vocabulary: [
          { term: 'Analogous structure', definition: 'A structure with similar function but different evolutionary origin.' },
          { term: 'Convergent evolution', definition: 'Independent evolution of similar traits in unrelated lineages.' },
        ],
        check: {
          q: 'Bird wings and insect wings both allow flight. Are they homologous or analogous? Why?',
          a: 'Analogous. They serve the same function (flight) but arose independently in different lineages — they do not share a common winged ancestor.',
        },
      },
      {
        id: 'fossil-record',
        label: 'Fossil record',
        plain: 'Fossils are the preserved remains or traces of past life. They show that species have changed over time and that many past species no longer exist. Transitional fossils even capture intermediate forms between major groups.',
        definition: 'The fossil record is the total collection of fossils and their positions in rock layers, documenting the history and change of life over geologic time.',
        analogy: 'A photo album with most pages missing. Even the surviving snapshots show the family changing across the years.',
        example: 'Tiktaalik is a transitional fossil with fish-like fins and tetrapod-like limb bones, showing a step in the water-to-land transition.',
        vocabulary: [
          { term: 'Fossil', definition: 'Preserved remains or traces of an organism from the past.' },
          { term: 'Strata', definition: 'Layers of sedimentary rock; deeper layers are generally older.' },
          { term: 'Transitional fossil', definition: 'A fossil showing features of two related groups, linking ancestor and descendant.' },
        ],
        check: {
          q: 'How does the fossil record support descent with modification?',
          a: 'It shows a sequence of organisms through time: older strata contain more ancestral forms and younger strata contain more derived forms — evidence that lineages change and share ancestry.',
        },
      },
    ],
  },

  ch23: {
    id: 'ch23',
    num: 23,
    title: 'The Evolution of Populations',
    subtitle: 'Microevolution and Hardy–Weinberg',
    bigIdea:
      'Evolution at its smallest scale is a change in allele frequencies within a population. The Hardy–Weinberg model describes what happens when nothing is evolving, and the forces that break it — mutation, selection, drift, and gene flow — are what actually drive change.',
    overview: [
      'A population is the smallest unit that can evolve. Individuals do not evolve; populations do, because evolution is a change in the frequency of alleles from one generation to the next.',
      'The Hardy–Weinberg principle is a null model: if a population is large, mates randomly, and experiences no mutation, no migration, and no selection, allele and genotype frequencies stay constant. When they change, evolution is happening.',
      'Four forces change allele frequencies: mutation (creates new alleles), natural selection (non-random, fitness-based), genetic drift (random, strongest in small populations), and gene flow (movement of alleles between populations).',
    ],
    objectives: [
      'Define population, gene pool, and allele frequency.',
      'Use p + q = 1 and p² + 2pq + q² = 1 to solve problems.',
      'List the five conditions for Hardy–Weinberg equilibrium and the force each rules out.',
      'Compare genetic drift and natural selection, and explain the effect of gene flow.',
    ],
    vocabulary: [
      { term: 'Microevolution', definition: 'Change in allele frequencies in a population over generations.' },
      { term: 'Gene pool', definition: 'All the alleles for all genes in a population.' },
      { term: 'Allele frequency', definition: 'How common a particular allele is in a population (a proportion).' },
      { term: 'Genotype frequency', definition: 'How common a particular genotype is in a population.' },
      { term: 'Hardy–Weinberg equilibrium', definition: 'The state in which allele and genotype frequencies do not change because no evolutionary forces are acting.' },
      { term: 'Genetic drift', definition: 'Random change in allele frequency due to chance, especially in small populations.' },
      { term: 'Gene flow', definition: 'Movement of alleles between populations through migration and interbreeding.' },
      { term: 'Bottleneck effect', definition: 'A drastic reduction in population size that randomly changes allele frequencies.' },
      { term: 'Founder effect', definition: 'Reduced genetic variation when a few individuals start a new population.' },
    ],
    concepts: [
      {
        id: 'population',
        label: 'Population',
        plain: 'A population is a group of individuals of the same species living in the same place at the same time and able to interbreed. It is the unit that evolves, because it shares a gene pool.',
        definition: 'A population is a group of individuals of one species that live in the same area and interbreed, producing fertile offspring; its combined alleles form the gene pool.',
        analogy: 'A community potluck: everyone brings a dish (alleles) to a shared table (the gene pool). What is on the table next year depends on who contributes.',
        example: 'All the field mice in one meadow form a population; their combined alleles for fur color make up the gene pool.',
        vocabulary: [
          { term: 'Gene pool', definition: 'All the alleles present in a population.' },
          { term: 'Interbreed', definition: 'To mate and produce offspring within a group.' },
        ],
        check: {
          q: 'Why is a population, not an individual, the unit of evolution?',
          a: 'Because evolution is a change in allele frequencies in a group. An individual’s genes do not change during its life, but the proportions of alleles in a population can shift across generations.',
        },
      },
      {
        id: 'allele-frequency',
        label: 'Allele frequency',
        plain: 'Allele frequency is simply how common an allele is in a population, written as a decimal or percentage. If 40% of the alleles for a gene are “A”, then p = 0.4. Tracking these frequencies is how we detect evolution.',
        definition: 'Allele frequency is the proportion of a specific allele among all copies of that gene in a population.',
        analogy: 'Like the share of red versus blue marbles in a jar. Evolution is the jar slowly changing its mix.',
        example: 'In a population of 500 flowers there are 1000 alleles for petal color; if 600 are “R”, the frequency of R is 0.6.',
        vocabulary: [
          { term: 'Allele frequency', definition: 'Proportion of a given allele in the gene pool.' },
          { term: 'Fixed allele', definition: 'An allele that is the only version present in a population (frequency = 1).' },
        ],
        check: {
          q: 'A population has 200 individuals, so 400 alleles for a gene. If 120 of those alleles are recessive (q), what is q?',
          a: 'q = 120 / 400 = 0.30.',
        },
      },
      {
        id: 'hardy-weinberg',
        label: 'Hardy–Weinberg equilibrium',
        plain: 'Hardy–Weinberg describes a population that is not evolving: allele and genotype frequencies stay the same generation after generation. It is a null model — a baseline. If real data do not match it, something is changing the population.',
        definition: 'Hardy–Weinberg equilibrium is the condition in which allele and genotype frequencies in a population remain constant because no evolutionary forces (mutation, selection, drift, gene flow, non-random mating) are acting.',
        analogy: 'A perfectly level table. Any tilt tells you a force is pushing — and the tilt is evolution.',
        example: 'A large, randomly mating population with no selection shows the same p and q year after year; it is at equilibrium.',
        vocabulary: [
          { term: 'Null model', definition: 'A baseline expectation used to detect departures that indicate a real effect.' },
          { term: 'Equilibrium', definition: 'A state of no change.' },
        ],
        check: {
          q: 'If a population is in Hardy–Weinberg equilibrium, is it evolving? Why does the model matter?',
          a: 'No, it is not evolving. The model matters because it gives a baseline: when real populations deviate, we know an evolutionary force is at work.',
        },
      },
      {
        id: 'p-q',
        label: 'p + q = 1',
        plain: 'For a gene with two alleles, their frequencies must add up to 1 (100%). p is one allele’s frequency; q is the other’s. If you know one, you know the other.',
        definition: 'p + q = 1 states that the frequencies of the two alleles of a gene (p for one, q for the other) sum to one.',
        analogy: 'A glass that is either full or empty: if it is 30% empty (q = 0.3), it must be 70% full (p = 0.7).',
        example: 'If q = 0.4, then p = 1 − 0.4 = 0.6.',
        vocabulary: [
          { term: 'p', definition: 'Frequency of one allele (often the dominant one).' },
          { term: 'q', definition: 'Frequency of the other allele (often the recessive one).' },
        ],
        check: {
          q: 'If 16% of the alleles in a gene pool are recessive, what is p?',
          a: 'q = 0.16, so p = 1 − 0.16 = 0.84.',
        },
      },
      {
        id: 'genotype-frequency',
        label: 'p² + 2pq + q² = 1',
        plain: 'This equation gives genotype frequencies at equilibrium. p² is the frequency of one homozygote (AA), 2pq is the heterozygote (Aa), and q² is the other homozygote (aa). You can find q from the recessive phenotype, then solve for the rest.',
        definition: 'p² + 2pq + q² = 1 expresses the expected genotype frequencies (AA, Aa, aa) in a population at Hardy–Weinberg equilibrium.',
        analogy: 'Two coin flips: the chance of two heads (p²), one of each (2pq), or two tails (q²).',
        example: 'If q² = 0.16, then q = 0.4 and p = 0.6; so 2pq = 2(0.6)(0.4) = 0.48 (48% heterozygotes).',
        vocabulary: [
          { term: 'Homozygote', definition: 'An individual with two identical alleles for a gene.' },
          { term: 'Heterozygote', definition: 'An individual with two different alleles for a gene.' },
        ],
        check: {
          q: 'In a population of 1000, 160 show the recessive phenotype. Find q and the number of heterozygotes.',
          a: 'q² = 160 / 1000 = 0.16, so q = 0.4 and p = 0.6. Heterozygotes = 2pq = 0.48, i.e., 480 individuals.',
        },
      },
      {
        id: 'genetic-drift',
        label: 'Genetic drift',
        plain: 'Genetic drift is random change in allele frequencies caused by chance, not by fitness. It is strongest in small populations, where random events can wipe out or fix alleles. Bottlenecks and founder effects are examples.',
        definition: 'Genetic drift is a random change in allele frequencies from one generation to the next due to chance sampling of gametes, with larger effects in smaller populations.',
        analogy: 'Flip a coin 10 times and you might get 7 heads; flip it 1000 times and you will get close to 50%. Small samples swing wildly — small populations drift.',
        example: 'A storm randomly kills most flowers, leaving a few by chance; the survivors’ allele frequencies differ from the original population (bottleneck effect).',
        vocabulary: [
          { term: 'Bottleneck effect', definition: 'A random reduction in allele frequencies after a population crash.' },
          { term: 'Founder effect', definition: 'Reduced variation when a small group starts a new population.' },
          { term: 'Sampling error', definition: 'Chance deviation from expected proportions in a small sample.' },
        ],
        check: {
          q: 'Why does genetic drift matter more in a population of 20 than in a population of 20,000?',
          a: 'In a small population, chance events can change allele frequencies dramatically (sampling error is large). In a large population, random fluctuations average out, so drift is weak.',
        },
      },
      {
        id: 'gene-flow',
        label: 'Gene flow',
        plain: 'Gene flow is the movement of alleles between populations when individuals migrate and breed. It tends to make populations more alike and can reduce differences that would otherwise lead to speciation.',
        definition: 'Gene flow is the transfer of alleles into or out of a population due to the movement of fertile individuals or their gametes.',
        analogy: 'Two buckets of paint connected by a pipe: whatever flows between them makes the two colors more similar.',
        example: 'Pollen blowing from one field of flowers to another introduces new alleles, making the two fields more genetically similar.',
        vocabulary: [
          { term: 'Migration', definition: 'Movement of individuals between populations.' },
          { term: 'Homogenize', definition: 'To make more similar or uniform.' },
        ],
        check: {
          q: 'How does gene flow affect the potential for speciation?',
          a: 'Gene flow mixes alleles between populations, making them more similar and reducing divergence — so it tends to prevent speciation.',
        },
      },
      {
        id: 'selection-pressure',
        label: 'Selection as a change agent',
        plain: 'Natural selection is non-random: it favors traits that improve survival and reproduction. It can act in three ways — directional (one extreme favored), stabilizing (middle favored), or disruptive (both extremes favored).',
        definition: 'Selection pressure is the effect of natural selection that changes allele frequencies in a consistent, fitness-based (non-random) direction; it can be directional, stabilizing, or disruptive.',
        analogy: 'A coach picking players: not random like a coin toss — the strongest get chosen, and the team changes over time.',
        example: 'Antibiotic resistance: bacteria with resistance alleles survive treatment and reproduce, so resistance spreads (directional selection).',
        vocabulary: [
          { term: 'Directional selection', definition: 'Favors one extreme phenotype.' },
          { term: 'Stabilizing selection', definition: 'Favors intermediate phenotypes.' },
          { term: 'Disruptive selection', definition: 'Favors both extremes over the middle.' },
        ],
        check: {
          q: 'How is selection different from drift?',
          a: 'Selection is non-random and based on fitness (traits that help survival and reproduction increase). Drift is random chance, unrelated to fitness, and strongest in small populations.',
        },
      },
    ],
  },

  ch24: {
    id: 'ch24',
    num: 24,
    title: 'The Origin of Species',
    subtitle: 'Speciation and reproductive isolation',
    bigIdea:
      'A species is a group whose members can interbreed and produce fertile offspring. Speciation happens when gene flow between populations is interrupted long enough for them to diverge into separate species.',
    overview: [
      'The biological species concept defines a species by reproductive compatibility: members interbreed and produce fertile offspring, and they are reproductively isolated from other groups.',
      'Speciation requires that gene flow stops or is greatly reduced. Allopatric speciation uses a geographic barrier; sympatric speciation happens without one, often through polyploidy or habitat and behavioral shifts.',
      'Reproductive barriers act before fertilization (prezygotic) or after (postzygotic). Where diverged populations meet, hybrid zones reveal whether isolation strengthens or fades.',
    ],
    objectives: [
      'Define a species using the biological species concept and name its limits.',
      'Explain the roles of geographic isolation and gene flow in speciation.',
      'Compare allopatric and sympatric speciation.',
      'Distinguish prezygotic and postzygotic barriers with examples.',
      'Describe what hybrid zones reveal about speciation.',
    ],
    vocabulary: [
      { term: 'Speciation', definition: 'The formation of new species; the splitting of one lineage into two.' },
      { term: 'Reproductive isolation', definition: 'Barriers that prevent members of different species from interbreeding or producing fertile offspring.' },
      { term: 'Allopatric speciation', definition: 'Speciation with a geographic barrier separating populations.' },
      { term: 'Sympatric speciation', definition: 'Speciation without geographic separation.' },
      { term: 'Prezygotic barrier', definition: 'A reproductive barrier that prevents mating or fertilization.' },
      { term: 'Postzygotic barrier', definition: 'A barrier that acts after fertilization (hybrid inviability or sterility).' },
      { term: 'Hybrid zone', definition: 'A region where two species meet and interbreed, producing hybrids.' },
    ],
    concepts: [
      {
        id: 'speciation',
        label: 'Speciation',
        plain: 'Speciation is the birth of a new species — one lineage splitting into two that can no longer interbreed. It is the bridge between microevolution (allele changes) and macroevolution (new species and larger patterns).',
        definition: 'Speciation is the evolutionary process by which one species splits into two or more distinct species.',
        analogy: 'A river that forks into two streams. Once the waters cannot mix, each stream charts its own course.',
        example: 'A single ancestral fish population divided by a new land bridge can evolve into two separate species over time.',
        vocabulary: [
          { term: 'Lineage', definition: 'A line of descent from an ancestor to descendants.' },
          { term: 'Species', definition: 'A group of populations whose members can interbreed and produce fertile offspring.' },
        ],
        check: {
          q: 'What is the key requirement for speciation to occur?',
          a: 'Gene flow between populations must be interrupted or greatly reduced so the populations can diverge independently and become reproductively isolated.',
        },
      },
      {
        id: 'reproductive-isolation',
        label: 'Reproductive isolation',
        plain: 'Reproductive isolation means two groups cannot successfully interbreed — they are separate species. Barriers can stop mating before fertilization (prezygotic) or cause hybrid problems after (postzygotic).',
        definition: 'Reproductive isolation is the existence of biological barriers that prevent members of two species from producing viable, fertile offspring.',
        analogy: 'Two radio stations on the same dial: even if both broadcast, they cannot tune into each other.',
        example: 'Two frog species breed in the same pond but at different times of year (temporal isolation), so they never interbreed.',
        vocabulary: [
          { term: 'Prezygotic barrier', definition: 'Blocks mating or fertilization (e.g., temporal, behavioral, habitat).' },
          { term: 'Postzygotic barrier', definition: 'Reduces hybrid success (e.g., hybrid sterility like a mule).' },
          { term: 'Zygote', definition: 'A fertilized egg.' },
        ],
        check: {
          q: 'Give one prezygotic and one postzygotic barrier and explain how each reduces gene flow.',
          a: 'Prezygotic: temporal isolation (breeding at different times) prevents mating. Postzygotic: hybrid sterility (offspring such as mules cannot reproduce) prevents gene flow after mating.',
        },
      },
      {
        id: 'allopatric',
        label: 'Allopatric speciation',
        plain: 'In allopatric speciation, a physical barrier — a river, mountain, or ocean — splits a population. Separated, the two groups stop exchanging genes and diverge by selection and drift until they become different species.',
        definition: 'Allopatric speciation is speciation that occurs when populations are separated by a geographic barrier that interrupts gene flow.',
        analogy: 'Friends separated by a closed border: over years, their languages and customs drift apart.',
        example: 'Squirrel populations separated by the Grand Canyon evolved into distinct species on the two rims.',
        vocabulary: [
          { term: 'Allopatric', definition: 'Occurring in different geographic areas.' },
          { term: 'Geographic barrier', definition: 'A physical feature that prevents interbreeding (river, mountain, ocean).' },
        ],
        check: {
          q: 'Why does a geographic barrier promote speciation?',
          a: 'It interrupts gene flow between the separated populations, so they can accumulate different mutations and adaptations (by selection and drift) and become reproductively isolated.',
        },
      },
      {
        id: 'sympatric',
        label: 'Sympatric speciation',
        plain: 'Sympatric speciation happens without a geographic barrier — new species arise within the same area. It often involves polyploidy (extra sets of chromosomes) or shifts in habitat, timing, or mate preference.',
        definition: 'Sympatric speciation is speciation that occurs in populations living in the same geographic area, without geographic separation.',
        analogy: 'Two groups in the same city drifting apart because they work different shifts and never meet.',
        example: 'A polyploid plant arises that cannot interbreed with its diploid parents — a new species in the same field.',
        vocabulary: [
          { term: 'Sympatric', definition: 'Occurring in the same geographic area.' },
          { term: 'Polyploidy', definition: 'Having extra sets of chromosomes, often instantly reproductively isolated from the parent species.' },
        ],
        check: {
          q: 'How can sympatric speciation happen without a geographic barrier?',
          a: 'Through mechanisms such as polyploidy, or divergence in habitat use, breeding time, or mate choice that reduces gene flow within the same area.',
        },
      },
      {
        id: 'gene-flow',
        label: 'Gene flow',
        plain: 'Gene flow is the glue that holds a species together. When it stops, populations can diverge; when it continues, it prevents speciation by mixing alleles. Speciation is really about the interruption of gene flow.',
        definition: 'In speciation, gene flow is the movement of alleles between populations; reducing it allows divergence, while maintaining it prevents it.',
        analogy: 'A shared conversation that keeps two people thinking alike. Stop the conversation and they drift apart.',
        example: 'Continuous migration between two beetle populations keeps them genetically similar and prevents them from becoming separate species.',
        vocabulary: [
          { term: 'Gene flow', definition: 'Movement of alleles between populations.' },
          { term: 'Divergence', definition: 'The accumulation of differences between populations.' },
        ],
        check: {
          q: 'What happens to speciation if gene flow remains high between two populations?',
          a: 'Speciation is unlikely — gene flow keeps mixing alleles and prevents the populations from diverging into distinct species.',
        },
      },
      {
        id: 'hybrid',
        label: 'Hybrid zones',
        plain: 'A hybrid zone is where two species meet and interbreed. Depending on how fit the hybrids are, the zone can shrink (isolation strengthens), stay stable, or the species can merge. It is a natural test of how strong reproductive isolation is.',
        definition: 'A hybrid zone is a region where two species overlap and interbreed, producing hybrid offspring; its dynamics reveal the strength of reproductive isolation.',
        analogy: 'A border town where two cultures mix — sometimes the mixing fades, sometimes it blends into one.',
        example: 'Where two toad species meet, hybrids may be less fit, so selection reinforces isolation and the hybrid zone narrows.',
        vocabulary: [
          { term: 'Hybrid', definition: 'Offspring of parents from two different species.' },
          { term: 'Reinforcement', definition: 'Selection that strengthens reproductive isolation when hybrids are unfit.' },
        ],
        check: {
          q: 'If hybrids in a zone are less fit than either parent species, what happens over time?',
          a: 'Selection reinforces reproductive isolation — the species evolve stronger barriers against interbreeding, and the hybrid zone narrows.',
        },
      },
    ],
  },

  ch25: {
    id: 'ch25',
    num: 25,
    title: 'The History of Life on Earth',
    subtitle: 'Macroevolution and deep time',
    bigIdea:
      'Life on Earth spans more than 3.5 billion years, organized on a geologic time scale. Radiometric dating gives absolute ages, the fossil record reveals the sequence of life, and events such as mass extinctions and adaptive radiations shape the large-scale patterns of evolution.',
    overview: [
      'The geologic time scale divides Earth’s history into eons, eras, periods, and epochs. Understanding deep time is essential because evolution’s biggest changes happened over hundreds of millions of years.',
      'Radiometric dating uses the decay of radioactive isotopes (with known half-lives) to assign absolute ages to rocks and fossils.',
      'Mass extinctions remove many species and free up ecological niches; the survivors often undergo adaptive radiation, rapidly diversifying into the open niches.',
    ],
    objectives: [
      'Read the geologic time scale and explain why it feels non-linear to intuition.',
      'Explain how radiometric dating works and what a half-life is.',
      'Describe how mass extinctions set the stage for adaptive radiations.',
      'Distinguish macroevolution from microevolution.',
    ],
    vocabulary: [
      { term: 'Geologic time scale', definition: 'The system that divides Earth’s history into eons, eras, periods, and epochs.' },
      { term: 'Radiometric dating', definition: 'Dating rocks and fossils using the known decay rates of radioactive isotopes.' },
      { term: 'Half-life', definition: 'The time for half of a radioactive isotope to decay.' },
      { term: 'Mass extinction', definition: 'An event in which a large fraction of species goes extinct in a short time.' },
      { term: 'Adaptive radiation', definition: 'Rapid diversification of a lineage into many niches.' },
      { term: 'Macroevolution', definition: 'Large-scale evolutionary change at or above the species level.' },
    ],
    concepts: [
      {
        id: 'geologic-time',
        label: 'Geologic time scale',
        plain: 'The geologic time scale is the calendar of Earth’s history: eons, eras, periods, and epochs. Most of life’s history happened in the Precambrian, and the “recent” eras are compressed at the top — which is why the scale feels non-linear.',
        definition: 'The geologic time scale is a system of chronological divisions (eons, eras, periods, epochs) used to describe the timing and relationships of events in Earth’s history.',
        analogy: 'A 24-hour clock of Earth’s history: humans show up in the last few seconds before midnight.',
        example: 'The Cambrian explosion (about 541 million years ago) marks a rapid diversification of animal life at the start of the Paleozoic era.',
        vocabulary: [
          { term: 'Eon', definition: 'The largest division of geologic time (e.g., Phanerozoic).' },
          { term: 'Era', definition: 'A division of an eon (e.g., Paleozoic, Mesozoic, Cenozoic).' },
          { term: 'Period', definition: 'A division of an era (e.g., Cambrian, Jurassic).' },
        ],
        check: {
          q: 'Why does the geologic time scale seem non-linear compared with our intuition?',
          a: 'Because most of Earth’s history (the Precambrian) is enormously long, while familiar events (such as dinosaurs or humans) are squeezed into the most recent sliver of time.',
        },
      },
      {
        id: 'radiometric',
        label: 'Radiometric dating',
        plain: 'Radioactive isotopes decay at a steady, known rate. By measuring how much parent isotope remains versus daughter product, scientists calculate a rock’s age. The half-life is the time for half the parent to decay.',
        definition: 'Radiometric dating determines the absolute age of a rock or fossil by measuring the ratio of a radioactive parent isotope to its decay product, using the isotope’s known half-life.',
        analogy: 'An hourglass that runs at a fixed rate: the amount of sand left tells you how much time has passed.',
        example: 'Carbon-14 (half-life about 5,730 years) dates recent organic material; uranium-238 (half-life about 4.5 billion years) dates ancient rocks.',
        vocabulary: [
          { term: 'Radioactive decay', definition: 'The spontaneous breakdown of an unstable isotope.' },
          { term: 'Half-life', definition: 'Time for half of a radioactive sample to decay.' },
          { term: 'Parent/daughter isotope', definition: 'The original radioactive isotope and the product it decays into.' },
        ],
        check: {
          q: 'A rock has 25% of its original radioactive parent isotope left. How many half-lives have passed?',
          a: 'Two half-lives: 100% → 50% → 25%.',
        },
      },
      {
        id: 'mass-extinction',
        label: 'Mass extinction',
        plain: 'A mass extinction wipes out a large fraction of species in a short time. It is devastating, but it also clears out competitors and frees ecological niches — which can open the door for the survivors to diversify.',
        definition: 'A mass extinction is an event in which a large proportion of Earth’s species become extinct in a geologically short interval.',
        analogy: 'A forest fire that clears the canopy — tragic, but sunlight now reaches the forest floor and new growth explodes.',
        example: 'The Permian–Triassic extinction (about 252 mya) eliminated roughly 96% of marine species; the Cretaceous extinction (about 66 mya) ended the dinosaurs.',
        vocabulary: [
          { term: 'Extinction', definition: 'The disappearance of a species.' },
          { term: 'Ecological niche', definition: 'The role and resources a species uses in its environment.' },
        ],
        check: {
          q: 'How can a mass extinction lead to new diversity?',
          a: 'By removing many species, it frees up ecological niches; surviving lineages can then diversify rapidly (adaptive radiation) into those open niches.',
        },
      },
      {
        id: 'adaptive-radiation',
        label: 'Adaptive radiation',
        plain: 'Adaptive radiation is rapid diversification: one lineage quickly evolves into many species that fill different niches. It often follows a mass extinction or the colonization of new habitat, such as islands.',
        definition: 'Adaptive radiation is the rapid evolution of many diverse species from a single ancestral lineage, typically when new niches become available.',
        analogy: 'One family opening many different restaurants to fill every craving in a new town.',
        example: 'Darwin’s finches on the Galápagos evolved many beak shapes from one ancestral species, each suited to a different food.',
        vocabulary: [
          { term: 'Adaptive radiation', definition: 'Rapid diversification of one lineage into many niches.' },
          { term: 'Niche', definition: 'The specific role and resources a species uses.' },
        ],
        check: {
          q: 'What two conditions commonly trigger an adaptive radiation?',
          a: 'The availability of new ecological niches — often after a mass extinction or after colonizing new habitat — combined with a founding lineage that can exploit them.',
        },
      },
      {
        id: 'macroevolution',
        label: 'Macroevolution',
        plain: 'Macroevolution is evolution at or above the species level: the origin of new species, the rise and fall of major groups, and the broad patterns in the fossil record. It is what microevolution adds up to over deep time.',
        definition: 'Macroevolution is large-scale evolutionary change at or above the species level, including the origin of new species and major evolutionary trends.',
        analogy: 'Zooming out on a map: microevolution is the streets, macroevolution is the whole country taking shape.',
        example: 'The origin of birds from theropod dinosaurs is a macroevolutionary event built from many microevolutionary changes.',
        vocabulary: [
          { term: 'Macroevolution', definition: 'Large-scale evolutionary change at or above the species level.' },
          { term: 'Microevolution', definition: 'Change in allele frequencies within a population.' },
        ],
        check: {
          q: 'How are microevolution and macroevolution related?',
          a: 'Macroevolution is the accumulation of microevolutionary changes (allele frequency changes) over long timescales, producing new species and large-scale patterns.',
        },
      },
      {
        id: 'fossil',
        label: 'Fossils as evidence',
        plain: 'Fossils are the remains or traces of past organisms preserved in rock. Their position in strata (layers) shows the order in which life changed, and their forms document the sequence of evolution.',
        definition: 'Fossils are preserved remains or traces of past organisms; their distribution in rock strata provides evidence of the history of life.',
        analogy: 'Bookmarks left in the pages of Earth’s history — each layer a page, each fossil a note about what lived then.',
        example: 'Fossils of whales with hind limbs appear in older strata, documenting the transition from land mammals to fully aquatic whales.',
        vocabulary: [
          { term: 'Fossil', definition: 'Preserved remains or traces of a past organism.' },
          { term: 'Strata', definition: 'Layers of sedimentary rock; deeper layers are generally older.' },
        ],
        check: {
          q: 'How do fossils and radiometric dating work together to support macroevolution?',
          a: 'Fossils show the sequence of forms (the order of change), and radiometric dating assigns absolute ages to the rock layers, anchoring that sequence in time.',
        },
      },
    ],
  },

  ch26: {
    id: 'ch26',
    num: 26,
    title: 'Phylogeny and the Tree of Life',
    subtitle: 'Reading and building trees',
    bigIdea:
      'A phylogeny is a hypothesis about evolutionary history, drawn as a branching tree. Shared derived characters define clades, and the principle of maximum parsimony picks the tree that requires the fewest evolutionary changes.',
    overview: [
      'Phylogenies show the evolutionary relationships among organisms. Each branch point (node) represents a common ancestor, and the tips represent species or groups.',
      'A monophyletic group (clade) is an ancestor plus all of its descendants. It is defined by shared derived characters (synapomorphies) — traits that arose in the group’s ancestor.',
      'Because the true history is unknown, biologists compare competing trees and prefer the one requiring the fewest independent changes (maximum parsimony).',
    ],
    objectives: [
      'Read a cladogram: identify nodes, branches, and sister taxa.',
      'Define a monophyletic group and explain how synapomorphies define clades.',
      'Use maximum parsimony to choose among competing trees.',
      'Explain why shared ancestry, not physical similarity, defines relationships.',
    ],
    vocabulary: [
      { term: 'Phylogeny', definition: 'The evolutionary history of a species or group; often shown as a branching tree.' },
      { term: 'Cladogram', definition: 'A branching diagram showing the inferred relationships among taxa.' },
      { term: 'Node', definition: 'A branch point on a tree representing a common ancestor.' },
      { term: 'Monophyletic group', definition: 'An ancestor and all of its descendants; also called a clade.' },
      { term: 'Sister taxa', definition: 'Two groups that share the most recent common ancestor.' },
      { term: 'Synapomorphy', definition: 'A shared derived character that unites a clade.' },
      { term: 'Maximum parsimony', definition: 'The principle of preferring the tree that requires the fewest evolutionary changes.' },
    ],
    concepts: [
      {
        id: 'phylogeny',
        label: 'Phylogeny',
        plain: 'A phylogeny is a hypothesis about how organisms are related by common ancestry, drawn as a branching tree. It shows history, not just similarity — the branches trace descent.',
        definition: 'A phylogeny is the evolutionary history of a species or group of species, typically represented by a branching diagram.',
        analogy: 'A family tree. It shows who descends from whom — not who looks most alike.',
        example: 'A phylogeny of vertebrates places birds inside the reptile branch, showing they share a recent common ancestor with crocodiles.',
        vocabulary: [
          { term: 'Phylogeny', definition: 'The evolutionary history of a group.' },
          { term: 'Taxon', definition: 'Any named group of organisms at any level (species, genus, etc.).' },
        ],
        check: {
          q: 'What does a branch point on a phylogeny represent?',
          a: 'A common ancestor from which the lineages above it diverged.',
        },
      },
      {
        id: 'common-ancestor',
        label: 'Common ancestor',
        plain: 'A common ancestor is a species from which two or more later lineages descend. The more recently two groups shared an ancestor, the more closely related they are.',
        definition: 'A common ancestor is an ancestral species from which two or more descendant lineages evolved.',
        analogy: 'Cousins: you are most closely related to the cousin with whom you share the nearest grandparent.',
        example: 'Humans and chimpanzees share a recent common ancestor, which is why they are more closely related to each other than either is to a gorilla.',
        vocabulary: [
          { term: 'Common ancestor', definition: 'An ancestral species from which later lineages descend.' },
          { term: 'Most recent common ancestor', definition: 'The closest shared ancestor of two groups.' },
        ],
        check: {
          q: 'Two species look very different but share a recent common ancestor. Are they closely related?',
          a: 'Yes. Relatedness is based on shared ancestry, not physical appearance — so they are closely related despite looking different.',
        },
      },
      {
        id: 'monophyletic',
        label: 'Monophyletic group',
        plain: 'A monophyletic group, or clade, is an ancestor plus all of its descendants. It is the only kind of group that reflects true evolutionary history — you cannot leave any descendants out.',
        definition: 'A monophyletic group (clade) consists of an ancestral species and all of its descendants.',
        analogy: 'A complete family reunion: the grandparents plus every descendant, with nobody left off the guest list.',
        example: 'All mammals form a monophyletic group, because they share a single common ancestor and include all of its descendants.',
        vocabulary: [
          { term: 'Monophyletic', definition: 'An ancestor plus all of its descendants.' },
          { term: 'Clade', definition: 'A monophyletic group.' },
        ],
        check: {
          q: 'Why is a group that excludes some descendants not monophyletic?',
          a: 'Because it does not include all descendants of the common ancestor. A true clade must contain the ancestor and every one of its descendants.',
        },
      },
      {
        id: 'sister-taxon',
        label: 'Sister taxa',
        plain: 'Sister taxa are two groups that share the most recent common ancestor. On a tree, they are the two branches coming off the same node. You find them by following branches back to the nearest shared node — not by how close the labels look.',
        definition: 'Sister taxa are two taxa that are each other’s closest relatives because they share a more recent common ancestor with each other than with any other group.',
        analogy: 'Siblings: you share a more recent parent with your sibling than with your cousin.',
        example: 'On a tree of plants, mosses and liverworts may be sister taxa if they share a more recent common ancestor with each other than with any other group.',
        vocabulary: [
          { term: 'Sister taxa', definition: 'Two groups sharing the most recent common ancestor.' },
          { term: 'Node', definition: 'A branch point representing a common ancestor.' },
        ],
        check: {
          q: 'How do you identify the sister taxon of a given species on a cladogram?',
          a: 'Follow the branches back from the species to the nearest node; the other branch coming off that node is the sister taxon.',
        },
      },
      {
        id: 'synapomorphy',
        label: 'Shared derived character',
        plain: 'A synapomorphy is a shared derived character — a trait that arose in the ancestor of a group and is shared by its members. It is the evidence used to define a clade.',
        definition: 'A synapomorphy is a shared derived character that originated in the common ancestor of a clade and is shared by its members.',
        analogy: 'A family surname passed down from a founding ancestor: everyone who carries it belongs to that branch.',
        example: 'Hair and mammary glands are synapomorphies that unite mammals as a clade.',
        vocabulary: [
          { term: 'Synapomorphy', definition: 'A shared derived character uniting a clade.' },
          { term: 'Derived character', definition: 'A trait that arose in the lineage of a group, not before it.' },
        ],
        check: {
          q: 'What is the difference between a shared derived character and a shared ancestral character?',
          a: 'A derived character arose in the ancestor of the group of interest (useful for defining the clade); an ancestral character was already present in a more distant ancestor and is shared more broadly.',
        },
      },
      {
        id: 'cladogram',
        label: 'Cladogram / branch points',
        plain: 'A cladogram is the branching diagram itself. Branch points (nodes) mark common ancestors, and the pattern of branching shows relative relatedness. Rotating branches does not change the relationships.',
        definition: 'A cladogram is a branching diagram that shows the inferred evolutionary relationships among taxa, with nodes representing common ancestors.',
        analogy: 'A mobile hanging from the ceiling: you can spin the arms, but the connections stay the same.',
        example: 'On a cladogram of tetrapods, the node joining amphibians and amniotes marks their common ancestor.',
        vocabulary: [
          { term: 'Cladogram', definition: 'A branching diagram of inferred relationships.' },
          { term: 'Branch', definition: 'A line on the tree representing a lineage over time.' },
        ],
        check: {
          q: 'If you rotate the branches of a cladogram, do the relationships change?',
          a: 'No. Rotating branches at a node does not change the evolutionary relationships; the branching pattern (topology) stays the same.',
        },
      },
      {
        id: 'parsimony',
        label: 'Maximum parsimony',
        plain: 'Maximum parsimony is the principle of choosing the tree that requires the fewest evolutionary changes. It is the simplest explanation for the data, and it is the default rule for building trees.',
        definition: 'Maximum parsimony is the principle that the preferred phylogenetic tree is the one requiring the fewest evolutionary changes.',
        analogy: 'Occam’s razor for trees: the explanation with the fewest coincidences is the best bet.',
        example: 'If tree A needs three character changes and tree B needs five, parsimony prefers tree A.',
        vocabulary: [
          { term: 'Parsimony', definition: 'Preferring the simplest explanation requiring the fewest changes.' },
          { term: 'Character change', definition: 'An evolutionary gain, loss, or modification of a trait on a tree.' },
        ],
        check: {
          q: 'Two trees explain the same data. How does maximum parsimony choose between them?',
          a: 'It counts the evolutionary changes each tree requires and prefers the one with the fewest independent changes.',
        },
      },
    ],
  },

  ch27: {
    id: 'ch27',
    num: 27,
    title: 'Bacteria and Archaea',
    subtitle: 'Prokaryotic diversity',
    bigIdea:
      'Bacteria and Archaea are prokaryotes: small, single-celled organisms with no membrane-bound nucleus. They are enormously diverse in metabolism and can swap genes sideways through horizontal gene transfer, which complicates the tree of life.',
    overview: [
      'Prokaryotes are single-celled organisms that lack a membrane-bound nucleus and other membrane-bound organelles. Their DNA sits in a nucleoid region.',
      'Bacteria and Archaea differ in cell-wall chemistry, membrane lipids, and other features. Bacteria have peptidoglycan cell walls; Archaea do not.',
      'Prokaryotes reproduce quickly by binary fission and can exchange genes through horizontal gene transfer (conjugation, transformation, transduction), which moves genes between lineages.',
    ],
    objectives: [
      'List structural features that distinguish prokaryotes from eukaryotes.',
      'Explain what peptidoglycan is and how Gram staining relates to it.',
      'Describe horizontal gene transfer and its three mechanisms.',
      'Compare Bacteria and Archaea, and describe prokaryotic metabolic diversity.',
    ],
    vocabulary: [
      { term: 'Prokaryote', definition: 'A single-celled organism lacking a membrane-bound nucleus and organelles.' },
      { term: 'Nucleoid', definition: 'The region of a prokaryotic cell where the DNA is located (not membrane-bound).' },
      { term: 'Peptidoglycan', definition: 'The polymer that makes up bacterial cell walls; target of many antibiotics.' },
      { term: 'Gram stain', definition: 'A stain that classifies bacteria by cell-wall structure (Gram-positive vs. Gram-negative).' },
      { term: 'Horizontal gene transfer', definition: 'Movement of genes between organisms other than by parent-to-offspring inheritance.' },
      { term: 'Binary fission', definition: 'Asexual reproduction in which a prokaryote divides into two identical cells.' },
      { term: 'Archaea', definition: 'A domain of prokaryotes distinct from Bacteria, often living in extreme environments.' },
    ],
    concepts: [
      {
        id: 'prokaryote',
        label: 'Prokaryote',
        plain: 'A prokaryote is a single-celled organism with no membrane-bound nucleus or organelles. Its DNA sits in a nucleoid, and it is tiny — usually 1–5 micrometers. Bacteria and Archaea are the two prokaryotic domains.',
        definition: 'A prokaryote is a single-celled organism that lacks a membrane-bound nucleus and other membrane-bound organelles.',
        analogy: 'A studio apartment: everything happens in one open room, with no separate closed-off rooms (organelles).',
        example: 'E. coli is a prokaryote: it has a nucleoid, ribosomes, and a cell wall, but no nucleus or mitochondria.',
        vocabulary: [
          { term: 'Nucleoid', definition: 'The DNA-containing region of a prokaryotic cell.' },
          { term: 'Organelle', definition: 'A membrane-bound structure inside a cell with a specific function.' },
        ],
        check: {
          q: 'Name two features that distinguish a prokaryote from a eukaryote.',
          a: 'Prokaryotes lack a membrane-bound nucleus (DNA is in a nucleoid) and lack membrane-bound organelles such as mitochondria; eukaryotes have both.',
        },
      },
      {
        id: 'peptidoglycan',
        label: 'Peptidoglycan',
        plain: 'Peptidoglycan is the mesh-like polymer that forms bacterial cell walls. Gram-positive bacteria have a thick peptidoglycan layer; Gram-negative bacteria have a thin layer plus an outer membrane. Many antibiotics attack peptidoglycan.',
        definition: 'Peptidoglycan is a polymer of sugars and amino acids that forms the cell wall of bacteria, providing structural support and shape.',
        analogy: 'A brick wall around the cell: strong, mesh-like, and essential for keeping the cell from bursting.',
        example: 'Penicillin works by blocking peptidoglycan synthesis, weakening the bacterial cell wall so the cell bursts.',
        vocabulary: [
          { term: 'Gram-positive', definition: 'Bacteria with a thick peptidoglycan wall that stains purple.' },
          { term: 'Gram-negative', definition: 'Bacteria with a thin peptidoglycan layer and an outer membrane that stains pink.' },
        ],
        check: {
          q: 'Why is peptidoglycan a good target for antibiotics?',
          a: 'It is essential for bacterial cell walls and is absent in human cells, so drugs that block its synthesis kill bacteria while sparing human cells.',
        },
      },
      {
        id: 'hgt',
        label: 'Horizontal gene transfer',
        plain: 'Horizontal gene transfer (HGT) is the movement of genes between organisms that are not parent and offspring. It lets bacteria share useful genes — like antibiotic resistance — across lineages, which blurs the tree of life.',
        definition: 'Horizontal gene transfer is the transfer of genetic material between organisms by means other than reproduction, including conjugation, transformation, and transduction.',
        analogy: 'Sharing files between laptops over Wi-Fi instead of copying them to a child device — genes move sideways, not just downward.',
        example: 'A resistance gene can pass from one bacterial species to another by conjugation, spreading resistance through a population.',
        vocabulary: [
          { term: 'Conjugation', definition: 'Gene transfer through direct cell-to-cell contact via a pilus.' },
          { term: 'Transformation', definition: 'Uptake of free DNA from the environment.' },
          { term: 'Transduction', definition: 'Gene transfer by a bacteriophage (virus).' },
        ],
        check: {
          q: 'Why does horizontal gene transfer complicate the idea of a simple tree of life for prokaryotes?',
          a: 'Because genes can move between unrelated lineages, so a single gene’s history may differ from the organism’s history — relationships are not purely tree-like.',
        },
      },
      {
        id: 'archaea',
        label: 'Archaea',
        plain: 'Archaea are a domain of prokaryotes distinct from Bacteria. They often live in extreme environments (hot springs, salt lakes, deep sea vents) and include methanogens. Their cell walls and membrane lipids differ from bacteria.',
        definition: 'Archaea are a domain of single-celled prokaryotes that differ from bacteria in cell-wall chemistry, membrane lipids, and molecular features; many are extremophiles.',
        analogy: 'The hardy cousins of bacteria — they thrive where most life cannot survive.',
        example: 'Methanogens are Archaea that live in oxygen-free environments and produce methane.',
        vocabulary: [
          { term: 'Extremophile', definition: 'An organism that thrives in extreme environments.' },
          { term: 'Methanogen', definition: 'An Archaean that produces methane as a byproduct of metabolism.' },
        ],
        check: {
          q: 'Give two ways Archaea differ from Bacteria.',
          a: 'Archaea lack peptidoglycan in their cell walls and have different membrane lipids (and different molecular machinery); many also live in extreme environments.',
        },
      },
      {
        id: 'binary-fission',
        label: 'Binary fission',
        plain: 'Binary fission is how prokaryotes reproduce: one cell divides into two identical cells. It is asexual and fast — some bacteria double every 20 minutes — so populations can grow explosively.',
        definition: 'Binary fission is a form of asexual reproduction in which a prokaryotic cell divides into two genetically identical daughter cells.',
        analogy: 'Photocopying a document: one copy becomes two, then four, then eight — doubling each time.',
        example: 'Under ideal conditions, E. coli can divide every 20 minutes, so one cell can become millions in hours.',
        vocabulary: [
          { term: 'Binary fission', definition: 'Asexual division of a prokaryote into two identical cells.' },
          { term: 'Asexual reproduction', definition: 'Reproduction without the fusion of gametes, producing identical offspring.' },
        ],
        check: {
          q: 'Why does binary fission allow rapid evolution in bacteria?',
          a: 'Because populations grow and reproduce very quickly, so beneficial mutations and transferred genes can spread through a population in a short time.',
        },
      },
      {
        id: 'metabolic',
        label: 'Metabolic diversity',
        plain: 'Prokaryotes use a huge range of metabolisms. Autotrophs make their own food (some photosynthesize, some use chemicals); heterotrophs consume organic matter. Some bacteria fix nitrogen, converting atmospheric N₂ into usable forms.',
        definition: 'Metabolic diversity is the wide range of ways prokaryotes obtain energy and carbon, including photoautotrophy, chemoautotrophy, heterotrophy, and nitrogen fixation.',
        analogy: 'A neighborhood where everyone earns a living differently — some grow food, some cook, some fix things — so the whole community can survive.',
        example: 'Rhizobium bacteria live in plant root nodules and fix nitrogen, converting N₂ into ammonia the plant can use.',
        vocabulary: [
          { term: 'Autotroph', definition: 'An organism that makes its own organic food.' },
          { term: 'Heterotroph', definition: 'An organism that consumes organic matter for energy and carbon.' },
          { term: 'Nitrogen fixation', definition: 'Conversion of atmospheric N₂ into ammonia or related compounds usable by cells.' },
        ],
        check: {
          q: 'Contrast an autotrophic and a heterotrophic prokaryote.',
          a: 'An autotroph makes its own organic food (via photosynthesis or chemosynthesis); a heterotroph must consume organic matter produced by others.',
        },
      },
    ],
  },

  ch28: {
    id: 'ch28',
    num: 28,
    title: 'Protists',
    subtitle: 'Eukaryotic origins and diversity',
    bigIdea:
      'Protists are the mostly unicellular eukaryotes. They are not one natural group but a huge diversity of lineages, and they reveal how eukaryotes arose — including the endosymbiotic origin of mitochondria and chloroplasts.',
    overview: [
      'Protists are mostly single-celled eukaryotes. The word “protist” describes a grade of organization, not a single clade — protists are a diverse collection of lineages.',
      'Eukaryotic cells arose from prokaryotic ancestors, and key organelles — mitochondria and chloroplasts — originated by endosymbiosis, when a host cell engulfed a prokaryote that became permanent.',
      'Protists show enormous nutritional diversity: some are photosynthetic autotrophs (algae), others are heterotrophs that ingest or absorb food, and some do both.',
    ],
    objectives: [
      'Explain what a protist is and why the group is not monophyletic.',
      'Describe the theory of endosymbiosis and the evidence for it.',
      'Distinguish primary and secondary endosymbiosis.',
      'Contrast autotrophic and heterotrophic protists with examples.',
    ],
    vocabulary: [
      { term: 'Protist', definition: 'A mostly unicellular eukaryote; a diverse collection of lineages, not a single clade.' },
      { term: 'Eukaryote', definition: 'An organism whose cells have a membrane-bound nucleus and organelles.' },
      { term: 'Endosymbiosis', definition: 'One organism living inside another; in evolution, the origin of mitochondria and chloroplasts from engulfed prokaryotes.' },
      { term: 'Primary endosymbiosis', definition: 'A eukaryote engulfing a prokaryote that becomes an organelle (mitochondria, chloroplasts).' },
      { term: 'Secondary endosymbiosis', definition: 'A eukaryote engulfing another eukaryote that already had a plastid.' },
      { term: 'Algae', definition: 'Photosynthetic protists.' },
    ],
    concepts: [
      {
        id: 'protist',
        label: 'Protist',
        plain: 'A protist is a mostly single-celled eukaryote. The term covers a huge range of organisms — from amoebas to giant kelp — and does not describe a single evolutionary group. It is a convenient label for eukaryotes that are not plants, animals, or fungi.',
        definition: 'A protist is a member of a diverse group of mostly unicellular eukaryotes that are not classified as plants, animals, or fungi; the group is not monophyletic.',
        analogy: 'A junk drawer: useful to describe “everything else,” but the items inside are not really one family.',
        example: 'Amoebas, Paramecium, and giant kelp are all protists, yet they are only distantly related.',
        vocabulary: [
          { term: 'Protist', definition: 'A mostly unicellular eukaryote; a grade, not a clade.' },
          { term: 'Monophyletic', definition: 'An ancestor plus all of its descendants.' },
        ],
        check: {
          q: 'Why is “protist” not a monophyletic group?',
          a: 'Because it is defined by what organisms are not (not plants, animals, or fungi) rather than by shared ancestry, so it does not include a single ancestor and all its descendants.',
        },
      },
      {
        id: 'eukaryote',
        label: 'Eukaryote',
        plain: 'A eukaryote is an organism whose cells have a membrane-bound nucleus and organelles. Eukaryotic cells are larger and more complex than prokaryotic cells, and they include protists, plants, animals, and fungi.',
        definition: 'A eukaryote is an organism whose cells contain a membrane-bound nucleus and other membrane-bound organelles.',
        analogy: 'A house with separate rooms: the nucleus is the office, mitochondria are the power plant, and each has its own walls.',
        example: 'A Paramecium is a eukaryotic protist: it has a nucleus, mitochondria, and other organelles.',
        vocabulary: [
          { term: 'Nucleus', definition: 'The membrane-bound organelle that contains a eukaryotic cell’s DNA.' },
          { term: 'Organelle', definition: 'A membrane-bound structure with a specific function inside a cell.' },
        ],
        check: {
          q: 'What defines a eukaryotic cell?',
          a: 'The presence of a membrane-bound nucleus and other membrane-bound organelles.',
        },
      },
      {
        id: 'endosymbiosis',
        label: 'Endosymbiosis',
        plain: 'Endosymbiosis explains where mitochondria and chloroplasts came from: an ancestral eukaryotic cell engulfed a prokaryote, and instead of digesting it, kept it. The engulfed cell became a permanent organelle.',
        definition: 'Endosymbiosis is the theory that mitochondria and chloroplasts originated from free-living prokaryotes that were engulfed by a host cell and became permanent organelles.',
        analogy: 'Hiring a specialist to live in your house forever: they handle one job (energy) and you both thrive.',
        example: 'Mitochondria descend from engulfed aerobic bacteria; chloroplasts descend from engulfed photosynthetic cyanobacteria.',
        vocabulary: [
          { term: 'Endosymbiont', definition: 'An organism that lives inside another organism.' },
          { term: 'Plastid', definition: 'A plant or algal organelle such as a chloroplast.' },
        ],
        check: {
          q: 'What evidence supports the endosymbiotic origin of mitochondria and chloroplasts?',
          a: 'They have their own circular DNA, double membranes, and bacteria-like ribosomes, and they divide on their own — all consistent with descent from engulfed prokaryotes.',
        },
      },
      {
        id: 'algae',
        label: 'Algae',
        plain: 'Algae are photosynthetic protists. They range from single cells to giant kelp and are major primary producers in aquatic ecosystems, using chloroplasts to convert sunlight into food.',
        definition: 'Algae are photosynthetic protists; they may be unicellular, colonial, or multicellular.',
        analogy: 'The grass of the ocean: small and numerous, but they feed the entire food web.',
        example: 'Diatoms are single-celled algae with glass-like silica shells; kelp is a giant multicellular alga.',
        vocabulary: [
          { term: 'Algae', definition: 'Photosynthetic protists.' },
          { term: 'Primary producer', definition: 'An organism that makes organic food from inorganic matter, forming the base of a food web.' },
        ],
        check: {
          q: 'Why are algae ecologically important?',
          a: 'They are major primary producers in aquatic ecosystems, converting sunlight into organic matter that supports food webs.',
        },
      },
      {
        id: 'heterotroph',
        label: 'Heterotrophy',
        plain: 'Heterotrophic protists cannot make their own food — they ingest or absorb organic matter. Some hunt bacteria, some absorb nutrients from dead material, and some are parasites.',
        definition: 'Heterotrophy in protists is the nutrition mode in which organisms obtain carbon and energy by ingesting or absorbing organic matter.',
        analogy: 'Eating out instead of cooking: you rely on food made by others.',
        example: 'Amoebas engulf food particles by phagocytosis; some parasitic protists absorb nutrients from their hosts.',
        vocabulary: [
          { term: 'Heterotroph', definition: 'An organism that consumes organic matter for energy and carbon.' },
          { term: 'Phagocytosis', definition: 'Cellular “eating” by engulfing particles or other cells.' },
        ],
        check: {
          q: 'Give two ways heterotrophic protists obtain food.',
          a: 'They can ingest food particles (e.g., amoebas by phagocytosis) or absorb dissolved nutrients (e.g., some parasites and decomposers).',
        },
      },
      {
        id: 'autotroph',
        label: 'Autotrophy',
        plain: 'Autotrophic protists make their own food, usually by photosynthesis. They use chloroplasts to capture light energy and build sugars from carbon dioxide and water.',
        definition: 'Autotrophy in protists is the nutrition mode in which organisms produce their own organic food, typically through photosynthesis.',
        analogy: 'Growing your own vegetables: you make your own food from raw materials and sunlight.',
        example: 'Euglena is a photosynthetic protist that can also feed heterotrophically when light is scarce.',
        vocabulary: [
          { term: 'Autotroph', definition: 'An organism that makes its own organic food.' },
          { term: 'Photosynthesis', definition: 'Using light energy to convert CO₂ and water into sugars.' },
        ],
        check: {
          q: 'How do autotrophic protists get their energy and carbon?',
          a: 'They photosynthesize — capturing light energy to build organic molecules from carbon dioxide and water.',
        },
      },
      {
        id: 'secondary-endosymbiosis',
        label: 'Secondary endosymbiosis',
        plain: 'Secondary endosymbiosis is when a eukaryote engulfs another eukaryote that already contains a chloroplast. The result is a plastid with extra membranes. This is how many algal groups got their chloroplasts.',
        definition: 'Secondary endosymbiosis is the process in which a eukaryotic host engulfs another eukaryotic cell that already contains a plastid, giving rise to lineages with plastids surrounded by additional membranes.',
        analogy: 'Buying a food truck that already has a kitchen inside, instead of building your own kitchen from scratch.',
        example: 'Dinoflagellates and diatoms acquired their chloroplasts through secondary endosymbiosis, so their plastids have extra membranes.',
        vocabulary: [
          { term: 'Secondary endosymbiosis', definition: 'A eukaryote engulfing another eukaryote that already had a plastid.' },
          { term: 'Plastid', definition: 'A plant or algal organelle such as a chloroplast.' },
        ],
        check: {
          q: 'How does secondary endosymbiosis differ from primary endosymbiosis?',
          a: 'In primary endosymbiosis a eukaryote engulfs a prokaryote; in secondary endosymbiosis a eukaryote engulfs another eukaryote that already contains a plastid, so the resulting plastid has extra membranes.',
        },
      },
    ],
  },
};

export function getLesson(chapterId) {
  return CHAPTER_LESSONS[chapterId] || null;
}

export const LESSON_LIST = Object.values(CHAPTER_LESSONS);

// Counts used by the UI and progress selectors.
export function lessonConceptCount(chapterId) {
  const l = CHAPTER_LESSONS[chapterId];
  return l ? l.concepts.length : 0;
}

export function lessonVocabCount(chapterId) {
  const l = CHAPTER_LESSONS[chapterId];
  if (!l) return 0;
  const set = new Set(l.vocabulary.map((v) => v.term.toLowerCase()));
  l.concepts.forEach((c) => (c.vocabulary || []).forEach((v) => set.add(v.term.toLowerCase())));
  return set.size;
}

// A flattened, de-duplicated vocabulary list for a chapter (glossary view).
export function lessonGlossary(chapterId) {
  const l = CHAPTER_LESSONS[chapterId];
  if (!l) return [];
  const seen = new Map();
  l.vocabulary.forEach((v) => {
    const key = v.term.toLowerCase();
    if (!seen.has(key)) seen.set(key, { ...v, scope: 'Chapter' });
  });
  l.concepts.forEach((c) => {
    (c.vocabulary || []).forEach((v) => {
      const key = v.term.toLowerCase();
      if (!seen.has(key)) seen.set(key, { ...v, scope: c.label });
    });
  });
  return Array.from(seen.values());
}
