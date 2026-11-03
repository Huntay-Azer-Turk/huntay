import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { retiredServiceSlugs } from "./data/catalog";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  output: "standalone",
  /** Geliştirmede sol alttaki “N” rozetinin metinlerle çakışmasını önler */
  devIndicators: false,
  /**
   * Kalıcı (308) yönlendirmeler — eski linkler (Google, LinkedIn, Fiverr, kartvizit) kırılmasın.
   * Hizmet eşlemesi data/catalog.ts'den gelir; Google'ın önerisiyle en az 1 yıl (Kasım 2027'ye kadar) kalmalı.
   * Next.js yönlendirmeleri middleware'den önce çalışır; bu yüzden dil önekli ve öneksiz yollar ayrı yazılır.
   */
  async redirects() {
    const serviceRedirects = Object.entries(retiredServiceSlugs).flatMap(([from, to]) => [
      { source: `/services/${from}`, destination: `/services/${to}`, permanent: true },
      { source: `/en/services/${from}`, destination: `/services/${to}`, permanent: true },
      { source: `/tr/services/${from}`, destination: `/tr/services/${to}`, permanent: true },
    ]);
    return [
      ...serviceRedirects,
      // CV kaldırıldı (Kasım 2026): eski PDF linki ana sayfaya gider.
      { source: "/cv/cv.pdf", destination: "/", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
