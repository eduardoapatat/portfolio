// Secciones del CV que no son experiencia (esa vive en la colección `experience`).
// Fuente: cv/CV.tex. Al cambiar el CV, actualizar ambos.
import type { Lang } from '@/i18n/ui';

type Localized = Record<Lang, string>;

export const cv = {
  headline: {
    es: 'Ingeniero Civil en Computación e Informática · Interés en redes y ciberseguridad',
    en: 'Computer and Informatics Engineer · Interested in networking and cybersecurity',
  } satisfies Localized,
  summary: {
    es: 'Ingeniero Civil en Computación e Informática con experiencia en desarrollo web, análisis de sistemas y arquitectura de la información. Interés principal en redes y ciberseguridad, con formación Cisco CCNA. Lidero proyectos de principio a fin y comunico soluciones técnicas a usuarios no técnicos.',
    en: 'Computer and Informatics Engineer with experience in web development, systems analysis and information architecture. Main interest in networking and cybersecurity, with Cisco CCNA training. I lead projects end to end and communicate technical solutions to non-technical users.',
  } satisfies Localized,
  education: [
    {
      institution: { es: 'Universidad de Tarapacá', en: 'University of Tarapacá' },
      degree: {
        es: 'Ingeniería Civil en Computación e Informática',
        en: 'Civil Engineering in Computer Science and Informatics',
      },
      location: 'Arica, Chile',
      start: new Date('2020-03-01'),
      end: new Date('2026-07-01'),
    },
  ],
  certifications: [
    { name: 'CCNA: Introduction to Networks', issuer: 'Cisco', date: new Date('2023-07-01') },
  ],
  skills: {
    es: [
      'Liderazgo de proyectos, desde la necesidad del usuario hasta la entrega.',
      'Levantamiento de requerimientos, análisis de sistemas y comunicación con usuarios no técnicos.',
      'Arquitectura de la información, accesibilidad web y gestión de contenidos.',
      'Español nativo.',
    ],
    en: [
      'Project leadership, from user need to delivery.',
      'Requirements gathering, systems analysis and communication with non-technical users.',
      'Information architecture, web accessibility and content management.',
      'Native Spanish.',
    ],
  } satisfies Record<Lang, string[]>,
  technologies: [
    {
      category: { es: 'Desarrollo web', en: 'Web development' },
      items: ['HTML', 'CSS', 'JavaScript', 'Astro', 'PHP', 'Laravel', 'API REST'],
    },
    {
      category: { es: 'Datos y BI', en: 'Data & BI' },
      items: {
        es: ['Modelado dimensional', 'Data warehouses', 'ETL', 'Dashboards'],
        en: ['Dimensional modeling', 'Data warehouses', 'ETL', 'Dashboards'],
      },
    },
    {
      category: { es: 'Redes', en: 'Networking' },
      items: ['Cisco CCNA'],
    },
  ] satisfies { category: Localized; items: string[] | Record<Lang, string[]> }[],
};
