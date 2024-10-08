import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import tailwind from 'eslint-plugin-tailwindcss'
import eslintPrettierConfig from 'eslint-config-prettier'

export default [
  { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
  {
    ignores: ['node_modules', 'dist', 'build', 'coverage', 'docs', 'public']
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  ...tailwind.configs['flat/recommended'],
  eslintPrettierConfig,
  { files: ['**/*.ts'], languageOptions: { parserOptions: { parser: tseslint.parser } } },
  { files: ['**/*.vue'], languageOptions: { parserOptions: { parser: tseslint.parser } } },
  {
    rules: {
      'tailwindcss/classnames-order': 'error',
      'tailwindcss/no-arbitrary-value': 'warn'
    }
  }
]
