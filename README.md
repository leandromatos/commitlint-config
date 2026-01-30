# Commitlint Config

This repository contains a set of tools to help you standardize your commit messages. It is based on the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) with some customizations, including two custom plugins: `selective-scope` for per-type scope validation and `subject-release` for release commit enforcement.

## Usage

Use yarn or another package manager to install the required dependencies:

```shell
yarn add --dev @commitlint/cli @leandromatos/commitlint-config
```

Then, create a `commitlint.config.js` in the root of your project with the following content:

```js
export default {
  extends: [
    "@leandromatos/commitlint-config"
  ]
}

```

## Rules

### Standard Rules

These rules come from `@commitlint/config-conventional`.

#### body-leading-blank

The `body-leading-blank` rule is used to enforce the presence of a blank line between the subject and the body if the body is present.

```sh
# ❌ Fail
git commit -m "fix: Some message\nBody message"
# ✅ Pass
git commit -m "fix: Some message\n\nBody message"
```

#### body-max-line-length

The `body-max-line-length` rule is used to enforce a maximum line length for the body.

```sh
# ❌ Fail
git commit -m "fix: Some message\n\nSome body message with more than 100 characters just for testing if the commitlint is working properly"
# ✅ Pass
git commit -m "fix: Some short commit message"
```

#### footer-leading-blank

The `footer-leading-blank` rule is used to enforce the presence of a blank line between the body and the footer.

```sh
# ❌ Fail
git commit -m "fix: Some message\n\nBody message\nFooter message"
# ✅ Pass
git commit -m "fix: Some message\n\nBody message\n\nFooter message"
```

#### footer-max-line-length

The `footer-max-line-length` rule is used to enforce a maximum line length for the footer.

```sh
# ❌ Fail
git commit -m "fix: Some message\n\nSome footer message with more than 100 characters just for testing if the commitlint is working properly"
# ✅ Pass
git commit -m "fix: Some message\n\nFooter message"
```

#### header-max-length

The `header-max-length` rule is used to enforce a maximum line length for the header.

```sh
# ❌ Fail
git commit -m "fix: Some message with more than 100 characters just for testing if the commitlint is working properly"
# ✅ Pass
git commit -m "fix: Some message"
```

#### header-trim

The `header-trim` rule is used to enforce the absence of leading or trailing whitespaces in the header.

```sh
# ❌ Fail
git commit -m " fix: Some message"
# ❌ Fail
git commit -m "fix: Some message "
# ✅ Pass
git commit -m "fix: Some message"
```

#### subject-case

The `subject-case` rule is used to enforce the use of the sentence case.

```sh
# ❌ Fail
git commit -m "fix: some message"
# ✅ Pass
git commit -m "fix: Some message"
```

#### subject-empty

The `subject-empty` rule is used to enforce the presence of a subject.

```sh
# ❌ Fail
git commit -m ""
# ✅ Pass
git commit -m "fix: Some message"
```

#### subject-full-stop

The `subject-full-stop` rule is used to enforce the absence of a period at the end of the subject.

```sh
# ❌ Fail
git commit -m "fix: Some message."
# ✅ Pass
git commit -m "fix: Some message"
```

#### type-case

The `type-case` rule is used to enforce the use of the lowercase.

```sh
# ❌ Fail
git commit -m "FIX: Some message"
# ✅ Pass
git commit -m "fix: Some message"
```

#### type-empty

The `type-empty` rule is used to enforce the presence of a type.

```sh
# ❌ Fail
git commit -m ": Some message"
# ✅ Pass
git commit -m "fix: Some message"
```

#### type-enum

The `type-enum` rule is used to enforce the use of the following types:

* `build`: Changes that affect the build system or external dependencies
* `chore`: Changes that don't affect the source code
* `ci`: Changes to our CI configuration files and scripts
* `docs`: Documentation only changes
* `feat`: A new feature
* `fix`: A bug fix
* `perf`: A code change that improves performance
* `refactor`: A code change that neither fixes a bug nor adds a feature
* `revert`: Reverts a previous commit
* `style`: Changes that do not affect the meaning of the code (whitespace, formatting, missing semi-colons, etc)
* `test`: Adding missing tests or correcting existing tests

### Custom Rules

These rules are provided by this config's custom plugins.

#### selective-scope

The `selective-scope` rule provides per-type scope validation. You can configure which scopes are allowed for each commit type by overriding the rule in your config:

```js
export default {
  extends: ["@leandromatos/commitlint-config"],
  rules: {
    "selective-scope": [2, "always", {
      feat: ["api", "ui"],
      fix: [null, "api", "ui"],
      chore: [],
      ci: [/^workflow-/],
    }],
  },
}
```

**Configuration modes:**

| Config value    | Meaning                                                       |
| --------------- | ------------------------------------------------------------- |
| `[]`            | Scope is **forbidden** for this type                          |
| `['api', 'ui']` | Scope is **required** and must match one of the listed values |
| `[null, 'api']` | Scope is **optional**; if provided, must match                |
| `[/^feature-/]` | Scope must match the **regex** pattern                        |

**Examples:**

Given `feat: ['api', 'ui']`:

```sh
# ❌ Fail: scope is required
git commit -m "feat: Add endpoint"
# ✅ Pass
git commit -m "feat(api): Add endpoint"
# ❌ Fail: scope 'core' not allowed
git commit -m "feat(core): Add endpoint"
```

Given `chore: []`:

```sh
# ❌ Fail: scope is not allowed
git commit -m "chore(deps): Update deps"
# ✅ Pass
git commit -m "chore: Update deps"
```

Given `fix: [null, 'api', 'ui']`:

```sh
# ✅ Pass: scope is optional
git commit -m "fix: Resolve crash"
# ✅ Pass
git commit -m "fix(api): Resolve crash"
# ❌ Fail: scope 'core' not allowed
git commit -m "fix(core): Resolve crash"
```

Given `ci: [/^workflow-/]`:

```sh
# ✅ Pass
git commit -m "ci(workflow-lint): Update"
# ❌ Fail: scope doesn't match pattern
git commit -m "ci(deploy): Update"
```

> **Note:** If you configure `chore` in `selective-scope`, make sure to include
> `'release'` in the allowed scopes (e.g. `chore: ['release']` or
> `chore: [null, 'release']`). Otherwise, the `subject-release` rule
> — which expects `chore(release): vX.Y.Z` commits — will conflict
> with `selective-scope`.

#### subject-release

The `subject-release` rule is used to enforce the presence of a release version in the subject, and it must be a non-breaking change.

```sh
# ❌ Fail
git commit -m "chore(release): New version"
# ❌ Fail
git commit -m "chore(release)!: v1.0.0"
# ✅ Pass
git commit -m "chore(release): v1.0.0"
```

## Contributing

Contributions are welcome. Please see the [CONTRIBUTING](CONTRIBUTING.md) file for more information.

## License

This package is licensed under the MIT License. For more information, see the [LICENSE](LICENSE) file.
