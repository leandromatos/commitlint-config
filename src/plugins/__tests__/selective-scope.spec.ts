import { RuleConfigSeverity } from '@commitlint/types'
import { describe, expect, it } from 'vitest'

import { lintMessage } from '@/__tests__/lint-message.util.js'
import type { SelectiveScopeConfig } from '@/types/config.js'

const withScope = (scopeConfig: SelectiveScopeConfig) => ({
  'selective-scope': [RuleConfigSeverity.Error, 'always', scopeConfig] as const,
})

describe('Selective Scope Plugin', () => {
  it('should allow any scope for unrestricted type', async () => {
    const result = await lintMessage('chore(anything): Add something', withScope({ feat: ['api'] }))
    expect(result.valid).toBe(true)
  })

  describe('empty array (scope forbidden)', () => {
    const rules = withScope({ docs: [] })

    it('should allow commit without scope', async () => {
      const result = await lintMessage('docs: Update readme', rules)
      expect(result.valid).toBe(true)
    })

    it('should reject commit with scope', async () => {
      const result = await lintMessage('docs(readme): Update readme', rules)
      expect(result.valid).toBe(false)
      expect(result.errors).toContainEqual(expect.objectContaining({ name: 'selective-scope' }))
    })
  })

  describe('required scopes', () => {
    const rules = withScope({ feat: ['api', 'ui'] })

    it('should allow matching scope', async () => {
      const result = await lintMessage('feat(api): Add endpoint', rules)
      expect(result.valid).toBe(true)
    })

    it('should reject non-matching scope', async () => {
      const result = await lintMessage('feat(db): Add migration', rules)
      expect(result.valid).toBe(false)
      expect(result.errors).toContainEqual(expect.objectContaining({ name: 'selective-scope' }))
    })

    it('should reject missing scope', async () => {
      const result = await lintMessage('feat: Add feature', rules)
      expect(result.valid).toBe(false)
      expect(result.errors).toContainEqual(expect.objectContaining({ name: 'selective-scope' }))
    })
  })

  describe('optional scopes (null in array)', () => {
    const rules = withScope({ fix: [null, 'api', 'ui'] })

    it('should allow missing scope', async () => {
      const result = await lintMessage('fix: Resolve issue', rules)
      expect(result.valid).toBe(true)
    })

    it('should allow matching scope', async () => {
      const result = await lintMessage('fix(api): Resolve endpoint issue', rules)
      expect(result.valid).toBe(true)
    })

    it('should reject non-matching scope', async () => {
      const result = await lintMessage('fix(db): Resolve database issue', rules)
      expect(result.valid).toBe(false)
      expect(result.errors).toContainEqual(expect.objectContaining({ name: 'selective-scope' }))
    })
  })

  describe('RegExp patterns', () => {
    const rules = withScope({ feat: ['api', /^feature-/] })

    it('should allow scope matching regex', async () => {
      const result = await lintMessage('feat(feature-auth): Add auth', rules)
      expect(result.valid).toBe(true)
    })

    it('should reject scope not matching regex or string', async () => {
      const result = await lintMessage('feat(other): Add something', rules)
      expect(result.valid).toBe(false)
      expect(result.errors).toContainEqual(expect.objectContaining({ name: 'selective-scope' }))
    })
  })
})
