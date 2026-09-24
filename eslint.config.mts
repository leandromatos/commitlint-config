import type { Config } from '@leandromatos/eslint-config'
import { configs } from '@leandromatos/eslint-config'

const eslintConfig: Config[] = [
  ...configs.recommended(),
  {
    files: ['commitlint.config.mjs'],
    rules: {
      'import-x/no-relative-parent-imports': 'off',
      'no-restricted-imports': 'off',
    },
  },
]

export default eslintConfig
