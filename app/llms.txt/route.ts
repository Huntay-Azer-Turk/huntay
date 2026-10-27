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
    "- Tools: get_profile, list_services, get_service, get_availability (live free times), book_intro_call (books a 30-minute Google Meet intro call)",
    '- Add it as a custom connector in ChatGPT, Claude or Gemini, then ask: "Book an intro call with Huntay AzerTürk".',
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
