import type { MetricItem } from "@/data/types";

/** Sunucu + istemci aynı metni üretir; yerel ayara göre binlik ayırıcı (TR: 10.000, EN: 10,000). */
export function formatMetricDisplay(m: MetricItem, locale: "en" | "tr"): string {
  const { value, prefix = "", suffix = "" } = m;
  const numLocale = locale === "tr" ? "tr-TR" : "en-US";
  if (m.id === "devices") {
    return `${value.toLocaleString(numLocale)}${suffix}`;
  }
  return `${prefix}${value}${suffix}`;
}
