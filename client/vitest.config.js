import { defineConfig, coverageConfigDefaults } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
  },
  coverage: {
    reporter: ['text', 'json', 'html'],
    exclude: ['./src/main.jsx', ...coverageConfigDefaults.exclude],
  },
});
