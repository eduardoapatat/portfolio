// Secciones del CV que no son experiencia (esa vive en la colección `experience`).
// Fuente: cv/CV.tex. Al cambiar el CV, actualizar ambos.
import type { Lang } from '@/i18n/ui';

type Localized = Record<Lang, string>;

export const cv = {
  education: [
    {
      institution: { es: 'Universidad de Tarapacá', en: 'University of Tarapacá' },
      degree: {
        es: 'Ingeniería Civil en Computación e Informática',
        en: 'Civil Engineering in Computer Science and Informatics',
      },
      status: { es: 'Titulado', en: 'Graduated' },
      location: 'Chile',
      start: new Date('2020-03-01'),
      end: new Date('2026-07-01'),
    },
  ],
  certifications: [
    { name: 'CCNA: Introduction to Networks', issuer: 'Cisco', date: new Date('2023-07-01') },
  ],
  // Cada habilidad lleva su ícono (lucide) para el inicio.
  skills: [
    {
      icon: 'lucide:flag',
      text: {
        es: 'Liderazgo de proyectos, desde la necesidad del usuario hasta la entrega.',
        en: 'Project leadership, from user need to delivery.',
      },
    },
    {
      icon: 'lucide:messages-square',
      text: {
        es: 'Levantamiento de requerimientos, análisis de sistemas y comunicación con usuarios no técnicos.',
        en: 'Requirements gathering, systems analysis and communication with non-technical users.',
      },
    },
    {
      icon: 'lucide:accessibility',
      text: {
        es: 'Ordenar sitios web para que la información se encuentre fácil, con contenido claro y accesible.',
        en: 'Organizing websites so information is easy to find, with clear and accessible content.',
      },
    },
  ] satisfies { icon: string; text: Localized }[],
};
