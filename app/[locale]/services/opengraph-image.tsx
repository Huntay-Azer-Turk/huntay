import { renderOgCard } from "@/lib/og";

/** /services paylaşım görseli. */
export const alt = "Huntay AzerTürk — Services";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ServicesOpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tr = locale === "tr";
  return renderOgCard({
    kicker: tr ? "HUNTAYAZERTURK.COM · HİZMETLER" : "HUNTAYAZERTURK.COM · SERVICES",
    title: tr ? "Danışmanlık ve geliştirme" : "Consulting & development",
    subtitle: "Huntay AzerTürk",
    tagline: tr
      ? "Yapay zeka ajanları · Fractional CTO · Bulut · Ürün"
      : "AI agents · Fractional CTO · Cloud · Product",
    chips: tr ? ["Görüşme planla → huntayazerturk.com/tr/book"] : ["Book a call → huntayazerturk.com/book"],
  });
}
