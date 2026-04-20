import { metrics } from "@/data/metrics";
import { formatMetricDisplay } from "@/lib/format-metric";
import { getLocale, getTranslations } from "next-intl/server";

export async function Metrics() {
  const locale = (await getLocale()) as "en" | "tr";
  const t = await getTranslations("Metrics");

  return (
    <section id="metrics" className="border-b border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground">
          {t("title")}
        </h2>
        <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => (
            <div
              key={m.id}
              className="glow-ring rounded-2xl border border-border bg-card p-6"
            >
              <div
                className="font-mono text-3xl font-semibold text-accent sm:text-4xl"
                aria-label={`${formatMetricDisplay(m, locale)} ${m.label[locale]}`}
              >
                <span className="tabular-nums">{formatMetricDisplay(m, locale)}</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                {m.label[locale]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
