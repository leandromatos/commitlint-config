import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    include: ['src/**/*.spec.ts'],
    exclude: ['node_modules', 'lib'],
    coverage: {
      include: ['src/**/*.ts'],
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
