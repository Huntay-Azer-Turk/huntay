import { caseStudies } from "@/data/caseStudies";
import { experience } from "@/data/experience";
import { faq } from "@/data/faq";
import { featured } from "@/data/featured";
import { heroLead } from "@/data/profile";
import { assessments } from "@/data/assessments";
import { isHiddenService, primaryServices } from "@/data/catalog";
import { services } from "@/data/services";
import { calBookingPageUrl, isCalConfigured } from "@/lib/cal";
import { localeUrl } from "@/lib/seo";
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
    "AI transformation for manufacturers. It starts with a technical service and help desk assistant, then extends to quality control, production and maintenance, sales, marketing, market research, procurement and security teams:",
    "",
    ...primaryServices.map(
      (item) =>
        `- [${item.title.en}](${localeUrl("en", `/services/${item.slug}`)}): ${item.tagline.en}${
          item.offerings?.length ? ` Includes: ${item.offerings.map((o) => o.title.en).join("; ")}.` : ""
        }`,
    ),
    ...services
      .filter((item) => item.role === "deep-dive" && !isHiddenService(item.slug))
      .map(
        (item) =>
          `- [${item.title.en}](${localeUrl("en", `/services/${item.slug}`)}) (in depth, part of ${
            services.find((p) => p.slug === item.parent)?.title.en ?? ""
          }): ${item.tagline.en}`,
      ),
    "",
    `- [Packages & pricing](${localeUrl("en", "/packages")}): fixed-scope packages with prices (AI opportunity scan, technical service & help desk assistant pilot and production rollout, and a design package for each further unit: quality control, production & maintenance, sales, marketing, market research, procurement, security team)`,
    "",
    "## Free self-assessments (3 minutes, no sign-up)",
    "",
    ...assessments.map(
      (item) => `- [${item.title.en}](${localeUrl("en", `/assessment/${item.slug}`)}): ${item.metaDescription.en}`,
    ),
    "",
    "## Book from an AI assistant (MCP)",
    "",
    `- ChatGPT app: ${siteConfig.chatgptAppUrl}`,
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
      (item) => `- [${item.title.en}](${localeUrl("en", "/about")}#case-${item.id}): ${item.result.en}`,
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
    `- [Terms of use](${localeUrl("en", "/terms")})`,
    `- [Full content for LLMs](${siteConfig.baseUrl}/llms-full.txt)`,
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
