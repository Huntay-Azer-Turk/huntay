import { renderOgCard } from "@/lib/og";

/** /book paylaşım görseli — LinkedIn/Instagram profil linki olarak paylaşılmaya uygun. */
export const alt = "Book a call with Huntay AzerTürk";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function BookOpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tr = locale === "tr";
  return renderOgCard({
    kicker: tr ? "HUNTAYAZERTURK.COM · GÖRÜŞME" : "HUNTAYAZERTURK.COM · BOOK A CALL",
    title: tr ? "30 dakikalık tanışma görüşmesi" : "30-minute intro call",
    subtitle: "Huntay AzerTürk",
    tagline: tr
      ? "Yapay zeka · Ürün geliştirme · Bulut · Dijital dönüşüm"
      : "AI · Product development · Cloud · Digital transformation",
  });
}
