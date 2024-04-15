import lint from '@commitlint/lint';
import load from '@commitlint/load';
import { describe, expect, it } from 'vitest';
import config from '../../config.js';
const lintMessage = async (message) => {
    const { plugins, rules, parserPreset } = await load(config);
    const result = await lint(message, rules, {
        plugins,
        parserOpts: parserPreset?.parserOpts ?? {},
    });
    return result;
};
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
