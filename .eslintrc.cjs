/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    // 'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    // '@vue/eslint-config-prettier/skip-formatting',
    '@vue/eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
}
