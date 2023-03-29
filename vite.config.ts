import { cwd } from 'process'
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: [
      { find: '@', replacement: `${resolve(cwd(), 'src')}` },
    ],
  },
})