// Categorías de los proyectos, en el orden en que aparecen los filtros.
// El nombre de cada una, por idioma, está en src/i18n/ui.ts (projects.category.<id>).
export const projectCategories = ['app', 'landing', 'ecommerce', 'sitio'] as const;

export type ProjectCategory = (typeof projectCategories)[number];
