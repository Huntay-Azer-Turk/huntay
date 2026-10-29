import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/services/breadcrumbs";
import { CtaBlock } from "@/components/services/cta-block";
import { ServiceCard } from "@/components/services/service-card";
import { engagementModels, processSteps, services, servicesFaq } from "@/data/services";
import { Link } from "@/i18n/navigation";
import { buildMetadata, buildServicesHubGraph, type AppLocale } from "@/lib/seo";
import { buttonPrimary, buttonSecondary, containerClass, h2Class, sectionClass } from "@/lib/ui";
import { CalendarClock } from "lucide-react";
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

      <section className={sectionClass}>
        <div className={`${containerClass} grid gap-6 sm:grid-cols-2 lg:grid-cols-4`}>
          {services.map((service) => (
            <ServiceCard
              key={service.slug}
              service={service}
              locale={locale}
              detailsLabel={ts("details")}
              headingLevel="h2"
            />
          ))}
        </div>
      </section>

      <section className={sectionClass}>
        <div className={containerClass}>
          <h2 className={h2Class}>{t("waysTitle")}</h2>
          <p className="mt-2 text-muted-foreground">{t("waysSubtitle")}</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {engagementModels.map((model) => (
              <div key={model.id} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-mono text-sm font-medium text-accent">{model.title[locale]}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {model.body[locale]}
                </p>
              </div>
            ))}
          </div>
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
