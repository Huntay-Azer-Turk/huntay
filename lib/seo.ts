import type { Metadata } from "next";
import { credentials, education } from "@/data/education";
import { experience } from "@/data/experience";
import { faq } from "@/data/faq";
import { services, servicesFaq } from "@/data/services";
import { techStack } from "@/data/techStack";
import type { FaqItem, ServiceItem } from "@/data/types";
import { siteConfig } from "./site";

export type AppLocale = "en" | "tr";

/**
 * Site içi yol: EN kökte (`/`, `/services`), TR `/tr` altında (`/tr`, `/tr/services`)
 * — next-intl `localePrefix: "as-needed"`.
 */
export function localePath(locale: string, path = ""): string {
  const clean = path === "/" ? "" : path;
  if (locale === "en") return clean || "/";
  return `/${locale}${clean}`;
}

/** Canonical (tam) URL. */
export function localeUrl(locale: string, path = ""): string {
  return `${siteConfig.baseUrl}${localePath(locale, path)}`;
}

/** Göreli yol veya tam URL → tam URL (ör. `cvPath` env ile harici bir adres olabilir). */
export function absoluteUrl(pathOrUrl: string): string {
  return /^https?:\/\//.test(pathOrUrl) ? pathOrUrl : `${siteConfig.baseUrl}${pathOrUrl}`;
}

export const profileImagePath = "/cv/me.jpg";

/** hreflang alternatifleri (metadata ve sitemap aynı kaynağı kullanır). */
export function hreflangAlternates(path = "") {
  return {
    en: localeUrl("en", path),
    tr: localeUrl("tr", path),
    "x-default": localeUrl("en", path),
  };
}

type SeoInput = {
  locale: string;
  title: string;
  description: string;
  /** Yerelleştirilmemiş yol, ör. "/services/ai-agents". Ana sayfa için boş. */
  path?: string;
  /** Ana sayfa kişi profili → "profile"; diğer sayfalar → "website". */
  ogType?: "profile" | "website";
};

export function buildMetadata({
  locale,
  title,
  description,
  path = "",
  ogType = "website",
}: SeoInput): Metadata {
  const url = localeUrl(locale, path);
  const ogLocale = locale === "tr" ? "tr_TR" : "en_US";
  const ogAlternateLocale = locale === "tr" ? ["en_US"] : ["tr_TR"];

  const openGraph: Metadata["openGraph"] =
    ogType === "profile"
      ? {
          type: "profile",
          firstName: siteConfig.givenName,
          lastName: siteConfig.familyName,
          username: siteConfig.handle,
          title,
          description,
          url,
          siteName: siteConfig.name,
          locale: ogLocale,
          alternateLocale: ogAlternateLocale,
        }
      : {
          type: "website",
          title,
          description,
          url,
          siteName: siteConfig.name,
          locale: ogLocale,
          alternateLocale: ogAlternateLocale,
        };

  return {
    // `absolute`: kök layout’taki "%s | Huntay AzerTürk" şablonu ismi ikinci kez eklemesin.
    title: { absolute: title },
    description,
    metadataBase: new URL(siteConfig.baseUrl),
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name, url: localeUrl("en") }],
    creator: siteConfig.name,
    alternates: {
      canonical: url,
      languages: hreflangAlternates(path),
    },
    // og:image → ilgili segmentteki opengraph-image.tsx (dosya kuralı, otomatik eklenir)
    openGraph,
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    // Search Console / Bing doğrulaması: kodlar lib/site.ts (veya env) üzerinden verilir.
    ...(siteConfig.googleSiteVerification || siteConfig.bingSiteVerification
      ? {
          verification: {
            ...(siteConfig.googleSiteVerification
              ? { google: siteConfig.googleSiteVerification }
              : {}),
            ...(siteConfig.bingSiteVerification
              ? { other: { "msvalidate.01": siteConfig.bingSiteVerification } }
              : {}),
          },
        }
      : {}),
  };
}

/* ------------------------------------------------------------------ */
/* JSON-LD                                                             */
/* ------------------------------------------------------------------ */

const personId = `${siteConfig.baseUrl}/#person`;
const websiteId = `${siteConfig.baseUrl}/#website`;
const businessId = `${siteConfig.baseUrl}/#business`;

/** Dil bağımsız hizmet kimliği (iki dildeki sayfa aynı hizmeti anlatır). */
export function serviceId(slug: string): string {
  return `${siteConfig.baseUrl}/services/${slug}#service`;
}

/** "C / C++ (Hardware/Legacy)" → "C / C++" */
function cleanSkill(label: string): string {
  return label.replace(/\s*\([^)]*\)/g, "").trim();
}

