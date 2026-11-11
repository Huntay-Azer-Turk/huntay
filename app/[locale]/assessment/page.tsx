import { Breadcrumbs } from "@/components/services/breadcrumbs";
import { ServiceIcon } from "@/components/services/service-icon";
import { assessments } from "@/data/assessments";
import { isHiddenService } from "@/data/catalog";
import { getService } from "@/data/services";
import { Link } from "@/i18n/navigation";
import { buildMetadata, type AppLocale } from "@/lib/seo";
import { containerClass } from "@/lib/ui";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Assessment" });
  return buildMetadata({ locale, title: t("hubMetaTitle"), description: t("hubMetaDescription"), path: "/assessment" });
}

export default async function AssessmentHubPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);
  const locale = rawLocale as AppLocale;
  const t = await getTranslations({ locale, namespace: "Assessment" });
  const tb = await getTranslations({ locale, namespace: "Breadcrumbs" });

  return (
    <section className="relative border-b border-border">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bg-grid absolute inset-0 opacity-40" />
      </div>
      <div className={`relative ${containerClass} py-16 sm:py-24`}>
        <Breadcrumbs label={tb("label")} items={[{ name: tb("home"), href: "/" }, { name: t("hubTitle") }]} />
        <p className="mt-10 font-mono text-xs uppercase tracking-widest text-accent">{t("eyebrow")}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">{t("hubTitle")}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">{t("hubIntro")}</p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {assessments.filter((item) => !isHiddenService(item.serviceSlug)).map((item) => {
            const service = getService(item.serviceSlug);
            return (
              <Link
                key={item.slug}
                href={`/assessment/${item.slug}`}
                className="glow-ring group flex flex-col rounded-2xl border border-border bg-card p-6 transition hover:border-accent"
              >
                {service ? (
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-accent">
                    <ServiceIcon icon={service.icon} className="h-5 w-5" />
                  </span>
                ) : null}
                <h2 className="mt-4 text-lg font-semibold text-foreground group-hover:text-accent">{item.title[locale]}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{item.intro[locale]}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  {t("start")}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </Link>
            );
          })}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">{t("privacy")}</p>
      </div>
    </section>
  );
}
