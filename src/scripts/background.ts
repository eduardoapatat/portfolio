// Fondo en perspectiva: un pasillo de líneas (techo arriba, piso abajo) que se pierde en el centro
// de la pantalla y estrellas en 3D. Al hacer scroll se avanza por el pasillo; sin scroll avanza muy lento.
// El canvas persiste entre páginas (transition:persist), así que este módulo se ejecuta una sola vez.
// También mueve la linterna del cursor; su aspecto vive en Background.astro.

const canvas = document.querySelector<HTMLCanvasElement>('[data-background-canvas]');
const root = document.querySelector<HTMLElement>('[data-background]');

// Profundidad en unidades de mundo: cerca = borde de la pantalla, lejos = cerca del horizonte.
const NEAR = 1;
const FAR = 2.4;
const LINE_GAP = 0.065;
const SCROLL_SPEED = 0.0003; // avance por píxel de scroll
const IDLE_SPEED = 0.006; // avance por segundo sin scroll
const STAR_COUNT = 240;

type Star = { x: number; y: number; z: number };

function createStars(): Star[] {
  let seed = 11;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  return Array.from({ length: STAR_COUNT }, () => ({
    x: random() * 2 - 1,
    y: random() * 2 - 1,
    z: random(),
  }));
}

if (canvas && root) {
  const ctx = canvas.getContext('2d');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const stars = createStars();
  let width = 0;
  let height = 0;
  let travel = 0;
  let lastScroll = window.scrollY;
  let lastTime = 0;
  let frame = 0;

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const draw = () => {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    const cx = width / 2;
    const cy = height / 2;
    const range = FAR - NEAR;

    // Líneas del pasillo: a profundidad z quedan a (cy * NEAR / z) del horizonte, arriba y abajo.
    const lines = Math.ceil(range / LINE_GAP);
    for (let i = 0; i < lines; i++) {
      const z = NEAR + ((((i * LINE_GAP - travel) % range) + range) % range);
      const offset = (cy * NEAR) / z;
      const depth = (z - NEAR) / range; // 0 cerca, 1 lejos
      const alpha = 0.2 * (1 - depth) ** 1.4;
      ctx.fillStyle = `rgb(255 255 255 / ${alpha.toFixed(3)})`;
      ctx.fillRect(0, Math.round(cy - offset), width, 1);
      ctx.fillRect(0, Math.round(cy + offset), width, 1);
    }

    // Estrellas: se acercan con el avance; al pasar de largo vuelven al fondo.
    const spread = Math.max(width, height) * 0.6;
    for (const star of stars) {
      const z = ((((star.z - travel * 0.5) % 1) + 1) % 1) * 0.95 + 0.05;
      const x = cx + (star.x * spread) / (z * 2);
      const y = cy + (star.y * spread) / (z * 2);
      if (x < 0 || x > width || y < 0 || y > height) continue;
      const near = 1 - z;
      const size = near > 0.8 ? 2 : 1;
      const alpha = Math.min(0.3 + near * 0.8, 1) * Math.min(z * 8, 1);
      ctx.fillStyle = `rgb(255 255 255 / ${alpha.toFixed(3)})`;
      ctx.fillRect(Math.round(x), Math.round(y), size, size);
    }
  };

  // Con movimiento reducido el fondo queda quieto: se dibuja una vez y solo al redimensionar.
  const tick = (time: number) => {
    frame = 0;
    const elapsed = lastTime ? Math.min(time - lastTime, 100) / 1000 : 0;
    lastTime = time;
    travel += elapsed * IDLE_SPEED;
    draw();
    if (!reducedMotion.matches && !document.hidden) frame = requestAnimationFrame(tick);
  };

  const start = () => {
    if (frame || reducedMotion.matches || document.hidden) return;
    lastTime = 0;
    frame = requestAnimationFrame(tick);
  };

  resize();
  draw();
  start();

  window.addEventListener(
    'scroll',
    () => {
      const delta = window.scrollY - lastScroll;
      lastScroll = window.scrollY;
      if (reducedMotion.matches) return;
      travel += Math.abs(delta) * SCROLL_SPEED;
    },
    { passive: true },
  );

  // Al cambiar de página el scroll vuelve arriba: no cuenta como avance.
  document.addEventListener('astro:after-swap', () => {
    lastScroll = window.scrollY;
  });

  window.addEventListener('resize', () => {
    resize();
    draw();
  });

  document.addEventListener('visibilitychange', start);
  reducedMotion.addEventListener('change', () => {
    draw();
    start();
  });
}

// Linterna: muestra una cuadrícula plana alrededor del cursor. Solo con mouse.
if (root && matchMedia('(hover: hover) and (pointer: fine)').matches) {
  let frame = 0;
  let x = 0;
  let y = 0;

  const render = () => {
    frame = 0;
    root.style.setProperty('--spot-x', `${x}px`);
    root.style.setProperty('--spot-y', `${y}px`);
  };

  document.addEventListener(
    'pointermove',
    (event) => {
      if (event.pointerType !== 'mouse') return;
      x = event.clientX;
      y = event.clientY;
      root.toggleAttribute('data-spot', true);
      if (!frame) frame = requestAnimationFrame(render);
    },
    { passive: true },
  );

  document.documentElement.addEventListener('mouseleave', () => {
    root.toggleAttribute('data-spot', false);
  });
}
