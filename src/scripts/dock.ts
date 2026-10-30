// Magnificación del dock: cada ítem crece según la cercanía horizontal del cursor.
// Solo escribe la variable --dock-size; el aspecto vive en Dock.astro.

const BASE_SIZE = 40;
const MAX_SIZE = 80;
const RANGE = 150;

const canMagnify = () =>
  matchMedia('(prefers-reduced-motion: no-preference) and (pointer: fine)').matches;

function sizeFor(distance: number) {
  if (distance >= RANGE) return BASE_SIZE;
  // Caída coseno: suave en el centro y en los bordes del rango.
  const falloff = (Math.cos((Math.PI * distance) / RANGE) + 1) / 2;
  return BASE_SIZE + (MAX_SIZE - BASE_SIZE) * falloff;
}

function setupDock() {
  const dock = document.querySelector<HTMLElement>('[data-dock]');
  if (!dock || !canMagnify()) return;

  const items = [...dock.querySelectorAll<HTMLElement>('[data-dock-item]')];
  let pointerX: number | null = null;
  let frame = 0;

  const render = () => {
    frame = 0;
    for (const item of items) {
      if (pointerX === null) {
        item.style.removeProperty('--dock-size');
        continue;
      }
      const rect = item.getBoundingClientRect();
      const distance = Math.abs(pointerX - (rect.left + rect.width / 2));
      item.style.setProperty('--dock-size', `${sizeFor(distance)}px`);
    }
  };

  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(render);
  };

  dock.addEventListener('pointermove', (event) => {
    pointerX = event.clientX;
    schedule();
  });
  dock.addEventListener('pointerleave', () => {
    pointerX = null;
    schedule();
  });
}

document.addEventListener('astro:page-load', setupDock);
