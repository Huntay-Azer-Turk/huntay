# Huntay AzerTürk - Fractional CTO & Principal Architect

A modern, bilingual (English & Turkish) personal landing page and CV portfolio built with Next.js 16 (App Router) and Tailwind CSS 4.

## Features

- **Bilingual (i18n):** Full English and Turkish support using `next-intl`.
- **Theming:** Dark ("Bare Metal") and Light ("Corporate") modes using `next-themes`.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop viewing.
- **Performance:** Statically generated pages (SSG) with optimized fonts and layouts.
- **SEO & AEO Ready:** Metadata with canonical + hreflang (incl. `x-default`), per-locale Open Graph images (`app/[locale]/opengraph-image.tsx`), sitemap with language alternates, robots.txt (AI crawlers explicitly allowed), `/llms.txt`, a visible FAQ section, and a Person + WebSite + ProfilePage + FAQPage JSON-LD graph — all generated from the same `data/*` sources. Update `siteConfig.contentUpdatedAt` in `lib/site.ts` whenever content changes.
- **Services & Booking:** `/services` hub, one page per service (`/services/<slug>`) and a `/book` page, all driven by `data/services.ts`. `/book` embeds the Cal.com calendar `cal.com/huntay/intro-call` (30 min, Google Meet, Mon–Fri 10:00–18:00 Istanbul) set by `calUsername` / `calEventSlug` in `lib/site.ts`; with an empty username it falls back to `bookingEmbedUrl` / `bookingUrl` or WhatsApp and email requests. Search Console / Bing verification codes go in `googleSiteVerification` / `bingSiteVerification`.
- **AI assistants (MCP):** `app/mcp/route.ts` serves a remote MCP server at `https://huntayazerturk.com/mcp` (Streamable HTTP, stateless, no auth) so ChatGPT, Claude, Gemini and other MCP clients can show the profile and services and book an intro call from the chat. Tools: `get_profile`, `list_services`, `get_service`, `get_availability`, `book_intro_call` (live via the public Cal.com API, no API key). Clients that support MCP Apps render an in-chat card (`lib/mcp/widget.ts`). The privacy policy is at `/privacy`.
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
