import { serwist } from '@serwist/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    serwist({
      swSrc: 'src/sw.ts',
      swDest: 'sw.js',
      globDirectory: 'dist',
      injectionPoint: 'self.__SW_MANIFEST',
      rollupFormat: 'iife',
    }),
  ],
});
