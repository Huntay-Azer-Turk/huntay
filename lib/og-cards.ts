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
    subtitle: "Software Architect · Engineering Leader",
    tagline: "Cloud · AI · IoT · Istanbul",
    chips: ["13+ years", "10,000+ IoT devices", "Up to 75% cloud savings"],
  },
  tr: {
    subtitle: "Yazılım Mimarı · Mühendislik Lideri",
    tagline: "Bulut · Yapay Zeka · IoT · İstanbul",
    chips: ["13+ yıl", "10.000+ IoT cihazı", "%75'e varan bulut tasarrufu"],
  },
} as const;

export function ogCardFor(key: string, lang: OgLang): OgCard {
  const tr = lang === "tr";
  const bookChip = tr ? "Görüşme planla → huntayazerturk.com/tr/book" : "Book a call → huntayazerturk.com/book";
  if (key === "services") {
    return {
      kicker: tr ? "HUNTAYAZERTURK.COM · HİZMETLER" : "HUNTAYAZERTURK.COM · SERVICES",
      title: tr ? "Danışmanlık ve geliştirme" : "Consulting & development",
      subtitle: "Huntay AzerTürk",
      tagline: tr ? "Yapay zeka ajanları · Fractional CTO · Bulut · Ürün" : "AI agents · Fractional CTO · Cloud · Product",
      chips: [bookChip],
    };
  }
  if (key === "book") {
    return {
      kicker: tr ? "HUNTAYAZERTURK.COM · GÖRÜŞME" : "HUNTAYAZERTURK.COM · BOOK A CALL",
      title: tr ? "30 dakikalık tanışma görüşmesi" : "30-minute intro call",
      subtitle: "Huntay AzerTürk",
      tagline: tr
        ? "Yapay zeka · Ürün geliştirme · Bulut · Dijital dönüşüm"
        : "AI · Product development · Cloud · Digital transformation",
    };
  }
  if (key.startsWith("service-")) {
    const service = getService(key.slice("service-".length));
    return {
      kicker: tr ? "HUNTAYAZERTURK.COM · HİZMETLER" : "HUNTAYAZERTURK.COM · SERVICES",
      title: service ? (service.metaTitle ?? service.title)[lang] : siteConfig.name,
      subtitle: "Huntay AzerTürk",
      tagline: tr ? "Yazılım Mimarı · Mühendislik Lideri" : "Software Architect · Engineering Leader",
      chips: [bookChip],
    };
  }
  const text = home[lang];
  return { kicker: "HUNTAYAZERTURK.COM", title: siteConfig.name, ...text };
}
