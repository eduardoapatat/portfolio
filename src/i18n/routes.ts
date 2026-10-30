import type { Lang } from './ui';

export const routes = {
  home: { es: '/', en: '/en/' },
  projects: { es: '/proyectos/', en: '/en/projects/' },
  experience: { es: '/experiencia/', en: '/en/experience/' },
  cv: { es: '/cv/', en: '/en/resume/' },
} as const satisfies Record<string, Record<Lang, string>>;

export type RouteKey = keyof typeof routes;
