import lint from '@commitlint/lint';
import load from '@commitlint/load';
import { describe, expect, it } from 'vitest';
import config from '../config.js';
const { plugins, rules, parserPreset } = await load(config);
const lintMessage = async (message) => {
    const result = await lint(message, rules, {
        plugins,
        parserOpts: parserPreset.parserOpts,
    });
    return result;
};
describe('Config', () => {
    // Commit Messages
    describe('Commit Messages', () => {
        describe('Config', () => {
            it('should have a config object with the rules', () => {
                expect(config).toMatchObject({
                    rules: {
                        'subject-case': expect.anything(),
                        'subject-release': expect.anything(),
                        'type-enum': expect.anything(),
                    },
                });
            });
        });
        describe('Rules', () => {
            // body-leading-blank
            describe('body-leading-blank', () => {
                it('should pass the body-leading-blank rule', async () => {
                    const result = await lintMessage('chore: This is a chore commit message\n\nThis is the body');
                    expect(result.valid).toBe(true);
                    expect(result.errors).toStrictEqual([]);
                    expect(result.warnings).toStrictEqual([]);
                });
                it('should not pass the body-leading-blank rule', async () => {
                    const result = await lintMessage('chore: This is a chore commit message\n');
                    expect(result.valid).toBe(false);
                });
            });
            // body-max-line-length
            describe('body-max-line-length', () => {
                it('should pass the body-max-line-length rule', async () => {
                    const result = await lintMessage('chore: This is a chore commit message\n\nThis is the body');
                    expect(result.valid).toBe(true);
                    expect(result.errors).toStrictEqual([]);
                    expect(result.warnings).toStrictEqual([]);
                });
                it('should not pass the body-max-line-length rule', async () => {
                    const result = await lintMessage('chore: This is a chore commit message\n\nThis is the body with a long line that should not pass the rule');
                    expect(result.valid).toBe(false);
                });
            });
            // footer-leading-blank
            describe('footer-leading-blank', () => {
                it('should pass the footer-leading-blank rule', async () => {
                    const result = await lintMessage('chore: This is a chore commit message\n\nThis is the body\n\nThis is the footer');
                    expect(result.valid).toBe(true);
                    expect(result.errors).toStrictEqual([]);
                    expect(result.warnings).toStrictEqual([]);
                });
                it('should not pass the footer-leading-blank rule', async () => {
                    const result = await lintMessage('chore: This is a chore commit message\n\nThis is the body\nThis is the footer');
                    expect(result.valid).toBe(false);
                });
            });
            // footer-max-line-length
            describe('footer-max-line-length', () => {
                it('should pass the footer-max-line-length rule', async () => {
                    const result = await lintMessage('chore: This is a chore commit message\n\nThis is the body\n\nThis is the footer');
                    expect(result.valid).toBe(true);
                    expect(result.errors).toStrictEqual([]);
                    expect(result.warnings).toStrictEqual([]);
                });
                it('should not pass the footer-max-line-length rule', async () => {
                    const result = await lintMessage('chore: This is a chore commit message\n\nThis is the body\n\nThis is the footer with a long line that should not pass the rule');
                    expect(result.valid).toBe(false);
                });
            });
            // header-max-length
            describe('header-max-length', () => {
                it('should pass the header-max-length rule', async () => {
                    const result = await lintMessage('chore: This is a chore commit message');
                    expect(result.valid).toBe(true);
                    expect(result.errors).toStrictEqual([]);
                    expect(result.warnings).toStrictEqual([]);
                });
                it('should not pass the header-max-length rule', async () => {
                    const result = await lintMessage('chore: This is a chore commit message with a long header that should not pass the rule');
                    expect(result.valid).toBe(false);
                });
            });
            // header-trim
            describe('header-trim', () => {
                it('should pass the header-trim rule', async () => {
                    const result = await lintMessage('chore: This is a chore commit message');
                    expect(result.valid).toBe(true);
                    expect(result.errors).toStrictEqual([]);
                    expect(result.warnings).toStrictEqual([]);
                });
                it('should not pass the header-trim rule', async () => {
                    const result = await lintMessage(' chore: This is a chore commit message');
                    expect(result.valid).toBe(false);
                });
            });
            // subject-case
            describe('subject-case', () => {
                it('should pass the subject-case rule', async () => {
                    const result = await lintMessage('chore: This is a chore commit message');
                    expect(result.valid).toBe(true);
                    expect(result.errors).toStrictEqual([]);
                    expect(result.warnings).toStrictEqual([]);
                });
                it('should not pass the subject-case rule', async () => {
                    const result = await lintMessage('chore: This is a chore commit message');
                    expect(result.valid).toBe(false);
                });
            });
            // subject-empty
            describe('subject-empty', () => {
                it('should pass the subject-empty rule', async () => {
                    const result = await lintMessage('chore:');
                    expect(result.valid).toBe(true);
                    expect(result.errors).toStrictEqual([]);
                    expect(result.warnings).toStrictEqual([]);
                });
                it('should not pass the subject-empty rule', async () => {
                    const result = await lintMessage('chore:');
                    expect(result.valid).toBe(false);
                });
            });
            // subject-full-stop
            describe('subject-full-stop', () => {
                it('should pass the subject-full-stop rule', async () => {
                    const result = await lintMessage('chore: This is a chore commit message');
                    expect(result.valid).toBe(true);
                    expect(result.errors).toStrictEqual([]);
                    expect(result.warnings).toStrictEqual([]);
                });
                it('should not pass the subject-full-stop rule', async () => {
                    const result = await lintMessage('chore: This is a chore commit message.');
                    expect(result.valid).toBe(false);
                });
            });
            // type-case
            describe('type-case', () => {
                it('should pass the type-case rule', async () => {
                    const result = await lintMessage('chore: This is a chore commit message');
                    expect(result.valid).toBe(true);
                    expect(result.errors).toStrictEqual([]);
                    expect(result.warnings).toStrictEqual([]);
                });
                it('should not pass the type-case rule', async () => {
                    const result = await lintMessage('Chore: This is a chore commit message');
                    expect(result.valid).toBe(false);
                });
            });
            // type-empty
            describe('type-empty', () => {
                it('should pass the type-empty rule', async () => {
                    const result = await lintMessage(': This is a chore commit message');
                    expect(result.valid).toBe(true);
                    expect(result.errors).toStrictEqual([]);
                    expect(result.warnings).toStrictEqual([]);
                });
                it('should not pass the type-empty rule', async () => {
                    const result = await lintMessage(': This is a chore commit message');
                    expect(result.valid).toBe(false);
                });
            });
            // type-enum
            describe('type-enum', () => {
                it('should pass the type-enum rule', async () => {
                    const result = await lintMessage('chore: This is a chore commit message');
                    expect(result.valid).toBe(true);
                    expect(result.errors).toStrictEqual([]);
                    expect(result.warnings).toStrictEqual([]);
                });
                it('should not pass the type-enum rule', async () => {
                    const result = await lintMessage('wip: This is a work in progress');
                    expect(result.valid).toBe(false);
                });
            });
        });
        // it('should be a valid commit message', async () => {
        //   const result = await lintMessage('chore: This is a chore commit message')
        //   expect(result.valid).toBe(true)
        //   expect(result.errors).toStrictEqual([])
        //   expect(result.warnings).toStrictEqual([])
        // })
        // it('should be a invalid commit message because the subject is empty', async () => {
        //   const result = await lintMessage('chore:')
        //   expect(result.valid).toBe(false)
        // })
        // it('should be a valid commit message with a breaking change on the scope', async () => {
        //   const result = await lintMessage('fix!: This is a fix commit message with a breaking change on the scope')
        //   expect(result.valid).toBe(true)
        //   expect(result.errors).toStrictEqual([])
        //   expect(result.warnings).toStrictEqual([])
        // })
        // it('should be a valid commit message with a breaking change on the subject', async () => {
        //   const result = await lintMessage('fix: This is a fix commit message with a BREAKING CHANG')
        //   expect(result.valid).toBe(true)
        //   expect(result.errors).toStrictEqual([])
        //   expect(result.warnings).toStrictEqual([])
        // })
        // it('should be a invalid commit message because the type is not available', async () => {
        //   const result = await lintMessage('wip: This is a work in progress')
        //   expect(result.valid).toBe(false)
        // })
    });
    // Release Subject Plugin
    describe('Release Subject Plugin', () => {
        it('should be a valid commit message for release with prefix', async () => {
            const result = await lintMessage('chore(release): v1.0.0');
            expect(result.valid).toBe(true);
            expect(result.errors).toStrictEqual([]);
            expect(result.warnings).toStrictEqual([]);
        });
        it('should be a valid commit message for release without prefix', async () => {
            const result = await lintMessage('chore(release): 1.0.0');
            expect(result.valid).toBe(true);
            expect(result.errors).toStrictEqual([]);
            expect(result.warnings).toStrictEqual([]);
        });
        it('should be a invalid commit message for a relase because the subject is a breaking change', async () => {
            const result = await lintMessage('chore(release)!: v1.0.0');
            expect(result.valid).toBe(false);
        });
    });
});
//# sourceMappingURL=config.spec.js.map