import { cwd } from 'process';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: [
      { find: '@assets', replacement: `${resolve(cwd(), 'src/assets')}` },
      { find: '@components', replacement: `${resolve(cwd(), 'src/components')}` },
    ],
  },
});