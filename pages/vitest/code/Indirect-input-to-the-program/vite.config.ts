import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  resolve: { // 通配符
    alias: [
      { find: '~/', replacement: `${resolve(__dirname, 'src')}/` },
    ],
  }
})