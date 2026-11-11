import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/services/breadcrumbs";
import { CtaBlock } from "@/components/services/cta-block";
import { LEAD_UNIT_ID, aiUnits } from "@/data/ai-units";
import { processSteps, servicesFaq } from "@/data/services";
import { Link } from "@/i18n/navigation";
import { buildMetadata, buildServicesHubGraph, type AppLocale } from "@/lib/seo";
import { buttonPrimary, buttonSecondary, containerClass, h2Class, sectionClass } from "@/lib/ui";
import { ArrowRight, CalendarClock, Headset } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServicesPage" });
  return buildMetadata({
    locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/services",
  });
}

export default async function ServicesPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);
  const locale = rawLocale as AppLocale;
  const t = await getTranslations({ locale, namespace: "ServicesPage" });
  const tb = await getTranslations({ locale, namespace: "Breadcrumbs" });
  const ts = await getTranslations({ locale, namespace: "ServicesSection" });
  const leadUnit = aiUnits.find((unit) => unit.id === LEAD_UNIT_ID)!;
  const otherUnits = aiUnits.filter((unit) => unit.id !== LEAD_UNIT_ID);

  return (
    <>
      <JsonLd
        data={buildServicesHubGraph(
          locale,
          { title: t("metaTitle"), description: t("metaDescription") },
          { home: tb("home"), services: tb("services") },
        )}
      />

      <section className="relative border-b border-border">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="bg-grid absolute inset-0 opacity-40" />
          <div className="absolute -left-40 top-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        </div>
        <div className={`relative ${containerClass} py-16 sm:py-24`}>
          <Breadcrumbs label={tb("label")} items={[{ name: tb("home"), href: "/" }, { name: tb("services") }]} />
          <p className="mt-10 font-mono text-xs uppercase tracking-widest text-accent">
            {t("eyebrow")}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {t("intro")}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/book" className={buttonPrimary}>
              <CalendarClock className="h-4 w-4" aria-hidden />
              {ts("book")}
            </Link>
            <Link href="/packages" className={buttonSecondary}>
              {ts("packages")}
            </Link>
          </div>
        </div>
      </section>

      {/* 11 Kasım 2026: yalnız yapay zekâ dönüşümü. Öne çıkan teklif teknik servis ve help desk asistanı; diğer
          birimler altta: hazır paket ve fiyat yok, kapsam ön görüşmede (randevu notuna birim adı yazılır).
          Bulut/güvenlik/CTO sayfaları gizli (data/catalog.ts). */}
      <section className={sectionClass}>
        <div className={containerClass}>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">{t("leadEyebrow")}</p>
          <div className="mt-6 grid gap-8 rounded-2xl border border-accent bg-card p-6 shadow-lg shadow-accent/10 sm:p-8 lg:grid-cols-[3fr_2fr]">
            <div>
              <h2 className="flex items-center gap-3 text-2xl font-semibold tracking-tight text-foreground">
                <Headset className="h-6 w-6 shrink-0 text-accent" aria-hidden />
                {leadUnit.title[locale]}
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{leadUnit.body[locale]}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/book" className={buttonPrimary}>
                  <CalendarClock className="h-4 w-4" aria-hidden />
                  {ts("book")}
                </Link>
                <Link href="/packages" className={buttonSecondary}>
                  {t("leadPackages")}
                </Link>
              </div>
            </div>
            <ol className="space-y-4">
              {(["leadStep1", "leadStep2", "leadStep3"] as const).map((key, index) => (
                <li key={key} className="flex gap-3">
                  <span className="mt-0.5 font-mono text-xs text-accent">0{index + 1}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{t(key)}</span>
                </li>
              ))}
            </ol>
          </div>

          <h2 id="units" className={`mt-16 scroll-mt-24 ${h2Class}`}>{t("unitsTitle")}</h2>
          <p className="mt-2 max-w-3xl text-muted-foreground">{t("unitsSubtitle")}</p>
          <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {otherUnits.map((unit) => (
              <li key={unit.id} className="flex flex-col rounded-2xl border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground">{unit.title[locale]}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{unit.body[locale]}</p>
                <Link
                  href={{ pathname: "/book", query: { package: unit.title[locale] } }}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                >
                  {t("unitBook")}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-muted-foreground">
            <Link href="/services/ai-agents" className="text-accent hover:underline">
              {t("aiDetails")}
            </Link>
          </p>
        </div>
      </section>

      <section className={sectionClass}>
        <div className={containerClass}>
          <h2 className={h2Class}>{t("processTitle")}</h2>
          <p className="mt-2 text-muted-foreground">{t("processSubtitle")}</p>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step, index) => (
              <li key={step.id} className="rounded-2xl border border-border bg-card p-6">
                <span className="font-mono text-xs text-accent">0{index + 1}</span>
                <h3 className="mt-2 font-semibold text-foreground">{step.title[locale]}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.body[locale]}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={sectionClass}>
        <div className={containerClass}>
          <h2 className={h2Class}>{t("faqTitle")}</h2>
          <div className="mt-10">
            <FaqList items={servicesFaq} locale={locale} />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className={containerClass}>
          <CtaBlock />
        </div>
      </section>
    </>
  );
}
