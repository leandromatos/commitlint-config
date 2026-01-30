import type { Rule } from '@commitlint/types'

import type { SelectiveScopeConfig } from '@/types/config.js'

export const selectiveScope: Rule<SelectiveScopeConfig> = (parsed, when, config) => {
  const { type, scope } = parsed
  if (!config || !type || !(type in config)) return [true]
  const allowedScopes = config[type]
  if (allowedScopes?.length === 0) {
    if (scope) return [false, `scope is not allowed for type '${type}'`]

    return [true]
  }
  const hasNull = allowedScopes?.includes(null)
  if (!scope && hasNull) return [true]
  if (!scope) return [false, `scope is required for type '${type}'`]
  const matches = allowedScopes?.some(pattern => {
    if (pattern === null) return false
    if (pattern instanceof RegExp) return pattern.test(scope)

    return pattern === scope
  })
  if (!matches) return [false, `scope '${scope}' is not allowed for type '${type}'`]

  return [true]
}
