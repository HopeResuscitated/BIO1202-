// Markdown + math rendering for tutor and chapter-lesson replies.
import { marked } from 'marked';
import katex from 'katex';

marked.setOptions({ gfm: true, breaks: true });

function renderKatex(expr, display) {
  try {
    return katex.renderToString(String(expr).trim(), { displayMode: !!display, throwOnError: false });
  } catch {
    return `<code>${String(expr).replace(/</g, '&lt;')}</code>`;
  }
}

export function renderMarkdown(src) {
  if (!src) return '';
  const math = [];
  let text = String(src);

  text = text.replace(/\$\$([\s\S]+?)\$\$/g, (_m, expr) => `@@MATH${math.push(renderKatex(expr, true)) - 1}@@`);
  text = text.replace(/\\\[([\s\S]+?)\\\]/g, (_m, expr) => `@@MATH${math.push(renderKatex(expr, true)) - 1}@@`);
  text = text.replace(/\$([^$\n]+?)\$/g, (_m, expr) => `@@MATH${math.push(renderKatex(expr, false)) - 1}@@`);
  text = text.replace(/\\\(([\s\S]+?)\\\)/g, (_m, expr) => `@@MATH${math.push(renderKatex(expr, false)) - 1}@@`);

  let html = marked.parse(text);
  html = html.replace(/@@MATH(\d+)@@/g, (_m, i) => math[Number(i)] || '');
  return html;
}
