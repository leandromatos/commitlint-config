# Commitlint Config

Personal [commitlint](https://commitlint.js.org/) configuration based on [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), with two custom rules: `selective-scope` and `subject-release`.

## Background

[commitlint](https://commitlint.js.org/) validates commit messages against a set of rules. A commit message under Conventional Commits has the structure:

```plaintext
type(scope): subject

body

footer
```

- **type**: keyword describing the kind of change (`feat`, `fix`, `chore`, …)
- **scope**: optional, in parentheses, names the affected area
- **subject**: short summary on the first line
- **body** and **footer**: optional longer description and metadata

Each commitlint rule checks one element of this structure. For example, `subject-case` checks the casing of the subject, `type-enum` checks that the type is in an allowed list, and `header-max-length` limits the length of the first line.

This package extends [`@commitlint/config-conventional`](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) (the standard rules from the Conventional Commits team) and adds two custom rules: `selective-scope` and `subject-release`.

## Installation

```shell
yarn add --dev @commitlint/cli @leandromatos/commitlint-config
```

## Usage

Create `commitlint.config.mjs` at the project root:

```js
export default {
  extends: ['@leandromatos/commitlint-config'],
}
```

## Defaults

This configuration extends [`@commitlint/config-conventional`](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) and adds the rules below on top.

### Allowed types

`build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`.

### Allowed scopes per type (`selective-scope`)

The `selective-scope` rule declares which scopes each commit type may use. By default:

| Type       | Allowed scopes    |
| ---------- | ----------------- |
| `chore`    | `release` or none |
| all others | none              |

So `feat: Add feature` is accepted, `feat(api): Add feature` is rejected, `chore(release): v1.0.0` is accepted, and `chore(deps): Update lockfile` is rejected.

### Release commits (`subject-release`)

The `subject-release` rule recognizes release commits, validates that the subject is a version number, and rejects breaking change markers on them.

A release commit is any commit whose `type` is `chore` and whose `scope` is `release`. Its subject must match the default version pattern `^v?\d+(\.\d+)+(-[a-zA-Z0-9]+(\.\d+)*)?$`, and the commit may not be flagged as a breaking change with `!`.

Examples accepted:

```sh
chore(release): v1.2.3
chore(release): v1.2.3-rc.1
chore(release): v0.0.0-snapshot.20260412.1
chore(release): v20260430.1
chore(release): v2026.04.30.1
```

Examples rejected:

```sh
chore(release): New version       # subject is not a version
chore(release)!: v1.2.3           # breaking change marker
```

A release commit is a marker — it records which versioned snapshot of the codebase a tag points to. It does not introduce code changes by itself. Breaking changes belong to the `feat!` or `fix!` commits that originally introduced them, where they are documented via the `BREAKING CHANGE:` footer. Marking the release commit with `!` would mislead changelog tooling that scans `!` to flag breaking entries: the breaking change would be attributed to the version-bump commit instead of to the actual change that caused it. The rule keeps that separation honest.

Valid release commits are added to the configuration's `ignores` list so that other rules (notably `subject-case`) are skipped for them. This is what allows a leading lowercase `v` in the subject, even though `subject-case` otherwise enforces sentence case.

## Inherited rules

These rules come from `@commitlint/config-conventional` and apply unchanged. Each rule name describes the element it validates — `header-max-length` limits the length of the first line, `subject-empty` requires a subject to exist, `subject-full-stop` forbids a trailing period in the subject, and so on. Refer to the [upstream documentation](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) for full behavior:

`body-leading-blank`, `body-max-line-length`, `footer-leading-blank`, `footer-max-line-length`, `header-max-length`, `header-trim`, `subject-case` (sentence case), `subject-empty`, `subject-full-stop`, `type-case`, `type-empty`.

## Customization

### Override allowed scopes per type

Pass a custom configuration to `selective-scope`:

```js
export default {
  extends: ['@leandromatos/commitlint-config'],
  rules: {
    'selective-scope': [
      2,
      'always',
      {
        chore: [null, 'release'],
        feat: ['api', 'ui'],
        fix: [null, 'api', 'ui'],
      },
    ],
  },
}
```

Configuration values per type:

| Value           | Meaning                                             |
| --------------- | --------------------------------------------------- |
| `[]`            | scope forbidden                                     |
| `['api', 'ui']` | scope required, must match one of the listed values |
| `[null, 'api']` | scope optional; if present, must match              |
| `[/^feature-/]` | scope must match the regex                          |

Types not present in the configuration object are not validated by this rule.

### Override release identity or version pattern

Pass a custom configuration to `subject-release` and provide a matching `ignores` entry built with `buildReleaseIgnore` so that the `subject-case` bypass stays in sync:

```js
import { buildReleaseIgnore } from '@leandromatos/commitlint-config/lib/plugins/subject-release.js'

const release = {
  type: 'chore',
  scope: 'release',
  versionPattern: /^v?\d{8}\.\d+$/,
}

export default {
  extends: ['@leandromatos/commitlint-config'],
  ignores: [buildReleaseIgnore(release)],
  rules: {
    'subject-release': [2, 'always', release],
  },
}
```

`subject-release` configuration fields:

| Field            | Type   | Default                                     |
| ---------------- | ------ | ------------------------------------------- |
| `type`           | string | `'chore'`                                   |
| `scope`          | string | `'release'`                                 |
| `versionPattern` | RegExp | `/^v?\d+(\.\d+)+(-[a-zA-Z0-9]+(\.\d+)*)?$/` |

## Contributing

Contributions are welcome. Please see the [CONTRIBUTING](CONTRIBUTING.md) file for more information.

## License

This software is free and open source, released by Leandro Matos under the MIT License. See the [LICENSE](LICENSE) file for the full terms.
