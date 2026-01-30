import lint from '@commitlint/lint'
import load from '@commitlint/load'
import type { QualifiedRules } from '@commitlint/types'

import userConfig from '@/index.js'

export const lintMessage = async (message: string, ruleOverrides?: Partial<QualifiedRules>) => {
  const { plugins, rules, parserPreset } = await load(userConfig)
  const mergedRules = ruleOverrides ? { ...rules, ...ruleOverrides } : rules

  return lint(message, mergedRules, {
    plugins,
    parserOpts: parserPreset?.parserOpts ?? {},
  })
}
