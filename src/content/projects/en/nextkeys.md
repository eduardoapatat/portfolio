---
title: NextKeys
year: 2026
categories: [ecommerce, app]
summary: 'A store for digital keys, licenses and physical games with Webpay payments, instant key delivery and tracked shipping.'
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
imageAlt: 'The NextKeys catalog filtered by Nintendo Switch, with platform filters and their counts'
---

A video game store for Chile: **digital keys**, **software licenses** and **physical games**. The storefront is Nuxt with SSR, and Laravel is the single source of truth, with its API and the admin panel.

- Payments with **Transbank Webpay Plus** behind its own interface: the store confirms a charge only when it can deliver, and a reconciliation job refunds anything left halfway.
- Stock held for 15 minutes with **PostgreSQL row locks**: the last key is never sold twice.
- **Encrypted** keys, delivered by email and in "My library", never shown in listings or logs.
- Physical games with an address, a shipping fee and **shipment tracking**.
- Business rules enforced in the database (CHECK constraints and triggers), PHPStan at the highest level and 600+ tests.
