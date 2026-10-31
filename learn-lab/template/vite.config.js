import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Load all lesson packages at start. Otherwise Vite reloads the page the first time a lesson uses a new one.
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-dom/client', 'framer-motion', 'lucide-react', 'd3', 'recharts', 'katex'],
  },
  server: {
    host: true,          // listen on 0.0.0.0, so Daytona can reach it
    port: 5173,
    strictPort: true,
    allowedHosts: true,  // accept the Daytona preview domain
  },
})
