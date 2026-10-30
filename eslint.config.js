// @ts-check
import js from '@eslint/js';
import eslintPluginAstro from 'eslint-plugin-astro';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig(
  { ignores: ['dist/', '.astro/', '.claude/'] },
  js.configs.recommended,
  tseslint.configs.recommended,
  eslintPluginAstro.configs.recommended,
  // Reglas de accesibilidad (eslint-plugin-jsx-a11y) aplicadas al marcado de los .astro.
  eslintPluginAstro.configs['jsx-a11y-recommended'],
  {
    files: ['**/*.astro'],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
    rules: {
      // Una región con scroll propio debe poder enfocarse para desplazarla con teclado (WCAG).
      'astro/jsx-a11y/no-noninteractive-tabindex': ['error', { roles: ['region'] }],
    },
  },
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
);
