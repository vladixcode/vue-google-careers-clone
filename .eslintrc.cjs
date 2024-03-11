/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
    'plugin:vitest-globals/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  env: {
    'vitest-globals/env': true,
  },
}
