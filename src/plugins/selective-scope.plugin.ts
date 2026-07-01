import type { Rule } from '@commitlint/types'

import type { ScopePattern, SelectiveScopeConfig } from '@/types/index.js'

export const selectiveScope: Rule<SelectiveScopeConfig> = (parsed, _when, config) => {
  const { type, scope } = parsed
  if (!config || !type || !(type in config)) return [true]
  const allowedScopes = config[type]
  if (!allowedScopes) return [true]
  if (forbidsAnyScope(allowedScopes)) {
    if (scope) return [false, `scope is not allowed for type '${type}'`]

    return [true]
  }
  if (!scope && allowsEmptyScope(allowedScopes)) return [true]
  if (!scope) return [false, `scope is required for type '${type}'`]
  if (!isAllowedScope(allowedScopes, scope)) return [false, `scope '${scope}' is not allowed for type '${type}'`]

  return [true]
}

const forbidsAnyScope = (allowedScopes: ScopePattern[]): boolean => allowedScopes.length === 0

const allowsEmptyScope = (allowedScopes: ScopePattern[]): boolean => allowedScopes.some(isWildcardPattern)

const isAllowedScope = (allowedScopes: ScopePattern[], scope: string): boolean =>
  allowedScopes.some(pattern => matchesScope(pattern, scope))

const matchesScope = (pattern: ScopePattern, scope: string): boolean => {
  if (isWildcardPattern(pattern)) return false
  if (pattern instanceof RegExp) return pattern.test(scope)

  return pattern === scope
}

const isWildcardPattern = (pattern: ScopePattern): boolean => pattern === null || pattern === undefined
