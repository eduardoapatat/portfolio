// Línea de tiempo que se marca al hacer scroll: escribe --progress (0 a 1) en la lista según
// cuánto pasó la referencia (la mitad de la ventana) por ella, y marca con data-reached los años ya alcanzados.
// El aspecto vive en ExperienceView.astro.

let cleanup: (() => void) | undefined;

function setupTimeline() {
  const timeline = document.querySelector<HTMLElement>('[data-timeline]');
  if (!timeline) return;

  const years = [...timeline.querySelectorAll<HTMLElement>('[data-timeline-year]')];
  const dots = years.map((year) => year.querySelector<HTMLElement>('.timeline-dot')!);
  let frame = 0;

  const render = () => {
    frame = 0;
    // Primero todas las lecturas y después todas las escrituras: evita reflows extra.
    // Referencia en la mitad de la ventana; en la última media pantalla de scroll baja hasta el
    // borde inferior, para que al llegar al final de la página la línea quede completa.
    const viewport = window.innerHeight;
    const toEnd = document.documentElement.scrollHeight - viewport - window.scrollY;
    const anchor = viewport / 2 + Math.max(0, viewport / 2 - toEnd);
    const rect = timeline.getBoundingClientRect();
    const progress = Math.min(Math.max((anchor - rect.top) / rect.height, 0), 1);
    const reached = dots.map((dot) => {
      const box = dot.getBoundingClientRect();
      return box.top + box.height / 2 <= anchor;
    });

    timeline.style.setProperty('--progress', progress.toFixed(4));
    years.forEach((year, i) => year.toggleAttribute('data-reached', reached[i]));
  };

  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(render);
  };

  render();
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  cleanup = () => {
    cancelAnimationFrame(frame);
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
  };
}

document.addEventListener('astro:page-load', setupTimeline);
document.addEventListener('astro:before-swap', () => cleanup?.());
