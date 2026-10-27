import { siteConfig } from "@/lib/site";
import type { MetadataRoute } from "next";

/**
 * AI arama / cevap motorlarının tarayıcıları (AEO). `*` zaten izin veriyor;
 * yine de açıkça listelemek niyeti belgeler ve ileride `*` için bir kısıtlama eklenirse bunları korur.
 */
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
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: `${siteConfig.baseUrl}/sitemap.xml`,
  };
}
