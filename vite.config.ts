import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'monaco-editor': ['monaco-editor'],
          'shiki': ['shiki', '@shikijs/monaco']
        }
      }
    },
    chunkSizeWarningLimit: 2000
  },
  optimizeDeps: {
    include: ['monaco-editor', 'shiki'],
    exclude: ['shiki/langs']
  }
})
