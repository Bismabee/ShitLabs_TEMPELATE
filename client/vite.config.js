import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // const API_BASE_URL = env.VITE_API_BASE_URL || 'http://localhost:5000'
  
  return {
    plugins: [react(), tailwindcss()],
    server: {
      host: '0.0.0.0', // This exposes the server to your network
      port: 5173,
      // proxy: {
      //   '/api': {
      //     target: API_BASE_URL,
      //     changeOrigin: true,
      //   },
      // },
    },
  }
})
