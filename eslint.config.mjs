import { config } from '@leandromatos/eslint-config'

/**
 * @type {import('eslint').Linter.Config}
 */
export default [
  ...config,
  {
    ignores: ['lib'],
  },
  {
    files: ['commitlint.config.mjs'],
    rules: {
      'import/no-relative-parent-imports': 'off',
      'no-restricted-imports': 'off',
    },
  },
]
