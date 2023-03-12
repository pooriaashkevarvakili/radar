
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'prettier',
    'prettier/vue',
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    'prettier'
  ],
  // add your custom rules here
  rules: {
    "indent": ["error", "tab", { "SwitchCase": 1 }],
    "no-tabs": 0,
    "vue/html-indent": ["error", "tab"],
    "semi": ["error", "always"],
    "no-console": "off",
    "vue/no-v-html": "off"
  }
}
