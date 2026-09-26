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
    rollupOptions: {
      output: {
        // Long-lived vendor code, split from the app so route navigation does
        // not invalidate it. Rolldown requires the function form here.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (/node_modules\/(framer-motion|motion-dom|motion-utils|motion)\//.test(id)) {
            return 'motion'
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
