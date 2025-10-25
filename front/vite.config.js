import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

// Vite config: outputs a single main.js bundle to the server's public/js folder.
// Uses library mode with IIFE format so the script can be included without type="module".
export default defineConfig(({ command, mode }) => ({
  plugins: [react(), cssInjectedByJsPlugin()],
  define: {
    'process.env.NODE_ENV': JSON.stringify(command === 'serve' ? 'development' : (mode === 'development' ? 'development' : 'production')),
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.jsx'),
      formats: ['iife'],
      name: 'AppBundle',
      fileName: () => 'main.js',
    },
    outDir: '../server/public/js',
    emptyOutDir: false,
    sourcemap: mode === 'development' ? false : true,
    minify: false,
  },
}));
