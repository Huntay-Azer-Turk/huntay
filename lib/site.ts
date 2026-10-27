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
   * Randevu takvimi (/book sayfası).
   * - bookingUrl: takvim sayfasının paylaşım linki (ör. Google Takvim "Randevu planı" ya da Cal.com linki)
   * - bookingEmbedUrl: sayfaya iframe olarak gömülecek adres.
   *   Google Takvim için: https://calendar.google.com/calendar/appointments/schedules/<ID>?gv=true
   * İkisi de boşsa /book sayfası WhatsApp ve e-posta ile randevu isteme seçeneklerini gösterir.
   */
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "",
  bookingEmbedUrl: process.env.NEXT_PUBLIC_BOOKING_EMBED_URL ?? "",
  /** Google Search Console → "HTML etiketi" doğrulamasındaki content değeri. */
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
  /** Bing Webmaster Tools → "msvalidate.01" meta etiketindeki content değeri. */
  bingSiteVerification: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ?? "",
  /**
   * IndexNow (Bing, Yandex vb.) anahtarı — /public/<anahtar>.txt dosyasıyla aynı olmalı.
   * Yeni içerik yayınlandığında bu anahtarla URL'ler arama motorlarına anında bildirilebilir.
   */
  indexNowKey: "74ea8b75679df426cd03c5965620d3e7",
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
