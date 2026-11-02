import type { Lang } from '@/i18n/ui';

type Localized = Record<Lang, string>;

export const profile = {
  name: 'Eduardo Apata Tito',
  role: { es: 'Desarrollador Fullstack', en: 'Fullstack Developer' } satisfies Localized,
  tagline: {
    es: 'Construyo sistemas web de punta a punta para instituciones públicas, con Laravel y JavaScript moderno. Además, me sigo formando en redes y ciberseguridad.',
    en: "I build end-to-end web systems for public institutions, with Laravel and modern JavaScript. I'm also training in networking and cybersecurity.",
  } satisfies Localized,
  email: 'eduardotito.jose01@gmail.com',
  location: 'Arica, Chile',
  // Para datos estructurados (ISO 3166-1 alfa-2).
  address: { locality: 'Arica', countryCode: 'CL' },
  github: 'https://github.com/eduardoapatat/',
  linkedin: 'https://www.linkedin.com/in/eapatatito/',
  // PDF compilado desde cv/CV.tex; sin versión en inglés, ese idioma enlaza al PDF en español.
  cvPdf: { es: '/cv/eduardo-apata-tito-cv-es.pdf' } as Partial<Localized>,
  // Stack del CV (cv/CV.tex, sección Tecnologías); los íconos salen de src/data/tech.ts.
  stack: ['HTML', 'CSS', 'JavaScript', 'Astro', 'PHP', 'Laravel'],
};
