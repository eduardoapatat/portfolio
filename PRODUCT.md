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

- El visitante navega con pestañas en la barra superior (inicio, proyectos, experiencia y CV) o con el menú de comandos (Ctrl/⌘ + K). GitHub y LinkedIn están en la tarjeta de perfil y en el menú.
- Contacto por enlaces directos (email y LinkedIn). No hay formulario.
- Sitio bilingüe, español e inglés, con selector de idioma.

## Capabilities and Constraints

- Stack: Astro 7 con Tailwind CSS 4 (ya configurado en el repositorio).
- Contenido de proyectos y experiencia mantenible sin tocar componentes (content collections).
- CV como página HTML (mismo contenido y orden que `cv/CV.tex`) con descarga del PDF compilado. Sin teléfono en la web.
- Hosting: Cloudflare Workers (sitio estático) en `eduardoapata.cl`.
- **Abierto:** versión en inglés del PDF del CV.

## Brand Commitments

- **JetBrains Mono** es la tipografía de todo el sitio, incluido el nombre del encabezado.
- Sin cursor personalizado (descartado por el usuario).
- **Diseño vigente:** tarjeta de perfil fija a la izquierda en todas las páginas (en celular solo en el inicio), barra superior con pestañas y la sección actual a la derecha, directo sobre el fondo y sin panel; inicio con resumen de cada sección, tarjetas, línea de tiempo y hoja del CV. No se rediseña nada sin que el usuario lo pida.
- **Paleta:** azul marino con acento cian `#43c9ff`, en colores planos (un tono por tipo de elemento, sin degradados).
- **Dock guardado:** `src/components/Dock.astro` y `src/scripts/dock.ts` siguen en el repo sin montarse; el usuario pidió conservarlos.
- **Pendiente:** el fondo. Hoy es un color plano, aislado en `src/components/Background.astro` para reemplazarlo sin tocar el resto.
- **Dirección visual fijada por el usuario:** la base vino de tomasdinh.cz (tarjetas de proyecto con captura en marco de navegador, línea de tiempo por año, CV como hoja blanca) y luego se combinó con santusht.online (tarjeta de perfil fija al lado del contenido, barra de pestañas, etiquetas con punto, chips de tecnologías, menú de comandos). Se rechazaron direcciones alternativas generadas. Lo propio es el nombre/logotipo, el contenido y los textos; nunca se copian logos, textos ni imágenes de las referencias.

## Evidence on Hand

- Proyectos con enlace o capturas: existen, pendientes de entregar (rutas por definir).
- Experiencia laboral, educación, certificaciones y habilidades: `cv/CV.tex` (experiencia en `src/content/experience`, el resto en `src/data/cv.ts`).
- CV en PDF (español): `public/cv/eduardo-apata-tito-cv-es.pdf`.
- Perfiles: GitHub `eduardoapatat`, LinkedIn `eapatatito` (en `src/data/profile.ts`).
- Foto: el PDF del CV no lleva foto. Mejora futura: foto en la página del CV (no en el PDF).
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
