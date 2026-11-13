import type { Lang } from '@/i18n/ui';

type Localized = Record<Lang, string>;

export const profile = {
  name: 'Eduardo Apata Tito',
  role: { es: 'Desarrollador Fullstack', en: 'Fullstack Developer' } satisfies Localized,
  tagline: {
    es: 'Disfruto crear cosas con tecnología, experimentar y aprender construyendo proyectos. Desarrollo aplicaciones web con Laravel, PHP y JavaScript, mientras sigo explorando áreas como la infraestructura, las redes y la ciberseguridad.',
    en: 'I enjoy building things with technology, experimenting, and learning through hands-on projects. I develop web applications using Laravel, PHP, and JavaScript, while continuing to explore areas such as infrastructure, networking, and cybersecurity.',
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
  stack: ['Laravel', 'PHP', 'Tailwind CSS', 'Astro', 'HTML', 'CSS', 'TypeScript'],
};