function faqPageNode(locale: AppLocale, pageUrl: string, items: FaqItem[]) {
  return {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    url: pageUrl,
    inLanguage: locale,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question[locale],
      acceptedAnswer: { "@type": "Answer", text: item.answer[locale] },
    })),
  };
}

type Crumb = { name: string; url: string };

function breadcrumbNode(pageUrl: string, crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

function graph(nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

function offerCatalog(locale: AppLocale) {
  return {
    "@type": "OfferCatalog",
    name: locale === "tr" ? "Hizmetler" : "Services",
    url: localeUrl(locale, "/services"),
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        "@id": serviceId(service.slug),
        name: service.title[locale],
        url: localeUrl(locale, `/services/${service.slug}`),
      },
    })),
  };
}

/** Randevu: /book sayfası (Cal.com). AI asistanları için ayrıca MCP sunucusu: /mcp */
function reserveAction(locale: AppLocale) {
  return {
    "@type": "ReserveAction",
    name: locale === "tr" ? "30 dakikalık tanışma görüşmesi planla" : "Book a 30-minute intro call",
    target: {
      "@type": "EntryPoint",
      urlTemplate: localeUrl(locale, "/book"),
      actionPlatform: [
        "https://schema.org/DesktopWebPlatform",
        "https://schema.org/MobileWebPlatform",
      ],
    },
  };
}

/**
 * Site geneli (layout): Person + ProfessionalService + WebSite.
 * Person, sunduğu hizmetleri `hasOfferCatalog` ile listeler — AI asistanlarının
 * "Huntay AzerTürk ne iş yapıyor / hangi hizmetleri veriyor" sorusuna doğrudan cevap.
 */
export function buildSiteGraph(locale: AppLocale, personDescription: string) {
  const currentRole = experience[0];
  const knowsAbout = Array.from(
    new Set(techStack.flatMap((group) => group.items.map((item) => cleanSkill(item.en)))),
  );

  return graph([
    {
      "@type": "Person",
      "@id": personId,
      name: siteConfig.name,
      alternateName: siteConfig.alternateNames,
      givenName: siteConfig.givenName,
      familyName: siteConfig.familyName,
      url: localeUrl("en"),
      image: absoluteUrl(profileImagePath),
      description: personDescription,
      jobTitle: currentRole.role[locale],
      worksFor: { "@type": "Organization", name: currentRole.org[locale] },
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.locality,
        addressCountry: siteConfig.countryCode,
      },
      alumniOf: education.map((item) => ({
        "@type": "CollegeOrUniversity",
        name: item.org.en,
      })),
      hasCredential: credentials.certs.map((cert) => ({
        "@type": "EducationalOccupationalCredential",
        name: cert.en,
      })),
      knowsAbout,
      knowsLanguage: ["en", "tr"],
      // Telefon sayfada gizlendiyse (`NEXT_PUBLIC_PHONE_DISPLAY=""`) JSON-LD’de de yer almaz.
      ...(siteConfig.phoneDisplay && siteConfig.phoneTel
        ? { telephone: siteConfig.phoneTel }
        : {}),
      sameAs: [
        siteConfig.linkedin,
        siteConfig.medium,
        siteConfig.instagram,
        siteConfig.github,
      ],
      hasOfferCatalog: offerCatalog(locale),
      potentialAction: reserveAction(locale),
    },
    {
      // Danışmanlık işi: yerel ve "İstanbul'da yazılım/yapay zeka danışmanı" aramaları için iş varlığı.
      "@type": "ProfessionalService",
      "@id": businessId,
      name:
        locale === "tr"
          ? `${siteConfig.name} — Yazılım ve Yapay Zeka Danışmanlığı`
          : `${siteConfig.name} — Software & AI Consulting`,
      url: localeUrl(locale, "/services"),
      image: absoluteUrl(profileImagePath),
      description:
        locale === "tr"
          ? "Yapay zeka ajanları, fractional CTO, startup ürün geliştirme, web ve mobil uygulamalar, bulut ve DevOps, mikroservis modernizasyonu, IoT ve KOBİ'ler için dijital dönüşüm."
          : "AI agents, fractional CTO, startup product development, web and mobile apps, cloud and DevOps, microservices modernization, IoT and digital transformation for SMEs.",
      founder: { "@id": personId },
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.locality,
        addressCountry: siteConfig.countryCode,
      },
      areaServed: "Worldwide",
      availableLanguage: ["en", "tr"],
      email: siteConfig.contactEmail,
      ...(siteConfig.phoneDisplay && siteConfig.phoneTel ? { telephone: siteConfig.phoneTel } : {}),
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "18:00",
      },
      hasOfferCatalog: offerCatalog(locale),
      potentialAction: reserveAction(locale),
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: localeUrl("en"),
      name: siteConfig.name,
      inLanguage: ["en", "tr"],
      publisher: { "@id": personId },
    },
  ]);
}

type PageInfo = { title: string; description: string };

