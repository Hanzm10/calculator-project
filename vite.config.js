import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/calculator-project/', // Replace <repo-name> with your GitHub repo
  plugins: [react()],
});
