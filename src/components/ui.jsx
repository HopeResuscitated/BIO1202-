import React from 'react';
import { renderMarkdown } from '../lib/markdown.js';

export function Markdown({ children, className }) {
  return <div className={'md ' + (className || '')} dangerouslySetInnerHTML={{ __html: renderMarkdown(children || '') }} />;
}

export function Badge({ tone = 'neutral', children }) {
  return <span className={'badge badge-' + tone}>{children}</span>;
}

export function Empty({ title, children, action }) {
  return (
    <div className="empty" role="status">
      <b>{title}</b>
      {children && <p>{children}</p>}
      {action}
    </div>
  );
}

export function ErrorState({ title = 'Something went wrong', detail, onRetry, retryLabel = 'Try again' }) {
  return (
    <div className="errorstate" role="alert">
      <b>{title}</b>
      {detail && <p>{detail}</p>}
      {onRetry && <button className="rowbtn" onClick={onRetry}>{retryLabel}</button>}
    </div>
  );
}

export function Spinner({ label = 'Loading…' }) {
  return (
    <div className="spinner" role="status" aria-live="polite">
      <span className="dot" /><span className="dot" /><span className="dot" />
      <small>{label}</small>
    </div>
  );
}

export function ProgressBar({ value, max, label }) {
  const pct = max ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div className="progress" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} aria-label={label}>
      <span style={{ width: pct + '%' }} />
    </div>
  );
}

export function Field({ label, hint, children, id }) {
  return (
    <label className="field" htmlFor={id}>
      <span className="fieldlabel">{label}</span>
      {children}
      {hint && <small className="fieldhint">{hint}</small>}
    </label>
  );
}
