import userConfig from './lib/user-config.js'

/** @type {import('@commitlint/types').UserConfig} */
export default {
  ...userConfig.default,
  parserPreset: './lib/parser-preset.js',
}
