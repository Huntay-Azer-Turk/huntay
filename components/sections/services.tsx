import { ServiceCard } from "@/components/services/service-card";
import { ServiceIcon } from "@/components/services/service-icon";
import { engagementModelServices, pillars } from "@/data/catalog";
import { Link } from "@/i18n/navigation";
import { buttonPrimary, buttonSecondary } from "@/lib/ui";
import { ArrowRight, CalendarClock } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

/**
 * Ana sayfa “Hizmetler” bölümü — üç uzmanlık alanı kartı ve altında çalışma modeli (Fractional CTO).
 * Kartlar ilgili alan sayfasına bağlanır (iç linkleme); alanların alt hizmetleri alan sayfasında listelenir.
 */
export async function ServicesSection() {
  const locale = (await getLocale()) as "en" | "tr";
  const t = await getTranslations("ServicesSection");
  const ta = await getTranslations("Assessment");

  return (
    <section id="services" className="scroll-mt-16 border-b border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground">{t("title")}</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">{t("subtitle")}</p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pillars.map((service) => (
            <ServiceCard
              key={service.slug}
              service={service}
              locale={locale}
              detailsLabel={t("details")}
              highlights={(service.offerings ?? []).slice(0, 4).map((item) => item.title[locale])}
            />
          ))}
        </div>
        {engagementModelServices.map((model) => (
          <Link
            key={model.slug}
            href={`/services/${model.slug}`}
            className="group mt-6 flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 transition hover:border-accent sm:flex-row sm:items-center"
          >
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-accent">
              <ServiceIcon icon={model.icon} className="h-5 w-5" />
            </span>
            <span className="flex-1">
              <span className="block font-mono text-xs uppercase tracking-widest text-accent">
                {t("modelLabel")}
              </span>
              <span className="mt-1 block font-semibold text-foreground group-hover:text-accent">
                {model.title[locale]}
              </span>
              <span className="mt-1 block text-sm text-muted-foreground">{model.tagline[locale]}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
              {t("details")}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
            </span>
          </Link>
        ))}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link href="/book" className={buttonPrimary}>
            <CalendarClock className="h-4 w-4" aria-hidden />
            {t("book")}
          </Link>
          <Link href="/services" className={buttonSecondary}>
            {t("viewAll")}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link href="/packages" className={buttonSecondary}>
            {t("packages")}
          </Link>
          <Link href="/assessment" className={buttonSecondary}>
            {ta("sectionLink")}
          </Link>
        </div>
      </div>
    </section>
  );
}
