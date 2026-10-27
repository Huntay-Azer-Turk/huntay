import { buildStructuredData, type AppLocale } from "@/lib/seo";
import { getTranslations } from "next-intl/server";

export async function JsonLd({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const data = buildStructuredData(locale as AppLocale, {
    title: t("title"),
    description: t("description"),
  });

  return (
    <script
      type="application/ld+json"
      // `<` kaçışı: Next.js JSON-LD rehberindeki XSS önlemi
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
