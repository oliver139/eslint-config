# @oliver139/eslint-config

[![NPM Version](https://img.shields.io/npm/v/@oliver139/eslint-config?label=npm)](https://www.npmjs.com/package/@oliver139/eslint-config)
[![NPM License](https://img.shields.io/npm/l/all-contributors.svg?style=flat)](https://github.com/oliver139/pnpm-update-script/blob/main/LICENSE)

Oliver's ESLint config preset powered by [`@antfu/eslint-config`](https://github.com/antfu/eslint-config)

- [ESLint Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files) is used
- Requires ESLint `v9.10.0+`
- Support Vanilla or VueJS only
- Optional [Vue-A11y](https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/) support
- Able to change quote style and whether using semicolon or not

## Usage

### Install

```sh
pnpm add -D @oliver139/eslint-config
```

And create `eslint.config.mjs` in your project root:

```ts
// eslint.config.mjs
import { eslintConfigBuilder } from "@oliver139/eslint-config";

export default await eslintConfigBuilder();
```

### Customize

Parameters can be passed to the function to customize a bit the style and this is the default setting:

```ts
// eslint.config.mjs
import { eslintConfigBuilder } from "@oliver139/eslint-config";

export default await eslintConfigBuilder({
  // Type of the project. 'lib' for libraries, the default is 'app'
  // Check out @antfu/eslint-config for more
  type: "app",

  // Whether including the vue-a11y plugin or not
  vueA11y: false,

  // Quote style
  quotes: "double", // or "single"

  // Add semicolon or not
  semicolon: true,
});
```

### Add script for `package.json`

For example:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

## Development

### Project Setup

```sh
pnpm install
pnpm link .
```

### Inspect ESLint Config

Will build before inspect

```sh
pnpm lint:inspect
```

### Build the project with Rollup

```sh
pnpm build
```
