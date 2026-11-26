// Ícono (simple-icons) y color de cada tecnología, por nombre: el que se escribe en `tech`
// de los proyectos y en `profile.stack`. Sin entrada, la tecnología se muestra como texto.
// Los colores son los de cada marca; cuando no contrastan sobre la ficha clara (--chip)
// se usa la tinta (#0b0b0b).

import type { Lang } from '@/i18n/ui';

/**
 * `wordmark`: el ícono es el logotipo de la marca (src/icons), con sus propios colores, y
 * reemplaza al nombre, que queda solo para lectores de pantalla. Para marcas sin símbolo
 * cuadrado (Webpay).
 */
export type TechIcon = { icon: string; color: string; wordmark?: boolean };
type Localized = Record<Lang, string>;

const tech = {
  HTML: { icon: 'simple-icons:html5', color: '#e34f26' },
  CSS: { icon: 'simple-icons:css', color: '#a07cd6' }, // marca: #663399
  JavaScript: { icon: 'simple-icons:javascript', color: '#f7df1e' },
  TypeScript: { icon: 'simple-icons:typescript', color: '#3178c6' },
  Astro: { icon: 'simple-icons:astro', color: '#bc52ee' },
  'Tailwind CSS': { icon: 'simple-icons:tailwindcss', color: '#06b6d4' },
  PHP: { icon: 'simple-icons:php', color: '#777bb4' },
  Nuxt: { icon: 'simple-icons:nuxtdotjs', color: '#00c58e' },
  Laravel: { icon: 'simple-icons:laravel', color: '#ff2d20' },
  GSAP: { icon: 'simple-icons:greensock', color: '#88ce02' },
  React: { icon: 'simple-icons:react', color: '#61dafb' },
  Vue: { icon: 'simple-icons:vuedotjs', color: '#4fc08d' },
  Inertia: { icon: 'simple-icons:inertia', color: '#9553e9' },
  PostgreSQL: { icon: 'simple-icons:postgresql', color: '#4169e1' },
  SQLite: { icon: 'simple-icons:sqlite', color: '#003b57' },
  Vercel: { icon: 'simple-icons:vercel', color: '#0b0b0b' },
  Cloudflare: { icon: 'simple-icons:cloudflare', color: '#f38020' },
  Docker: { icon: 'simple-icons:docker', color: '#2496ed' },
  'GitHub Actions': { icon: 'simple-icons:githubactions', color: '#2088ff' },
  'Laravel Starter Kits': { icon: 'simple-icons:laravel', color: '#ff2d20' },
  Git: { icon: 'simple-icons:git', color: '#f05032' },
  GitHub: { icon: 'simple-icons:github', color: '#181717' },
  pnpm: { icon: 'simple-icons:pnpm', color: '#f69220' },
  Composer: { icon: 'simple-icons:composer', color: '#885630' },
  Vite: { icon: 'simple-icons:vite', color: '#646cff' },
  'VS Code': { icon: 'simple-icons:visualstudiocode', color: '#007acc' },
  Linux: { icon: 'simple-icons:linux', color: '#0b0b0b' }, // marca: #fcc624 (no contrasta)
  'Claude Code': { icon: 'simple-icons:claudecode', color: '#d97757' },
  Codex: { icon: 'simple-icons:openai', color: '#0b0b0b' },
  'Node.js': { icon: 'simple-icons:nodedotjs', color: '#5fa04e' },
  Express: { icon: 'simple-icons:express', color: '#0b0b0b' },
  // Logotipo oficial de Transbank (transbankdevelopers.cl/brand-assets), solo "webpay.".
  Webpay: { icon: 'webpay', color: '#6d2077', wordmark: true },
  'Mercado Pago': { icon: 'simple-icons:mercadopago', color: '#00b1ea' },
  Stripe: { icon: 'simple-icons:stripe', color: '#635bff' },
} satisfies Record<string, TechIcon>;

export type TechName = keyof typeof tech;

export function techIcon(name: string): TechIcon | undefined {
  return (tech as Record<string, TechIcon>)[name];
}

// Bento de tecnologías del inicio: este orden es el de lectura y el de la grilla en tablet y móvil (la posición en escritorio está en TechSkills.astro). `items` solo acepta nombres registrados arriba (con ícono);
// `extra` es para áreas que no son una tecnología con marca (llevan ícono de lucide).
export type TechGroup = {
  key: 'frontend' | 'backend' | 'database' | 'fullstack' | 'tools' | 'ai' | 'payments' | 'infra';
  title: Localized;
  items: TechName[];
  extra?: { icon: string; text: Localized }[];
  /** Árbol opcional: una base (kit) que, a través de un puente, se ramifica en varias opciones. */
  tree?: { root: TechName; via?: TechName; branches: TechName[] };
};

export const techGroups: TechGroup[] = [
  {
    key: 'fullstack',
    title: { es: 'Full stack', en: 'Full stack' },
    tree: { root: 'Laravel Starter Kits', via: 'Inertia', branches: ['React', 'Vue'] },
    items: ['Nuxt'],
  },
  {
    key: 'frontend',
    title: { es: 'Frontend', en: 'Frontend' },
    items: [
      'HTML',
      'CSS',
      'JavaScript',
      'TypeScript',
      'Vue',
      'React',
      'Astro',
      'Tailwind CSS',
      'GSAP',
    ],
  },
  {
    key: 'backend',
    title: { es: 'Backend', en: 'Backend' },
    items: ['PHP', 'Laravel', 'Node.js', 'Express'],
  },
  {
    key: 'ai',
    title: { es: 'Agentes de IA', en: 'AI agents' },
    items: ['Claude Code', 'Codex'],
  },
  {
    key: 'database',
    title: { es: 'Base de datos', en: 'Databases' },
    items: ['PostgreSQL', 'SQLite'],
  },
  {
    key: 'payments',
    title: { es: 'Pagos', en: 'Payments' },
    items: ['Webpay'],
  },
  {
    key: 'infra',
    title: { es: 'Infraestructura', en: 'Infrastructure' },
    items: ['Linux', 'Docker', 'GitHub Actions', 'Vercel', 'Cloudflare'],
  },
  {
    key: 'tools',
    title: { es: 'Herramientas', en: 'Tools' },
    items: ['Git', 'GitHub', 'pnpm', 'Composer', 'Vite', 'VS Code'],
  },
];

/** Tecnologías que no aparecen en ningún grupo del bento (debe quedar vacío). */
export function ungroupedTech(names: string[]): string[] {
  const grouped = new Set<string>(
    techGroups.flatMap((g) => [
      ...g.items,
      ...(g.tree ? [g.tree.root, ...(g.tree.via ? [g.tree.via] : []), ...g.tree.branches] : []),
    ]),
  );
  return [...new Set(names)].filter((n) => !grouped.has(n));
}
