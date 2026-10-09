import { build } from 'vite';
import react from '@vitejs/plugin-react';

await build({
  configFile: false,
  root: process.cwd(),
  base: '/',
  mode: 'test',
  plugins: [react()],
  define: { 'process.env.NODE_ENV': JSON.stringify('development') },
  build: {
    outDir: '.karma-build',
    emptyOutDir: true,
    copyPublicDir: false,
    minify: false,
    sourcemap: true,
    lib: {
      entry: 'src/tests/components.spec.jsx',
      name: 'PruebasGasElVolcan',
      formats: ['iife'],
      fileName: () => 'components.spec.js'
    }
  }
});
