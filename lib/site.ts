export const siteConfig = {
  name: "Huntay AzerTürk",
  givenName: "Huntay",
  familyName: "AzerTürk",
  /** Arama motorları / AI asistanları için yazım varyantları (ASCII vb.). */
  alternateNames: ["Huntay AzerTurk"],
  handle: "huntay",
  linkedin: "https://www.linkedin.com/in/huntay/",
  medium: "https://medium.com/@Huntay.AzerTurk",
  instagram: "https://www.instagram.com/huntay.azerturk/",
  github: "https://github.com/Huntay-Azer-Turk",
  /** JSON-LD `address` için (şehir + ISO ülke kodu). */
  locality: "Istanbul",
  countryCode: "TR",
  /**
   * İçerik her güncellendiğinde değiştirin: sitemap `lastmod` ve JSON-LD `dateModified` buradan beslenir.
   * (Her build'de "şimdi" vermek arama motorlarının bu sinyale güvenmemesine yol açar.)
   */
  contentUpdatedAt: "2026-10-27",
  /**
   * CV’deki telefon. `NEXT_PUBLIC_PHONE_DISPLAY=` (boş) verilirse gizlenir;
   * tanımsızsa CV’deki varsayılan kullanılır.
   */
  phoneDisplay:
    process.env.NEXT_PUBLIC_PHONE_DISPLAY === ""
      ? ""
      : (process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "+90 553 832 84 77"),
  phoneTel:
    process.env.NEXT_PUBLIC_PHONE_TEL === ""
      ? ""
      : (process.env.NEXT_PUBLIC_PHONE_TEL ?? "+905538328477"),
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "huntay.azerturk@gmail.com",
  whatsappUrl: process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "https://wa.me/905538328477",
  cvPath: process.env.NEXT_PUBLIC_CV_PATH ?? "/cv/cv.pdf",
  /** `<a download>` ve Content-Disposition için tutarlı dosya adı (ASCII, boşluksuz). */
  cvDownloadFileName: "Huntay-AzerTurk-CV.pdf",
  baseUrl:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://huntayazerturk.com",
} as const;
