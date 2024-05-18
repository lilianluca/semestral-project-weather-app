import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        // target: 'http://127.0.0.1:8000/',
        target: '/choreo-apis/djangorestapi/serverweatherproject/rest-api-be2/v1',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
