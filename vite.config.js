import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   // Setup proxy to backend
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:9000/',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, '')
  //     }
  //   }
  // },
  resolve: {
    alias: [{
      find: '@',
      replacement: resolve(__dirname, 'src')
    }]
  }
})
