import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Setup proxy to backend
    proxy: {
      '/api': {
        target: 'http://localhost:9001/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    // To use @/componets, etc.
    alias: [{
      find: '@',
      replacement: resolve(__dirname, 'src')
    }]
  }
})
