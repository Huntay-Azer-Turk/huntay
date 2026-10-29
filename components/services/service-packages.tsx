import { Link } from "@/i18n/navigation";
import { formatPrice, type PackageView } from "@/lib/packages";
import { buttonPrimary, buttonSecondary, containerClass, h2Class, sectionClass } from "@/lib/ui";
import { Check, Clock } from "lucide-react";
import { getTranslations } from "next-intl/server";

/** Hizmet sayfasında o hizmete bağlı paketler (veritabanından; /admin'de "İlgili hizmet" alanı). */
export async function ServicePackages({ packages, locale }: { packages: PackageView[]; locale: "en" | "tr" }) {
  if (packages.length === 0) return null;
  const t = await getTranslations({ locale, namespace: "PackagesPage" });

  return (
    <section className={sectionClass} id="packages">
      <div className={containerClass}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className={h2Class}>{t("serviceTitle")}</h2>
            <p className="mt-2 text-muted-foreground">{t("serviceSubtitle")}</p>
          </div>
          <Link href="/packages" className="text-sm font-medium text-accent hover:underline">
            {t("allPackages")} →
          </Link>
        </div>
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {packages.map((pkg) => (
            <li
              key={pkg.id}
              className={`flex flex-col rounded-2xl border bg-card p-6 ${pkg.featured ? "border-accent" : "border-border"}`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="text-lg font-semibold text-foreground">{pkg.name}</h3>
                <p className="text-foreground">
                  {pkg.priceFrom ? <span className="mr-1 text-xs text-muted-foreground">{t("from")}</span> : null}
                  <span className="text-2xl font-semibold">{formatPrice(pkg, locale)}</span>
                  {pkg.unit ? <span className="text-sm text-muted-foreground">{pkg.unit}</span> : null}
                </p>
              </div>
              {pkg.duration ? (
                <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" aria-hidden />
                  {pkg.duration}
                </p>
              ) : null}
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pkg.summary}</p>
              {pkg.includes.length ? (
                <ul className="mt-4 space-y-1.5">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              {pkg.perk ? <p className="mt-4 text-sm text-accent">{pkg.perk}</p> : null}
              <div className="mt-auto pt-6">
                <Link
                  href={{ pathname: "/book", query: { package: pkg.name } }}
                  className={pkg.featured ? buttonPrimary : buttonSecondary}
                >
                  {t("choose")}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
