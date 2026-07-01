import type { ParserPreset } from '@commitlint/types'

import { breakingHeaderPattern, defaultSubjectReleaseConfig } from '@/plugins/index.js'
import type { CommitTypes, SubjectReleaseConfig } from '@/types/index.js'

export const commitTypes: CommitTypes = [
  'build',
  'chore',
  'ci',
  'docs',
  'feat',
  'fix',
  'perf',
  'refactor',
  'revert',
  'style',
  'test',
]

export const parserPreset: ParserPreset = {
  parserOpts: {
    headerPattern: /^(\w*)(?:\((.*)\))?!?: (.*)$/,
    breakingHeaderPattern,
    headerCorrespondence: ['type', 'scope', 'subject'],
    noteKeywords: ['BREAKING CHANGE'],
    revertPattern:
      /^revert: "(?:(\w+)(?:\((.*?)\))?!?: (.*?)|(\w+)(?:\((.*?)\))?!: (.*?))"\s+This reverts commit (\w+)\.$/,
    revertCorrespondence: ['header', 'hash'],
    issuePrefixes: ['#'],
    versionPattern: defaultSubjectReleaseConfig.versionPattern,
  },
}

const extractFirstLine = (commit: string): string | undefined => commit.split('\n').shift()

const buildReleaseHeaderPrefix = (config: SubjectReleaseConfig): string => `${config.type}(${config.scope}):`

const extractSubjectAfterPrefix = (line: string, prefix: string): string => line.slice(prefix.length).trim()

export const buildReleaseIgnore =
  (config: SubjectReleaseConfig = defaultSubjectReleaseConfig) =>
  (commit: string): boolean => {
    const firstLine = extractFirstLine(commit)
    if (firstLine === undefined) return false
    const releaseHeaderPrefix = buildReleaseHeaderPrefix(config)
    if (!firstLine.startsWith(releaseHeaderPrefix)) return false
    const releaseSubject = extractSubjectAfterPrefix(firstLine, releaseHeaderPrefix)

    return config.versionPattern.test(releaseSubject)
  }
