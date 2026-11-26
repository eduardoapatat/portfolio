---
title: NextKeys
year: 2026
categories: [ecommerce, app]
summary: 'Tienda de claves digitales, licencias y juegos físicos con pagos Webpay, entrega inmediata de claves y despacho con seguimiento.'
status: prototipo
tech:
  [
    Laravel,
    PHP,
    Nuxt,
    Vue,
    Inertia,
    TypeScript,
    Tailwind CSS,
    PostgreSQL,
    Webpay,
    Docker,
    GitHub Actions,
  ]
repo: https://github.com/eduardoapatat/nextkeys
order: 2.5
image: ../../../assets/projects/nextkeys.webp
imageAlt: 'El catálogo de NextKeys filtrado por Nintendo Switch, con filtros por plataforma y sus conteos'
---

E-commerce de videojuegos para Chile: **claves digitales**, **licencias** y **juegos físicos**. La tienda es Nuxt con SSR y Laravel es la única fuente de verdad, con su API y el panel de administración.

- Pagos con **Transbank Webpay Plus** detrás de una interfaz propia: la tienda confirma el cobro solo si puede entregar, y una conciliación reembolsa lo que quede a medias.
- Stock reservado 15 minutos con **bloqueos de fila en PostgreSQL**: nunca se vende dos veces la última clave.
- Claves **cifradas**, entregadas por correo y en "Mi biblioteca", sin aparecer nunca en listados ni logs.
- Juegos físicos con dirección, costo de envío y **seguimiento del despacho**.
- Reglas del negocio protegidas en la base de datos (CHECK y triggers), PHPStan nivel máximo y más de 600 tests.
