import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { CfWorkerJsonSchemaValidator } from "@modelcontextprotocol/sdk/validation/cfworker";
import { z } from "zod";
import { experience } from "@/data/experience";
import { heroLead, strategicPartner } from "@/data/profile";
import { getService, services } from "@/data/services";
import {
  CalBookingError,
  calBookingPageUrl,
  createCalBooking,
  getCalSlots,
  isCalConfigured,
} from "@/lib/cal";
import { absoluteUrl, localeUrl, profileImagePath } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { formatDateTime, formatDay, formatTime, isValidTimeZone, parseStart, wallTime } from "./time";
import { WIDGET_MIME_TYPE, WIDGET_URI, widgetHtml } from "./widget";

/**
 * Huntay AzerTürk’ün MCP sunucusu (https://huntayazerturk.com/mcp).
 * ChatGPT, Claude, Gemini ve diğer MCP istemcileri bu araçlarla profil ve hizmetleri gösterir,
 * Cal.com takviminden boş saatleri okur ve sohbetten çıkmadan 30 dakikalık tanışma görüşmesi planlar.
 * Arayüz destekleyen istemcilerde (MCP Apps) sonuçlar sohbet içinde kart olarak görünür;
 * desteklemeyenlerde aynı bilgi metin olarak döner.
 */

type Lang = "en" | "tr";

export const MCP_SERVER_VERSION = "1.0.0";
const MEETING_MINUTES = 30;

const pickLang = (value?: string): Lang => (value === "tr" ? "tr" : "en");

const languageField = z
  .enum(["en", "tr"])
  .optional()
  .describe('Answer language: "tr" if the user writes in Turkish, otherwise "en".');

const serviceSlugs = services.map((service) => service.slug) as [string, ...string[]];

const headline: Record<Lang, string> = {
  en: "Software architect & engineering leader · AI, cloud & IoT · Istanbul",
  tr: "Yazılım mimarı ve mühendislik lideri · Yapay zeka, bulut ve IoT · İstanbul",
};

/** Sitedeki rakamlarla birebir (data/metrics.ts ve deneyim bölümü). */
const highlights: Record<Lang, string[]> = {
  en: [
    "13+ years in software architecture",
    "10,000+ IoT devices in operation",
    "Up to 75% lower cloud costs",
    "~80% faster support with AI agents",
    "English & Turkish",
  ],
  tr: [
    "13+ yıl yazılım mimarisi",
    "10.000+ IoT cihazı operasyonu",
    "%75'e varan bulut tasarrufu",
    "Yapay zeka ile ~%80 daha hızlı destek",
    "Türkçe ve İngilizce",
  ],
};

