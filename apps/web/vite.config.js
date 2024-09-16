import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
  console.log('process.env.NODE_ENV:', process.env.NODE_ENV);
  const temp = {
    proxy: {
      '/api': {
        target: 'http://localhost:4000', // Replace with your backend API URL
        changeOrigin: true,
        secure: false,
      },
    },
  };

  return defineConfig({
    plugins: [react()],
    base: '/',
    server: {
      port: 3000,
      ...(process.env.NODE_ENV == 'development' ? temp : {}),
    },
  });
};
