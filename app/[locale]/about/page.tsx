import { About } from "@/components/sections/about";
import { CaseStudies } from "@/components/sections/case-studies";
import { ContactFooter } from "@/components/sections/contact-footer";
import { Featured } from "@/components/sections/featured";
import { TechStack } from "@/components/sections/tech-stack";
import { Timeline } from "@/components/sections/timeline";
import { Breadcrumbs } from "@/components/services/breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import { SELLING_ENABLED } from "@/lib/site-mode";
import { containerClass } from "@/lib/ui";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

/**
 * Hakkımda (11 Kasım 2026). LinkedIn'de "Hakkında" müşteriye konuşur, deneyim ayrı bölümdedir; sitede de ana sayfa
 * müşterinin hikâyesini anlatır, kişisel bölümler (yaklaşım, tüm projeler, teknoloji yığını, deneyim, yazılar) burada.
 * Bölüm kimlikleri (#about, #cases, #case-<id>, #timeline, #featured) MCP, /llms.txt ve menü bağlantılarında kullanılıyor.
 * Aynı gün (tek odak): teknoloji yığını bölümü kalktı; vakalar, deneyim ve yazılar yalnız odakla ilgili olanlar.
 */
type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPage" });
  return buildMetadata({
    locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/about",
    ogType: "profile",
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "AboutPage" });
  const tb = await getTranslations({ locale, namespace: "Breadcrumbs" });

  return (
    <>
      <section className="border-b border-border">
        <div className={`${containerClass} py-16 sm:py-20`}>
          <Breadcrumbs label={tb("label")} items={[{ name: tb("home"), href: "/" }, { name: t("title") }]} />
          <h1 className="mt-10 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">{t("title")}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">{t("intro")}</p>
        </div>
      </section>
      <About />
      <CaseStudies />
      {/* 12 Kasım 2026: öz geçmiş kipinde teknoloji yığını yine görünür (lib/site-mode.ts). */}
      {SELLING_ENABLED ? null : <TechStack />}
      <Timeline />
      <Featured />
      <ContactFooter />
    </>
  );
}
