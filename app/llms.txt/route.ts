import { siteCaseStudies } from "@/data/caseStudies";
import { siteExperience } from "@/data/experience";
import { faq } from "@/data/faq";
import { siteFeatured } from "@/data/featured";
import { assessments } from "@/data/assessments";
import { isHiddenService, primaryServices } from "@/data/catalog";
import { services } from "@/data/services";
import { calBookingPageUrl, isCalConfigured } from "@/lib/cal";
import { localeUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { SELLING_ENABLED } from "@/lib/site-mode";
import { aboutAiProject, heroLead, philosophy } from "@/data/profile";

/**
 * /llms.txt (https://llmstxt.org) — AI asistanları için sitenin düz metin özeti.
 * Sayfayla aynı data/* kaynaklarından üretilir, bu yüzden içerik kendiliğinden güncel kalır.
 */
export const dynamic = "force-static";

export function GET() {
  const lines = SELLING_ENABLED ? salesLines() : cvLines();
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

/** 12 Kasım 2026: öz geçmiş kipi (lib/site-mode.ts) — hizmet, paket, görüşme ve SSS yok. */
function cvLines(): string[] {
  const home = localeUrl("en");
  return [
    `# ${siteConfig.name}`,
    "",
    "> Software Architect (Istanbul, Turkey)",
    "",
    heroLead.en,
    "",
    "## About",
    "",
    philosophy.en,
    "",
    aboutAiProject.en,
    "",
    "## Experience",
    "",
    ...siteExperience.map(
      (item) => `- ${item.period.en}: ${item.role.en}, ${item.org.en}${item.location ? ` (${item.location.en})` : ""}`,
    ),
    "",
    "## Projects",
    "",
    ...siteCaseStudies.map(
      (item) => `- [${item.title.en}](${localeUrl("en", "/about")}#case-${item.id}): ${item.result.en}`,
    ),
    "",
    "## Writing",
    "",
    ...siteFeatured.map((item) => `- [${item.title.en}](${item.href})`),
    "",
    "## Links",
    "",
    `- [Website (English)](${home})`,
    `- [Website (Türkçe)](${localeUrl("tr")})`,
    `- [About](${localeUrl("en", "/about")})`,
    `- [Privacy policy](${localeUrl("en", "/privacy")})`,
    `- [Full content for LLMs](${siteConfig.baseUrl}/llms-full.txt)`,
    `- [LinkedIn](${siteConfig.linkedin})`,
    `- [Medium](${siteConfig.medium})`,
    `- [GitHub](${siteConfig.github})`,
    `- Email: ${siteConfig.contactEmail}`,
    "",
  ];
}

function salesLines(): string[] {
  const home = localeUrl("en");
  return [
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
    "A technical service and help desk AI assistant for manufacturers with dealer and service networks:",
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
    `- [Packages & pricing](${localeUrl("en", "/packages")}): AI opportunity scan, 3-week pilot and production rollout, with prices`,
    "",
    "## Free self-assessments (3 minutes, no sign-up)",
    "",
    ...assessments
      .filter((item) => !isHiddenService(item.serviceSlug))
      .map(
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
    ...siteExperience.map(
      (item) => `- ${item.period.en}: ${item.role.en}, ${item.org.en}${item.location ? ` (${item.location.en})` : ""}`,
    ),
    "",
    "## Case studies",
    "",
    ...siteCaseStudies.map(
      (item) => `- [${item.title.en}](${localeUrl("en", "/about")}#case-${item.id}): ${item.result.en}`,
    ),
    "",
    "## FAQ",
    "",
    ...faq.flatMap((item) => [`### ${item.question.en}`, "", item.answer.en, ""]),
    "## Writing",
    "",
    ...siteFeatured.map((item) => `- [${item.title.en}](${item.href})`),
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
}
