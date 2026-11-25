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

- El visitante navega con el encabezado y el pie (Inicio, Proyectos, Experiencia y CV). Experiencia es una sección del inicio (`/#experience`) y CV abre el PDF en otra pestaña. GitHub y LinkedIn están en el pie y en Contacto.
- Contacto por enlaces directos (email y LinkedIn). No hay formulario.
- Sitio bilingüe, español e inglés; idioma y tema en el panel fijo abajo a la derecha.

## Capabilities and Constraints

- Stack: Astro 7 con Tailwind CSS 4 (ya configurado en el repositorio).
- Contenido de proyectos y experiencia mantenible sin tocar componentes (content collections).
- CV solo como PDF compilado de `cv/CV.tex` (no hay página HTML). Sin teléfono en la web.
- Hosting: Cloudflare Workers (sitio estático) en `eduardoapata.cl`.
- **Abierto:** versión en inglés del PDF del CV.

## Brand Commitments

- **JetBrains Mono** para el texto y **Barlow Condensed** itálica (800/900) para títulos y el nombre.
- Sin cursor personalizado (descartado por el usuario).
- **Diseño «hoja» (todo el sitio):** hoja técnica inspirada en vrushali.in (línea de hoja, ficha técnica con monograma, cifras e índice, secciones numeradas, capturas «Fig.») con acentos neo-brutalistas de pmanifestoo (títulos condensados enormes, bordes negros y sombra dura). Todo recto: nada girado.
- **Inicio:** portada → experiencia (línea de tiempo con logos) → tecnologías (bento en mosaico; full stack destacado en azul con el kit de Laravel desplegable) y habilidades → proyectos → formación → contacto.
- **Páginas:** inicio, Proyectos (filtro por categoría, descripción completa y enlaces) y 404. Experiencia y CV no tienen página propia (redirecciones en `astro.config.mjs`).
- **Un solo botón** (`src/components/Button.astro`) con el mismo movimiento en todas partes.
- **Paleta:** papel `#edede8` / negro `#000` según el tema (panel de preferencias o el del sistema), tinta casi negra / gris claro y acento azul eléctrico `#2f5bff`; verde y ámbar para los estados. Tokens en `src/styles/global.css` (`sheet`, `ink`, `brand`…).
- Lo propio es el nombre/logotipo, el contenido y los textos; nunca se copian logos, textos ni imágenes de las referencias.

## Evidence on Hand

- Proyectos con enlace o capturas: existen, pendientes de entregar (rutas por definir).
- Experiencia laboral, educación, certificaciones y habilidades: `cv/CV.tex` (experiencia en `src/content/experience`, el resto en `src/data/cv.ts`).
- CV en PDF (español): `public/cv/eduardo-apata-tito-cv-es.pdf`.
- Perfiles: GitHub `eduardoapatat`, LinkedIn `eapatatito` (en `src/data/profile.ts`).
- Foto: el PDF del CV no lleva foto.
- No inventar proyectos, empresas, métricas, testimonios ni logros que no estén en el material entregado.

## Product Principles

1. **Claridad en segundos:** en el primer viewport se entiende quién es, qué hace y hacia dónde ir.
2. **Dos públicos, un camino:** el reclutador llega al CV y a la experiencia, y el cliente llega a los proyectos, ambos a un clic desde la barra superior.
3. **Pruebas reales antes que adjetivos:** proyectos, experiencia y CV verificables pesan más que las frases.
4. **Contacto siempre a mano:** email y LinkedIn alcanzables desde cualquier página.

## Accessibility & Inclusion

- Navegación y menú de comandos operables con teclado, con etiquetas accesibles en los íconos.
- Respetar `prefers-reduced-motion` en animaciones y efectos.
- Contenido equivalente en ambos idiomas, con `lang` correcto por página.
