import { describe, expect, it } from 'vitest'

import { lintMessage } from '@/__tests__'
import userConfig from '@/index'

describe('Config', () => {
  // Commit Messages
  describe('Commit Messages', () => {
    describe('Config', () => {
      it('should have a config object with the rules', () => {
        expect(userConfig).toMatchObject({
          rules: {
            'subject-case': expect.anything(),
            'subject-release': expect.anything(),
            'type-enum': expect.anything(),
          },
        })
      })
    })

    describe('Rules', () => {
      // body-leading-blank
      describe('body-leading-blank', () => {
        it('should pass the body-leading-blank rule', async () => {
          const result = await lintMessage(
            'chore: This is a chore commit message\n\nThis is the body with a leading blank line',
          )
          expect(result.valid).toBe(true)
          expect(result.errors).toStrictEqual([])
          expect(result.warnings).toStrictEqual([])
        })

        it('should not pass the body-leading-blank rule', async () => {
          const result = await lintMessage(
            'chore: This is a chore commit message\nThis is the body without a leading blank line',
          )
          expect(result.valid).toBe(true)
          expect(result.errors).toStrictEqual([])
          expect(result.warnings).toContainEqual(
            expect.objectContaining({
              name: 'body-leading-blank',
            }),
          )
        })
      })

      // body-max-line-length
      describe('body-max-line-length', () => {
        it('should pass the body-max-line-length rule', async () => {
          const result = await lintMessage('chore: This is a chore commit message\n\nThis is the body')
          expect(result.valid).toBe(true)
          expect(result.errors).toStrictEqual([])
          expect(result.warnings).toStrictEqual([])
        })

        it('should not pass the body-max-line-length rule', async () => {
          const result = await lintMessage(
            'chore: This is a chore commit message\n\nThis is the body with a long line that should not pass the rule because it is too long and have more than 100 characters',
          )
          expect(result.valid).toBe(false)
        })
      })

      // footer-leading-blank
      describe('footer-leading-blank', () => {
        it('should pass the footer-leading-blank rule', async () => {
          const result = await lintMessage(
            'chore: This is a chore commit message\n\nThis is the body\n\nBREAKING CHANGE: This is a breaking change with a leading blank line',
          )
          expect(result.valid).toBe(true)
          expect(result.errors).toStrictEqual([])
          expect(result.warnings).toStrictEqual([])
        })

        it('should not pass the footer-leading-blank rule', async () => {
          const result = await lintMessage(
            'chore: This is a chore commit message\n\nThis is the body\nBREAKING CHANGE: This is a breaking change without a leading blank line',
          )
          expect(result.valid).toBe(true)
          expect(result.errors).toStrictEqual([])
          expect(result.warnings).toContainEqual(
            expect.objectContaining({
              name: 'footer-leading-blank',
            }),
          )
        })
      })

      // footer-max-line-length
      describe('footer-max-line-length', () => {
        it('should pass the footer-max-line-length rule', async () => {
          const result = await lintMessage(
            'chore: This is a chore commit message\n\nThis is the body\n\nThis is the footer',
          )
          expect(result.valid).toBe(true)
          expect(result.errors).toStrictEqual([])
          expect(result.warnings).toStrictEqual([])
        })

        it('should not pass the footer-max-line-length rule', async () => {
          const result = await lintMessage(
            'chore: This is a chore commit message\n\nThis is the body\n\nThis is the footer with a long line that should not pass the rule because it is too long and have more than 100 characters',
          )
          expect(result.valid).toBe(false)
        })
      })

      // header-max-length
      describe('header-max-length', () => {
        it('should pass the header-max-length rule', async () => {
          const result = await lintMessage('chore: This is a chore commit message')
          expect(result.valid).toBe(true)
          expect(result.errors).toStrictEqual([])
          expect(result.warnings).toStrictEqual([])
        })

        it('should not pass the header-max-length rule', async () => {
          const result = await lintMessage(
            'chore: This is a chore commit message with a long header that should not pass the rule because it is too long',
          )
          expect(result.valid).toBe(false)
        })
      })

      // header-trim
      describe('header-trim', () => {
        it('should pass the header-trim rule', async () => {
          const result = await lintMessage('chore: This is a chore commit message')
          expect(result.valid).toBe(true)
          expect(result.errors).toStrictEqual([])
          expect(result.warnings).toStrictEqual([])
        })

        it('should not pass the header-trim rule', async () => {
          const result = await lintMessage(' chore: This is a chore commit message')
          expect(result.valid).toBe(false)
        })
      })

      // subject-case
      describe('subject-case', () => {
        it('should pass the subject-case rule', async () => {
          const result = await lintMessage('chore: This is a chore commit message start with capital case')
          expect(result.valid).toBe(true)
          expect(result.errors).toStrictEqual([])
          expect(result.warnings).toStrictEqual([])
        })

        it('should not pass the subject-case rule', async () => {
          const result = await lintMessage('chore: this is a chore commit message start with lowercase')
          expect(result.valid).toBe(false)
        })
      })

      // subject-empty
      describe('subject-empty', () => {
        it('should pass the subject-empty rule', async () => {
          const result = await lintMessage('chore: This is a chore commit message')
          expect(result.valid).toBe(true)
          expect(result.errors).toStrictEqual([])
          expect(result.warnings).toStrictEqual([])
        })

        it('should not pass the subject-empty rule', async () => {
          const result = await lintMessage('chore:')
          expect(result.valid).toBe(false)
        })
      })

      // subject-full-stop
      describe('subject-full-stop', () => {
        it('should pass the subject-full-stop rule', async () => {
          const result = await lintMessage('chore: This is a chore commit message')
          expect(result.valid).toBe(true)
          expect(result.errors).toStrictEqual([])
          expect(result.warnings).toStrictEqual([])
        })

        it('should not pass the subject-full-stop rule', async () => {
          const result = await lintMessage('chore: This is a chore commit message.')
          expect(result.valid).toBe(false)
        })
      })

      // type-case
      describe('type-case', () => {
        it('should pass the type-case rule', async () => {
          const result = await lintMessage('chore: This is a chore commit message')
          expect(result.valid).toBe(true)
          expect(result.errors).toStrictEqual([])
          expect(result.warnings).toStrictEqual([])
        })

        it('should not pass the type-case rule', async () => {
          const result = await lintMessage('Chore: This is a chore commit message')
          expect(result.valid).toBe(false)
        })
      })

      // type-empty
      describe('type-empty', () => {
        it('should pass the type-empty rule', async () => {
          const result = await lintMessage('chore: This is a chore commit message')
          expect(result.valid).toBe(true)
          expect(result.errors).toStrictEqual([])
          expect(result.warnings).toStrictEqual([])
        })

        it('should not pass the type-empty rule', async () => {
          const result = await lintMessage(': This is a chore commit message')
          expect(result.valid).toBe(false)
        })
      })

      // type-enum
      describe('type-enum', () => {
        it('should pass the type-enum rule', async () => {
          const result = await lintMessage('chore: This is a chore commit message')
          expect(result.valid).toBe(true)
          expect(result.errors).toStrictEqual([])
          expect(result.warnings).toStrictEqual([])
        })

        it('should not pass the type-enum rule', async () => {
          const result = await lintMessage('wip: This is a work in progress')
          expect(result.valid).toBe(false)
        })
      })

      describe('selective-scope defaults', () => {
        it('should accept feat without scope', async () => {
          const result = await lintMessage('feat: Add new feature')
          expect(result.valid).toBe(true)
        })

        it('should reject feat with any scope', async () => {
          const result = await lintMessage('feat(api): Add new feature')
          expect(result.valid).toBe(false)
        })

        it('should accept chore without scope', async () => {
          const result = await lintMessage('chore: Update dependency lockfile')
          expect(result.valid).toBe(true)
        })

        it('should accept chore with release scope', async () => {
          const result = await lintMessage('chore(release): v1.2.3')
          expect(result.valid).toBe(true)
        })

        it('should reject chore with any other scope', async () => {
          const result = await lintMessage('chore(deps): Update dependency lockfile')
          expect(result.valid).toBe(false)
        })
      })

      describe('subject-release', () => {
        it('should accept a semver release subject', async () => {
          const result = await lintMessage('chore(release): v1.2.3')
          expect(result.valid).toBe(true)
          expect(result.errors).toStrictEqual([])
          expect(result.warnings).toStrictEqual([])
        })

        it('should accept a semver release with prerelease modifier', async () => {
          const result = await lintMessage('chore(release): v1.2.3-rc.1')
          expect(result.valid).toBe(true)
          expect(result.errors).toStrictEqual([])
          expect(result.warnings).toStrictEqual([])
        })

        it('should accept a snapshot release with calendar modifier', async () => {
          const result = await lintMessage('chore(release): v0.0.0-snapshot.20260412.1')
          expect(result.valid).toBe(true)
          expect(result.errors).toStrictEqual([])
          expect(result.warnings).toStrictEqual([])
        })

        it('should accept an encoded date release with micro counter', async () => {
          const result = await lintMessage('chore(release): v20260430.1')
          expect(result.valid).toBe(true)
          expect(result.errors).toStrictEqual([])
          expect(result.warnings).toStrictEqual([])
        })

        it('should accept a calendar release with four segments', async () => {
          const result = await lintMessage('chore(release): v2026.04.30.1')
          expect(result.valid).toBe(true)
          expect(result.errors).toStrictEqual([])
          expect(result.warnings).toStrictEqual([])
        })

        it('should reject a release marked as breaking change', async () => {
          const result = await lintMessage('chore(release)!: v1.0.0')
          expect(result.valid).toBe(false)
        })

        it('should reject a release whose subject is not a version', async () => {
          const result = await lintMessage('chore(release): New version')
          expect(result.valid).toBe(false)
        })

        it('should not bypass rules for non-release chore scopes with version-like subjects', async () => {
          const result = await lintMessage('chore(deps): v20260430.1')
          expect(result.valid).toBe(false)
        })
      })
    })
  })
})
