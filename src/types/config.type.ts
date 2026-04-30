export type CommitTypes = string[]
export type ScopePattern = string | RegExp | null
export type SelectiveScopeConfig = Record<string, ScopePattern[]>
