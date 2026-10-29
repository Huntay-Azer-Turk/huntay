import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/services/breadcrumbs";
import { CtaBlock } from "@/components/services/cta-block";
import { ServiceCard } from "@/components/services/service-card";
import { ServiceIcon } from "@/components/services/service-icon";
import { caseStudies } from "@/data/caseStudies";
import { getService, processSteps, services } from "@/data/services";
import { Link } from "@/i18n/navigation";
import { buildMetadata, buildServiceGraph, type AppLocale } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { buttonPrimary, buttonSecondary, containerClass, h2Class, sectionClass } from "@/lib/ui";
import { ArrowRight, CalendarClock, Check, MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { ServicePackages } from "@/components/services/service-packages";
import { getPackages } from "@/lib/packages";

type Props = { params: Promise<{ locale: string; slug: string }> };

/**
 * Not: `dynamicParams = false` KULLANMAYIN — Cloudflare Workers (OpenNext) varsayılan ayarlarında
 * önceden üretilmiş sayfalar önbellekte olmadığı için tüm hizmet sayfaları 404 döner.
 * Bilinmeyen slug’lar aşağıda `notFound()` ile zaten 404 veriyor.
 */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const lang = locale as AppLocale;
  const t = await getTranslations({ locale, namespace: "ServicePage" });
  return buildMetadata({
    locale,
    title: `${(service.metaTitle ?? service.title)[lang]} | ${t("titleSuffix")}`,
    description: service.metaDescription[lang],
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale: rawLocale, slug } = await params;
  setRequestLocale(rawLocale);
  const service = getService(slug);
  if (!service) notFound();

  const locale = rawLocale as AppLocale;
  // Paketler veritabanından (her istekte) okunur; /admin'deki değişiklik hemen görünür.
  await connection();
  const allPackages = await getPackages(locale);
  const ownPackages = allPackages.filter((pkg) => pkg.serviceSlug === service.slug);
  // Hizmete bağlı paket yoksa en uygun fiyatlı giriş paketi (ör. Teknik Check-up) gösterilir.
  const entry = [...allPackages].filter((pkg) => !pkg.priceFrom).sort((a, b) => a.price - b.price)[0];
  const servicePackages = ownPackages.length ? ownPackages : entry ? [entry] : [];
  const t = await getTranslations({ locale, namespace: "ServicePage" });
  const tb = await getTranslations({ locale, namespace: "Breadcrumbs" });
  const tc = await getTranslations({ locale, namespace: "Cta" });
  const ts = await getTranslations({ locale, namespace: "ServicesSection" });
  const tp = await getTranslations({ locale, namespace: "ServicesPage" });

  const related = caseStudies.filter((item) => service.relatedCases.includes(item.id));
  const others = services.filter((item) => item.slug !== service.slug);
  const title = `${(service.metaTitle ?? service.title)[locale]} | ${t("titleSuffix")}`;

  return (
    <>
      <JsonLd
        data={buildServiceGraph(
          locale,
          service,
          { title, description: service.metaDescription[locale] },
          { home: tb("home"), services: tb("services") },
        )}
      />

      <section className="relative border-b border-border">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="bg-grid absolute inset-0 opacity-40" />
          <div className="absolute -left-40 top-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        </div>
        <div className={`relative ${containerClass} py-16 sm:py-24`}>
          <Breadcrumbs
            label={tb("label")}
            items={[
              { name: tb("home"), href: "/" },
              { name: tb("services"), href: "/services" },
              { name: service.title[locale] },
            ]}
          />
          <span className="mt-10 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card text-accent">
            <ServiceIcon icon={service.icon} className="h-6 w-6" />
          </span>
          <h1 className="mt-5 max-w-4xl text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {service.title[locale]}
          </h1>
          <p className="mt-4 max-w-3xl text-xl font-medium leading-snug text-muted-foreground sm:text-2xl">
            {service.tagline[locale]}
          </p>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {service.summary[locale]}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/book" className={buttonPrimary}>
              <CalendarClock className="h-4 w-4" aria-hidden />
              {tc("book")}
            </Link>
            {siteConfig.whatsappUrl ? (
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonSecondary}
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                {tc("whatsapp")}
              </a>
            ) : null}
            <Link href="/packages" className={buttonSecondary}>
              {ts("packages")}
            </Link>
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className={`${containerClass} grid gap-10 md:grid-cols-2`}>
          <div>
            <h2 className={h2Class}>{t("forWhom")}</h2>
            <ul className="mt-6 space-y-3">
              {service.forWhom.map((item) => (
                <li key={item.en} className="flex gap-3 text-muted-foreground">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden />
                  <span>{item[locale]}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className={h2Class}>{t("deliverables")}</h2>
            <ul className="mt-6 space-y-3">
              {service.deliverables.map((item) => (
                <li key={item.en} className="flex gap-3 text-muted-foreground">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden />
                  <span>{item[locale]}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className={containerClass}>
          <h2 className={h2Class}>{t("useCases")}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {service.useCases.map((item) => (
              <div
                key={item.en}
                className="rounded-2xl border border-border bg-card p-5 text-sm leading-relaxed text-muted-foreground sm:text-base"
              >
                {item[locale]}
              </div>
            ))}
          </div>
          <h2 className={`mt-14 ${h2Class}`}>{t("tech")}</h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {service.tech.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-border bg-card px-3 py-1 font-mono text-xs text-muted-foreground"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ServicePackages packages={servicePackages} locale={locale} />

      {related.length > 0 ? (
        <section className={sectionClass}>
          <div className={containerClass}>
            <h2 className={h2Class}>{t("proof")}</h2>
            <p className="mt-2 text-muted-foreground">{t("proofSubtitle")}</p>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/#case-${item.id}`}
                  className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition hover:border-accent"
                >
                  <h3 className="font-semibold text-foreground group-hover:text-accent">
                    {item.title[locale]}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-accent">{item.tags[locale]}</p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {item.result[locale]}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                    {t("caseLink")}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className={sectionClass}>
        <div className={containerClass}>
          <h2 className={h2Class}>{tp("processTitle")}</h2>
          <p className="mt-2 text-muted-foreground">{tp("processSubtitle")}</p>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step, index) => (
              <li key={step.id} className="rounded-2xl border border-border bg-card p-5">
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
          <h2 className={h2Class}>{t("faq")}</h2>
          <div className="mt-8">
            <FaqList items={service.faq} locale={locale} />
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className={containerClass}>
          <CtaBlock showServicesLink />
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className={containerClass}>
          <h2 className={h2Class}>{t("other")}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((item) => (
              <ServiceCard key={item.slug} service={item} locale={locale} detailsLabel={ts("details")} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
