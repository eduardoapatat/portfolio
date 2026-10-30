// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import { routes } from './src/i18n/routes.ts';

// URL pública del sitio (definir SITE_URL en el hosting). Sin ella no se generan
// canónicas, Open Graph absolutos ni sitemap, pero el sitio compila igual.
const site = process.env.SITE_URL;

/**
 * Alternativas de idioma para el sitemap. Las rutas tienen slugs traducidos
 * (/proyectos/ ↔ /en/projects/), así que se emparejan con el mapa de rutas.
 * @param {string} url
 */
function alternatesFor(url) {
  const path = new URL(url).pathname;
  const pair = Object.values(routes).find((r) => r.es === path || r.en === path);
  if (!pair || !site) return undefined;
  return [
    { lang: 'es', url: new URL(pair.es, site).href },
    { lang: 'en', url: new URL(pair.en, site).href },
  ];
}

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [
    icon(),
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize: (item) => ({ ...item, links: alternatesFor(item.url) }),
    }),
  ],
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: {
      prefixDefaultLocale: false,
    },
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains-mono',
      weights: [400, 500, 700],
      styles: ['normal'],
      fallbacks: ['monospace'],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
