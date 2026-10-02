# BIOL 1202 Course Hub (BioStudy)

Study site for **BIOL 1202, General Biology II (Fall 2026)**. It organizes the course files in this repository and adds a step-by-step tutor for the assignments.

## What's in the site

- **Step-by-step tutor** (`#/tutor`): 11 assignment walkthroughs covering CH 22–28. Each step asks a guiding question, checks your number (with a warning when the format is wrong, e.g. 0.36 when Moodle wants 36.0), offers a hint, then reveals the worked step. Progress is saved in your browser.
- **Hardy–Weinberg drills** (`#/practice/hw`): unlimited random problems checked step by step.
- **Exam 1 practice** (`#/practice`): the 80 CH 22–25 review questions, with an explanation for every answer and a filter for the ones you missed.
- **Course library** (`#/materials`): search and filter every course file, open it on GitHub or download it. Files that have a walkthrough get a 🎓 link.

## Adding new course files (CH 29, CH 30, EXAM 2…)

Put the new folder (for example `16 CH 29- …`) at the repo root and commit. The file catalog (`src/course-files.json`) is **regenerated automatically** by `scripts/build-catalog.mjs` before every `npm run dev` and `npm run build`, including on Vercel. No hand-editing needed.

To add a walkthrough, add an entry to `src/tutor/content-ch25-28.js` (or a new `content-*.js` file listed in `src/tutor/index.js`), then run `npm run check`. The check fails if a walkthrough links to a file that doesn't exist or a step is missing a question or explanation.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run check    # validate tutor content
npm run build && npm run preview
```

## Deploy (Vercel)

Framework preset **Vite**, build command `npm run build`, output directory `dist`. No environment variables are needed.

## Project layout

```
scripts/build-catalog.mjs   regenerates src/course-files.json from the course folders
scripts/check-content.mjs   validates the tutor content
src/App.jsx                 layout + hash routes (#/, #/tutor, #/tutor/:id, #/practice, #/practice/hw, #/materials)
src/components/             Overview, Library, TutorHome, Walkthrough, Practice, HWPractice
src/tutor/                  walkthrough content (CH 22–23, CH 25–28) and the Exam 1 question bank
```

Walkthroughs marked **“Tutor explanation: no official key posted yet”** (CH 27 and CH 28 activities) were written from the Campbell Biology chapters. Compare them with the instructor's key when it is posted.
