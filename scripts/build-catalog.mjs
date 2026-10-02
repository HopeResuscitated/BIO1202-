// Regenerates src/course-files.json from the course folders in this repo.
// Runs automatically before `npm run dev` and `npm run build`, so new files
// (for example CH 29 / CH 30 / EXAM 2 folders) show up on the site without hand-editing.
import { readdirSync, statSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, extname } from 'node:path';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const REPO = 'https://github.com/HopeResuscitated/BIO1202-';
const SKIP = new Set(['node_modules', 'dist', 'src', 'public', 'scripts', '.git', '.github', '.vercel']);
const ROOT_FILES = /\.(html|pdf|docx?|pptx?|xlsx?|txt)$/i; // course files kept at the repo root

const enc = p => p.split('/').map(encodeURIComponent).join('/');
const title = name => name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim();

function walk(dir, rel = '') {
  return readdirSync(dir, { withFileTypes: true }).flatMap(e => {
    if (e.name.startsWith('.')) return [];
    const r = rel ? `${rel}/${e.name}` : e.name;
    return e.isDirectory() ? walk(join(dir, e.name), r) : [r];
  });
}

const files = [];
const categories = [];
for (const e of readdirSync(ROOT, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
  if (e.name.startsWith('.') || SKIP.has(e.name)) continue;
  if (e.isDirectory()) {
    categories.push(e.name);
    for (const r of walk(join(ROOT, e.name)).sort()) files.push({ path: `${e.name}/${r}`, category: e.name });
  } else if (ROOT_FILES.test(e.name) && e.name !== 'index.html') {
    files.push({ path: e.name, category: 'Course home' });
  }
}
if (files.some(f => f.category === 'Course home')) categories.push('Course home');

const out = {
  course: 'BIOL 1202',
  term: 'Fall 2026',
  repository: REPO,
  categories,
  files: files.map(({ path, category }) => {
    const filename = path.split('/').pop();
    return { path, category, filename, title: title(filename), ext: extname(filename).slice(1).toLowerCase(), size: statSync(join(ROOT, path)).size, url: `${REPO}/blob/main/${enc(path)}` };
  }),
};
writeFileSync(join(ROOT, 'src/course-files.json'), JSON.stringify(out, null, 2) + '\n');
console.log(`course catalog: ${out.files.length} files in ${categories.length} sections`);
