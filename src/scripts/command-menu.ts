// Menú de comandos: Ctrl/⌘ + K lo abre; el texto filtra, ↑↓ eligen y Enter ejecuta.
// Las opciones no reciben foco: el input las señala con aria-activedescendant (patrón combobox).
import { navigate } from 'astro:transitions/client';
import { copyText } from '@/scripts/clipboard';

let toggleMenu: (() => void) | undefined;

const normalize = (text: string) =>
  text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();

function setupCommandMenu() {
  const dialog = document.querySelector<HTMLDialogElement>('[data-command-menu]');
  if (!dialog) return;

  const input = dialog.querySelector<HTMLInputElement>('[role="combobox"]')!;
  const options = [...dialog.querySelectorAll<HTMLElement>('[role="option"]')];
  const groups = [...dialog.querySelectorAll<HTMLElement>('[role="group"]')];
  const empty = dialog.querySelector<HTMLElement>('[data-command-empty]')!;
  const status = dialog.querySelector<HTMLElement>('[data-command-status]')!;
  let visible = options;
  let active = 0;

  const setActive = (index: number) => {
    active = index;
    options.forEach((option) => option.setAttribute('aria-selected', 'false'));
    const option = visible[index];
    if (option) {
      option.setAttribute('aria-selected', 'true');
      input.setAttribute('aria-activedescendant', option.id);
      option.scrollIntoView({ block: 'nearest' });
    } else {
      input.removeAttribute('aria-activedescendant');
    }
  };

  const filter = () => {
    const query = normalize(input.value.trim());
    visible = options.filter((option) => {
      const text = normalize(`${option.textContent} ${option.dataset.keywords ?? ''}`);
      option.hidden = query !== '' && !text.includes(query);
      return !option.hidden;
    });
    groups.forEach((group) => {
      group.hidden = !group.querySelector('[role="option"]:not([hidden])');
    });
    empty.hidden = visible.length > 0;
    setActive(0);
  };

  const open = () => {
    if (dialog.open) return;
    input.value = '';
    status.textContent = '';
    filter();
    dialog.showModal();
    input.focus();
  };

  const run = async (option: HTMLElement | undefined) => {
    if (!option) return;
    const { action, value = '' } = option.dataset;
    if (action === 'copy') {
      const copied = await copyText(value);
      status.textContent = (copied ? dialog.dataset.copied : dialog.dataset.copyFailed) ?? '';
      return;
    }
    dialog.close();
    if (action === 'navigate') {
      navigate(value);
    } else if (action === 'external') {
      window.open(value, '_blank', 'noopener,noreferrer');
    } else if (action === 'download') {
      const link = document.createElement('a');
      link.href = value;
      link.download = '';
      link.click();
    }
  };

  input.addEventListener('input', filter);
  input.addEventListener('keydown', (event) => {
    const last = visible.length - 1;
    if (event.key === 'ArrowDown') setActive(active >= last ? 0 : active + 1);
    else if (event.key === 'ArrowUp') setActive(active <= 0 ? last : active - 1);
    else if (event.key === 'Home') setActive(0);
    else if (event.key === 'End') setActive(last);
    else if (event.key === 'Enter') run(visible[active]);
    else return;
    event.preventDefault();
  });

  options.forEach((option) => {
    option.addEventListener('click', () => run(option));
    option.addEventListener('pointermove', () => {
      const index = visible.indexOf(option);
      if (index !== active) setActive(index);
    });
  });

  // Un clic fuera del recuadro cae sobre el propio <dialog> (el fondo).
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  document.querySelectorAll('[data-command-menu-open]').forEach((button) => {
    button.addEventListener('click', open);
  });

  toggleMenu = () => (dialog.open ? dialog.close() : open());
}

// Un solo listener global para el atajo; cada página vuelve a enlazar su propio <dialog>.
document.addEventListener('keydown', (event) => {
  if (event.key.toLowerCase() === 'k' && (event.ctrlKey || event.metaKey) && !event.altKey) {
    event.preventDefault();
    toggleMenu?.();
  }
});

document.addEventListener('astro:page-load', setupCommandMenu);
