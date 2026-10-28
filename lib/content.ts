import { caseStudies } from "@/data/caseStudies";
import { experience } from "@/data/experience";
import { faq } from "@/data/faq";
import { featured } from "@/data/featured";
import {
  aboutAiProject,
  aboutResearch,
  heroLead,
  philosophy,
  strategicPartner,
} from "@/data/profile";
import { processSteps, services, servicesFaq } from "@/data/services";
import type { ServiceItem } from "@/data/types";
import { localeUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

/**
 * Sitenin metin içeriği "doküman" olarak — tek kaynak:
 * - MCP `search` / `fetch` araçları (ChatGPT deep research uyumlu)
 * - /llms-full.txt ve `Accept: text/markdown` ile istenen sayfa sürümleri
 * Veriler data/* dosyalarından gelir; sitede yazanın dışında bilgi eklenmez.
 */

export type Lang = "en" | "tr";

export type ContentDoc = {
  /** Dil bağımsız kimlik, ör. "service:ai-agents" */
  id: string;
  type: "profile" | "service" | "case-study" | "faq" | "experience" | "article" | "page";
  title: string;
  text: string;
  url: string;
};

const L = {
  en: {
    profileTitle: `${siteConfig.name} — profile`,
    forWhom: "Who it's for",
    deliverables: "What you get",
    useCases: "Typical use cases",
    tech: "Technologies",
    faq: "FAQ",
    approach: "Approach",
    result: "Result",
    article: "Article on Medium by",
    process: "How working together works",
    bookingTitle: "How to book an intro call",
    bookingText: `A 30-minute video call (Google Meet) in English or Turkish, Monday–Friday 10:00–18:00 Istanbul time. Book at ${localeUrl("en", "/book")}, or from an AI assistant connected to ${siteConfig.baseUrl}/mcp. You talk about your goals, current situation and constraints, get honest first recommendations and, if it is a fit, a short written proposal.`,
  },
  tr: {
    profileTitle: `${siteConfig.name} — profil`,
    forWhom: "Kimler için",
    deliverables: "Neler alırsınız",
    useCases: "Örnek kullanım senaryoları",
    tech: "Teknolojiler",
    faq: "Sık sorulan sorular",
    approach: "Yaklaşım",
    result: "Sonuç",
    article: "Medium yazısı —",
    process: "Birlikte çalışma süreci",
    bookingTitle: "Tanışma görüşmesi nasıl planlanır?",
    bookingText: `Türkçe veya İngilizce, 30 dakikalık görüntülü görüşme (Google Meet); hafta içi 10:00–18:00 (İstanbul). Randevu: ${localeUrl("tr", "/book")} ya da ${siteConfig.baseUrl}/mcp adresine bağlı bir yapay zeka asistanı. Hedeflerinizi, mevcut durumu ve kısıtlarınızı konuşursunuz; dürüst ilk önerileri ve uygunsa kısa bir yazılı teklif alırsınız.`,
  },
} as const;

/** Bir hizmetin tüm metni (hizmet sayfasındaki bölümlerle aynı sıra). */
export function serviceText(service: ServiceItem, lang: Lang): string {
  const l = L[lang];
  return [
    service.tagline[lang],
    "",
    service.summary[lang],
    "",
    `${l.forWhom}:`,
    ...service.forWhom.map((item) => `- ${item[lang]}`),
    "",
    `${l.deliverables}:`,
    ...service.deliverables.map((item) => `- ${item[lang]}`),
    "",
    `${l.useCases}:`,
    ...service.useCases.map((item) => `- ${item[lang]}`),
    "",
    `${l.tech}: ${service.tech.join(", ")}`,
    "",
    `${l.faq}:`,
    ...service.faq.flatMap((item) => [`Q: ${item.question[lang]}`, `A: ${item.answer[lang]}`]),
  ].join("\n");
}

export function buildDocs(lang: Lang): ContentDoc[] {
  const l = L[lang];
  const home = localeUrl(lang);
  const role = experience[0];
  const docs: ContentDoc[] = [
    {
      id: "profile",
      type: "profile",
      title: l.profileTitle,
      text: [
        heroLead[lang],
        philosophy[lang],
        strategicPartner[lang],
        aboutAiProject[lang],
        aboutResearch[lang],
        `${role.role[lang]}, ${role.org[lang]} (${role.period[lang]})`,
      ].join("\n\n"),
      url: home,
    },
    ...services.map((service) => ({
      id: `service:${service.slug}`,
      type: "service" as const,
      title: service.title[lang],
      text: serviceText(service, lang),
      url: localeUrl(lang, `/services/${service.slug}`),
    })),
    ...caseStudies.map((item) => ({
      id: `case-study:${item.id}`,
      type: "case-study" as const,
      title: item.title[lang],
      text: [
        `${l.approach}: ${item.action[lang]}`,
        `${l.result}: ${item.result[lang]}`,
        item.tags[lang],
      ].join("\n"),
      url: `${home}#case-${item.id}`,
    })),
    ...[...faq, ...servicesFaq].map((item) => ({
      id: `faq:${item.id}`,
      type: "faq" as const,
      title: item.question[lang],
      text: item.answer[lang],
      url: servicesFaq.includes(item) ? `${localeUrl(lang, "/services")}#faq` : `${home}#faq`,
    })),
    ...experience.map((item) => ({
      id: `experience:${item.id}`,
      type: "experience" as const,
      title: `${item.role[lang]} — ${item.org[lang]} (${item.period[lang]})`,
      text: [
        ...(item.location ? [item.location[lang]] : []),
        ...(item.highlights ?? []).map((highlight) => `- ${highlight[lang]}`),
      ].join("\n"),
      url: `${home}#timeline`,
    })),
    ...featured.map((item) => ({
      id: `article:${item.id}`,
      type: "article" as const,
      title: item.title[lang],
      text: `${l.article} ${siteConfig.name}: “${item.title[lang]}” (${item.href})`,
      url: item.href,
    })),
    {
      id: "page:process",
      type: "page",
      title: l.process,
      text: processSteps
        .map((step, index) => `${index + 1}. ${step.title[lang]}: ${step.body[lang]}`)
        .join("\n"),
      url: `${localeUrl(lang, "/services")}`,
    },
    {
      id: "page:booking",
      type: "page",
      title: l.bookingTitle,
      text: l.bookingText,
      url: localeUrl(lang, "/book"),
    },
  ];
  return docs;
}

/* ------------------------------------------------------------------ */
/* Arama                                                               */
/* ------------------------------------------------------------------ */

/** Küçük harf + Türkçe karakterleri sadeleştirir (ı→i, ş→s ...), aksanları atar. */
export function fold(text: string): string {
  return text
    .toLocaleLowerCase("tr")
    .replace(/ı/g, "i")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "");
}

