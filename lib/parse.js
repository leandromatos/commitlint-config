export default {
    parserOpts: {
        headerPattern: /^(\w*)(?:\((.*)\))?!?: (.*)$/,
        breakingHeaderPattern: /^(\w*)(?:\((.*)\))?!: (.*)$/,
        headerCorrespondence: ['type', 'scope', 'subject'],
        noteKeywords: ['BREAKING CHANGE'],
        revertPattern: /^revert: "(?:(\w+)(?:\((.*?)\))?!?: (.*?)|(\w+)(?:\((.*?)\))?!: (.*?))"\s+This reverts commit (\w+)\.$/,
        revertCorrespondence: ['header', 'hash'],
        issuePrefixes: ['#'],
        versionPattern: /^v\d+\.\d+\.\d+(-[a-zA-Z0-9]+(\.\d+)?)?$/,
    },
};
