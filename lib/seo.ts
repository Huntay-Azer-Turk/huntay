import type { Metadata } from "next";
import { siteConfig } from "./site";

type SeoInput = {
  locale: string;
  title: string;
  description: string;
  path?: string;
};

export function buildMetadata({
  locale,
  title,
  description,
  path = "",
}: SeoInput): Metadata {
  const url = `${siteConfig.baseUrl}${path || (locale === "en" ? "" : `/${locale}`)}`;
  const canonical =
    locale === "en"
      ? `${siteConfig.baseUrl}/`
      : `${siteConfig.baseUrl}/tr`;

  return {
    title,
    description,
    metadataBase: new URL(siteConfig.baseUrl),
    alternates: {
      canonical,
      languages: {
        en: `${siteConfig.baseUrl}/`,
        tr: `${siteConfig.baseUrl}/tr`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: locale === "tr" ? "tr_TR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function personJsonLd(locale: string) {
  const description =
    locale === "tr"
      ? "Yazılım ve dijital çözümler müdürü ve principal sistem mimarı. IoT, bulut, yapay zeka ve güvenlik odaklı teslimat."
      : "Software & Digital Solutions Manager and Principal Systems Architect—IoT, cloud, AI, and security-focused delivery.";

  const jobTitle =
    locale === "tr"
      ? "Yazılım ve Dijital Çözümler Müdürü · Principal Systems Mimarı"
      : "Software & Digital Solutions Manager · Principal Systems Architect";

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.baseUrl,
    jobTitle,
    ...(siteConfig.phoneDisplay
      ? { telephone: siteConfig.phoneTel }
      : {}),
    sameAs: [siteConfig.linkedin, siteConfig.medium],
    description,
  };
}
