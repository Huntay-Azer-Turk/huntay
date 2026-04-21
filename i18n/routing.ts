import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "tr"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  // Tarayıcı diline göre otomatik yönlendirmeyi tamamen kapatıyoruz.
  // Siteye ilk giren HERKES (tarayıcısı Türkçe olsa bile) İngilizce görecek.
  localeDetection: false,
});
