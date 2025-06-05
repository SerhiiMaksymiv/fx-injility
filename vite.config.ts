import { defineConfig } from 'vite'

export default defineConfig({
  build: {
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

