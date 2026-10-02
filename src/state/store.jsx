import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

export const STORAGE_KEY = 'biostudy-1202-v2';
const SCHEMA_VERSION = 2;

const DEFAULT_STATE = {
  version: SCHEMA_VERSION,
  profile: { name: 'Student', email: '', school: 'Louisiana State University', role: 'Student', memberSince: new Date().toISOString().slice(0, 10) },
  prefs: { theme: 'light', density: 'comfortable', reduceMotion: false, dailyGoal: 3 },
  hidden: [],
  understood: [],
  study: {},
  // "Teach me this chapter" progress: chapterId -> { concepts: { [id]: true }, teachback: '' }
  teach: {},
};

function migrate(raw) {
  if (!raw || typeof raw !== 'object') return DEFAULT_STATE;
  const next = {
    ...DEFAULT_STATE,
    ...raw,
    version: SCHEMA_VERSION,
    profile: { ...DEFAULT_STATE.profile, ...(raw.profile || {}) },
    prefs: { ...DEFAULT_STATE.prefs, ...(raw.prefs || {}) },
    teach: { ...(raw.teach || {}) },
  };
  // Drop the legacy College Advisor block if an older backup still carries it.
  delete next.advisor;
  return next;
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    return migrate(JSON.parse(raw));
  } catch {
    return DEFAULT_STATE;
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_PROFILE':
      return { ...state, profile: { ...state.profile, ...action.patch } };
    case 'SET_PREFS':
      return { ...state, prefs: { ...state.prefs, ...action.patch } };
    case 'TOGGLE_HIDDEN': {
      const has = state.hidden.includes(action.path);
      return { ...state, hidden: has ? state.hidden.filter((p) => p !== action.path) : [...state.hidden, action.path] };
    }
    case 'MARK_UNDERSTOOD': {
      const has = state.understood.includes(action.path);
      return { ...state, understood: has ? state.understood.filter((p) => p !== action.path) : [...state.understood, action.path] };
    }
    case 'SAVE_SECTION': {
      const { assignmentId, sectionId, patch } = action;
      const prev = state.study[assignmentId] || { sections: {}, lastSession: null, complete: false };
      const nextSections = { ...prev.sections, [sectionId]: { ...(prev.sections[sectionId] || {}), ...patch, updatedAt: new Date().toISOString() } };
      return { ...state, study: { ...state.study, [assignmentId]: { ...prev, sections: nextSections } } };
    }
    case 'SET_LAST_SESSION': {
      const prev = state.study[action.assignmentId] || { sections: {}, lastSession: null, complete: false };
      return { ...state, study: { ...state.study, [action.assignmentId]: { ...prev, lastSession: { note: action.note, at: new Date().toISOString() } } } };
    }
    case 'SET_COMPLETE': {
      const prev = state.study[action.assignmentId] || { sections: {}, lastSession: null, complete: false };
      return { ...state, study: { ...state.study, [action.assignmentId]: { ...prev, complete: !!action.value } } };
    }
    case 'RESET_ASSIGNMENT': {
      const next = { ...state.study };
      delete next[action.assignmentId];
      return { ...state, study: next };
    }
    case 'TEACH_TOGGLE_CONCEPT': {
      const prev = state.teach[action.chapterId] || { concepts: {}, teachback: '' };
      const concepts = { ...(prev.concepts || {}) };
      if (concepts[action.conceptId]) delete concepts[action.conceptId];
      else concepts[action.conceptId] = true;
      return { ...state, teach: { ...state.teach, [action.chapterId]: { ...prev, concepts } } };
    }
    case 'TEACH_SET_CONCEPTS': {
      const prev = state.teach[action.chapterId] || { concepts: {}, teachback: '' };
      const concepts = { ...(prev.concepts || {}) };
      (action.conceptIds || []).forEach((id) => {
        if (action.value) concepts[id] = true;
        else delete concepts[id];
      });
      return { ...state, teach: { ...state.teach, [action.chapterId]: { ...prev, concepts } } };
    }
    case 'TEACH_SAVE_TEACHBACK': {
      const prev = state.teach[action.chapterId] || { concepts: {}, teachback: '' };
      return { ...state, teach: { ...state.teach, [action.chapterId]: { ...prev, teachback: action.text } } };
    }
    case 'IMPORT_STATE':
      return migrate(action.state);
    case 'RESET_ALL':
      return { ...DEFAULT_STATE, profile: { ...DEFAULT_STATE.profile, memberSince: new Date().toISOString().slice(0, 10) } };
    default:
      return state;
  }
}

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage full or unavailable — app still works in-memory */
    }
  }, [state]);

  // Apply theme + density to <html> so CSS can react.
  useEffect(() => {
    const root = document.documentElement;
    const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = state.prefs.theme === 'system' ? (systemDark ? 'dark' : 'light') : state.prefs.theme;
    root.dataset.theme = theme;
    root.dataset.density = state.prefs.density;
    root.dataset.motion = state.prefs.reduceMotion ? 'reduced' : 'full';
  }, [state.prefs]);

  const actions = useMemo(() => ({
    setProfile: (patch) => dispatch({ type: 'SET_PROFILE', patch }),
    setPrefs: (patch) => dispatch({ type: 'SET_PREFS', patch }),
    toggleHidden: (path) => dispatch({ type: 'TOGGLE_HIDDEN', path }),
    toggleUnderstood: (path) => dispatch({ type: 'MARK_UNDERSTOOD', path }),
    saveSection: (assignmentId, sectionId, patch) => dispatch({ type: 'SAVE_SECTION', assignmentId, sectionId, patch }),
    setLastSession: (assignmentId, note) => dispatch({ type: 'SET_LAST_SESSION', assignmentId, note }),
    setComplete: (assignmentId, value) => dispatch({ type: 'SET_COMPLETE', assignmentId, value }),
    resetAssignment: (assignmentId) => dispatch({ type: 'RESET_ASSIGNMENT', assignmentId }),
    teachToggleConcept: (chapterId, conceptId) => dispatch({ type: 'TEACH_TOGGLE_CONCEPT', chapterId, conceptId }),
    teachSetConcepts: (chapterId, conceptIds, value) => dispatch({ type: 'TEACH_SET_CONCEPTS', chapterId, conceptIds, value }),
    teachSaveTeachback: (chapterId, text) => dispatch({ type: 'TEACH_SAVE_TEACHBACK', chapterId, text }),
    importState: (s) => dispatch({ type: 'IMPORT_STATE', state: s }),
    resetAll: () => dispatch({ type: 'RESET_ALL' }),
  }), []);

  const value = useMemo(() => ({ state, dispatch, actions }), [state, actions]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}

