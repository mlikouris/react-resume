import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint';
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vite.dev/config/
export default defineConfig({
  base: '/resume/michael-likouris/',
  plugins: [
    react({
      // If you are trying to use the React Compiler, configure it here:
      // babel: { plugins: [["babel-plugin-react-compiler", { target: '18' }]] }
    }),
    basicSsl(),
    eslint(),
    tailwindcss(),
  ],
  server: {
    https: false // Instructs Vite to use the SSL certificate
  }
})
