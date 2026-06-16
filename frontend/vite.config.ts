import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react({
      // If you are trying to use the React Compiler, configure it here:
      // babel: { plugins: [["babel-plugin-react-compiler", { target: '18' }]] }
    }),
    tailwindcss(),
  ],
  server: {
    port: 5173,
    strictPort: true // Prevents Vite from switching to another port
  }
})
