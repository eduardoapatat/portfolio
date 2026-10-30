import type { TransitionAnimationPair, TransitionDirectionalAnimations } from 'astro';

// Entrada corta del contenido al cambiar de sección: el viejo se desvanece y el nuevo
// aparece con una leve escala. Los keyframes están en src/styles/global.css.
const content: TransitionAnimationPair = {
  old: { name: 'content-out', duration: '80ms', easing: 'ease-in', fillMode: 'both' },
  new: { name: 'content-in', duration: '200ms', easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fillMode: 'both' },
};

export const contentTransition: TransitionDirectionalAnimations = {
  forwards: content,
  backwards: content,
};
