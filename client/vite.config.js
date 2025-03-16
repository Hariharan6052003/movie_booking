import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/theatres': {
        target: 'https://movie-booking-mh54.onrender.com', // Your backend server URL
        changeOrigin: true,
      },
    },
  },
});
