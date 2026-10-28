import { services } from "@/data/services";
import { hreflangAlternates, localeUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import type { MetadataRoute } from "next";

/** Her sayfa iki dilde; hreflang alternatifleri sitemap’te de bildirilir. */
const pages: { path: string; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
  { path: "", priority: 1, changeFrequency: "monthly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  ...services.map((service) => ({
    path: `/services/${service.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  })),
  { path: "/book", priority: 0.7, changeFrequency: "yearly" },
  { path: "/assistant", priority: 0.6, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Sabit tarih: her build’de değişen `lastmod`, arama motorlarının bu sinyali yok saymasına yol açar.
  const lastModified = new Date(siteConfig.contentUpdatedAt);

  return pages.flatMap(({ path, priority, changeFrequency }) =>
    (["en", "tr"] as const).map((locale) => ({
      url: localeUrl(locale, path),
      lastModified,
      changeFrequency,
      priority: locale === "en" ? priority : Math.round(priority * 90) / 100,
      alternates: { languages: hreflangAlternates(path) },
    })),
  );
}
