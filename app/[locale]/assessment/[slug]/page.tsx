import { AssessmentRunner, type PackageInfo } from "@/components/assessment/assessment-runner";
import { Breadcrumbs } from "@/components/services/breadcrumbs";
import { assessments, getAssessment, type AssessmentSlug } from "@/data/assessments";
import { isHiddenService } from "@/data/catalog";
import { getService } from "@/data/services";
import { Link } from "@/i18n/navigation";
import { formatPrice, getPackages } from "@/lib/packages";
import { buildMetadata, type AppLocale } from "@/lib/seo";
import { containerClass } from "@/lib/ui";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { connection } from "next/server";

type Props = { params: Promise<{ locale: string; slug: string }> };

/** `dynamicParams = false` kullanmayın (Cloudflare'de önbellekte olmayan sayfalar 404 döner); bilinmeyen slug → notFound(). */
export function generateStaticParams() {
  return assessments.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const assessment = getAssessment(slug);
  if (!assessment) return {};
  const lang = locale as AppLocale;
  const t = await getTranslations({ locale, namespace: "Assessment" });
  const metadata = buildMetadata({
    locale,
    title: `${assessment.title[lang]} (${t("free")}) | Huntay AzerTürk`,
    description: assessment.metaDescription[lang],
    path: `/assessment/${assessment.slug}`,
  });
  // 11 Kasım 2026: gizli hizmetlerin testleri (güvenlik, bulut) açılır ama Google'a kapalı.
  return isHiddenService(assessment.serviceSlug) ? { ...metadata, robots: { index: false, follow: true } } : metadata;
}

export default async function AssessmentPage({ params }: Props) {
  const { locale: rawLocale, slug } = await params;
  setRequestLocale(rawLocale);
  const assessment = getAssessment(slug);
  if (!assessment) notFound();
  const locale = rawLocale as AppLocale;
  const t = await getTranslations({ locale, namespace: "Assessment" });
  const tb = await getTranslations({ locale, namespace: "Breadcrumbs" });

  // Önerilerde paket adı ve fiyatı gösterilir (paketler veritabanından).
  await connection();
  const packages: Record<string, PackageInfo> = Object.fromEntries(
    (await getPackages(locale)).map((pkg) => [pkg.id, { name: pkg.name, price: formatPrice(pkg, locale) }]),
  );
  const service = getService(assessment.serviceSlug);

  return (
    <section className="relative border-b border-border">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bg-grid absolute inset-0 opacity-40" />
        <div className="absolute -left-40 top-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      </div>
      <div className={`relative ${containerClass} max-w-4xl py-16 sm:py-20`}>
        <Breadcrumbs
          label={tb("label")}
          items={[
            { name: tb("home"), href: "/" },
            { name: t("hubTitle"), href: "/assessment" },
            { name: assessment.title[locale] },
          ]}
        />
        <p className="mt-10 font-mono text-xs uppercase tracking-widest text-accent print:hidden">{t("eyebrow")}</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {assessment.title[locale]}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground print:hidden">{assessment.intro[locale]}</p>
        <p className="mt-2 text-sm text-muted-foreground print:hidden">{t("privacy")}</p>
        <div className="mt-10">
          <AssessmentRunner slug={assessment.slug as AssessmentSlug} locale={locale} packages={packages} />
        </div>
        {service ? (
          <p className="mt-10 text-sm text-muted-foreground print:hidden">
            {t("relatedService")}{" "}
            <Link href={`/services/${service.slug}`} className="text-accent hover:underline">
              {service.title[locale]}
            </Link>
          </p>
        ) : null}
      </div>
    </section>
  );
}
