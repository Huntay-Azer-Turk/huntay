import { getService, services } from "@/data/services";
import type { OgCard } from "@/lib/og";
import { siteConfig } from "@/lib/site";

/**
 * Paylaşım görsellerinin içerikleri. Görseller statik PNG olarak public/og/<dil>/<anahtar>.png
 * altında durur (LinkedIn gibi tarayıcılar akışla gelen görselleri okuyamıyor).
 * İçerik değişince: `npm run og:export` (yerel sunucu açıkken) görselleri yeniden üretir.
 */
export type OgLang = "en" | "tr";

/** Sayfa yolu → görsel anahtarı. Kendi görseli olmayan sayfalar ana sayfa görselini kullanır. */
export function ogKeyForPath(path: string): string {
  const clean = path.replace(/\/+$/, "");
  if (clean === "/services") return "services";
  if (clean === "/book") return "book";
  const m = clean.match(/^\/services\/([^/]+)$/);
  if (m && getService(m[1])) return `service-${m[1]}`;
  return "home";
}

export function ogImagePath(lang: OgLang, path: string): string {
  return `/og/${lang}/${ogKeyForPath(path)}.png`;
}

export const ogKeys = ["home", "services", "book", ...services.map((s) => `service-${s.slug}`)];

const home = {
  en: {
    subtitle: "AI Consultant for Manufacturers",
    tagline: "Starts with the technical service & help desk assistant · Istanbul",
    chips: ["13+ years", "40–70% faster support resolution", "100,000 users, 3 engineers"],
  },
  tr: {
    subtitle: "Üreticiler için Yapay Zekâ Danışmanı",
    tagline: "Teknik servis ve help desk asistanıyla başlar · İstanbul",
    chips: ["13+ yıl", "Destek çözümünde %40–70 hız", "3 mühendisle 100.000 kullanıcı"],
  },
} as const;

export function ogCardFor(key: string, lang: OgLang): OgCard {
  const tr = lang === "tr";
  const bookChip = tr ? "Görüşme planla → huntayazerturk.com/tr/book" : "Book a call → huntayazerturk.com/book";
  if (key === "services") {
    return {
      kicker: tr ? "HUNTAYAZERTURK.COM · HİZMETLER" : "HUNTAYAZERTURK.COM · SERVICES",
      title: tr ? "Üreticiler için yapay zekâ dönüşümü" : "AI transformation for manufacturers",
      subtitle: "Huntay AzerTürk",
      tagline: tr ? "Help desk · Kalite · Üretim · Satış · Satın alma" : "Help desk · Quality · Production · Sales · Procurement",
      chips: [bookChip],
    };
  }
  if (key === "book") {
    return {
      kicker: tr ? "HUNTAYAZERTURK.COM · GÖRÜŞME" : "HUNTAYAZERTURK.COM · BOOK A CALL",
      title: tr ? "30 dakikalık tanışma görüşmesi" : "30-minute intro call",
      subtitle: "Huntay AzerTürk",
      tagline: tr ? "Üreticiler için Yapay Zekâ Danışmanı" : "AI Consultant for Manufacturers",
    };
  }
  if (key.startsWith("service-")) {
    const service = getService(key.slice("service-".length));
    return {
      kicker: tr ? "HUNTAYAZERTURK.COM · HİZMETLER" : "HUNTAYAZERTURK.COM · SERVICES",
      title: service ? (service.metaTitle ?? service.title)[lang] : siteConfig.name,
      subtitle: "Huntay AzerTürk",
      tagline: tr ? "Üreticiler için Yapay Zekâ Danışmanı" : "AI Consultant for Manufacturers",
      chips: [bookChip],
    };
  }
  const text = home[lang];
  return { kicker: "HUNTAYAZERTURK.COM", title: siteConfig.name, ...text };
}
