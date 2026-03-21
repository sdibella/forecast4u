import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: ['node_modules'],
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test-setup.js',
    css: true,
    coverage: {
      include: [
        'src/**/*.{js,jsx}',
      ],
      exclude: [
        'src/**/*.test.{js,jsx}',
        'src/main.jsx',
        'src/test-setup.js',
      ],
    },
  },
});
