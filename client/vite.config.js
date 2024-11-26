import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import commonjs from 'vite-plugin-commonjs';
import svgr from 'vite-plugin-svgr';
import vitetsConfigPaths from 'vite-tsconfig-paths';
// import { vitePlugin as remix } from '@remix-run/dev';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react({
      jsxRuntime: 'classic',
    }),
    vitetsConfigPaths(),
    commonjs(),
    svgr({
      include: ['src/**/*.svg'],
    }),
    // remix({
    //   future: {
    //     v7_skipActionErrorRevalidation: true,
    //   },
    // }),
  ],
  optimizeDeps: {
    force: true,
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  server: {
    open: true,
    port: 3000,
  },
});
