import config from '@leandromatos/eslint-config'

/**
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  ...config,
  {
    ignores: ['lib', 'coverage', 'CHANGELOG.md'],
  },
  {
    files: ['commitlint.config.mjs'],
    rules: {
      'import-x/no-relative-parent-imports': 'off',
      'no-restricted-imports': 'off',
    },
  },
]
