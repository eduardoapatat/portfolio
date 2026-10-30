import { cv } from '@/data/cv';
import { profile } from '@/data/profile';
import type { Lang } from '@/i18n/ui';

const interests: Record<Lang, string[]> = {
  es: ['Redes', 'Ciberseguridad'],
  en: ['Networking', 'Cybersecurity'],
};

/**
 * Datos estructurados (schema.org) del perfil para el inicio: le dicen a los buscadores
 * quién es la persona, a qué se dedica y cuáles son sus perfiles oficiales.
 * Sin email ni teléfono, para no exponerlos a bots.
 */
export function profilePageSchema(lang: Lang, url?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    inLanguage: lang,
    ...(url && { url }),
    mainEntity: {
      '@type': 'Person',
      name: profile.name,
      jobTitle: profile.role[lang],
      description: profile.tagline[lang],
      ...(url && { url }),
      address: {
        '@type': 'PostalAddress',
        addressLocality: profile.address.locality,
        addressCountry: profile.address.countryCode,
      },
      sameAs: [profile.github, profile.linkedin],
      alumniOf: cv.education.map(({ institution }) => ({
        '@type': 'CollegeOrUniversity',
        name: institution[lang],
      })),
      knowsAbout: [...profile.stack.map(({ name }) => name), ...interests[lang]],
    },
  };
}
