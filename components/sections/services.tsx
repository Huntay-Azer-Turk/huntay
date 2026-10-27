import { ServiceCard } from "@/components/services/service-card";
import { services } from "@/data/services";
import { Link } from "@/i18n/navigation";
import { buttonPrimary, buttonSecondary } from "@/lib/ui";
import { ArrowRight, CalendarClock } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

/** Ana sayfa “Hizmetler” bölümü — her kart ilgili hizmet sayfasına bağlanır (iç linkleme). */
export async function ServicesSection() {
  const locale = (await getLocale()) as "en" | "tr";
  const t = await getTranslations("ServicesSection");

  return (
    <section id="services" className="scroll-mt-16 border-b border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground">{t("title")}</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">{t("subtitle")}</p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard
              key={service.slug}
              service={service}
              locale={locale}
              detailsLabel={t("details")}
            />
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link href="/book" className={buttonPrimary}>
            <CalendarClock className="h-4 w-4" aria-hidden />
            {t("book")}
          </Link>
          <Link href="/services" className={buttonSecondary}>
            {t("viewAll")}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
