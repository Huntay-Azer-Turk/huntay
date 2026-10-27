/**
 * Saat dilimi yardımcıları (kütüphanesiz; Intl ile). Cloudflare Workers ve Node’da çalışır.
 */

export function isValidTimeZone(timeZone: string): boolean {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone }).format(0);
    return true;
  } catch {
    return false;
  }
}

/** Verilen andaki saat dilimi farkı (dakika; ör. İstanbul için +180). */
function offsetMinutes(timestamp: number, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(new Date(timestamp));
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value ?? 0);
  const asUtc = Date.UTC(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour"),
    get("minute"),
    get("second"),
  );
  return Math.round((asUtc - timestamp) / 60000);
}

const WALL_TIME = /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})(?::(\d{2}))?(?:\.\d+)?$/;
const HAS_OFFSET = /(Z|[+-]\d{2}:?\d{2})$/i;

/**
 * "2026-10-28T10:00" (saat dilimi belirtilmemiş duvar saati) → verilen dilimdeki o anın Date karşılığı.
 * "2026-10-28T07:00:00Z" veya "+03:00" gibi ofsetli değerler olduğu gibi yorumlanır.
 * Geçersizse null döner.
 */
export function parseStart(value: string, timeZone: string): Date | null {
  const input = value.trim();
  if (HAS_OFFSET.test(input)) {
    const date = new Date(input);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  const match = WALL_TIME.exec(input);
  if (!match) return null;
  const [, y, mo, d, h, mi, s] = match;
  const guess = Date.UTC(Number(y), Number(mo) - 1, Number(d), Number(h), Number(mi), Number(s ?? 0));
  let utc = guess - offsetMinutes(guess, timeZone) * 60000;
  // Yaz saati geçişlerinde ikinci geçiş doğru farkı verir.
  const second = guess - offsetMinutes(utc, timeZone) * 60000;
  if (second !== utc) utc = second;
  return new Date(utc);
}

const intlLocale = (lang: "en" | "tr") => (lang === "tr" ? "tr-TR" : "en-GB");

/** "Wed 28 Oct" / "28 Eki Çar" */
export function formatDay(date: Date, timeZone: string, lang: "en" | "tr"): string {
  return new Intl.DateTimeFormat(intlLocale(lang), {
    timeZone,
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(date);
}

/** "10:00" */
export function formatTime(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(date);
}

/** "Wednesday, 28 October 2026, 10:00" / "28 Ekim 2026 Çarşamba 10:00" */
export function formatDateTime(date: Date, timeZone: string, lang: "en" | "tr"): string {
  return new Intl.DateTimeFormat(intlLocale(lang), {
    timeZone,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(date);
}

/** Verilen dilimde duvar saati: "2026-10-28T10:00" (book_intro_call’a aynen verilebilir). */
export function wallTime(date: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? "00";
  return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}`;
}
