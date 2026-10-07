import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  preview: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: [
      'mern-frontend-234948.onrender.com',
    ],
  },
})