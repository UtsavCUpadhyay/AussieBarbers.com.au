# AussieBarbers.com.au

Australia's premium mobile barber platform — verified, insured barbers to your
door. Launching in Brisbane, built to scale nationally.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — dark luxury design system (`src/app/globals.css`)
- **Vercel** — hosting & CI (target)
- **Supabase** — database & auth (planned)
- **Stripe** — payments, memberships, gift cards (planned)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Project structure

```
src/
  app/
    page.tsx        # Homepage (hero, services, membership, FAQ …)
    book/           # Booking flow (lead capture → Stripe checkout, WIP)
    barbers/        # Barber recruitment
    sitemap.ts      # SEO sitemap
    robots.ts       # robots.txt
  components/       # SiteHeader, SiteFooter, Icons
  lib/site.ts       # Central content model (services, pricing, areas, FAQs)
```

## Domain

Production domain `aussiebarbers.com.au` will point to Vercel. Shopify (products)
lives on `shop.aussiebarbers.com.au`. Connect DNS at the registrar after the
first Vercel deploy.

## Roadmap

- [x] Homepage + brand system
- [x] Booking lead-capture + barber recruitment pages
- [ ] Supabase schema (users, barbers, bookings, reviews)
- [ ] Auth + booking flow with live barber matching
- [ ] Stripe checkout, memberships, gift cards
- [ ] Barber dashboard + admin dashboard
- [ ] Location & service SEO pages (programmatic)
