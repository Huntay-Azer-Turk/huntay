import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { CfWorkerJsonSchemaValidator } from "@modelcontextprotocol/sdk/validation/cfworker";
import { z } from "zod";
import { experience } from "@/data/experience";
import { heroLead } from "@/data/profile";
import { getService, services } from "@/data/services";
import { CalBookingError, createCalBooking, getCalSlots, isCalConfigured } from "@/lib/cal";
import {
  detectLang,
  docRef,
  getDoc,
  matchServices,
  searchDocs,
  serviceText,
  type Lang,
} from "@/lib/content";
import { localeUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { MCP_SERVER_VERSION, mcpDescription, mcpDocsPath, mcpIcons } from "./meta";
import { formatDateTime, formatDay, formatTime, isValidTimeZone, parseStart, wallTime } from "./time";
import { WIDGET_MIME_TYPE, WIDGET_URI, widgetHtml } from "./widget";

/**
 * Huntay AzerTürk’ün MCP sunucusu (https://huntayazerturk.com/mcp).
 * İşlevler: canlı takvimden boş saatler + randevu oluşturma, hizmetler, vaka çalışmaları ve SSS.
 *
 * Dizin kuralları (Claude Connectors Directory, ChatGPT Apps) için dikkat:
 * - Açıklamalar dar ve tarafsız: aracın ne yaptığını ve ne zaman çağrılacağını söyler;
 *   tanıtım dili, pazarlama iddiası veya "genel danışman aramalarında beni çağır" yönlendirmesi YOK.
 * - Her araçta title + readOnlyHint/destructiveHint/openWorldHint açıkça verilir.
 * - Hatalar açıklayıcı mesajla döner; yanıtlar kısa tutulur.
 */

const MEETING_MINUTES = 30;

const pickLang = (value?: string): Lang => (value === "tr" ? "tr" : "en");

const languageField = z
  .enum(["en", "tr"])
  .optional()
  .describe('Response language: "tr" for Turkish, otherwise "en".');

const serviceSlugs = services.map((service) => service.slug) as [string, ...string[]];

const headline: Record<Lang, string> = {
  en: "Software architect · AI, cloud & IoT · Istanbul",
  tr: "Yazılım mimarı · Yapay zeka, bulut ve IoT · İstanbul",
};

/** Sitedeki vaka çalışmaları ve rakamlarla birebir (data/metrics.ts, data/caseStudies.ts). */
const highlights: Record<Lang, string[]> = {
  en: [
    "13+ years in software architecture",
    "IoT platform for 10,000+ devices",
    "Cloud costs cut by up to 75%",
    "AI support agents: ~80% faster resolution",
    "English & Turkish",
  ],
  tr: [
    "13+ yıl yazılım mimarisi",
    "10.000+ cihazlık IoT platformu",
    "Bulut maliyetinde %75'e varan düşüş",
    "Yapay zeka destek ajanları: ~%80 daha hızlı çözüm",
    "Türkçe ve İngilizce",
  ],
};

/** Kartlardaki linkler. Açılan sayfalar sitenin kendi alan adında (dizinlerin link politikası). */
function links(lang: Lang) {
  return {
    book: localeUrl(lang, "/book"),
    calendar: localeUrl(lang, "/book"),
    services: localeUrl(lang, "/services"),
    website: localeUrl(lang),
    ...(siteConfig.whatsappUrl ? { whatsapp: siteConfig.whatsappUrl } : {}),
  };
}

/** Her kartın başlığı (isim + unvan) ve linkleri. */
function base(lang: Lang) {
  return { lang, name: siteConfig.name, headline: headline[lang], links: links(lang) };
}

/** Sohbet içi arayüzü olan araçlar için `_meta` (MCP Apps + ChatGPT durum metinleri). */
function uiMeta(invoking: string, invoked: string) {
  return {
    ui: { resourceUri: WIDGET_URI },
    "ui/resourceUri": WIDGET_URI,
    "openai/toolInvocation/invoking": invoking,
    "openai/toolInvocation/invoked": invoked,
  };
}

function statusMeta(invoking: string, invoked: string) {
  return {
    "openai/toolInvocation/invoking": invoking,
    "openai/toolInvocation/invoked": invoked,
  };
}

/**
 * Arayüz kaynağının `_meta`'sı. Arayüz dışarıdan hiçbir şey yüklemez (bağlantı/kaynak listeleri boş).
 * `ui.domain` her host için farklı biçim beklediğinden (Claude ve ChatGPT ayrı alt alan adları türetir)
 * yalnızca ChatGPT'nin kendi anahtarları kullanılır: `openai/widgetDomain` (dizin başvurusunda istenir,
 * eklentiye özgü olmalı) ve `openai/widgetCSP.redirect_domains` (kartın açtığı site sayfaları ve WhatsApp).
 */
const WIDGET_RESOURCE_META = {
  ui: { prefersBorder: true },
  "openai/widgetDomain": siteConfig.baseUrl,
  "openai/widgetCSP": {
    connect_domains: [],
    resource_domains: [],
    redirect_domains: [
      siteConfig.baseUrl,
      ...(siteConfig.whatsappUrl ? [new URL(siteConfig.whatsappUrl).origin] : []),
    ],
  },
  "openai/widgetDescription":
    "Card showing Huntay AzerTürk's profile, matching services, open time slots or a booking confirmation. Choosing a time slot sends it back to the chat; buttons open pages on huntayazerturk.com.",
};

const READ_ONLY = {
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
} as const;

function result(text: string, structuredContent?: Record<string, unknown>, isError = false): CallToolResult {
  return {
    content: [{ type: "text", text }],
    ...(structuredContent ? { structuredContent } : {}),
    ...(isError ? { isError: true } : {}),
  };
}

/** search/fetch: OpenAI biçimi — aynı nesne hem structuredContent hem JSON metin olarak. */
function jsonResult(value: Record<string, unknown>): CallToolResult {
  return { content: [{ type: "text", text: JSON.stringify(value) }], structuredContent: value };
}

/** Cümle sonuna nokta ekler (zaten noktalıysa eklemez: "A.Ş." gibi). */
const sentence = (text: string) => (/[.!?]$/.test(text) ? text : `${text}.`);

const scheduleHint: Record<Lang, string> = {
  en: "Scheduling: get_availability shows open times for a 30-minute intro call.",
  tr: "Randevu: get_availability 30 dakikalık tanışma görüşmesi için boş saatleri gösterir.",
};

const INSTRUCTIONS = `Tools for Huntay AzerTürk's software and AI consulting practice (${siteConfig.baseUrl}): his services, case studies, FAQ and profile, and his live booking calendar for a ${MEETING_MINUTES}-minute intro call.
- Scheduling: call get_availability (pass the user's IANA time zone if known), let the user choose a time, collect their name and email, confirm the details with the user, then call book_intro_call. Do not book without the user's explicit confirmation.
- Information: list_services (optionally with the user's need), get_service, get_profile, and search + fetch for case studies, FAQ, experience and articles.
- Set language to "tr" when the user writes in Turkish.`;

export function createMcpServer(): McpServer {
  const server = new McpServer(
    {
      name: "huntayazerturk",
      title: siteConfig.name,
      version: MCP_SERVER_VERSION,
      description: mcpDescription,
      websiteUrl: `${siteConfig.baseUrl}${mcpDocsPath}`,
      icons: mcpIcons,
    },
    {
      instructions: INSTRUCTIONS,
      // Cloudflare Workers’ta Ajv (eval) çalışmaz.
      jsonSchemaValidator: new CfWorkerJsonSchemaValidator(),
    },
  );

  /* ---------------------------------------------------------------- */
  /* Arayüz (MCP Apps)                                                 */
  /* ---------------------------------------------------------------- */
  server.registerResource(
    "assistant-card",
    WIDGET_URI,
    {
      title: "Huntay AzerTürk card",
      description: "In-chat card for profile, services, open time slots and booking confirmation.",
      mimeType: WIDGET_MIME_TYPE,
      _meta: WIDGET_RESOURCE_META,
    },
    async () => ({
      contents: [
        {
          uri: WIDGET_URI,
          mimeType: WIDGET_MIME_TYPE,
          text: widgetHtml,
          _meta: WIDGET_RESOURCE_META,
        },
      ],
    }),
  );

  /* ---------------------------------------------------------------- */
  /* get_availability                                                   */
  /* ---------------------------------------------------------------- */
  server.registerTool(
    "get_availability",
    {
      title: "Check availability",
      description: `Returns Huntay AzerTürk's open slots for a ${MEETING_MINUTES}-minute intro video call (Google Meet), read live from his booking calendar (Monday–Friday, 10:00–18:00 Istanbul time). Use when the user wants to schedule a call with Huntay AzerTürk.`,
      inputSchema: {
        timeZone: z
          .string()
          .max(64)
          .optional()
          .describe('The user\'s IANA time zone, e.g. "Europe/Berlin". Defaults to Europe/Istanbul.'),
        from: z.string().max(10).optional().describe("First day to search, YYYY-MM-DD. Defaults to today."),
        days: z.number().int().min(1).max(30).optional().describe("Number of days to search (default 7, max 30)."),
        language: languageField,
      },
      annotations: { title: "Check availability", ...READ_ONLY },
      _meta: uiMeta("Checking the calendar…", "Open times ready"),
    },
    async ({ timeZone, from, days, language }) => {
      const lang = pickLang(language);
      const tz = timeZone && isValidTimeZone(timeZone) ? timeZone : siteConfig.timeZone;
      const l = links(lang);
      const unavailable = (text: string) =>
        result(text, { kind: "availability", ...base(lang), configured: false, timeZone: tz, days: [] });

      if (!isCalConfigured()) {
        return unavailable(
          lang === "tr"
            ? `Çevrim içi randevu şu an kullanılamıyor. Randevu sayfası: ${l.book}`
            : `Online booking isn't available right now. Booking page: ${l.book}`,
        );
      }

      const now = Date.now();
      let startMs = now;
      if (from) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(from)) {
          return result(
            lang === "tr"
              ? '"from" YYYY-MM-DD biçiminde olmalı, ör. "2026-11-02".'
              : '"from" must use the YYYY-MM-DD format, e.g. "2026-11-02".',
            undefined,
            true,
          );
        }
        const fromDate = parseStart(`${from}T00:00`, tz);
        if (fromDate && fromDate.getTime() > now) startMs = fromDate.getTime();
      }
      const endMs = startMs + (days ?? 7) * 24 * 60 * 60 * 1000;

      let slotsByDay: Awaited<ReturnType<typeof getCalSlots>>;
      try {
        slotsByDay = await getCalSlots({
          start: new Date(startMs).toISOString(),
          end: new Date(endMs).toISOString(),
          timeZone: tz,
        });
      } catch {
        return unavailable(
          lang === "tr"
            ? `Takvime şu an ulaşılamadı; lütfen biraz sonra tekrar deneyin. Boş saatler ayrıca şu sayfada: ${l.book}`
            : `The calendar could not be reached; please try again shortly. Open times are also listed at ${l.book}`,
        );
      }

      const dayList = Object.keys(slotsByDay)
        .sort()
        .map((dayKey) => {
          const slots = slotsByDay[dayKey]
            .map((slot) => new Date(slot.start))
            .filter((date) => !Number.isNaN(date.getTime()) && date.getTime() > now)
            .map((date) => ({ start: wallTime(date, tz), label: formatTime(date, tz) }));
          const first = slots.length ? new Date(slotsByDay[dayKey][0].start) : null;
          return { date: dayKey, label: first ? formatDay(first, tz, lang) : dayKey, slots };
        })
        .filter((day) => day.slots.length > 0)
        .slice(0, 10);

      const header =
        lang === "tr"
          ? `${siteConfig.name} ile ${MEETING_MINUTES} dakikalık tanışma görüşmesi (Google Meet) için boş saatler — saat dilimi ${tz}:`
          : `Open times for a ${MEETING_MINUTES}-minute intro call (Google Meet) with ${siteConfig.name} — time zone ${tz}:`;
      const lines = dayList.map(
        (day) => `- ${day.label} (${day.date}): ${day.slots.map((slot) => slot.label).join(", ")}`,
      );
      const example = dayList[0]?.slots[0]?.start ?? "2026-11-02T10:00";
      const howTo =
        lang === "tr"
          ? `Randevu için book_intro_call: start = "YYYY-MM-DDTHH:MM" (ör. "${example}"), timeZone = "${tz}", kullanıcının adı ve e-postası.`
          : `To book, call book_intro_call with start = "YYYY-MM-DDTHH:MM" (e.g. "${example}"), timeZone = "${tz}", and the user's name and email.`;
      const empty =
        lang === "tr"
          ? `Bu aralıkta boş saat yok. Daha ileri bir "from" tarihiyle tekrar deneyin veya randevu sayfasına bakın: ${l.book}`
          : `No open times in this range. Try a later "from" date or see the booking page: ${l.book}`;
      const text = dayList.length ? [header, ...lines, "", howTo].join("\n") : empty;

      return result(text, {
        kind: "availability",
        ...base(lang),
        configured: true,
        timeZone: tz,
        durationMinutes: MEETING_MINUTES,
        days: dayList,
      });
    },
  );

  /* ---------------------------------------------------------------- */
  /* book_intro_call                                                    */
  /* ---------------------------------------------------------------- */
  server.registerTool(
    "book_intro_call",
    {
      title: "Book intro call",
      description: `Books a ${MEETING_MINUTES}-minute intro video call (Google Meet) with Huntay AzerTürk at a slot returned by get_availability, using the attendee's name and email; Cal.com emails the calendar invitation. Call only after the user has confirmed the slot and their details.`,
      inputSchema: {
        start: z
          .string()
          .max(40)
          .describe('Slot start from get_availability: "YYYY-MM-DDTHH:MM" in timeZone (ISO 8601 with offset also accepted).'),
        timeZone: z
          .string()
          .max(64)
          .optional()
          .describe("IANA time zone of start and of the attendee. Defaults to Europe/Istanbul."),
        name: z.string().min(2).max(100).describe("Attendee's full name."),
        email: z.string().min(5).max(254).describe("Attendee's email address; the invitation is sent here."),
        notes: z.string().max(1000).optional().describe("Optional topic of the call (company, project, goals)."),
        language: languageField,
      },
      annotations: {
        title: "Book intro call",
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: false,
        openWorldHint: true,
      },
      _meta: uiMeta("Booking the call…", "Call booked"),
    },
    async ({ start, timeZone, name, email, notes, language }) => {
      const lang = pickLang(language);
      const tz = timeZone && isValidTimeZone(timeZone) ? timeZone : siteConfig.timeZone;
      const l = links(lang);
      const fail = (message: string) =>
        result(message, { kind: "booking", ...base(lang), status: "failed", message, timeZone: tz }, true);

      if (!isCalConfigured()) {
        return fail(
          lang === "tr"
            ? `Çevrim içi randevu şu an kullanılamıyor. Randevu sayfası: ${l.book}`
            : `Online booking isn't available right now. Booking page: ${l.book}`,
        );
      }
      if (timeZone && !isValidTimeZone(timeZone)) {
        return fail(
          lang === "tr"
            ? `"${timeZone}" geçerli bir IANA saat dilimi değil (ör. "Europe/Istanbul").`
            : `"${timeZone}" is not a valid IANA time zone (e.g. "Europe/Istanbul").`,
        );
      }
      const cleanEmail = email.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
        return fail(lang === "tr" ? "Geçerli bir e-posta adresi gerekli." : "A valid email address is required.");
      }
      const startDate = parseStart(start, tz);
      if (!startDate) {
        return fail(
          lang === "tr"
            ? 'Başlangıç saati okunamadı. get_availability’deki biçimi kullanın, ör. "2026-11-02T10:00".'
            : 'Could not read the start time. Use the format from get_availability, e.g. "2026-11-02T10:00".',
        );
      }
      if (startDate.getTime() <= Date.now()) {
        return fail(
          lang === "tr" ? "Bu saat geçmişte kaldı; lütfen yeni bir saat seçin." : "That time is in the past; please pick a new time.",
        );
      }

      try {
        const booking = await createCalBooking({
          start: startDate.toISOString(),
          name: name.trim(),
          email: cleanEmail,
          timeZone: tz,
          language: lang,
          notes: notes?.trim() || undefined,
        });
        const bookedStart = new Date(booking.start);
        const startLabel = formatDateTime(Number.isNaN(bookedStart.getTime()) ? startDate : bookedStart, tz, lang);
        const status = booking.status === "pending" ? "pending" : "confirmed";
        const text =
          lang === "tr"
            ? [
                `Randevu oluşturuldu: ${siteConfig.name} ile ${MEETING_MINUTES} dakikalık tanışma görüşmesi — ${startLabel} (${tz}).`,
                `Takvim daveti${booking.meetingUrl ? "" : " ve Google Meet linki"} ${cleanEmail} adresine e-postayla gönderildi.`,
                ...(booking.meetingUrl ? [`Görüşme linki: ${booking.meetingUrl}`] : []),
                ...(status === "pending" ? ["Not: randevu onay bekliyor."] : []),
                "Değiştirmek veya iptal etmek için onay e-postasındaki bağlantılar kullanılabilir.",
              ].join("\n")
            : [
                `Booked: ${MEETING_MINUTES}-minute intro call with ${siteConfig.name} — ${startLabel} (${tz}).`,
                `The calendar invitation${booking.meetingUrl ? "" : " with the Google Meet link"} was emailed to ${cleanEmail}.`,
                ...(booking.meetingUrl ? [`Meeting link: ${booking.meetingUrl}`] : []),
                ...(status === "pending" ? ["Note: the booking is awaiting confirmation."] : []),
                "The links in the confirmation email can be used to reschedule or cancel.",
              ].join("\n");

        return result(text, {
          kind: "booking",
          ...base(lang),
          status,
          startLabel,
          timeZone: tz,
          ...(booking.meetingUrl ? { meetingUrl: booking.meetingUrl } : {}),
        });
      } catch (error) {
        const reason = error instanceof CalBookingError ? error.message : "";
        return fail(
          lang === "tr"
            ? `Randevu oluşturulamadı${reason ? ` (${reason})` : ""}. Saat az önce dolmuş olabilir; get_availability ile güncel saatlere bakın.`
            : `The booking could not be completed${reason ? ` (${reason})` : ""}. The slot may have just been taken; check get_availability for current times.`,
        );
      }
    },
  );

  /* ---------------------------------------------------------------- */
  /* list_services                                                      */
  /* ---------------------------------------------------------------- */
  server.registerTool(
    "list_services",
    {
      title: "List services",
      description:
        "Lists the consulting and development services offered by Huntay AzerTürk, with links. If need is given (the user's problem or project in their own words), services are ranked by fit and each includes the matching item from its service page. Use when the user asks which of Huntay AzerTürk's services exist or fit their project.",
      inputSchema: {
        need: z
          .string()
          .max(500)
          .optional()
          .describe('Optional: the user\'s need or project, e.g. "answer customer questions on WhatsApp".'),
        language: languageField,
      },
      annotations: { title: "List services", ...READ_ONLY },
      _meta: uiMeta("Loading services…", "Services ready"),
    },
    async ({ need, language }) => {
      const lang = pickLang(language);
      const ranked = need?.trim() ? matchServices(need, lang) : [];
      const ordered = ranked.length ? ranked : services.map((service) => ({ service, score: 0, reason: "" }));
      const items = ordered.map(({ service, reason }) => ({
        slug: service.slug,
        title: service.title[lang],
        tagline: service.tagline[lang],
        url: localeUrl(lang, `/services/${service.slug}`),
        ...(reason ? { reason } : {}),
      }));
      const header = ranked.length
        ? lang === "tr"
          ? `"${need}" ihtiyacına uygunluğa göre sıralanmış hizmetler:`
          : `Services ranked by fit for "${need}":`
        : need?.trim()
          ? lang === "tr"
            ? `"${need}" için doğrudan eşleşen hizmet bulunamadı; tüm hizmetler:`
            : `No direct match for "${need}"; all services:`
          : lang === "tr"
            ? `${siteConfig.name} tarafından sunulan hizmetler:`
            : `Services offered by ${siteConfig.name}:`;
      const text = [
        header,
        ...items.map(
          (item) =>
            `- ${item.title} [${item.slug}] — ${item.tagline}${item.reason ? ` (${lang === "tr" ? "eşleşen" : "match"}: ${item.reason})` : ""} ${item.url}`,
        ),
        "",
        scheduleHint[lang],
      ].join("\n");

      return result(text, {
        kind: "services",
        ...base(lang),
        ...(need?.trim() ? { need: need.trim(), matched: ranked.length > 0 } : {}),
        services: items,
      });
    },
  );

  /* ---------------------------------------------------------------- */
  /* get_service                                                        */
  /* ---------------------------------------------------------------- */
  server.registerTool(
    "get_service",
    {
      title: "Get service details",
      description:
        "Returns full details of one of Huntay AzerTürk's services: who it is for, deliverables, use cases, technologies and FAQ (including how pricing works). Use the slug from list_services.",
      inputSchema: {
        slug: z.enum(serviceSlugs).describe("Service slug from list_services, e.g. ai-agents."),
        language: languageField,
      },
      annotations: { title: "Get service details", ...READ_ONLY },
      _meta: uiMeta("Loading service details…", "Service details ready"),
    },
    async ({ slug, language }) => {
      const lang = pickLang(language);
      const service = getService(slug);
      if (!service) {
        return result(`Unknown service "${slug}". Valid slugs: ${serviceSlugs.join(", ")}.`, undefined, true);
      }
      const url = localeUrl(lang, `/services/${service.slug}`);
      const text = [`# ${service.title[lang]}`, serviceText(service, lang), "", url, scheduleHint[lang]].join("\n");

      return result(text, {
        kind: "service",
        ...base(lang),
        service: {
          slug: service.slug,
          title: service.title[lang],
          tagline: service.tagline[lang],
          summary: service.summary[lang],
          deliverables: service.deliverables.map((item) => item[lang]),
          url,
        },
      });
    },
  );

  /* ---------------------------------------------------------------- */
  /* get_profile                                                        */
  /* ---------------------------------------------------------------- */
  server.registerTool(
    "get_profile",
    {
      title: "Get profile",
      description:
        "Returns the professional profile of Huntay AzerTürk (software architect, Istanbul): background, current role, experience highlights, languages and contact links. Use when the user asks about Huntay AzerTürk himself.",
      inputSchema: { language: languageField },
      annotations: { title: "Get profile", ...READ_ONLY },
      _meta: uiMeta("Loading profile…", "Profile ready"),
    },
    async ({ language }) => {
      const lang = pickLang(language);
      const l = links(lang);
      const role = experience[0];
      const text =
        lang === "tr"
          ? [
              `${siteConfig.name} — İstanbul merkezli yazılım mimarı ve mühendislik lideri; uzaktan, Türkçe veya İngilizce çalışır.`,
              heroLead.tr,
              sentence(`Güncel rol: ${role.role.tr}, ${role.org.tr}`),
              `Öne çıkanlar: ${highlights.tr.join(" · ")}.`,
              `Hizmetler: ${services.map((service) => service.title.tr).join("; ")}.`,
              `Web: ${l.website} · LinkedIn: ${siteConfig.linkedin} · E-posta: ${siteConfig.contactEmail}`,
              scheduleHint.tr,
            ].join("\n")
          : [
              `${siteConfig.name} — software architect and engineering leader based in Istanbul, Turkey; works remotely, in English or Turkish.`,
              heroLead.en,
              sentence(`Current role: ${role.role.en}, ${role.org.en}`),
              `Highlights: ${highlights.en.join(" · ")}.`,
              `Services: ${services.map((service) => service.title.en).join("; ")}.`,
              `Web: ${l.website} · LinkedIn: ${siteConfig.linkedin} · Email: ${siteConfig.contactEmail}`,
              scheduleHint.en,
            ].join("\n");

      return result(text, {
        kind: "profile",
        ...base(lang),
        summary: heroLead[lang],
        highlights: highlights[lang],
      });
    },
  );

  /* ---------------------------------------------------------------- */
  /* search / fetch (ChatGPT deep research ve bilgi kaynağı uyumlu)     */
  /* ---------------------------------------------------------------- */
  server.registerTool(
    "search",
    {
      title: "Search content",
      description:
        "Searches the content of huntayazerturk.com — Huntay AzerTürk's services, case studies, FAQ, work experience and articles — by keyword. Returns matching documents (id, title, url); pass an id to fetch for the full text.",
      inputSchema: {
        query: z.string().min(1).max(300).describe("Keywords, e.g. \"cloud cost reduction\" or \"RAG\"."),
      },
      annotations: { title: "Search content", ...READ_ONLY },
      _meta: statusMeta("Searching…", "Search done"),
    },
    async ({ query }) => {
      const lang = detectLang(query);
      const hits = searchDocs(query, lang);
      return jsonResult({
        results: hits.map((hit) => ({ id: docRef(hit, lang), title: hit.title, url: hit.url })),
      });
    },
  );

  server.registerTool(
    "fetch",
    {
      title: "Fetch document",
      description:
        "Returns the full text of a document from search, by its id (e.g. \"service:ai-agents\" or \"case-study:ai-ops\").",
      inputSchema: {
        id: z.string().min(1).max(120).describe("Document id returned by search."),
      },
      annotations: { title: "Fetch document", ...READ_ONLY },
      _meta: statusMeta("Reading…", "Done"),
    },
    async ({ id }) => {
      const doc = getDoc(id.trim());
      if (!doc) {
        return result(
          `No document with id "${id}". Use the search tool to get valid ids (for example "service:ai-agents").`,
          undefined,
          true,
        );
      }
      return jsonResult({
        id,
        title: doc.title,
        text: doc.text,
        url: doc.url,
        metadata: { type: doc.type, language: id.endsWith("@tr") ? "tr" : "en", source: siteConfig.baseUrl },
      });
    },
  );

  /* ---------------------------------------------------------------- */
  /* Hazır komutlar (Claude gibi istemcilerde menüden seçilebilir)      */
  /* ---------------------------------------------------------------- */
  server.registerPrompt(
    "book_call",
    {
      title: "Book an intro call",
      description: "Find an open time and book a 30-minute intro call with Huntay AzerTürk.",
      argsSchema: {
        topic: z.string().max(300).optional().describe("What you would like to discuss"),
      },
    },
    ({ topic }) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `I'd like to book a ${MEETING_MINUTES}-minute intro call with Huntay AzerTürk${topic ? ` about: ${topic}` : ""}. Please show me his open times in my time zone and help me book one.`,
          },
        },
      ],
    }),
  );

  server.registerPrompt(
    "find_service",
    {
      title: "Find the right service",
      description: "Describe your project and see which of Huntay AzerTürk's services fit.",
      argsSchema: {
        need: z.string().max(500).describe("Your project or problem"),
      },
    },
    ({ need }) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Which of Huntay AzerTürk's services fit this need: ${need}? Explain why, and what the next step would be.`,
          },
        },
      ],
    }),
  );

  return server;
}
