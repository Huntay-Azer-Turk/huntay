import type { Metadata } from "next";
import { credentials, education } from "@/data/education";
import { experience } from "@/data/experience";
import { faq } from "@/data/faq";
import { techStack } from "@/data/techStack";
import { siteConfig } from "./site";

export type AppLocale = "en" | "tr";

/** Canonical URL’ler: EN kökte (`/`), TR `/tr` altında (next-intl `localePrefix: "as-needed"`). */
export function localeUrl(locale: string): string {
  return locale === "en" ? `${siteConfig.baseUrl}/` : `${siteConfig.baseUrl}/${locale}`;
}

/** Göreli yol veya tam URL → tam URL (ör. `cvPath` env ile harici bir adres olabilir). */
export function absoluteUrl(pathOrUrl: string): string {
  return /^https?:\/\//.test(pathOrUrl) ? pathOrUrl : `${siteConfig.baseUrl}${pathOrUrl}`;
}

export const profileImagePath = "/cv/me.jpg";

const hreflangAlternates = {
  en: localeUrl("en"),
  tr: localeUrl("tr"),
  "x-default": localeUrl("en"),
};

type SeoInput = {
  locale: string;
  title: string;
  description: string;
};

export function buildMetadata({ locale, title, description }: SeoInput): Metadata {
  const url = localeUrl(locale);

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
      languages: hreflangAlternates,
    },
    // og:image → app/[locale]/opengraph-image.tsx (dosya kuralı, otomatik eklenir)
    openGraph: {
      type: "profile",
      firstName: siteConfig.givenName,
      lastName: siteConfig.familyName,
      username: siteConfig.handle,
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: locale === "tr" ? "tr_TR" : "en_US",
      alternateLocale: locale === "tr" ? ["en_US"] : ["tr_TR"],
    },
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
  };
}

/** "C / C++ (Hardware/Legacy)" → "C / C++" */
function cleanSkill(label: string): string {
  return label.replace(/\s*\([^)]*\)/g, "").trim();
}

/**
 * Tek bir @graph: Person + WebSite + ProfilePage + FAQPage.
 * Arama motorları ve AI asistanları (ChatGPT, Perplexity, Gemini, Claude) için “bu kişi kim” sinyali.
 * Tüm alanlar sitede zaten görünen verilerden (data/*) türetilir; sayfa ile JSON-LD ayrışmaz.
 */
export function buildStructuredData(
  locale: AppLocale,
  page: { title: string; description: string },
) {
  const base = siteConfig.baseUrl;
  const personId = `${base}/#person`;
  const websiteId = `${base}/#website`;
  const pageUrl = localeUrl(locale);
  const currentRole = experience[0];

  const knowsAbout = Array.from(
    new Set(techStack.flatMap((group) => group.items.map((item) => cleanSkill(item.en)))),
  );

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: siteConfig.name,
        alternateName: siteConfig.alternateNames,
        givenName: siteConfig.givenName,
        familyName: siteConfig.familyName,
        url: localeUrl("en"),
        image: absoluteUrl(profileImagePath),
        description: page.description,
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
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: localeUrl("en"),
        name: siteConfig.name,
        inLanguage: ["en", "tr"],
        publisher: { "@id": personId },
      },
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
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        url: `${pageUrl}#faq`,
        inLanguage: locale,
        isPartOf: { "@id": `${pageUrl}#profilepage` },
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.question[locale],
          acceptedAnswer: { "@type": "Answer", text: item.answer[locale] },
        })),
      },
    ],
  };
}