function links(lang: Lang) {
  return {
    book: localeUrl(lang, "/book"),
    calendar: isCalConfigured() ? calBookingPageUrl() : localeUrl(lang, "/book"),
    services: localeUrl(lang, "/services"),
    website: localeUrl(lang),
    linkedin: siteConfig.linkedin,
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

function result(text: string, structuredContent?: Record<string, unknown>, isError = false): CallToolResult {
  return {
    content: [{ type: "text", text }],
    ...(structuredContent ? { structuredContent } : {}),
    ...(isError ? { isError: true } : {}),
  };
}

/** Cümle sonuna nokta ekler (zaten noktalıysa eklemez: "A.Ş." gibi). */
const sentence = (text: string) => (/[.!?]$/.test(text) ? text : `${text}.`);

function bookingHint(lang: Lang): string {
  const l = links(lang);
  return lang === "tr"
    ? `Sonraki adım: 30 dakikalık tanışma görüşmesi (get_availability → book_intro_call) veya ${l.book}`
    : `Next step: a 30-minute intro call (get_availability → book_intro_call) or ${l.book}`;
}

const INSTRUCTIONS = `Official assistant of Huntay AzerTürk (${siteConfig.baseUrl}): an Istanbul-based software architect and engineering leader with 13+ years of experience who offers consulting and hands-on development — AI agents and automation, fractional CTO and technical advisory, startup MVP and product development, web and mobile apps, cloud and DevOps, microservices and legacy modernization, IoT platforms and digital transformation for SMEs. He works remotely worldwide, in English or Turkish.

- Use get_profile to introduce him, and list_services / get_service to explain what he offers.
- To set up a meeting: call get_availability (pass the user's IANA time zone if you know it), let the user choose a time, ask for their name and email (and optionally what they want to discuss), confirm the details, then call book_intro_call. Never invent free times and never book without the user's explicit confirmation.
- If online booking is not possible, share the booking page (${localeUrl("en", "/book")}) or WhatsApp.
- Reply in the user's language; set language to "tr" for Turkish.`;

export function createMcpServer(): McpServer {
  const server = new McpServer(
    {
      name: "huntayazerturk",
      title: "Huntay AzerTürk",
      version: MCP_SERVER_VERSION,
      description:
        "Profile, services and live calendar of Huntay AzerTürk — book a 30-minute intro call about AI agents, product development, cloud/DevOps or digital transformation.",
      websiteUrl: siteConfig.baseUrl,
      icons: [{ src: absoluteUrl(profileImagePath), mimeType: "image/jpeg", sizes: ["1024x1024"] }],
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
      description: "In-chat card: profile, services, free time slots and booking confirmation.",
      mimeType: WIDGET_MIME_TYPE,
      _meta: { ui: { prefersBorder: true } },
    },
    async () => ({
      contents: [
        {
          uri: WIDGET_URI,
          mimeType: WIDGET_MIME_TYPE,
          text: widgetHtml,
          _meta: { ui: { prefersBorder: true } },
        },
      ],
    }),
  );

  /* ---------------------------------------------------------------- */
  /* get_profile                                                        */
  /* ---------------------------------------------------------------- */
  server.registerTool(
    "get_profile",
    {
      title: "Who is Huntay AzerTürk?",
      description:
        "Introduce Huntay AzerTürk, an Istanbul-based software architect and engineering leader (13+ years) who helps companies and startups with AI agents, product/MVP development, cloud & DevOps, IoT and digital transformation. Use when the user asks about Huntay, or is looking for a consultant, freelancer, software architect or fractional CTO for these topics.",
      inputSchema: { language: languageField },
      annotations: {
        title: "Huntay AzerTürk — profile",
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
      _meta: uiMeta("Loading Huntay's profile…", "Profile ready"),
    },
    async ({ language }) => {
      const lang = pickLang(language);
      const l = links(lang);
      const role = experience[0];
      const serviceNames = services.map((service) => service.title[lang]).join("; ");
      const text =
        lang === "tr"
          ? [
              `${siteConfig.name} — İstanbul merkezli yazılım mimarı ve mühendislik lideri (dünya genelinde uzaktan, Türkçe veya İngilizce çalışır).`,
              "",
              heroLead.tr,
              "",
              strategicPartner.tr,
              "",
              sentence(`Güncel rol: ${role.role.tr}, ${role.org.tr}`),
              `Öne çıkanlar: ${highlights.tr.join(" · ")}.`,
              `Hizmetler: ${serviceNames} (ayrıntılar için list_services / get_service).`,
              "",
              bookingHint(lang),
              `Web sitesi: ${l.website} · Hizmetler: ${l.services} · LinkedIn: ${l.linkedin}${siteConfig.whatsappUrl ? ` · WhatsApp: ${siteConfig.whatsappUrl}` : ""}`,
            ].join("\n")
          : [
              `${siteConfig.name} — software architect and engineering leader based in Istanbul, Turkey (works remotely worldwide, in English or Turkish).`,
              "",
              heroLead.en,
              "",
              strategicPartner.en,
              "",
              sentence(`Current role: ${role.role.en}, ${role.org.en}`),
              `Highlights: ${highlights.en.join(" · ")}.`,
              `Services: ${serviceNames} (use list_services / get_service for details).`,
              "",
              bookingHint(lang),
              `Website: ${l.website} · Services: ${l.services} · LinkedIn: ${l.linkedin}${siteConfig.whatsappUrl ? ` · WhatsApp: ${siteConfig.whatsappUrl}` : ""}`,
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
  /* list_services                                                      */
  /* ---------------------------------------------------------------- */
  server.registerTool(
    "list_services",
    {
      title: "Services",
      description:
        "List the consulting and development services Huntay AzerTürk offers — AI agents & automation (support/sales agents, RAG), fractional CTO, startup MVP & product development, web & mobile apps, cloud & DevOps, microservices & legacy modernization, IoT platforms and digital transformation for SMEs — with links. Use when the user asks what he can help with or needs one of these services.",
      inputSchema: { language: languageField },
      annotations: {
        title: "List services",
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
      _meta: uiMeta("Loading services…", "Services ready"),
    },
    async ({ language }) => {
      const lang = pickLang(language);
      const items = services.map((service) => ({
        slug: service.slug,
        title: service.title[lang],
        tagline: service.tagline[lang],
        url: localeUrl(lang, `/services/${service.slug}`),
      }));
      const text = [
        lang === "tr"
          ? `${siteConfig.name} tarafından sunulan hizmetler (${links(lang).services}):`
          : `Services offered by ${siteConfig.name} (${links(lang).services}):`,
        ...items.map((item) => `- ${item.title} [${item.slug}] — ${item.tagline} ${item.url}`),
        "",
        bookingHint(lang),
      ].join("\n");

      return result(text, { kind: "services", ...base(lang), services: items });
    },
  );

  /* ---------------------------------------------------------------- */
  /* get_service                                                        */
  /* ---------------------------------------------------------------- */
  server.registerTool(
    "get_service",
    {
      title: "Service details",
      description:
        "Details of one service by Huntay AzerTürk: who it is for, deliverables, typical use cases, technologies and FAQ (including how pricing works). Use the slug from list_services.",
      inputSchema: {
        slug: z.enum(serviceSlugs).describe("Service slug, e.g. ai-agents or fractional-cto (see list_services)."),
        language: languageField,
      },
      annotations: {
        title: "Service details",
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
      // Yalnızca veri: ayrıntıları model anlatır, her çağrıda ayrı kart çıkmasın.
      _meta: {
        "openai/toolInvocation/invoking": "Loading service details…",
        "openai/toolInvocation/invoked": "Service details ready",
      },
    },
    async ({ slug, language }) => {
      const lang = pickLang(language);
      const service = getService(slug);
      if (!service) {
        return result(`Unknown service "${slug}". Valid slugs: ${serviceSlugs.join(", ")}.`, undefined, true);
      }
      const url = localeUrl(lang, `/services/${service.slug}`);
      const L =
        lang === "tr"
          ? { forWhom: "Kimler için", deliverables: "Neler alırsınız", useCases: "Örnek kullanım senaryoları", tech: "Teknolojiler", faq: "Sık sorulan sorular", more: "Ayrıntılar" }
          : { forWhom: "Who it's for", deliverables: "What you get", useCases: "Typical use cases", tech: "Technologies", faq: "FAQ", more: "More" };
      const text = [
        `# ${service.title[lang]}`,
        service.tagline[lang],
        "",
        service.summary[lang],
        "",
        `${L.forWhom}:`,
        ...service.forWhom.map((item) => `- ${item[lang]}`),
        "",
        `${L.deliverables}:`,
        ...service.deliverables.map((item) => `- ${item[lang]}`),
        "",
        `${L.useCases}:`,
        ...service.useCases.map((item) => `- ${item[lang]}`),
        "",
        `${L.tech}: ${service.tech.join(", ")}`,
        "",
        `${L.faq}:`,
        ...service.faq.flatMap((item) => [`Q: ${item.question[lang]}`, `A: ${item.answer[lang]}`]),
        "",
        `${L.more}: ${url}`,
        bookingHint(lang),
      ].join("\n");

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
  /* get_availability                                                   */
  /* ---------------------------------------------------------------- */
  server.registerTool(
    "get_availability",
    {
      title: "Free times for an intro call",
      description: `Show Huntay AzerTürk's free times for a ${MEETING_MINUTES}-minute intro video call (Google Meet), live from his calendar. Working hours are Monday–Friday 10:00–18:00 Istanbul time. Use when the user wants to meet, talk to, hire or book a call/appointment with Huntay. After the user picks a time, call book_intro_call.`,
      inputSchema: {
        timeZone: z
          .string()
          .max(64)
          .optional()
          .describe('The user\'s IANA time zone, e.g. "Europe/Berlin" or "America/New_York". Defaults to Europe/Istanbul.'),
        from: z
          .string()
          .max(10)
          .optional()
          .describe("Optional first day to search, YYYY-MM-DD (default: today)."),
        days: z
          .number()
          .int()
          .min(1)
          .max(30)
          .optional()
          .describe("How many days ahead to search (default 7, max 30)."),
        language: languageField,
      },
      annotations: {
        title: "Check free times",
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
      _meta: uiMeta("Checking Huntay's calendar…", "Free times ready"),
    },
    async ({ timeZone, from, days, language }) => {
      const lang = pickLang(language);
      const tz = timeZone && isValidTimeZone(timeZone) ? timeZone : siteConfig.timeZone;
      const l = links(lang);

      if (!isCalConfigured()) {
        const text =
          lang === "tr"
            ? `Çevrim içi randevu şu an kullanılamıyor. Görüşme için: ${l.book}${siteConfig.whatsappUrl ? ` veya WhatsApp: ${siteConfig.whatsappUrl}` : ""}`
            : `Online booking isn't available right now. To arrange a call: ${l.book}${siteConfig.whatsappUrl ? ` or WhatsApp: ${siteConfig.whatsappUrl}` : ""}`;
        return result(text, { kind: "availability", ...base(lang), configured: false, timeZone: tz, days: [] });
      }

      const now = Date.now();
      let startMs = now;
      if (from && /^\d{4}-\d{2}-\d{2}$/.test(from)) {
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
        const text =
          lang === "tr"
            ? `Takvime şu an ulaşılamadı. Boş saatleri buradan görebilirsiniz: ${l.calendar}`
            : `The calendar could not be reached right now. Free times are listed here: ${l.calendar}`;
        return result(text, { kind: "availability", ...base(lang), configured: false, timeZone: tz, days: [] });
      }

      const dayList = Object.keys(slotsByDay)
        .sort()
        .map((dayKey) => {
          const slots = slotsByDay[dayKey]
            .map((slot) => new Date(slot.start))
            .filter((date) => !Number.isNaN(date.getTime()) && date.getTime() > now)
            .map((date) => ({ start: wallTime(date, tz), label: formatTime(date, tz) }));
          const first = slots.length ? new Date(slotsByDay[dayKey][0].start) : null;
          return {
            date: dayKey,
            label: first ? formatDay(first, tz, lang) : dayKey,
            slots,
          };
        })
        .filter((day) => day.slots.length > 0)
        .slice(0, 10);

      const header =
        lang === "tr"
          ? `${siteConfig.name} ile ${MEETING_MINUTES} dakikalık tanışma görüşmesi (Google Meet) için boş saatler — saat dilimi ${tz}:`
          : `Free times for a ${MEETING_MINUTES}-minute intro call (Google Meet) with ${siteConfig.name} — time zone ${tz}:`;
      const lines = dayList.map(
        (day) => `- ${day.label} (${day.date}): ${day.slots.map((slot) => slot.label).join(", ")}`,
      );
      const howTo =
        lang === "tr"
          ? `Randevu için: kullanıcıyla saati teyit edin, adını ve e-postasını (isterse görüşme konusunu) alın, sonra book_intro_call aracını start = "YYYY-MM-DDTHH:MM" (ör. "${dayList[0]?.slots[0]?.start ?? "2026-11-02T10:00"}") ve timeZone = "${tz}" ile çağırın.`
          : `To book: confirm the time with the user, ask for their name and email (and optionally the topic), then call book_intro_call with start = "YYYY-MM-DDTHH:MM" (e.g. "${dayList[0]?.slots[0]?.start ?? "2026-11-02T10:00"}") and timeZone = "${tz}".`;
      const empty =
        lang === "tr"
          ? `Bu aralıkta boş saat yok. Daha ileri bir tarih için "from" kullanın veya takvimi açın: ${l.calendar}`
          : `No free times in this range. Try a later "from" date or open the calendar: ${l.calendar}`;
      const text = dayList.length
        ? [header, ...lines, "", howTo, `${lang === "tr" ? "Takvim" : "Calendar"}: ${l.calendar}`].join("\n")
        : empty;

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
      title: "Book an intro call",
      description: `Book a ${MEETING_MINUTES}-minute intro video call (Google Meet) with Huntay AzerTürk at a free time returned by get_availability. Only call this after the user has chosen the time, given their name and email, and confirmed they want to book. Cal.com then emails the user a confirmation with the calendar invite and meeting link.`,
      inputSchema: {
        start: z
          .string()
          .max(40)
          .describe('Start time from get_availability, as "YYYY-MM-DDTHH:MM" in the given timeZone (an ISO 8601 time with offset is also accepted).'),
        timeZone: z
          .string()
          .max(64)
          .optional()
          .describe("IANA time zone of the start time and of the user (default Europe/Istanbul)."),
        name: z.string().min(2).max(100).describe("The user's full name."),
        email: z.string().min(5).max(254).describe("The user's email address — the invitation is sent here."),
        notes: z
          .string()
          .max(1000)
          .optional()
          .describe("Optional: what the user wants to discuss (company, project, goals)."),
        language: languageField,
      },
      annotations: {
        title: "Book an intro call",
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
        result(
          message,
          { kind: "booking", ...base(lang), status: "failed", message, timeZone: tz },
          true,
        );

      if (!isCalConfigured()) {
        return fail(
          lang === "tr"
            ? `Çevrim içi randevu şu an kullanılamıyor. Lütfen ${l.book} sayfasını kullanın.`
            : `Online booking isn't available right now. Please use ${l.book}.`,
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
            ? 'Başlangıç saati anlaşılamadı. get_availability’deki biçimi kullanın, ör. "2026-11-02T10:00".'
            : 'Could not read the start time. Use the format from get_availability, e.g. "2026-11-02T10:00".',
        );
      }
      if (startDate.getTime() <= Date.now()) {
        return fail(lang === "tr" ? "Bu saat geçmişte kaldı; lütfen yeni bir saat seçin." : "That time is in the past; please pick a new time.");
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
                `Takvim davetini${booking.meetingUrl ? "" : " ve Google Meet linkini"} içeren onay e-postası ${cleanEmail} adresine gönderildi.`,
                ...(booking.meetingUrl ? [`Görüşme linki: ${booking.meetingUrl}`] : []),
                ...(status === "pending" ? ["Not: randevu Huntay’ın onayını bekliyor."] : []),
                "Saati değiştirmek veya iptal etmek için onay e-postasındaki bağlantıları kullanabilirsiniz.",
              ].join("\n")
            : [
                `Booked: ${MEETING_MINUTES}-minute intro call with ${siteConfig.name} — ${startLabel} (${tz}).`,
                `A confirmation email with the calendar invite${booking.meetingUrl ? "" : " and the Google Meet link"} has been sent to ${cleanEmail}.`,
                ...(booking.meetingUrl ? [`Meeting link: ${booking.meetingUrl}`] : []),
                ...(status === "pending" ? ["Note: the booking is waiting for Huntay's confirmation."] : []),
                "To reschedule or cancel, use the links in the confirmation email.",
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
            ? `Randevu oluşturulamadı${reason ? ` (${reason})` : ""}. Saat az önce dolmuş olabilir: get_availability ile yeni saatleri gösterin veya ${l.calendar} adresini paylaşın.`
            : `The booking could not be completed${reason ? ` (${reason})` : ""}. The time may have just been taken: call get_availability to offer other times, or share ${l.calendar}.`,
        );
      }
    },
  );

  /* ---------------------------------------------------------------- */
  /* Hazır komutlar (Claude gibi istemcilerde menüden seçilebilir)      */
  /* ---------------------------------------------------------------- */
  server.registerPrompt(
    "book_call",
    {
      title: "Book an intro call with Huntay",
      description: "Find a free time and book a 30-minute intro call with Huntay AzerTürk.",
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
            text: `I'd like to book a ${MEETING_MINUTES}-minute intro call with Huntay AzerTürk${topic ? ` about: ${topic}` : ""}. Please show me his free times in my time zone and help me book one.`,
          },
        },
      ],
    }),
  );

  server.registerPrompt(
    "about_huntay",
    {
      title: "Who is Huntay AzerTürk?",
      description: "Introduce Huntay AzerTürk and the services he offers.",
    },
    () => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: "Who is Huntay AzerTürk, what services does he offer, and how can I work with him?",
          },
        },
      ],
    }),
  );

  return server;
}
