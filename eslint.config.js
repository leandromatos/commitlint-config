import { flatConfig } from '@leandromatos/eslint-config'

/**
 * @type {import('eslint').Linter.Config}
 */
export default [
  ...flatConfig,
  {
    ignores: ['lib'],
  },
]
