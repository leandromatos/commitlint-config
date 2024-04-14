export const subjectRelease = parsed => {
    const { type, scope, header } = parsed;
    if (isChoreRelease(type, scope) && isBreakingChange(header))
        return [false, 'the subject of a release commit cannot be a breaking change'];
    return [true];
};
const isChoreRelease = (type, scope) => {
    return type === 'chore' && scope === 'release';
};
const isBreakingChange = (header) => {
    const breakingHeaderPattern = /^(\w*)(?:\((.*)\))?!: (.*)$/;
    return breakingHeaderPattern.test(header);
};
//# sourceMappingURL=subject-release.js.map