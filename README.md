# Huntay AzerTürk - Fractional CTO & Principal Architect

A modern, bilingual (English & Turkish) personal landing page and CV portfolio built with Next.js 16 (App Router) and Tailwind CSS 4.

## Features

- **Bilingual (i18n):** Full English and Turkish support using `next-intl`.
- **Theming:** Dark ("Bare Metal") and Light ("Corporate") modes using `next-themes`.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop viewing.
- **Performance:** Statically generated pages (SSG) with optimized fonts and layouts.
- **SEO & AEO Ready:** Metadata with canonical + hreflang (incl. `x-default`), per-locale Open Graph images (`app/[locale]/opengraph-image.tsx`), sitemap with language alternates, robots.txt (AI crawlers explicitly allowed), `/llms.txt`, a visible FAQ section, and a Person + WebSite + ProfilePage + FAQPage JSON-LD graph — all generated from the same `data/*` sources. Update `siteConfig.contentUpdatedAt` in `lib/site.ts` whenever content changes.
- **Services & Booking:** `/services` hub, one page per service (`/services/<slug>`) and a `/book` page, all driven by `data/services.ts`. Since 11 Nov 2026 the site is AI-transformation only: the units (technical service & help desk first, then quality, production, sales, marketing, market research, procurement, security) live in `data/ai-units.ts`; cloud, security, CTO, IoT and microservices pages are hidden via `hiddenServiceSlugs` in `data/catalog.ts` (not listed, not in the sitemap, `noindex`) but kept for the frozen MCP `get_service` slugs. Personal sections (approach, all case studies, stack, experience, articles) are on `/about`. `/book` embeds the Cal.com calendar `cal.com/huntay/intro-call` (30 min, Google Meet, Mon–Fri 10:00–18:00 Istanbul) set by `calUsername` / `calEventSlug` in `lib/site.ts`; with an empty username it falls back to `bookingEmbedUrl` / `bookingUrl` or WhatsApp and email requests. Search Console / Bing verification codes go in `googleSiteVerification` / `bingSiteVerification`.
- **AI assistants (MCP):** `app/mcp/route.ts` serves a remote MCP server at `https://huntayazerturk.com/mcp` (Streamable HTTP, stateless, no auth), documented at `/assistant`. Tools: `get_availability`, `book_intro_call` (live via the public Cal.com API, no API key), `list_services` (optionally ranked by a described need), `get_service`, `get_profile`, and `search` / `fetch` over the site content (ChatGPT deep-research compatible). MCP Apps clients render an in-chat card (`lib/mcp/widget.ts`). Tool descriptions are intentionally neutral and Huntay-specific so the server meets the Claude and ChatGPT directory policies. It is listed in the official MCP Registry as `com.huntayazerturk/assistant` (`server.json`; domain verified via `/.well-known/mcp-registry-auth`).
- **Agent readiness:** `/llms.txt`, `/llms-full.txt`, Markdown versions of pages for `Accept: text/markdown` (middleware), `robots.txt` with Content Signals, and `/.well-known/` discovery files: MCP server card, API catalog (RFC 9727), agent skills index, MCP Registry and ChatGPT domain verification.
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

## After the Claude and ChatGPT directory approvals (MCP update, pending)

The MCP tool names, descriptions and input schemas are frozen while the directory reviews run (`MCP_FROZEN_SERVICE_SLUGS` in `data/catalog.ts`). On 11 Nov 2026 the site became AI-transformation only, so once both approvals arrive:

1. `get_service` enum: drop the hidden slugs (`cloud-devops`, `cybersecurity`, `fractional-cto`, `iot-platforms`, `microservices-modernization` and their retired aliases) and keep `ai-agents`.
2. `list_services`: list only visible services (`visibleServices`), and expose the AI units (`data/ai-units.ts`) with their packages.
3. Tool descriptions (`get_profile` "software architect…", `list_services`, `/assistant` page copy): use "AI Consultant for Manufacturers".
4. Add `retiredServiceSlugs` redirects for the hidden pages to `/services/ai-agents`, then delete those services, their assessments (`security-maturity`, `cloud-health`) and the inactive packages.
5. Re-submit or notify both directories if they require it for a schema change; re-test with the MCP inspector before release.
