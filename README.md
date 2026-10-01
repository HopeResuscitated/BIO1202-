# BIOL 1202 Course Hub

Responsive student portal for **BIOL 1202 — General Biology II (Fall 2026)**. The app organizes the course files already stored in this repository into a searchable course dashboard.

## Features
- Course overview and resource counts
- Chapter library for Chapters 22–28
- Search by file name, folder, and path
- Category filters for course information, syllabus, announcements, and exams
- Direct links to the original files in this repository
- Responsive layout for desktop, tablet, and mobile

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Deploy to Vercel
Import this repository in Vercel. Use build command `npm run build` and output directory `dist`.

The searchable catalog is stored in `src/course-files.json` and mirrored to `public/course-files.json`; update the catalog when adding new course materials. Course documents remain in their existing folders, and the portal links to those files rather than duplicating large slides and PDFs.
