// Small summary for the home page, so it doesn't load every walkthrough up front.
// `npm run check` fails if these numbers drift from the real content.
export const summary = {
  walkthroughs: 11,
  byChapter: { 22: 1, 23: 4, 25: 1, 26: 3, 27: 1, 28: 1 },
  practiceQuestions: 80,
  // course file path -> walkthrough id, for the 🎓 Tutor links in the library
  fileToWalkthrough: {
    "08 CH 22- Descent with Modification, A Darwinian View of Life (/INTRODUCTORY ACTIVITY using balls and coins.pdf": "ch22-balls-coins",
    "08 CH 22- Descent with Modification, A Darwinian View of Life (/ANSWER keys for BALL and COINS dichotomous keys.pdf": "ch22-balls-coins",
    "08 CH 22- Descent with Modification, A Darwinian View of Life (/STEP by STEP ANSWER KEY for COINS.pptx": "ch22-balls-coins",
    "09 CH 23- The Evolution of Populations/simple HW example to work in class STUDENT HANDOUT.pdf": "ch23-hw-intro",
    "09 CH 23- The Evolution of Populations/simple HW example to work in class ANSWERS.pdf": "ch23-hw-intro",
    "09 CH 23- The Evolution of Populations/HW practice problems.pdf": "ch23-hw-practice",
    "09 CH 23- The Evolution of Populations/HW practice problems ANSWER KEY.pdf": "ch23-hw-practice",
    "09 CH 23- The Evolution of Populations/QUIZ Hardy Weinberg problems homework.pdf": "ch23-quiz",
    "09 CH 23- The Evolution of Populations/QUIZ Hardy Weinberg problems homework ANSWERS EMBEDDED.pdf": "ch23-quiz",
    "09 CH 23- The Evolution of Populations/MORE HW problems CLASS ACTIVITY.pdf": "ch23-more-hw",
    "09 CH 23- The Evolution of Populations/MORE HW problems CLASS ACTIVITY ANSWER KEY.pdf": "ch23-more-hw",
    "11 CH 25- The History of Life on Earth/ACTIVITY CH 25 questions.pdf": "ch25-activity",
    "11 CH 25- The History of Life on Earth/ACTIVITY CH 25 questions ANSWERS.pdf": "ch25-activity",
    "13 CH 26- Phylogeny and the Tree of Life/Ch 26 Systematics MOODLE exercise.pdf": "ch26-systematics",
    "13 CH 26- Phylogeny and the Tree of Life/CH 26 Systematics MOODLE exercise ANSWERS.pdf": "ch26-systematics",
    "13 CH 26- Phylogeny and the Tree of Life/Reindeer cladogram in-class exercise.pdf": "ch26-reindeer",
    "13 CH 26- Phylogeny and the Tree of Life/Reindeer cladogram in-class exercise and ANSWER KEY.pdf": "ch26-reindeer",
    "13 CH 26- Phylogeny and the Tree of Life/Cladogram building exercise v8 ANSWERS.pdf": "ch26-cladogram-v8",
    "13 CH 26- Phylogeny and the Tree of Life/Tree Building Exercise Example Men In Hats.pptx": "ch26-cladogram-v8",
    "14 CH 27- Bacteria and Archaea/ACTIVITY CH 27 questions.pdf": "ch27-activity",
    "15 CH 28- Protists/ACTIVITY CH 28 questions.pdf": "ch28-activity"
  },
};
