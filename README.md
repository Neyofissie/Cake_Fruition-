# Cake Fruition

Website for **Cake Fruition**, a custom cake studio. The site is black and white, designed to feel premium and editorial, and built to send visitors to order through WhatsApp.

_Creating Sweet Moments, One Cake at a Time._

## Stack

- React 19 + TypeScript, bundled with Vite
- Tailwind CSS v4 (design tokens in `src/index.css`)
- Motion (Framer Motion) for animations, honouring `prefers-reduced-motion`
- A small Express (Node.js) server that serves the production build

## Run locally

Prerequisite: Node.js 20+

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build and deploy

```bash
npm run build      # outputs dist/ (static site) + dist/server.cjs
npm start          # serves dist/ on $PORT (default 3000)
```

`dist/` minus `server.cjs` is a plain static site, so you can also deploy it to any static host (Netlify, Vercel, Cloudflare Pages, S3).

## Project layout

```
src/
  App.tsx              page composition
  index.css            colour, type and utility tokens
  lib/site.ts          brand name, WhatsApp number, social links, nav
  lib/content.ts       menu, occasions, gallery, order steps, features
  lib/images.ts        responsive image helper
  components/          Header, Hero, CTAButton, SectionLabel, CakeMenuCard,
                       FlavourList, ServiceCard, GalleryGrid (with lightbox),
                       ProcessStep, FeatureCard, SocialLinkButton, Footer,
                       MobileOrderBar, Motifs, Icons, Logo, Reveal
  sections/            About, Menu, Occasions, Gallery, OrderProcess,
                       WhyChoose, QuoteCTA, Social
  assets/cakes/        cake photos as WebP, 640px and 1200px wide
public/                favicon, Open Graph image, robots.txt
```

## Editing content

- **Phone number and social links:** `src/lib/site.ts`
- **Flavours, occasions, steps and features:** `src/lib/content.ts`
- **Adding a gallery photo:** export `name-640.webp` and `name-1200.webp` into `src/assets/cakes/`, then add an entry to `GALLERY` in `src/lib/content.ts` using `cake("name")` and descriptive alt text.
- **SEO tags and schema:** `index.html`. Once the site has a domain, make the `og:image` URL absolute (for example `https://yourdomain.com/og-image.jpg`) and add a `<link rel="canonical">`.
