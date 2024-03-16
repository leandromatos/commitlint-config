# Commitlint Config

This repository contains a set of tools to help you standardize your commit messages. It is based on the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) with some customizations.

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

### body-leading-blank

The `body-leading-blank` rule is used to enforce the presence of a blank line between the subject and the body if the body is present.

```sh
git commit -m "fix: Some message\nBody message" # ❌
git commit -m "fix: Some message\n\nBody message" # ✅
```

### body-max-line-length

The `body-max-line-length` rule is used to enforce a maximum line length for the body.

```sh
git commit -m "fix: Some message\n\nSome body message with more than 100 characters just for testing if the commitlint is working properly" # ❌
git commit -m "fix: Some short commit message" # ✅
```

### footer-leading-blank

The `footer-leading-blank` rule is used to enforce the presence of a blank line between the body and the footer.

```sh
git commit -m "fix: Some message\n\nBody message\nFooter message" # ❌
git commit -m "fix: Some message\n\nBody message\n\nFooter message" # ✅
```

### footer-max-line-length

The `footer-max-line-length` rule is used to enforce a maximum line length for the footer.

```sh
git commit -m "fix: Some message\n\nSome footer message with more than 100 characters just for testing if the commitlint is working properly" # ❌
git commit -m "fix: Some message\n\nFooter message" # ✅
```

### header-max-length

The `header-max-length` rule is used to enforce a maximum line length for the header.

```sh
git commit -m "fix: Some message with more than 100 characters just for testing if the commitlint is working properly" # ❌
git commit -m "fix: Some message" # ✅
```

### header-trim

The `header-trim` rule is used to enforce the absence of leading or trailing whitespaces in the header.

```sh
git commit -m " fix: Some message" # ❌
git commit -m "fix: Some message " # ❌
git commit -m "fix: Some message" # ✅
```

### subject-case

The `subject-case` rule is used to enforce the use of the sentence case.

```sh
git commit -m "fix: some message" # ❌
git commit -m "fix: Some message" # ✅
```

### subject-empty

The `subject-empty` rule is used to enforce the presence of a subject.

```sh
git commit -m "" # ❌
git commit -m "fix: Some message" # ✅
```

### subject-full-stop

The `subject-full-stop` rule is used to enforce the absence of a period at the end of the subject.

```sh
git commit -m "fix: Some message." # ❌
git commit -m "fix: Some message" # ✅
```

### subject-release

The `subject-release` rule is used to enforce the presence of a release version in the subject, and it must be a non-breaking change.

```sh
git commit -m "chore(release): New version" # ❌
git commit -m "chore(release)!: v1.0.0" # ❌
git commit -m "chore(release): v1.0.0"  # ✅
```


### type-case

The `type-case` rule is used to enforce the use of the lowercase.

```sh
git commit -m "FIX: Some message" # ❌
git commit -m "fix: Some message" # ✅
```

### type-empty

The `type-empty` rule is used to enforce the presence of a type.

```sh
git commit -m ": Some message" # ❌
git commit -m "fix: Some message" # ✅
```

### type-enum

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

## License

This package is licensed under the MIT License. For more information, see the [LICENSE](LICENSE) file.
