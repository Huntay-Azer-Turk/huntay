import { caseStudies } from "@/data/caseStudies";
import { experience } from "@/data/experience";
import { faq } from "@/data/faq";
import { featured } from "@/data/featured";
import { heroLead } from "@/data/profile";
import { services } from "@/data/services";
import { calBookingPageUrl, isCalConfigured } from "@/lib/cal";
import { absoluteUrl, localeUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

/**
 * /llms.txt (https://llmstxt.org) — AI asistanları için sitenin düz metin özeti.
 * Sayfayla aynı data/* kaynaklarından üretilir, bu yüzden içerik kendiliğinden güncel kalır.
 */
export const dynamic = "force-static";

export function GET() {
  const home = localeUrl("en");

  const lines = [
    `# ${siteConfig.name}`,
    "",
    `> ${faq[0].answer.en}`,
    "",
    heroLead.en,
    "",
    "## Services",
    "",
    `Overview: ${localeUrl("en", "/services")} · Book a 30-minute intro call: ${localeUrl("en", "/book")}`,
    "",
    ...services.map(
      (item) =>
        `- [${item.title.en}](${localeUrl("en", `/services/${item.slug}`)}): ${item.tagline.en}`,
    ),
    "",
    "## Book from an AI assistant (MCP)",
    "",
    `- MCP server (Streamable HTTP, no authentication): ${siteConfig.baseUrl}/mcp`,
    `- Documentation, setup and example prompts: ${localeUrl("en", "/assistant")}`,
    "- Tools: get_availability (live open times), book_intro_call (30-minute Google Meet call), list_services (optionally ranked by need), get_service, get_profile, search, fetch",
    `- Server card: ${siteConfig.baseUrl}/.well-known/mcp/server-card.json`,
    ...(isCalConfigured() ? [`- Booking calendar: ${calBookingPageUrl()}`] : []),
    "",
    "## Experience",
    "",
    ...experience.map(
      (item) =>
        `- ${item.period.en}: ${item.role.en}, ${item.org.en}${item.location ? ` (${item.location.en})` : ""}`,
    ),
    "",
    "## Case studies",
    "",
    ...caseStudies.map(
      (item) => `- [${item.title.en}](${home}#case-${item.id}): ${item.result.en}`,
    ),
    "",
    "## FAQ",
    "",
    ...faq.flatMap((item) => [`### ${item.question.en}`, "", item.answer.en, ""]),
    "## Writing",
    "",
    ...featured.map((item) => `- [${item.title.en}](${item.href})`),
    "",
    "## Links",
    "",
    `- [Website (English)](${home})`,
    `- [Website (Türkçe)](${localeUrl("tr")})`,
    `- [Book a call](${localeUrl("en", "/book")})`,
    `- [Privacy policy](${localeUrl("en", "/privacy")})`,
    `- [Full content for LLMs](${siteConfig.baseUrl}/llms-full.txt)`,
    `- [CV (PDF)](${absoluteUrl(siteConfig.cvPath)})`,
    `- [LinkedIn](${siteConfig.linkedin})`,
    `- [Medium](${siteConfig.medium})`,
    `- [GitHub](${siteConfig.github})`,
    `- [Instagram](${siteConfig.instagram})`,
    ...(siteConfig.whatsappUrl ? [`- [WhatsApp](${siteConfig.whatsappUrl})`] : []),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
