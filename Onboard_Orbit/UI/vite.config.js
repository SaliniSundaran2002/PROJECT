// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8082,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',  // Backend running on port 3000
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),  // Remove '/api' prefix
      },
    },
  },
});
