import { defineConfig, coverageConfigDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugin: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup',
  },
  coverage: {
    reporter: ['text', 'json', 'html'],
    exclude: ['./src/main.jsx', ...coverageConfigDefaults.exclude],
  },
});
