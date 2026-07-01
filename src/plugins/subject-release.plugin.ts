import type { Rule } from '@commitlint/types'

import type { ParsedCommit, SubjectReleaseConfig } from '@/types/index.js'

const BREAKING_CHANGE_NOT_ALLOWED_MESSAGE = 'a release commit cannot be a breaking change'
const SUBJECT_NOT_VERSION_MESSAGE = 'a release commit subject must be a version'

export const breakingHeaderPattern = /^(\w*)(?:\((.*)\))?!: (.*)$/

export const defaultSubjectReleaseConfig: SubjectReleaseConfig = {
  type: 'chore',
  scope: 'release',
  versionPattern: /^v?\d+(\.\d+)+(-[a-zA-Z0-9]+(\.\d+)*)?( \(#\d+\))?$/,
}

export const subjectRelease: Rule<Partial<SubjectReleaseConfig>> = (parsed, _when, userOverride) => {
  const config = { ...defaultSubjectReleaseConfig, ...(userOverride ?? {}) }
  if (!isReleaseCommit(parsed, config)) return [true]
  if (isBreakingChange(parsed.header)) return [false, BREAKING_CHANGE_NOT_ALLOWED_MESSAGE]
  if (!isValidVersion(parsed.subject, config.versionPattern)) return [false, SUBJECT_NOT_VERSION_MESSAGE]

  return [true]
}

const isReleaseCommit = (parsed: ParsedCommit, config: SubjectReleaseConfig): boolean =>
  parsed.type === config.type && parsed.scope === config.scope

const isBreakingChange = (header: string | null | undefined): boolean => breakingHeaderPattern.test(header ?? '')

const isValidVersion = (subject: string | null | undefined, pattern: RegExp): boolean => {
  if (!subject) return false

  return pattern.test(subject)
}
