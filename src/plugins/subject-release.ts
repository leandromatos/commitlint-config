import { Rule } from '@commitlint/types'

export const subjectRelease: Rule = parsed => {
  const { type, scope, header } = parsed
  if (isChoreRelease(type!, scope!) && isBreakingChange(header!))
    return [false, 'the subject of a release commit cannot be a breaking change']

  return [true]
}

const isChoreRelease = (type: string, scope: string) => {
  return type === 'chore' && scope === 'release'
}

const isBreakingChange = (header: string) => {
  const breakingHeaderPattern = /^(\w*)(?:\((.*)\))?!: (.*)$/

  return breakingHeaderPattern.test(header)
}
