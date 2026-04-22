import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { siteConfig } from "./lib/site";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  output: "standalone",
  /** Geliştirmede sol alttaki “N” rozetinin metinlerle çakışmasını önler */
  devIndicators: false,
  /** Yerel PDF yolu (`siteConfig.cvPath`) için indirme adını sabitler; harici URL kullanımda bu başlık uygulanmaz. */
  async headers() {
    if (!siteConfig.cvPath.startsWith("/")) {
      return [];
    }
    return [
      {
        source: siteConfig.cvPath,
        headers: [
          {
            key: "Content-Disposition",
            value: `attachment; filename="${siteConfig.cvDownloadFileName}"`,
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
