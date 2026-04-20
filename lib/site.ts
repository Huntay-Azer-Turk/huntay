export const siteConfig = {
  name: "Huntay AzerTürk",
  handle: "huntay",
  linkedin: "https://www.linkedin.com/in/huntay/",
  medium: "https://medium.com/@Huntay.AzerTurk",
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
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  cvPath: process.env.NEXT_PUBLIC_CV_PATH ?? "/cv/cv.pdf",
  /** `<a download>` ve Content-Disposition için tutarlı dosya adı (ASCII, boşluksuz). */
  cvDownloadFileName: "Huntay-AzerTurk-CV.pdf",
  baseUrl:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "http://localhost:3000",
} as const;