/** Ana sayfa: ProfilePage + FAQPage (SSS sadece ana sayfada görünür). */
export function buildHomeGraph(locale: AppLocale, page: PageInfo) {
  const pageUrl = localeUrl(locale);
  return graph([
    {
      "@type": "ProfilePage",
      "@id": `${pageUrl}#profilepage`,
      url: pageUrl,
      name: page.title,
      description: page.description,
      inLanguage: locale,
      isPartOf: { "@id": websiteId },
      mainEntity: { "@id": personId },
      about: { "@id": personId },
      primaryImageOfPage: absoluteUrl(profileImagePath),
      dateModified: siteConfig.contentUpdatedAt,
    },
    faqPageNode(locale, pageUrl, faq),
  ]);
}

type CrumbLabels = { home: string; services: string };

/** /services: CollectionPage + ItemList (hizmetler) + BreadcrumbList + FAQPage. */
export function buildServicesHubGraph(locale: AppLocale, page: PageInfo, labels: CrumbLabels) {
  const pageUrl = localeUrl(locale, "/services");
  return graph([
    {
      "@type": "CollectionPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: page.title,
      description: page.description,
      inLanguage: locale,
      isPartOf: { "@id": websiteId },
      about: { "@id": personId },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      dateModified: siteConfig.contentUpdatedAt,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: services.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: localeUrl(locale, `/services/${service.slug}`),
          name: service.title[locale],
        })),
      },
    },
    breadcrumbNode(pageUrl, [
      { name: labels.home, url: localeUrl(locale) },
      { name: labels.services, url: pageUrl },
    ]),
    faqPageNode(locale, pageUrl, servicesFaq),
  ]);
}

/** /services/<slug>: Service + WebPage + BreadcrumbList + FAQPage. */
export function buildServiceGraph(
  locale: AppLocale,
  service: ServiceItem,
  page: PageInfo,
  labels: CrumbLabels,
) {
  const pageUrl = localeUrl(locale, `/services/${service.slug}`);
  return graph([
    {
      "@type": "Service",
      "@id": serviceId(service.slug),
      name: service.title[locale],
      serviceType: service.title.en,
      description: service.summary[locale],
      url: pageUrl,
      provider: { "@id": personId },
      areaServed: "Worldwide",
      availableLanguage: ["en", "tr"],
    },
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: page.title,
      description: page.description,
      inLanguage: locale,
      isPartOf: { "@id": websiteId },
      about: { "@id": serviceId(service.slug) },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      dateModified: siteConfig.contentUpdatedAt,
    },
    breadcrumbNode(pageUrl, [
      { name: labels.home, url: localeUrl(locale) },
      { name: labels.services, url: localeUrl(locale, "/services") },
      { name: service.title[locale], url: pageUrl },
    ]),
    faqPageNode(locale, pageUrl, service.faq),
  ]);
}

/** /book: ContactPage + BreadcrumbList. */
export function buildBookGraph(
  locale: AppLocale,
  page: PageInfo,
  labels: { home: string; book: string },
) {
  const pageUrl = localeUrl(locale, "/book");
  return graph([
    {
      "@type": "ContactPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: page.title,
      description: page.description,
      inLanguage: locale,
      isPartOf: { "@id": websiteId },
      about: { "@id": personId },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
    },
    breadcrumbNode(pageUrl, [
      { name: labels.home, url: localeUrl(locale) },
      { name: labels.book, url: pageUrl },
    ]),
  ]);
}

/** /assistant: WebPage + SoftwareApplication (MCP bağlayıcısı) + BreadcrumbList. */
export function buildAssistantGraph(
  locale: AppLocale,
  page: PageInfo,
  labels: { home: string; assistant: string },
  app: { version: string; endpoint: string },
) {
  const pageUrl = localeUrl(locale, "/assistant");
  return graph([
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: page.title,
      description: page.description,
      inLanguage: locale,
      isPartOf: { "@id": websiteId },
      about: { "@id": `${siteConfig.baseUrl}/assistant#app` },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      dateModified: siteConfig.contentUpdatedAt,
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteConfig.baseUrl}/assistant#app`,
      name: `${siteConfig.name} MCP server`,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any MCP client (ChatGPT, Claude, Gemini, Cursor, VS Code)",
      softwareVersion: app.version,
      url: pageUrl,
      installUrl: app.endpoint,
      description: page.description,
      author: { "@id": personId },
      provider: { "@id": personId },
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
      featureList: [
        "Check availability",
        "Book a 30-minute intro call",
        "Service catalog and matching",
        "Search case studies and FAQ",
      ],
    },
    breadcrumbNode(pageUrl, [
      { name: labels.home, url: localeUrl(locale) },
      { name: labels.assistant, url: pageUrl },
    ]),
  ]);
}
