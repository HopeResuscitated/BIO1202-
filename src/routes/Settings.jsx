import React, { useRef, useState } from 'react';
import { useStore, STORAGE_KEY } from '../state/store.jsx';
import { Field } from '../components/ui.jsx';

export default function Settings() {
  const { state, actions } = useStore();
  const fileRef = useRef(null);
  const [msg, setMsg] = useState('');

  function exportState() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'biostudy-1202-backup.json';
    a.click();
    URL.revokeObjectURL(url);
    setMsg('Exported your workspace to a JSON file.');
  }

  function importState(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        actions.importState(JSON.parse(String(reader.result)));
        setMsg('Imported your workspace. Progress and profile restored.');
      } catch {
        setMsg('That file could not be read as a BioStudy backup.');
      }
    };
    reader.readAsText(file);
  }

  function resetAll() {
    if (window.confirm('Reset everything? This clears your progress, profile, and lesson notes on this device.')) {
      actions.resetAll();
      setMsg('Workspace reset to defaults.');
    }
  }

  return (
    <section>
      <div className="eyebrow">— SETTINGS</div>
      <h1 className="pagetitle">Your profile & preferences.</h1>
      <p className="intro">
        Everything is stored locally on this device under <code>{STORAGE_KEY}</code>. Your progress, profile, and lesson notes survive reloads and sessions — export a backup any time.
      </p>

      {msg && <div className="inlinewarn" role="status">{msg}</div>}

      <div className="settingsgrid">
        <div className="panel">
          <b className="panelhead">Student profile</b>
          <Field label="Name" id="s-name">
            <input id="s-name" value={state.profile.name} onChange={(e) => actions.setProfile({ name: e.target.value })} />
          </Field>
          <Field label="Email" id="s-email">
            <input id="s-email" value={state.profile.email} onChange={(e) => actions.setProfile({ email: e.target.value })} placeholder="you@lsu.edu" />
          </Field>
          <Field label="School" id="s-school">
            <input id="s-school" value={state.profile.school} onChange={(e) => actions.setProfile({ school: e.target.value })} />
          </Field>
        </div>

        <div className="panel">
          <b className="panelhead">Preferences</b>
          <Field label="Theme" id="s-theme">
            <select id="s-theme" value={state.prefs.theme} onChange={(e) => actions.setPrefs({ theme: e.target.value })}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">Match system</option>
            </select>
          </Field>
          <Field label="Density" id="s-density">
            <select id="s-density" value={state.prefs.density} onChange={(e) => actions.setPrefs({ density: e.target.value })}>
              <option value="comfortable">Comfortable</option>
              <option value="compact">Compact</option>
            </select>
          </Field>
          <Field label="Daily goal (sections)" id="s-goal">
            <input id="s-goal" type="number" min="1" max="20" value={state.prefs.dailyGoal} onChange={(e) => actions.setPrefs({ dailyGoal: Number(e.target.value) || 1 })} />
          </Field>
          <label className="checkbox">
            <input type="checkbox" checked={state.prefs.reduceMotion} onChange={(e) => actions.setPrefs({ reduceMotion: e.target.checked })} />
            <span>Reduce motion</span>
            <small>Disables transitions and streaming animations.</small>
          </label>
        </div>

        <div className="panel">
          <b className="panelhead">Data</b>
          <p className="muted">Back up or restore your progress, profile, and lesson notes.</p>
          <div className="settingsactions">
            <button className="rowbtn" onClick={exportState}>Export backup</button>
            <button className="rowbtn" onClick={() => fileRef.current?.click()}>Import backup</button>
            <input ref={fileRef} type="file" accept="application/json" hidden onChange={importState} />
            <button className="rowbtn danger" onClick={resetAll}>Reset everything</button>
          </div>
        </div>

        <div className="panel">
          <b className="panelhead">Data sources</b>
          <ul className="sourcelist">
            <li><b>Course content:</b> your class repository (linked in the footer).</li>
            <li><b>Chapter lessons:</b> written to match the concepts in each chapter of BIOL 1202.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
