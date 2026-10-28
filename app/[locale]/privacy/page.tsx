import { LegalDocument } from "@/components/legal/legal-document";
import { privacySections, privacyUpdatedAt } from "@/data/privacy";
import { buildMetadata, type AppLocale } from "@/lib/seo";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });
  return buildMetadata({
    locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/privacy",
  });
}

export default async function PrivacyPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);
  const locale = rawLocale as AppLocale;
  const t = await getTranslations({ locale, namespace: "Privacy" });
  const tb = await getTranslations({ locale, namespace: "Breadcrumbs" });

  return (
    <LegalDocument
      locale={locale}
      title={t("title")}
      updatedLabel={t("updated")}
      updatedAt={privacyUpdatedAt}
      sections={privacySections}
      breadcrumbs={{ label: tb("label"), home: tb("home"), current: tb("privacy") }}
    />
  );
}
