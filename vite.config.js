import { defineConfig } from 'vite';
import { resolve } from "path";

export default defineConfig({
  root: 'src/', // ensure Vite uses the project root
  base: '/', // ensures paths resolve from site root on Netlify
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        about: resolve(__dirname, "src/about/index.html"),
        profile: resolve(__dirname, "src/profile/index.html"),
        converter: resolve(__dirname, "src/converter/index.html"),
      },
    }
  },
  server: {
    open: true
  }
})
