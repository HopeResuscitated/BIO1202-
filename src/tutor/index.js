import { ch22_23 } from './content-ch22-23.js';
import { ch25_28 } from './content-ch25-28.js';

export const assignments = [...ch22_23, ...ch25_28];
export const byId = id => assignments.find(a => a.id === id);
export const stepCount = a => a.problems.reduce((n, p) => n + p.steps.length, 0);
