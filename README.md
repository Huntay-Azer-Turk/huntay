# Huntay AzerTürk - Fractional CTO & Principal Architect

A modern, bilingual (English & Turkish) personal landing page and CV portfolio built with Next.js 16 (App Router) and Tailwind CSS 4.

## Features

- **Bilingual (i18n):** Full English and Turkish support using `next-intl`.
- **Theming:** Dark ("Bare Metal") and Light ("Corporate") modes using `next-themes`.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop viewing.
- **Performance:** Statically generated pages (SSG) with optimized fonts and layouts.
- **SEO & AEO Ready:** Metadata with canonical + hreflang (incl. `x-default`), per-locale Open Graph images (`app/[locale]/opengraph-image.tsx`), sitemap with language alternates, robots.txt (AI crawlers explicitly allowed), `/llms.txt`, a visible FAQ section, and a Person + WebSite + ProfilePage + FAQPage JSON-LD graph — all generated from the same `data/*` sources. Update `siteConfig.contentUpdatedAt` in `lib/site.ts` whenever content changes.
- **Services & Booking:** `/services` hub, one page per service (`/services/<slug>`) and a `/book` page, all driven by `data/services.ts`. To show a live booking calendar, set `bookingUrl` / `bookingEmbedUrl` in `lib/site.ts` (or `NEXT_PUBLIC_BOOKING_URL` / `NEXT_PUBLIC_BOOKING_EMBED_URL`); until then `/book` offers WhatsApp and email requests. Search Console / Bing verification codes go in `googleSiteVerification` / `bingSiteVerification`.
- **CV Download:** Direct download link for the latest PDF CV with correct Content-Disposition headers.

## Tech Stack

- Framework: [Next.js 16](https://nextjs.org/) (App Router)
- Styling: [Tailwind CSS 4](https://tailwindcss.com/)
- Icons: [Lucide React](https://lucide.dev/)
- Internationalization: [next-intl](https://next-intl-docs.vercel.app/)
- Theming: [next-themes](https://github.com/pacocoursey/next-themes)
- Fonts: Geist & Geist Mono

## Development

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

The project is configured for a standalone output, making it easy to deploy via Docker or directly to Vercel.

```bash
# Build for production
npm run build

# Start production server
npm start
```
