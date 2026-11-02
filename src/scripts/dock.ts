// Magnificación del dock: cada ítem crece según la cercanía horizontal del cursor.
// Solo escribe la variable --dock-size; el aspecto vive en Dock.astro.

// BASE_SIZE coincide con --dock-base de escritorio (Dock.astro): solo se magnifica con puntero fino.
const BASE_SIZE = 48;
const MAX_SIZE = 84;
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
    const x = pointerX;
    if (x === null) {
      for (const item of items) item.style.removeProperty('--dock-size');
      return;
    }
    // Primero todas las lecturas y después todas las escrituras: evita un reflow por ítem.
    const centers = items.map((item) => {
      const rect = item.getBoundingClientRect();
      return rect.left + rect.width / 2;
    });
    items.forEach((item, i) => {
      item.style.setProperty('--dock-size', `${sizeFor(Math.abs(x - centers[i]))}px`);
    });
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
