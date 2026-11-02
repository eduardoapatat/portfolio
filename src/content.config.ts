import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Cada colección tiene una carpeta por idioma: src/content/<colección>/<es|en>/<archivo>.md
// El id resultante es "<idioma>/<archivo>", y así se filtra por idioma en src/lib/content.ts.

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      year: z.number().int(),
      category: z.string(),
      status: z.enum(['desarrollo', 'prototipo', 'produccion']).optional(),
      tech: z.array(z.string()).default([]),
      url: z.url().optional(),
      repo: z.url().optional(),
      // Menor número = aparece primero; a igual orden, el año más reciente primero.
      order: z.number().default(0),
      image: image().optional(),
      imageAlt: z.string().optional(),
    }),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: z.object({
    company: z.string(),
    role: z.string(),
    // Tipo de puesto: se muestra como etiqueta junto a la empresa.
    type: z.enum(['practica', 'ayudantia', 'empleo', 'freelance']).optional(),
    location: z.string().optional(),
    start: z.coerce.date(),
    // Sin fecha de término = trabajo actual.
    end: z.coerce.date().optional(),
  }),
});

export const collections = { projects, experience };
