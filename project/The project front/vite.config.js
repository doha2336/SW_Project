import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@seller': path.resolve(__dirname, './seller/src'),
      '@buyer': path.resolve(__dirname, './buyer/src'),
      '@src': path.resolve(__dirname, './src'),
    },
  },
  server: {
    historyApiFallback: true
  }
});
