/// <reference types="vitest" />
import { UserConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default {
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ["./src/__tests__/setup.ts"],
  },
} satisfies UserConfig;
