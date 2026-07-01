import { RuleConfigSeverity, type UserConfig } from '@commitlint/types'

import { buildReleaseIgnore, commitTypes, parserPreset } from '@/config.js'
import { defaultSubjectReleaseConfig, selectiveScope, subjectRelease } from '@/plugins/index.js'
import { prompt } from '@/prompt.js'

const userConfig: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  parserPreset,
  ignores: [buildReleaseIgnore()],
  rules: {
    'subject-case': [RuleConfigSeverity.Error, 'always', ['sentence-case']],
    'selective-scope': [
      RuleConfigSeverity.Error,
      'always',
      {
        build: [],
        chore: [null, 'release'],
        ci: [],
        docs: [],
        feat: [],
        fix: [],
        perf: [],
        refactor: [],
        revert: [],
        style: [],
        test: [],
      },
    ],
    'subject-release': [RuleConfigSeverity.Error, 'always', defaultSubjectReleaseConfig],
    'type-enum': [RuleConfigSeverity.Error, 'always', commitTypes],
  },
  plugins: [
    {
      rules: {
        'selective-scope': selectiveScope,
        'subject-release': subjectRelease,
      },
    },
  ],
  helpUrl: 'https://github.com/leandromatos/commitlint-config',
  prompt,
}

export default userConfig
export { buildReleaseIgnore } from '@/config.js'
