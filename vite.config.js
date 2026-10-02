import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Two deploy targets, one codebase:
//  - Vercel (default): BrowserRouter + absolute asset base "/" so clean URLs like
//    /teach/ch22 survive a hard refresh (vercel.json rewrites unknown paths to
//    index.html, and assets resolve from the domain root).
//  - Nested static host / S3 preview (VITE_ROUTER=hash): HashRouter + relative
//    base "./" so every route is reachable from a nested path with no server.
const hash = process.env.VITE_ROUTER === 'hash'

export default defineConfig({
  base: hash ? './' : '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
