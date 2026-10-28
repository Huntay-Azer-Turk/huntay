import { ogCardFor, ogKeys, type OgLang } from "@/lib/og-cards";
import { renderOgCard } from "@/lib/og";

/**
 * Paylaşım görsellerinin kaynağı. Sitede kullanılan görseller bunun çıktısının statik kopyalarıdır
 * (public/og); `npm run og:export` yerel sunucudan bunları indirip günceller. Arama motorlarına kapalı.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ locale: string; key: string }> }) {
  const { locale, key: raw } = await params;
  const key = raw.replace(/\.png$/, "");
  if (!ogKeys.includes(key) || (locale !== "en" && locale !== "tr")) {
    return new Response("Not found", { status: 404 });
  }
  const res = await renderOgCard(ogCardFor(key, locale as OgLang));
  res.headers.set("X-Robots-Tag", "noindex");
  return res;
}
