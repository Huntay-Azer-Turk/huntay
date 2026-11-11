import { caseStudies } from "@/data/caseStudies";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

/**
 * Vaka çalışmaları. 11 Kasım 2026: ana sayfada yalnız üreticiye dönük üç vaka (yapay zekâ destek sistemi başta),
 * tamamı /about sayfasında. Kimlikler (#case-<id>) MCP ve /llms.txt bağlantılarında kullanılıyor; değiştirme.
 */
export const HOME_CASE_IDS = ["ai-ops", "iot-cloud", "enmos-meta"] as const;

type Props = { ids?: readonly string[]; showAllLink?: boolean };

export async function CaseStudies({ ids, showAllLink = false }: Props = {}) {
  const locale = (await getLocale()) as "en" | "tr";
  const t = await getTranslations("Cases");
  const items = ids ? ids.map((id) => caseStudies.find((c) => c.id === id)).filter((c) => c !== undefined) : caseStudies;

  return (
    <section id="cases" className="border-b border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground">
          {t("title")}
        </h2>
        <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {items.map((c) => (
            <article
              key={c.id}
              id={`case-${c.id}`}
              className="flex scroll-mt-24 flex-col rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="text-lg font-semibold text-foreground">
                {c.title[locale]}
              </h3>
              <p className="mt-1 font-mono text-xs text-accent">{c.tags[locale]}</p>
              <dl className="mt-6 space-y-4 text-sm">
                <div>
                  <dt className="font-medium text-foreground">{t("action")}</dt>
                  <dd className="mt-1 text-muted-foreground">{c.action[locale]}</dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">{t("result")}</dt>
                  <dd className="mt-1 text-muted-foreground">{c.result[locale]}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
        {showAllLink ? (
          <Link href="/about#cases" className="mt-8 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
            {t("allProjects")}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        ) : null}
      </div>
    </section>
  );
}
