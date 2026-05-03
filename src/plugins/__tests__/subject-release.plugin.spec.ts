import { describe, expect, it } from 'vitest'

import { lintMessage } from '@/__tests__'

describe('Release Subject Plugin', () => {
  it('should be a valid commit message for release with prefix', async () => {
    const result = await lintMessage('chore(release): v1.0.0')
    expect(result.valid).toBe(true)
    expect(result.errors).toStrictEqual([])
    expect(result.warnings).toStrictEqual([])
  })

  it('should be a valid commit message for release without prefix', async () => {
    const result = await lintMessage('chore(release): 1.0.0')
    expect(result.valid).toBe(true)
    expect(result.errors).toStrictEqual([])
    expect(result.warnings).toStrictEqual([])
  })

  it('should be a invalid commit message for a relase because the subject is a breaking change', async () => {
    const result = await lintMessage('chore(release)!: v1.0.0')
    expect(result.valid).toBe(false)
  })

  it('should be a valid commit message for release with a squash-merge PR suffix', async () => {
    const result = await lintMessage('chore(release): v1.0.0 (#42)')
    expect(result.valid).toBe(true)
    expect(result.errors).toStrictEqual([])
    expect(result.warnings).toStrictEqual([])
  })

  it('should be a valid commit message for prerelease with a squash-merge PR suffix', async () => {
    const result = await lintMessage('chore(release): v1.0.0-rc.1 (#7)')
    expect(result.valid).toBe(true)
    expect(result.errors).toStrictEqual([])
    expect(result.warnings).toStrictEqual([])
  })

  it('should be a invalid commit message for release with a non-numeric PR ref', async () => {
    const result = await lintMessage('chore(release): v1.0.0 (#abc)')
    expect(result.valid).toBe(false)
  })
})
