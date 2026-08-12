import config from '@leandromatos/eslint-config'

export default [
  ...config,
  {
    ignores: ['dist', 'coverage'],
  },
  {
    files: ['commitlint.config.mjs'],
    rules: {
      'import-x/no-relative-parent-imports': 'off',
      'no-restricted-imports': 'off',
    },
  },
]
