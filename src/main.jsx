import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import 'katex/dist/katex.min.css';
import App from './App.jsx';
import { StoreProvider } from './state/store.jsx';
import './styles.css';

// Router strategy:
//   - Default (Vercel / any host with SPA rewrites): BrowserRouter → clean URLs
//     like /teach, /live, /tutor/a-ch22-descent. vercel.json ships the rewrite.
//   - Static hosts without SPA fallback (e.g. the S3 preview, which serves exact
//     object keys only): build with VITE_ROUTER=hash → HashRouter, so every route
//     is directly reachable and survives a hard refresh. No dead ends.
const Router = import.meta.env.VITE_ROUTER === 'hash' ? HashRouter : BrowserRouter;

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <StoreProvider>
        <App />
      </StoreProvider>
    </Router>
  </React.StrictMode>
);
