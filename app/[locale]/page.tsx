import { AiPath } from "@/components/sections/ai-path";
import { CaseStudies, HOME_CASE_IDS } from "@/components/sections/case-studies";
import { ContactFooter } from "@/components/sections/contact-footer";
import { Expertise } from "@/components/sections/expertise";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Metrics } from "@/components/sections/metrics";
import { JsonLd } from "@/components/seo/json-ld";
import { buildHomeGraph, type AppLocale } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return (
    <>
      <JsonLd
        data={buildHomeGraph(locale as AppLocale, {
          title: t("title"),
          description: t("description"),
        })}
      />
      {/* 11 Kasım 2026: LinkedIn "Hakkında" ile aynı akış ve StoryBrand sırası — müşterinin derdi ve yol, kanıt,
          uzmanlık ve odak alanları, üç vaka, sorular, tek eylem. Kişisel bölümler /about sayfasında. */}
      <Hero />
      <AiPath />
      <Metrics />
      <Expertise />
      <CaseStudies ids={HOME_CASE_IDS} showAllLink />
      <Faq />
      <ContactFooter />
    </>
  );
}
