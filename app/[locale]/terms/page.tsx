import { LegalDocument } from "@/components/legal/legal-document";
import { termsSections, termsUpdatedAt } from "@/data/terms";
import { buildMetadata, type AppLocale } from "@/lib/seo";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Terms" });
  return buildMetadata({
    locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/terms",
  });
}

/** Kullanım koşulları: web sitesi, randevu akışı ve MCP sunucusu (ChatGPT dizini bunu ister). */
export default async function TermsPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);
  const locale = rawLocale as AppLocale;
  const t = await getTranslations({ locale, namespace: "Terms" });
  const tb = await getTranslations({ locale, namespace: "Breadcrumbs" });

  return (
    <LegalDocument
      locale={locale}
      title={t("title")}
      updatedLabel={t("updated")}
      updatedAt={termsUpdatedAt}
      sections={termsSections}
      breadcrumbs={{ label: tb("label"), home: tb("home"), current: tb("terms") }}
    />
  );
}
