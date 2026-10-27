import { localeUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // Sabit tarih: her build’de değişen `lastmod`, arama motorlarının bu sinyali yok saymasına yol açar.
  const lastModified = new Date(siteConfig.contentUpdatedAt);
  const languages = {
    en: localeUrl("en"),
    tr: localeUrl("tr"),
    "x-default": localeUrl("en"),
  };

  return [
    {
      url: localeUrl("en"),
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages },
    },
    {
      url: localeUrl("tr"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages },
    },
  ];
}
