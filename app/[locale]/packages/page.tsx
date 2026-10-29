import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/services/breadcrumbs";
import { CtaBlock } from "@/components/services/cta-block";
import { getService } from "@/data/services";
import { Link } from "@/i18n/navigation";
import { formatPrice, getPackages } from "@/lib/packages";
import { buildMetadata, buildPackagesGraph, type AppLocale } from "@/lib/seo";
import { buttonPrimary, buttonSecondary, containerClass, sectionClass } from "@/lib/ui";
import { Check, Clock, Gift } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { connection } from "next/server";

/**
 * Paketler ve fiyatlar. İçerik Cloudflare D1'den her istekte okunur (lib/packages.ts);
 * /admin panelinden yapılan değişiklik derleme gerekmeden hemen görünür.
 */
type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PackagesPage" });
  return buildMetadata({
    locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/packages",
  });
}

export default async function PackagesPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);
  await connection();
  const locale = rawLocale as AppLocale;
  const t = await getTranslations({ locale, namespace: "PackagesPage" });
  const tb = await getTranslations({ locale, namespace: "Breadcrumbs" });
  const packages = await getPackages(locale);

  return (
    <>
      <JsonLd
        data={buildPackagesGraph(
          locale,
          { title: t("metaTitle"), description: t("metaDescription") },
          { home: tb("home"), packages: tb("packages") },
          packages,
        )}
      />

      <section className="relative border-b border-border">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="bg-grid absolute inset-0 opacity-40" />
          <div className="absolute -left-40 top-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        </div>
        <div className={`relative ${containerClass} py-16 sm:py-24`}>
          <Breadcrumbs label={tb("label")} items={[{ name: tb("home"), href: "/" }, { name: tb("packages") }]} />
          <p className="mt-10 font-mono text-xs uppercase tracking-widest text-accent">{t("eyebrow")}</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">{t("title")}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">{t("intro")}</p>
        </div>
      </section>

      <section className={sectionClass}>
        <div className={containerClass}>
          {packages.length === 0 ? (
            <p className="text-muted-foreground">{t("empty")}</p>
          ) : (
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {packages.map((pkg) => {
                const service = pkg.serviceSlug ? getService(pkg.serviceSlug) : undefined;
                return (
                  <li
                    key={pkg.id}
                    id={pkg.id}
                    className={`relative flex scroll-mt-24 flex-col rounded-2xl border bg-card p-6 ${
                      pkg.featured ? "border-accent shadow-lg shadow-accent/10" : "border-border"
                    }`}
                  >
                    {pkg.featured ? (
                      <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-xs font-medium text-[var(--color-on-accent)]">
                        {t("featured")}
                      </span>
                    ) : null}
                    <h2 className="text-lg font-semibold text-foreground">{pkg.name}</h2>
                    {pkg.duration ? (
                      <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" aria-hidden />
                        {pkg.duration}
                      </p>
                    ) : null}
                    {pkg.priceFrom ? (
                      <p className="mt-5 text-xs uppercase tracking-wide text-muted-foreground">{t("from")}</p>
                    ) : null}
                    <p className={`${pkg.priceFrom ? "mt-1" : "mt-5"} text-foreground`}>
                      <span className="text-3xl font-semibold tracking-tight">{formatPrice(pkg, locale)}</span>
                      {pkg.unit ? <span className="text-sm text-muted-foreground">{pkg.unit}</span> : null}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{pkg.summary}</p>
                    {pkg.includes.length ? (
                      <ul className="mt-5 space-y-2">
                        {pkg.includes.map((item) => (
                          <li key={item} className="flex gap-2.5 text-sm text-foreground">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {pkg.perk ? (
                      <p className="mt-5 flex gap-2.5 rounded-xl border border-accent/30 bg-accent/5 px-3 py-2.5 text-sm text-foreground">
                        <Gift className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                        <span>{pkg.perk}</span>
                      </p>
                    ) : null}
                    <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
                      <Link
                        href={{ pathname: "/book", query: { package: pkg.name } }}
                        className={pkg.featured ? buttonPrimary : buttonSecondary}
                      >
                        {t("choose")}
                      </Link>
                      {service ? (
                        <Link href={`/services/${service.slug}`} className="text-sm text-accent hover:underline">
                          {t("aboutService")}
                        </Link>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="mt-10 grid gap-4 text-sm text-muted-foreground md:grid-cols-3">
            <p className="rounded-2xl border border-border p-5">{t("noteReference")}</p>
            <p className="rounded-2xl border border-border p-5">{t("noteCustom")}</p>
            <p className="rounded-2xl border border-border p-5">{t("noteTerms")}</p>
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
