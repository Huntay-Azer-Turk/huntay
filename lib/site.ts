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
   * Saat ve saat dilimiyle tam ISO 8601 olmalı (Google ProfilePage yalnızca tarihi "geçersiz" sayıyor).
   * (Her build'de "şimdi" vermek arama motorlarının bu sinyale güvenmemesine yol açar.)
   */
  contentUpdatedAt: "2026-10-29T09:00:00+03:00",
  /**
   * Randevu takvimi: Cal.com (https://cal.com/huntay/intro-call — 30 dk, hafta içi 10:00–18:00 İstanbul,
   * Google Meet, Google Takvim’e bağlı). /book sayfası bu takvimi gömer; AI asistanları (MCP: /mcp)
   * boş saatleri buradan okur ve randevuyu buraya yazar. Herkese açık randevu tipleri için
   * Cal.com API anahtarı gerekmez (kodda gizli bilgi yok).
   * Kullanıcı adı boş verilirse (`NEXT_PUBLIC_CAL_USERNAME=`) aşağıdaki yedek seçenekler kullanılır.
   */
  calUsername: process.env.NEXT_PUBLIC_CAL_USERNAME ?? "huntay",
  calEventSlug: process.env.NEXT_PUBLIC_CAL_EVENT_SLUG ?? "intro-call",
  /**
   * Cal.com kullanılmıyorsa:
   * - bookingEmbedUrl: sayfaya iframe olarak gömülecek takvim
   *   (Google Takvim için: https://calendar.google.com/calendar/appointments/schedules/<ID>?gv=true)
   * - bookingUrl: yalnızca link (yeni sekmede açılır)
   * Hiçbiri yoksa /book sayfası WhatsApp ve e-posta ile randevu isteme seçeneklerini gösterir.
   */
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "",
  bookingEmbedUrl: process.env.NEXT_PUBLIC_BOOKING_EMBED_URL ?? "",
  /** Randevu saatlerinin varsayılan saat dilimi (kullanıcı başka bir dilim belirtmezse). */
  timeZone: "Europe/Istanbul",
  /** Google Search Console → "HTML etiketi" doğrulamasındaki content değeri. */
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
  /** Bing Webmaster Tools → "msvalidate.01" meta etiketindeki content değeri. */
  bingSiteVerification: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ?? "",
  /**
   * IndexNow (Bing, Yandex vb.) anahtarı — /public/<anahtar>.txt dosyasıyla aynı olmalı.
   * Yeni içerik yayınlandığında bu anahtarla URL'ler arama motorlarına anında bildirilebilir.
   */
  /** ChatGPT uygulama dizinindeki sayfa (29 Ekim 2026'da yayınlandı). */
  chatgptAppUrl: "https://chatgpt.com/plugins/plugin_asdk_app_6ae1c947a1d88191a9da39819af029d1",
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
