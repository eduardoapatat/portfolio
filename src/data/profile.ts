import type { Lang } from '@/i18n/ui';

type Localized = Record<Lang, string>;

export type StackItem = { name: string; icon: string };

export const profile = {
  name: 'Eduardo Apata Tito',
  role: { es: 'Desarrollador Fullstack', en: 'Fullstack Developer' } satisfies Localized,
  // Borrador: revisar y ajustar el texto.
  tagline: {
    es: 'Construyo sistemas web de punta a punta para instituciones públicas, con Laravel, JavaScript moderno e IA integrada en el flujo de trabajo.',
    en: 'I build end-to-end web systems for public institutions, with Laravel, modern JavaScript and AI built into the workflow.',
  } satisfies Localized,
  email: 'eduardotito.jose01@gmail.com',
  location: 'Arica, Chile',
  github: 'https://github.com/eduardoapatat/',
  linkedin: 'https://www.linkedin.com/in/eapatatito/',
  // PDF compilado desde cv/CV.tex; sin versión en inglés, ese idioma enlaza al PDF en español.
  cvPdf: { es: '/cv/eduardo-apata-tito-cv-es.pdf' } as Partial<Localized>,
  // TODO: completar con el stack real (iconos de simple-icons).
  stack: [
    { name: 'Laravel', icon: 'simple-icons:laravel' },
    { name: 'PHP', icon: 'simple-icons:php' },
    { name: 'JavaScript', icon: 'simple-icons:javascript' },
    { name: 'Astro', icon: 'simple-icons:astro' },
  ] satisfies StackItem[],
};
