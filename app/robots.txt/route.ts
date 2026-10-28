import { siteConfig } from "@/lib/site";

/**
 * robots.txt — elle üretiliyor, çünkü Next.js'in robots.ts biçimi `Content-Signal` satırını desteklemiyor.
 * - Tüm tarayıcılara ve AI arama/cevap motorlarına (AEO) izin verilir.
 * - Content Signals (https://contentsignals.org): arama, AI cevapları (ai-input) ve
 *   model eğitimi (ai-train) için içerik kullanımına açıkça izin verilir — amaç AI görünürlüğü.
 */
export const dynamic = "force-static";

const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "DuckAssistBot",
  "MistralAI-User",
  "YandexBot",
];

const CONTENT_SIGNAL = "Content-Signal: search=yes, ai-input=yes, ai-train=yes";

export function GET() {
  const lines = [
    "# AI agents: see /llms.txt, /llms-full.txt and the MCP server card at /.well-known/mcp/server-card.json",
    "User-agent: *",
    CONTENT_SIGNAL,
    "Allow: /",
    "",
    ...AI_CRAWLERS.map((agent) => `User-agent: ${agent}`),
    CONTENT_SIGNAL,
    "Allow: /",
    "",
    `Sitemap: ${siteConfig.baseUrl}/sitemap.xml`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
