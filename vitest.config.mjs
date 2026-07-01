import { defineConfig } from 'vitest/config'

/**
 * @type {import('vitest/config').UserConfig}
 */
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
