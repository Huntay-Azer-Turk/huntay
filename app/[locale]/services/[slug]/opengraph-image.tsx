import { getService } from "@/data/services";
import { renderOgCard } from "@/lib/og";

/** Hizmet sayfası paylaşım görseli: hizmet başlığı + kısa açıklama. */
export const alt = "Huntay AzerTürk — Service";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ServiceOpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const lang = locale === "tr" ? "tr" : "en";
  const service = getService(slug);
  return renderOgCard({
    kicker: lang === "tr" ? "HUNTAYAZERTURK.COM · HİZMETLER" : "HUNTAYAZERTURK.COM · SERVICES",
    title: service ? (service.metaTitle ?? service.title)[lang] : "Huntay AzerTürk",
    subtitle: "Huntay AzerTürk",
    tagline: lang === "tr" ? "Yazılım Mimarı · Mühendislik Lideri" : "Software Architect · Engineering Leader",
    chips: lang === "tr" ? ["Görüşme planla → huntayazerturk.com/tr/book"] : ["Book a call → huntayazerturk.com/book"],
  });
}
