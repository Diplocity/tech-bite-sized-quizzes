// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/tech-bite-sized-quizzes/', // This must match your repo name
  plugins: [react()],
});
