import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
  },
  build: {
    target: 'es2022',
    // The three.js chunk is ~990 kB raw / ~267 kB gzipped. That is the cost of
    // the hero scene, and it is accepted deliberately: it is code-split and
    // only fetched when the hero visual mounts, so it never blocks first paint.
    // The limit is raised to acknowledge it rather than to silence a surprise.
    chunkSizeWarningLimit: 1100,
    rollupOptions: {
      output: {
        // Long-lived vendor code, split from the app so route navigation does
        // not invalidate it. Rolldown requires the function form here.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (/node_modules\/(framer-motion|motion-dom|motion-utils|motion)\//.test(id)) {
            return 'motion'
          }
          if (/node_modules\/(three|@react-three)\//.test(id)) {
            // Long-lived and large, and only needed once the hero scene loads,
            // so it gets its own chunk rather than riding along with the app.
            return 'three'
          }
          if (/node_modules\/(react|react-dom|react-router|react-router-dom|scheduler)\//.test(id)) {
            return 'react'
          }
          return undefined
        },
      },
    },
  },
})
