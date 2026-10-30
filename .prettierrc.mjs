// @ts-check

/** @type {import('prettier').Config} */
export default {
  singleQuote: true,
  printWidth: 100,
  // prettier-plugin-tailwindcss debe ir al final (ordena las clases de Tailwind).
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
  overrides: [{ files: '*.astro', options: { parser: 'astro' } }],
  tailwindStylesheet: './src/styles/global.css',
};
