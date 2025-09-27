import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", // критично: НИКАКИХ http://localhost:5173
  publicDir: "public",
  server: {
    proxy: {
      // всё, что начинается с /api, уходит на Spring
      '/api': {
        target: 'http://localhost:8181', // порт твоего Spring Boot
        changeOrigin: true,
        // если бэк слушает уже под /api (т.е. endpoint = /api/products),
        // НИЧЕГО не переписываем:
        // rewrite: (p) => p
        // если на бэке путь /products без /api — раскомментируй строку ниже:
        // rewrite: (p) => p.replace(/^\/api/, '')
      },
      "/images": {
        target: "http://localhost", // где у тебя nginx с /images
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)), // если где-то используешь @assets/*
    },
  },
});
