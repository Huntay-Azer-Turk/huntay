import { About } from "@/components/sections/about";
import { CaseStudies } from "@/components/sections/case-studies";
import { ContactFooter } from "@/components/sections/contact-footer";
import { Featured } from "@/components/sections/featured";
import { Hero } from "@/components/sections/hero";
import { Metrics } from "@/components/sections/metrics";
import { TechStack } from "@/components/sections/tech-stack";
import { Timeline } from "@/components/sections/timeline";
import { setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <About />
      <Metrics />
      <CaseStudies />
      <TechStack />
      <Timeline />
      <Featured />
      <ContactFooter />
    </>
  );
}
