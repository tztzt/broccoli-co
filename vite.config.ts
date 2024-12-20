/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  test: {
    globals: true, // Enable global test functions like 'describe', 'it', etc.
    environment: 'jsdom', // Use jsdom environment for simulating a browser
    setupFiles: './src/test/setup.ts',
    css: true,
  },
});
