import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    // ===================================
    //  FIX: ADDING THE PROXY CONFIGURATION
    // ===================================
    proxy: {
      // Forward all requests starting with '/api' 
      // from the frontend (port 5173) to the backend (port 5000)
      '/api': {
        target: 'http://localhost:5000', 
        changeOrigin: true, // Needed for virtual hosting
        secure: false,      // Set to true if using HTTPS locally
      },
    },
    // ===================================
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
