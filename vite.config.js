import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    laravel({
      input: [
        resolve(__dirname, 'resources/css/app.css'),  // Tailwind CSS
        resolve(__dirname, 'resources/js/Main.jsx'),  // React entry
      ],
      refresh: true, // Hot reload on Blade changes
    }),
    react(),
    tailwindcss(),
  ],
});