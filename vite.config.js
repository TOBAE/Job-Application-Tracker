import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
const isGitHubPages = process.env.GITHUB_REPOSITORY?.includes("Job-Application-Tracker");

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: isGitHubPages ? "/Job-Application-Tracker/" : "/",
})