import { siteConfig } from "./site";

/**
 * Cal.com API v2 istemcisi (sunucu tarafı; MCP araçları kullanır).
 * Herkese açık bir randevu tipi için hem boş saatler hem randevu oluşturma API anahtarı gerektirmez.
 * Docs: https://cal.com/docs/api-reference/v2
 */
const CAL_API = "https://api.cal.com/v2";
const SLOTS_API_VERSION = "2024-09-04";
const BOOKINGS_API_VERSION = "2026-02-25";
const TIMEOUT_MS = 12_000;

export function isCalConfigured(): boolean {
  return Boolean(siteConfig.calUsername && siteConfig.calEventSlug);
}

/** Cal.com gömme kodu ve linkleri için: "kullanici/randevu-tipi". */
export function calLink(): string {
  return `${siteConfig.calUsername}/${siteConfig.calEventSlug}`;
}

/** Cal.com’daki herkese açık randevu sayfası. */
export function calBookingPageUrl(): string {
  return `https://cal.com/${calLink()}`;
}

export type CalSlot = { start: string; end?: string };

/** Gün (YYYY-MM-DD, istenen saat diliminde) → o günün boş başlangıç saatleri (ofsetli ISO). */
export async function getCalSlots(params: {
  start: string;
  end: string;
  timeZone: string;
}): Promise<Record<string, CalSlot[]>> {
  const url = new URL(`${CAL_API}/slots`);
  url.searchParams.set("eventTypeSlug", siteConfig.calEventSlug);
  url.searchParams.set("username", siteConfig.calUsername);
  url.searchParams.set("start", params.start);
  url.searchParams.set("end", params.end);
  url.searchParams.set("timeZone", params.timeZone);
  url.searchParams.set("format", "range");

  const res = await fetch(url, {
    headers: { "cal-api-version": SLOTS_API_VERSION },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) {
    throw new Error(`Cal.com slots request failed (${res.status})`);
  }
  const json = (await res.json()) as {
    data?: Record<string, Array<string | { start: string; end?: string }>>;
  };
  const out: Record<string, CalSlot[]> = {};
  for (const [day, slots] of Object.entries(json.data ?? {})) {
    out[day] = slots.map((slot) => (typeof slot === "string" ? { start: slot } : slot));
  }
  return out;
}

export type CalBooking = {
  uid?: string;
  start: string;
  end?: string;
  status?: string;
  meetingUrl?: string;
};

export class CalBookingError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "CalBookingError";
  }
}

export async function createCalBooking(params: {
  /** UTC ISO 8601, ör. 2026-10-28T07:00:00.000Z */
  start: string;
  name: string;
  email: string;
  timeZone: string;
  language: "en" | "tr";
  notes?: string;
}): Promise<CalBooking> {
  const res = await fetch(`${CAL_API}/bookings`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cal-api-version": BOOKINGS_API_VERSION,
    },
    body: JSON.stringify({
      start: params.start,
      eventTypeSlug: siteConfig.calEventSlug,
      username: siteConfig.calUsername,
      attendee: {
        name: params.name,
        email: params.email,
        timeZone: params.timeZone,
        language: params.language,
      },
      ...(params.notes ? { bookingFieldsResponses: { notes: params.notes } } : {}),
      metadata: { source: "ai-assistant-mcp" },
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  const json = (await res.json().catch(() => ({}))) as {
    status?: string;
    data?: Record<string, unknown>;
    error?: { message?: string };
  };
  if (!res.ok || json.status === "error" || !json.data) {
    throw new CalBookingError(
      json.error?.message || `Cal.com booking failed (${res.status})`,
      res.status,
    );
  }
  const data = json.data;
  const str = (value: unknown) => (typeof value === "string" && value ? value : undefined);
  const link = (value: unknown) => {
    const text = str(value);
    return text && /^https?:\/\//.test(text) ? text : undefined;
  };
  const metadata = (data.metadata ?? {}) as Record<string, unknown>;
  return {
    uid: str(data.uid),
    start: str(data.start) ?? params.start,
    end: str(data.end),
    status: str(data.status),
    // Google Meet linki bazen yanıtta hemen olmaz; o durumda davet e-postasında gelir.
    meetingUrl: link(data.meetingUrl) ?? link(data.location) ?? link(metadata.videoCallUrl),
  };
}
