import type { Rule } from '@commitlint/types'

export type ParsedCommit = Parameters<Rule>[0]

export interface SubjectReleaseConfig {
  type: string
  scope: string
  versionPattern: RegExp
}
