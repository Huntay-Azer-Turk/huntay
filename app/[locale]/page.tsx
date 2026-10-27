import { About } from "@/components/sections/about";
import { CaseStudies } from "@/components/sections/case-studies";
import { ContactFooter } from "@/components/sections/contact-footer";
import { Faq } from "@/components/sections/faq";
import { Featured } from "@/components/sections/featured";
import { Hero } from "@/components/sections/hero";
import { Metrics } from "@/components/sections/metrics";
import { ServicesSection } from "@/components/sections/services";
import { TechStack } from "@/components/sections/tech-stack";
import { Timeline } from "@/components/sections/timeline";
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
      <Hero />
      <About />
      <ServicesSection />
      <Metrics />
      <CaseStudies />
      <TechStack />
      <Timeline />
      <Featured />
      <Faq />
      <ContactFooter />
    </>
  );
}
