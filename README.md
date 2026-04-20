# Huntay AzerTürk - Fractional CTO & Principal Architect

A modern, bilingual (English & Turkish) personal landing page and CV portfolio built with Next.js 16 (App Router) and Tailwind CSS 4.

## Features

- **Bilingual (i18n):** Full English and Turkish support using `next-intl`.
- **Theming:** Dark ("Bare Metal") and Light ("Corporate") modes using `next-themes`.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop viewing.
- **Performance:** Statically generated pages (SSG) with optimized fonts and layouts.
- **SEO Ready:** Configured with metadata, canonical links, sitemap, robots.txt, and JSON-LD schema.
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
