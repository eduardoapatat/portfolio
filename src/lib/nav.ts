// Navegación del sitio, compartida por el encabezado y el pie.
// Experiencia es una sección del inicio; el CV es el PDF y se abre en otra pestaña.
import { profile } from '@/data/profile';
import type { Lang } from '@/i18n/ui';
import { pathFor, useTranslations } from '@/i18n/utils';
import type { RouteKey } from '@/i18n/routes';

export type NavItem = { label: string; href: string; route?: RouteKey; newTab?: boolean };

export function siteNav(lang: Lang): NavItem[] {
  const t = useTranslations(lang);
  const cv = profile.cvPdf[lang] ?? profile.cvPdf.es;
  return [
    { label: t('nav.home'), href: pathFor('home', lang), route: 'home' },
    { label: t('nav.projects'), href: pathFor('projects', lang), route: 'projects' },
    { label: t('nav.experience'), href: `${pathFor('home', lang)}#experience` },
    ...(cv ? [{ label: t('nav.cv'), href: cv, newTab: true }] : []),
  ];
}
