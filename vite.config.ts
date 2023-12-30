import path from 'path'

import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import envCompatible from 'vite-plugin-env-compatible'

export default defineConfig({
  plugins: [
    react(),
    envCompatible({
      /* options */
    }),
  ],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
})
