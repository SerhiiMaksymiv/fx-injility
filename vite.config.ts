import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: [
        'webextension-polyfill'
      ],
      output: {
        format: 'iife',
        globals: {
          'webextension-polyfill': 'browser'
        }
      }
    }
  }
})

