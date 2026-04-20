import { siteConfig } from "@/lib/site";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.baseUrl;
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/tr`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  ];
}
