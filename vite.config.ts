import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  loadEnv(mode, './')
  return {
    plugins: [
      react(),
      tsconfigPaths()
    ],
  }
})
