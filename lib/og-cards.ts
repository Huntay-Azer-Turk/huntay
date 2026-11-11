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
    subtitle: "AI & Productivity Consultant for SMEs",
    tagline: "Start with customer service · then production, quality, sales · Istanbul",
    chips: ["13+ years", "~80% faster support resolution (one project)", "Up to 75% cloud savings"],
  },
  tr: {
    subtitle: "KOBİ'ler için Yapay Zekâ ve Verimlilik Danışmanı",
    tagline: "Müşteri hizmetlerinden başla · sonra üretim, kalite, satış · İstanbul",
    chips: ["13+ yıl", "Destek çözümünde ~%80 hız (bir projede)", "%75'e varan bulut tasarrufu"],
  },
} as const;

export function ogCardFor(key: string, lang: OgLang): OgCard {
  const tr = lang === "tr";
  const bookChip = tr ? "Görüşme planla → huntayazerturk.com/tr/book" : "Book a call → huntayazerturk.com/book";
  if (key === "services") {
    return {
      kicker: tr ? "HUNTAYAZERTURK.COM · HİZMETLER" : "HUNTAYAZERTURK.COM · SERVICES",
      title: tr ? "Üç uzmanlık alanı" : "Three areas of expertise",
      subtitle: "Huntay AzerTürk",
      tagline: tr ? "Yapay zeka ve otomasyon · Bulut, IoT ve mimari · Siber güvenlik" : "AI & automation · Cloud, IoT & architecture · Cybersecurity",
      chips: [bookChip],
    };
  }
  if (key === "book") {
    return {
      kicker: tr ? "HUNTAYAZERTURK.COM · GÖRÜŞME" : "HUNTAYAZERTURK.COM · BOOK A CALL",
      title: tr ? "30 dakikalık tanışma görüşmesi" : "30-minute intro call",
      subtitle: "Huntay AzerTürk",
      tagline: tr
        ? "Yapay zeka · Bulut/IoT ve mimari · Siber güvenlik"
        : "AI · Cloud/IoT & architecture · Cybersecurity",
    };
  }
  if (key.startsWith("service-")) {
    const service = getService(key.slice("service-".length));
    return {
      kicker: tr ? "HUNTAYAZERTURK.COM · HİZMETLER" : "HUNTAYAZERTURK.COM · SERVICES",
      title: service ? (service.metaTitle ?? service.title)[lang] : siteConfig.name,
      subtitle: "Huntay AzerTürk",
      tagline: tr ? "KOBİ'ler için Yapay Zekâ ve Verimlilik Danışmanı" : "AI & Productivity Consultant for SMEs",
      chips: [bookChip],
    };
  }
  const text = home[lang];
  return { kicker: "HUNTAYAZERTURK.COM", title: siteConfig.name, ...text };
}
