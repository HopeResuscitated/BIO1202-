import { useEffect, useState, useCallback } from 'react';
import catalog from './course-files.json';

export { catalog };

const REPO = catalog.repository;
const enc = p => p.split('/').map(encodeURIComponent).join('/');
export const viewUrl = path => `${REPO}/blob/main/${enc(path)}`;
export const rawUrl = path => `${REPO}/raw/main/${enc(path)}`;
export const fileName = path => path.split('/').pop();

export const isChapter = c => /^\d{2} CH/.test(c);
export const chapterNum = c => Number(c.match(/CH\s*(\d+)/)?.[1]);
export const chapterTitle = c => c.replace(/^\d+\s+CH\s*\d+[-:]?\s*/, '').replace(/\s*\($/, '');
export const chapters = catalog.categories.filter(isChapter);

export const fileIcon = ext => ({ pdf: 'PDF', pptx: 'PPT', ppt: 'PPT', docx: 'DOC', doc: 'DOC', xlsx: 'XLS', html: 'WEB', txt: 'TXT' }[ext] || 'FILE');
export const fileSize = n => (n > 1e6 ? (n / 1e6).toFixed(1) + ' MB' : n > 1000 ? Math.round(n / 1000) + ' KB' : '');

// --- tiny hash router: #/path?query ---
const parse = () => {
  const [path, qs = ''] = (window.location.hash.slice(1) || '/').split('?');
  return { path, params: new URLSearchParams(qs) };
};
export function useRoute() {
  const [route, setRoute] = useState(parse);
  useEffect(() => {
    const on = () => { setRoute(parse()); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return route;
}
export const href = (path, params) => '#' + path + (params ? '?' + new URLSearchParams(params) : '');

// --- progress saved in this browser (safe if storage is blocked) ---
const KEY = 'biostudy-progress-v1';
const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };
export function useProgress() {
  const [state, setState] = useState(load);
  const update = useCallback(fn => setState(prev => {
    const next = fn(prev);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* storage unavailable */ }
    return next;
  }), []);
  return [state, update];
}

export { checkNumber } from './lib-check.js';
