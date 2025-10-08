import { defineConfig } from 'vite'

export default defineConfig({
  root: '.', // ensure Vite uses the project root
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: './index.html'
    }
  },
  server: {
    open: true
  }
})
