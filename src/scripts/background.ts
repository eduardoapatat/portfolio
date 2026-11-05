// Fondo de estrellas en 3D: siguen al cursor con suavidad (las cercanas se mueven más que las
// lejanas) y avanzan hacia la pantalla al hacer scroll; sin scroll avanzan muy lento.
// El canvas persiste entre páginas (transition:persist), así que este módulo se ejecuta una sola vez.

const canvas = document.querySelector<HTMLCanvasElement>('[data-background-canvas]');

const STAR_COUNT = 700;
const SCROLL_SPEED = 0.00015; // avance por píxel de scroll
const IDLE_SPEED = 0.003; // avance por segundo sin scroll
const MOUSE_SHIFT = 40; // desplazamiento máximo (px) de las estrellas más cercanas
const MOUSE_EASE = 0.06; // fracción del camino al cursor que se recorre en cada cuadro

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

if (canvas) {
  const ctx = canvas.getContext('2d');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const stars = createStars();
  let width = 0;
  let height = 0;
  let travel = 0;
  let lastScroll = window.scrollY;
  let lastTime = 0;
  let frame = 0;
  // Posición del cursor de -1 a 1 respecto al centro: la deseada y la que se dibuja (suavizada).
  const mouse = { x: 0, y: 0 };
  const eased = { x: 0, y: 0 };

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
    const spread = Math.max(width, height) * 0.6;

    for (const star of stars) {
      // Al pasar de largo, cada estrella vuelve al fondo.
      const z = ((((star.z - travel) % 1) + 1) % 1) * 0.95 + 0.05;
      const near = 1 - z;
      const x = cx + (star.x * spread) / (z * 2) + eased.x * MOUSE_SHIFT * near;
      const y = cy + (star.y * spread) / (z * 2) + eased.y * MOUSE_SHIFT * near;
      if (x < 0 || x > width || y < 0 || y > height) continue;
      const size = near > 0.8 ? 2 : 1;
      const alpha = Math.min(0.3 + near * 0.8, 1) * Math.min(z * 8, 1);
      ctx.fillStyle = `rgb(255 255 255 / ${alpha.toFixed(3)})`;
      ctx.fillRect(Math.round(x), Math.round(y), size, size);
    }
  };

  // Con movimiento reducido las estrellas quedan quietas: se dibujan una vez y al redimensionar.
  const tick = (time: number) => {
    frame = 0;
    const elapsed = lastTime ? Math.min(time - lastTime, 100) / 1000 : 0;
    lastTime = time;
    travel += elapsed * IDLE_SPEED;
    eased.x += (mouse.x - eased.x) * MOUSE_EASE;
    eased.y += (mouse.y - eased.y) * MOUSE_EASE;
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
      if (!reducedMotion.matches) travel += Math.abs(delta) * SCROLL_SPEED;
    },
    { passive: true },
  );

  // Al cambiar de página el scroll vuelve arriba: no cuenta como avance.
  document.addEventListener('astro:after-swap', () => {
    lastScroll = window.scrollY;
  });

  // Solo con mouse: en pantallas táctiles no hay cursor que seguir.
  document.addEventListener(
    'pointermove',
    (event) => {
      if (event.pointerType !== 'mouse' || !finePointer.matches) return;
      mouse.x = (event.clientX / width) * 2 - 1;
      mouse.y = (event.clientY / height) * 2 - 1;
    },
    { passive: true },
  );

  // Al salir de la ventana, las estrellas vuelven despacio a su lugar.
  document.documentElement.addEventListener('mouseleave', () => {
    mouse.x = 0;
    mouse.y = 0;
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
