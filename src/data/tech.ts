// Ícono (simple-icons) y color de cada tecnología, por nombre: el que se escribe en `tech`
// de los proyectos y en `profile.stack`. Sin entrada, la tecnología se muestra como texto.
// Los colores son los de cada marca; cuando no alcanzan contraste 3:1 sobre la tecla
// (--color-dock-key) se aclaran o se usa el color del texto.

export type TechIcon = { icon: string; color: string };

const tech: Record<string, TechIcon> = {
  HTML: { icon: 'simple-icons:html5', color: '#e34f26' },
  CSS: { icon: 'simple-icons:css', color: '#a07cd6' }, // marca: #663399
  JavaScript: { icon: 'simple-icons:javascript', color: '#f7df1e' },
  TypeScript: { icon: 'simple-icons:typescript', color: '#3178c6' },
  Astro: { icon: 'simple-icons:astro', color: '#bc52ee' },
  'Tailwind CSS': { icon: 'simple-icons:tailwindcss', color: '#06b6d4' },
  PHP: { icon: 'simple-icons:php', color: '#777bb4' },
  Laravel: { icon: 'simple-icons:laravel', color: '#ff2d20' },
  GSAP: { icon: 'simple-icons:greensock', color: '#88ce02' },
  Vercel: { icon: 'simple-icons:vercel', color: 'var(--color-fg)' }, // marca: negro
};

export function techIcon(name: string): TechIcon | undefined {
  return tech[name];
}
