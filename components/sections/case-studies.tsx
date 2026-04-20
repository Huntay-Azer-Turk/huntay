import { caseStudies } from "@/data/caseStudies";
import { getLocale, getTranslations } from "next-intl/server";

export async function CaseStudies() {
  const locale = (await getLocale()) as "en" | "tr";
  const t = await getTranslations("Cases");

  return (
    <section id="cases" className="border-b border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground">
          {t("title")}
        </h2>
        <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {caseStudies.map((c) => (
            <article
              key={c.id}
              className="flex flex-col rounded-2xl border border-border bg-card p-6"
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
      </div>
    </section>
  );
}