// ---- Selectors (pure functions over state) ----

export function assignmentStats(state, assignment) {
  const st = state.study[assignment.id];
  const total = assignment.sections.length;
  const mastered = assignment.sections.filter((s) => st?.sections?.[s.id]?.status === 'mastered').length;
  const practicing = assignment.sections.filter((s) => st?.sections?.[s.id]?.status === 'practicing').length;
  const conceptIds = new Set(assignment.sections.flatMap((s) => s.concepts));
  const covered = new Set();
  assignment.sections.forEach((s) => {
    (st?.sections?.[s.id]?.covered || []).forEach((c) => covered.add(c));
  });
  return {
    total,
    mastered,
    practicing,
    conceptsCovered: covered.size,
    conceptsTotal: conceptIds.size,
    status: mastered === total && total > 0 ? 'Mastered' : mastered + practicing > 0 ? 'Practicing' : 'Not started',
  };
}

export function reviewsDue(state, assignments) {
  const out = [];
  const now = Date.now();
  assignments.forEach((a) => {
    const st = state.study[a.id];
    if (!st) return;
    a.sections.forEach((s) => {
      const sec = st.sections?.[s.id];
      if (sec?.reviewDueAt && new Date(sec.reviewDueAt).getTime() <= now) {
        out.push({ assignment: a, section: s, state: sec, dueAt: sec.reviewDueAt });
      }
    });
  });
  return out.sort((x, y) => new Date(x.dueAt) - new Date(y.dueAt));
}

export function weakTopics(state, assignments) {
  const out = [];
  assignments.forEach((a) => {
    const st = state.study[a.id];
    if (!st) return;
    a.sections.forEach((s) => {
      const sec = st.sections?.[s.id];
      if (sec?.missed?.length) {
        out.push({ assignment: a, section: s, missed: sec.missed, at: sec.updatedAt });
      }
    });
  });
  return out;
}