const STOPWORDS = new Set(
  (
    "a about after all also an and any are as at be been but by can could do does for from get got has have " +
    "he help his how i i'm if in into is it its just like make me more most my need needs of on or our out " +
    "over she should so some that the their them then there these this those to up us use using very want " +
    "wants was we what when where which who why will with would you your huntay azerturk " +
    "acaba ama bana ben benim bir biz bizim bu cok da daha de en gerek gibi hangi icin ile ise istiyoruz " +
    "istiyorum lazim mi mu ne neler nedir nasil o olan olarak olsun siz sizin su var ve veya ya yapar " +
    "yapiyor yapmak yok"
  ).split(" "),
);

/** Kısa kelimeler (ai, ui, go, c#) yalnızca tam kelime olarak, uzunlar kök/ön ek olarak eşleşir. */
function countToken(foldedText: string, token: string): number {
  if (token.length <= 3) {
    const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return (foldedText.match(new RegExp(`(^|[^a-z0-9])${escaped}(?=$|[^a-z0-9])`, "g")) ?? []).length;
  }
  return foldedText.split(token).length - 1;
}

function tokenize(query: string): string[] {
  return Array.from(
    new Set(
      fold(query)
        .split(/[^a-z0-9+#.]+/)
        .map((token) => token.replace(/^\.+|\.+$/g, ""))
        .filter((token) => token.length >= 2 && !STOPWORDS.has(token)),
    ),
  );
}

/** Sorgu Türkçe mi? (Türkçe harf veya yaygın Türkçe kelime) */
export function detectLang(query: string): Lang {
  if (/[çğıöşüİ]/i.test(query)) return "tr";
  const words = fold(query).split(/\s+/);
  const turkish = ["ve", "icin", "nasil", "nedir", "hizmet", "hizmetler", "yapay", "zeka", "randevu", "gorusme", "danismanlik", "nelerdir"];
  return words.some((word) => turkish.includes(word)) ? "tr" : "en";
}

export type SearchHit = ContentDoc & { score: number; snippet: string };

export function searchDocs(query: string, lang: Lang, limit = 8): SearchHit[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];
  const hits: SearchHit[] = [];
  for (const doc of buildDocs(lang)) {
    const title = fold(doc.title);
    const text = fold(doc.text);
    let score = 0;
    let matched = 0;
    for (const token of tokens) {
      const inTitle = countToken(title, token) > 0;
      const count = countToken(text, token);
      if (inTitle || count > 0) matched += 1;
      score += (inTitle ? 4 : 0) + Math.min(count, 5);
    }
    if (score === 0) continue;
    // Birden çok kelimeyi birlikte içeren dokümanlar öne çıksın.
    score *= 1 + matched / tokens.length;
    hits.push({ ...doc, score, snippet: snippetFor(doc.text, tokens) });
  }
  return hits.sort((a, b) => b.score - a.score).slice(0, limit);
}

function snippetFor(text: string, tokens: string[]): string {
  const folded = fold(text);
  let position = -1;
  for (const token of tokens) {
    position = folded.indexOf(token);
    if (position >= 0) break;
  }
  const start = Math.max(0, position - 80);
  const raw = text.slice(start, start + 240).replace(/\s+/g, " ").trim();
  return `${start > 0 ? "…" : ""}${raw}${start + 240 < text.length ? "…" : ""}`;
}

/** "service:ai-agents" veya "service:ai-agents@tr" */
export function getDoc(id: string): ContentDoc | undefined {
  const [baseId, suffix] = id.split("@");
  const lang: Lang = suffix === "tr" ? "tr" : "en";
  return buildDocs(lang).find((doc) => doc.id === baseId);
}

export function docRef(doc: ContentDoc, lang: Lang): string {
  return lang === "tr" ? `${doc.id}@tr` : doc.id;
}

/* ------------------------------------------------------------------ */
/* İhtiyaca göre hizmet eşleştirme                                     */
/* ------------------------------------------------------------------ */

export type ServiceMatch = { service: ServiceItem; score: number; reason: string };

/**
 * Kullanıcının anlattığı ihtiyaca göre hizmetleri sıralar (anahtar kelime eşleşmesi).
 * `reason`: hizmet sayfasında ihtiyaca en çok benzeyen satır (kimler için / kullanım senaryosu / çıktı).
 */
export function matchServices(need: string, lang: Lang): ServiceMatch[] {
  const tokens = tokenize(need);
  if (tokens.length === 0) return [];
  const matches: ServiceMatch[] = [];
  for (const service of services) {
    const lines = [
      service.title[lang],
      service.tagline[lang],
      ...service.forWhom.map((item) => item[lang]),
      ...service.useCases.map((item) => item[lang]),
      ...service.deliverables.map((item) => item[lang]),
      service.summary[lang],
      service.tech.join(", "),
    ];
    let score = 0;
    let best = { line: "", hits: 0 };
    lines.forEach((line, index) => {
      const folded = fold(line);
      const hits = tokens.filter((token) => countToken(folded, token) > 0).length;
      // Başlık ve özet satırları daha ağır sayılır.
      score += hits * (index < 2 ? 3 : 1);
      // Gerekçe: kimler için / kullanım senaryosu / çıktı satırlarından biri (özet ve teknoloji listesi değil).
      if (index >= 2 && index < lines.length - 2 && hits > best.hits) best = { line, hits };
    });
    if (score > 0) {
      matches.push({ service, score, reason: best.line || service.tagline[lang] });
    }
  }
  matches.sort((a, b) => b.score - a.score);
  // Yalnızca gerçekten uyanlar: en iyi skorun %35'inden düşükleri ele, en fazla 4 hizmet.
  const top = matches[0]?.score ?? 0;
  return matches.filter((match) => match.score >= top * 0.35).slice(0, 4);
}
