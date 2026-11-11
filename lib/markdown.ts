import {
  assistantTools,
  dataHandling,
  examplePrompts,
  setupSteps,
  troubleshooting,
} from "@/data/assistant";
import { caseStudies, siteCaseStudies } from "@/data/caseStudies";
import { siteExperience } from "@/data/experience";
import { faq } from "@/data/faq";
import { siteFeatured } from "@/data/featured";
import { privacySections, privacyUpdatedAt } from "@/data/privacy";
import { termsSections, termsUpdatedAt } from "@/data/terms";
import type { LegalSection } from "@/data/types";
import {
  aboutAiProject,
  heroLead,
  philosophy,
  strategicPartner,
} from "@/data/profile";
import { deepDivesOf, primaryServices, resolveService, visibleServices } from "@/data/catalog";
import { engagementModels, processSteps, servicesFaq } from "@/data/services";
import type { FaqItem } from "@/data/types";
import { serviceText, type Lang } from "@/lib/content";
import { mcpEndpoint } from "@/lib/mcp/meta";
import { localeUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

/**
 * Sayfaların Markdown sürümleri — AI ajanları `Accept: text/markdown` ile istediğinde (middleware)
 * ve /llms-full.txt için. HTML sayfalarla aynı data/* kaynaklarından üretilir.
 */

const H = {
  en: {
    headline: "AI Consultant for Manufacturers — technical service & help desk first (Istanbul, Turkey)",
    about: "About",
    services: "Services",
    caseStudies: "Case studies",
    experience: "Experience",
    faq: "FAQ",
    writing: "Writing",
    contact: "Contact",
    approach: "Approach",
    result: "Result",
    book: "Book a 30-minute intro call",
    engagement: "Ways to work together",
    process: "Process",
    proof: "Related case studies",
    servicesTitle: "Services",
    bookTitle: "Book a call",
    bookText:
      "30-minute video call (Google Meet) in English or Turkish, Monday–Friday 10:00–18:00 Istanbul time. Together you pin down the current bottleneck, what it costs the business in time and money, and your goals; if the expertise fits, you agree on the right first step (usually a fixed-scope review package).",
    calendar: "Booking calendar",
    assistantTitle: "MCP server — book a call from ChatGPT, Claude or Gemini",
    assistantIntro:
      "This remote MCP server lets AI assistants check Huntay AzerTürk's availability, book a 30-minute intro call and look up his services, case studies and FAQ.",
    serverUrl: "Server address",
    transport: "Transport: Streamable HTTP · Authentication: none",
    setup: "Setup",
    tools: "Tools",
    prompts: "Example prompts",
    troubleshooting: "Troubleshooting",
    data: "Data handling",
    support: "Support",
    privacyTitle: "Privacy policy",
    termsTitle: "Terms of use",
    updated: "Last updated",
    read: "read",
    write: "write",
  },
  tr: {
    headline: "Üreticiler için Yapay Zekâ Danışmanı — önce teknik servis ve help desk (İstanbul)",
    about: "Hakkında",
    services: "Hizmetler",
    caseStudies: "Vaka çalışmaları",
    experience: "Deneyim",
    faq: "Sık sorulan sorular",
    writing: "Yazılar",
    contact: "İletişim",
    approach: "Yaklaşım",
    result: "Sonuç",
    book: "30 dakikalık tanışma görüşmesi planlayın",
    engagement: "Birlikte çalışma modelleri",
    process: "Süreç",
    proof: "İlgili vaka çalışmaları",
    servicesTitle: "Hizmetler",
    bookTitle: "Görüşme planlayın",
    bookText:
      "Türkçe veya İngilizce, 30 dakikalık görüntülü görüşme (Google Meet); hafta içi 10:00–18:00 (İstanbul). Mevcut darboğazı, bunun şirkete zaman ve maliyet etkisini ve hedeflerinizi birlikte netleştirirsiniz; uzmanlık uygunsa doğru ilk adımda (genellikle sabit kapsamlı bir inceleme paketi) anlaşırsınız.",
    calendar: "Randevu takvimi",
    assistantTitle: "MCP sunucusu — ChatGPT, Claude veya Gemini'den randevu",
    assistantIntro:
      "Bu uzak MCP sunucusu, yapay zeka asistanlarının Huntay AzerTürk'ün boş saatlerini görmesini, 30 dakikalık tanışma görüşmesi oluşturmasını ve hizmetlerine, vaka çalışmalarına ve SSS'ye bakmasını sağlar.",
    serverUrl: "Sunucu adresi",
    transport: "Taşıma: Streamable HTTP · Kimlik doğrulama: yok",
    setup: "Kurulum",
    tools: "Araçlar",
    prompts: "Örnek komutlar",
    troubleshooting: "Sorun giderme",
    data: "Veri kullanımı",
    support: "Destek",
    privacyTitle: "Gizlilik politikası",
    termsTitle: "Kullanım koşulları",
    updated: "Son güncelleme",
    read: "okuma",
    write: "yazma",
  },
} as const;

const faqBlock = (items: FaqItem[], lang: Lang) =>
  items.flatMap((item) => [`### ${item.question[lang]}`, "", item.answer[lang], ""]);

function contactBlock(lang: Lang): string[] {
  const h = H[lang];
  return [
    `## ${h.contact}`,
    "",
    `- ${h.book}: ${localeUrl(lang, "/book")}`,
    `- MCP: ${mcpEndpoint} (${localeUrl(lang, "/assistant")})`,
    `- LinkedIn: ${siteConfig.linkedin}`,
    `- Medium: ${siteConfig.medium}`,
    `- GitHub: ${siteConfig.github}`,
    `- Email: ${siteConfig.contactEmail}`,
    ...(siteConfig.whatsappUrl ? [`- WhatsApp: ${siteConfig.whatsappUrl}`] : []),
    "",
  ];
}

export function homeMarkdown(lang: Lang): string {
  const h = H[lang];
  return [
    `# ${siteConfig.name}`,
    "",
    `> ${h.headline}`,
    "",
    heroLead[lang],
    "",
    `## ${h.about}`,
    "",
    philosophy[lang],
    "",
    aboutAiProject[lang],
    "",
    strategicPartner[lang],
    "",
    `## ${h.services}`,
    "",
    ...primaryServices.map(
      (service) =>
        `- [${service.title[lang]}](${localeUrl(lang, `/services/${service.slug}`)}): ${service.tagline[lang]}`,
    ),
    "",
    `## ${h.caseStudies}`,
    "",
    ...siteCaseStudies.flatMap((item) => [
      `### ${item.title[lang]}`,
      "",
      `${h.approach}: ${item.action[lang]}`,
      "",
      `${h.result}: ${item.result[lang]}`,
      "",
    ]),
    `## ${h.experience}`,
    "",
    ...siteExperience.map(
      (item) =>
        `- ${item.period[lang]}: ${item.role[lang]}, ${item.org[lang]}${item.location ? ` (${item.location[lang]})` : ""}`,
    ),
    "",
    `## ${h.faq}`,
    "",
    ...faqBlock(faq, lang),
    `## ${h.writing}`,
    "",
    ...siteFeatured.map((item) => `- [${item.title[lang]}](${item.href})`),
    "",
    ...contactBlock(lang),
  ].join("\n");
}

export function servicesMarkdown(lang: Lang): string {
  const h = H[lang];
  return [
    `# ${h.servicesTitle} — ${siteConfig.name}`,
    "",
    ...primaryServices.flatMap((service) => [
      `## [${service.title[lang]}](${localeUrl(lang, `/services/${service.slug}`)})`,
      "",
      service.tagline[lang],
      "",
      service.summary[lang],
      "",
      ...(service.offerings ?? []).map((item) => `- ${item.title[lang]}: ${item.body[lang]}`),
      ...deepDivesOf(service.slug).map(
        (item) => `- [${item.title[lang]}](${localeUrl(lang, `/services/${item.slug}`)}): ${item.tagline[lang]}`,
      ),
      "",
    ]),
    `## ${h.engagement}`,
    "",
    ...engagementModels.map((item) => `- ${item.title[lang]}: ${item.body[lang]}`),
    "",
    `## ${h.process}`,
    "",
    ...processSteps.map((step, index) => `${index + 1}. ${step.title[lang]}: ${step.body[lang]}`),
    "",
    `## ${h.faq}`,
    "",
    ...faqBlock(servicesFaq, lang),
    ...contactBlock(lang),
  ].join("\n");
}

export function serviceMarkdown(slug: string, lang: Lang): string | null {
  // Kaldırılan hizmet adresleri 308 ile yönlenir; Markdown isteği yine de gelirse güncel hizmet döner.
  const service = resolveService(slug);
  if (!service) return null;
  const h = H[lang];
  const related = caseStudies.filter((item) => service.relatedCases.includes(item.id));
  return [
    `# ${service.title[lang]}`,
    "",
    `${siteConfig.name} · ${localeUrl(lang, `/services/${service.slug}`)}`,
    "",
    serviceText(service, lang),
    "",
    ...(related.length
      ? [
          `## ${h.proof}`,
          "",
          ...related.map((item) => `- ${item.title[lang]}: ${item.result[lang]}`),
          "",
        ]
      : []),
    `## ${h.process}`,
    "",
    ...processSteps.map((step, index) => `${index + 1}. ${step.title[lang]}: ${step.body[lang]}`),
    "",
    ...contactBlock(lang),
  ].join("\n");
}

export function bookMarkdown(lang: Lang): string {
  const h = H[lang];
  return [
    `# ${h.bookTitle} — ${siteConfig.name}`,
    "",
    h.bookText,
    "",
    `- ${h.calendar}: ${localeUrl(lang, "/book")}`,
    `- MCP: ${mcpEndpoint} (${localeUrl(lang, "/assistant")})`,
    "",
    ...contactBlock(lang),
  ].join("\n");
}

export function assistantMarkdown(lang: Lang): string {
  const h = H[lang];
  return [
    `# ${h.assistantTitle}`,
    "",
    h.assistantIntro,
    "",
    `- ChatGPT: ${siteConfig.chatgptAppUrl}`,
    `- ${h.serverUrl}: ${mcpEndpoint}`,
    `- ${h.transport}`,
    "",
    `## ${h.setup}`,
    "",
    ...setupSteps.map((step) => `- ${step.client}: ${step.steps[lang]}`),
    "",
    `## ${h.tools}`,
    "",
    ...assistantTools.map(
      (tool) => `- \`${tool.name}\` (${tool.access === "read" ? h.read : h.write}): ${tool.description[lang]}`,
    ),
    "",
    `## ${h.prompts}`,
    "",
    ...examplePrompts.map((prompt) => `- “${prompt[lang]}”`),
    "",
    `## ${h.troubleshooting}`,
    "",
    ...troubleshooting.flatMap((item) => [`### ${item.question[lang]}`, "", item.answer[lang], ""]),
    `## ${h.data}`,
    "",
    dataHandling[lang],
    `${h.privacyTitle}: ${localeUrl(lang, "/privacy")}`,
    `${h.termsTitle}: ${localeUrl(lang, "/terms")}`,
    "",
    `## ${h.support}`,
    "",
    `${siteConfig.contactEmail}`,
    "",
  ].join("\n");
}

function legalMarkdown(title: string, updatedAt: string, sections: LegalSection[], lang: Lang): string {
  return [
    `# ${title} — ${siteConfig.name}`,
    "",
    `${H[lang].updated}: ${updatedAt}`,
    "",
    ...sections.flatMap((section) => [
      `## ${section.title[lang]}`,
      "",
      ...section.body.flatMap((paragraph) => [paragraph[lang], ""]),
    ]),
  ].join("\n");
}

export function privacyMarkdown(lang: Lang): string {
  return legalMarkdown(H[lang].privacyTitle, privacyUpdatedAt, privacySections, lang);
}

export function termsMarkdown(lang: Lang): string {
  return legalMarkdown(H[lang].termsTitle, termsUpdatedAt, termsSections, lang);
}

/** URL yolu → o sayfanın Markdown sürümü (bilinmeyen yollar için null). */
export function markdownForPath(pathname: string): string | null {
  const clean = pathname.replace(/\/+$/, "") || "/";
  const isTr = clean === "/tr" || clean.startsWith("/tr/");
  const lang: Lang = isTr ? "tr" : "en";
  const path = (isTr ? clean.slice(3) : clean.replace(/^\/en(?=\/|$)/, "")) || "/";

  if (path === "/") return homeMarkdown(lang);
  if (path === "/services") return servicesMarkdown(lang);
  if (path.startsWith("/services/")) return serviceMarkdown(path.slice("/services/".length), lang);
  if (path === "/book") return bookMarkdown(lang);
  if (path === "/assistant") return assistantMarkdown(lang);
  if (path === "/privacy") return privacyMarkdown(lang);
  if (path === "/terms") return termsMarkdown(lang);
  return null;
}

/** /llms-full.txt: tüm sayfaların İngilizce Markdown içeriği tek dosyada. */
export function llmsFullText(): string {
  const parts = [
    homeMarkdown("en"),
    servicesMarkdown("en"),
    // 11 Kasım 2026: gizli hizmetler (bulut, güvenlik, CTO…) llms-full.txt'e girmez; sayfaları noindex.
    ...visibleServices.map((service) => serviceMarkdown(service.slug, "en") ?? ""),
    bookMarkdown("en"),
    assistantMarkdown("en"),
    `Turkish versions of every page: ${localeUrl("tr")}`,
  ];
  return parts.join("\n\n---\n\n");
}
