import { defineConfig } from 'vite';
import envCompatible from 'vite-plugin-env-compatible';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react(), envCompatible({ /* options */ })],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});

