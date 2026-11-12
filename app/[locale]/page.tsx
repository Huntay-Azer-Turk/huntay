import { AiPath } from "@/components/sections/ai-path";
import { CaseStudies } from "@/components/sections/case-studies";
import { ContactFooter } from "@/components/sections/contact-footer";
import { Expertise } from "@/components/sections/expertise";
import { Faq } from "@/components/sections/faq";
import { Featured } from "@/components/sections/featured";
import { Hero } from "@/components/sections/hero";
import { Metrics } from "@/components/sections/metrics";
import { Timeline } from "@/components/sections/timeline";
import { JsonLd } from "@/components/seo/json-ld";
import { buildHomeGraph, type AppLocale } from "@/lib/seo";
import { SELLING_ENABLED } from "@/lib/site-mode";
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
          uzmanlık ve odak alanları, vaka, sorular, tek eylem. Kişisel bölümler /about sayfasında. Aynı gün: tek odak —
          teknik servis ve help desk asistanı; diğer birimler, IoT ve yan alanlar sitede yok. */}
      <Hero />
      {SELLING_ENABLED ? (
        <>
          <AiPath />
          <Metrics />
          <Expertise />
          <CaseStudies showAllLink />
          <Faq />
        </>
      ) : (
        // 12 Kasım 2026, Huntay: "sadece normal bir öz geçmiş olsun" — uzmanlık, projeler, deneyim, yazılar, iletişim.
        <>
          <Expertise />
          <CaseStudies />
          <Timeline />
          <Featured />
        </>
      )}
      <ContactFooter />
    </>
  );
}
