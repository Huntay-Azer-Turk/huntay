import { renderOgCard } from "@/lib/og";
import { siteConfig } from "@/lib/site";

/** Ana sayfa paylaşım görseli (her dil için ayrı; build sırasında üretilir). */
export const alt = "Huntay AzerTürk — Software Architect · Cloud, AI & IoT";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const copy = {
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

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const text = locale === "tr" ? copy.tr : copy.en;
  return renderOgCard({
    kicker: "HUNTAYAZERTURK.COM",
    title: siteConfig.name,
    subtitle: text.subtitle,
    tagline: text.tagline,
    chips: text.chips,
  });
}
