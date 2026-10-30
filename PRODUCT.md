# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Reclutadores y empresas** que evalúan a un candidato fullstack: revisan experiencia, stack y CV, y deciden si contactar o descargar el CV.
- **Clientes freelance** que buscan a alguien que construya su sitio o sistema: revisan proyectos reales y deciden si escribir para encargar trabajo.

Ambos públicos pesan lo mismo. La visita típica es corta y de evaluación: llegan desde LinkedIn, GitHub, un CV o un enlace directo, y necesitan entender rápido quién es, qué hace y cómo contactarlo.

## Product Purpose

Portfolio personal de Eduardo Apata Tito, Desarrollador Fullstack. Reúne en un solo lugar experiencia, proyectos, CV y enlaces externos. Hay éxito cuando el visitante sale con una idea clara del perfil y contacta por email o LinkedIn, o descarga el CV.

## Positioning

- **Experiencia en sector público:** sistemas para instituciones y municipios, con usuarios reales, trámites y exigencias de accesibilidad.
- **Stack Laravel + JS moderno:** backend PHP/Laravel sólido combinado con frontend moderno (Astro y otros).
- **Interés secundario en redes y ciberseguridad:** en formación (Cisco CCNA: Introduction to Networks). Se presenta como interés y aprendizaje, nunca como rol principal: primero es desarrollador.

## Operating Context

- El visitante navega con un dock fijo en la parte inferior: inicio, experiencia, proyectos, CV y enlaces externos (GitHub, LinkedIn).
- Contacto por enlaces directos (email y LinkedIn). No hay formulario.
- Sitio bilingüe, español e inglés, con selector de idioma.

## Capabilities and Constraints

- Stack: Astro 7 con Tailwind CSS 4 (ya configurado en el repositorio).
- Contenido de proyectos y experiencia mantenible sin tocar componentes (content collections).
- CV como página HTML (mismo contenido y orden que `cv/CV.tex`) con descarga del PDF compilado. Sin teléfono en la web.
- **Abierto:** hosting (no será Vercel; opciones: Netlify, Cloudflare Pages, GitHub Pages u otro).
- **Abierto:** versión en inglés del PDF del CV.

## Brand Commitments

- **JetBrains Mono** es la tipografía por defecto de todo el sitio (elegida por el usuario).
- **Pendiente:** el nombre arriba usará otra fuente más adelante; por ahora va en JetBrains Mono.
- Sin cursor personalizado (descartado por el usuario).
- **Provisional:** el fondo y el diseño visual del dock cambiarán más adelante. Por ahora el dock imita el funcionamiento de la referencia (magnificación, tooltip, estado activo, persistencia al navegar) y el fondo es un placeholder; ambos deben quedar aislados en su propio componente para reemplazarlos sin tocar el resto.
- **Dirección visual fijada por el usuario: seguir de cerca tomasdinh.cz** (estructura, look y comportamiento: fondo oscuro degradado con estrellas, hero centrado, dock flotante con magnificación, panel central con scroll interno, tarjetas de proyecto con captura en marco de navegador, línea de tiempo por año, CV como hoja blanca). Se rechazaron direcciones alternativas generadas. Lo propio es el nombre/logotipo, el contenido y los textos; nunca se copian su logo, textos ni imágenes.

## Evidence on Hand

- Proyectos con enlace o capturas: existen, pendientes de entregar (rutas por definir).
- Experiencia laboral, educación, certificaciones y habilidades: `cv/CV.tex` (experiencia en `src/content/experience`, el resto en `src/data/cv.ts`).
- CV en PDF (español): `public/cv/eduardo-apata-tito-cv-es.pdf`.
- Perfiles: GitHub `eduardoapatat`, LinkedIn `eapatatito` (en `src/data/profile.ts`).
- Foto: el PDF del CV no lleva foto. Mejora futura: foto en la página del CV (no en el PDF).
- No inventar proyectos, empresas, métricas, testimonios ni logros que no estén en el material entregado.

## Product Principles

1. **Claridad en segundos:** en el primer viewport se entiende quién es, qué hace y hacia dónde ir.
2. **Dos públicos, un camino:** el reclutador llega al CV y a la experiencia, y el cliente llega a los proyectos, ambos a un clic desde el dock.
3. **Pruebas reales antes que adjetivos:** proyectos, experiencia y CV verificables pesan más que las frases.
4. **Contacto siempre a mano:** email y LinkedIn alcanzables desde cualquier página.

## Accessibility & Inclusion

- Dock y navegación operables con teclado, con etiquetas accesibles en los iconos.
- Respetar `prefers-reduced-motion` en animaciones y efectos.
- Contenido equivalente en ambos idiomas, con `lang` correcto por página.
