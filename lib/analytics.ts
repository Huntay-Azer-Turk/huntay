/**
 * Ziyaretçi ölçümü ve reklam etiketleri — tek yapılandırma noktası.
 *
 * Katmanlar:
 * 1. Cloudflare Web Analytics: çerezsiz, onay gerektirmez. Kodda değil; Cloudflare panelinden otomatik eklenir.
 * 2. Google Analytics 4 ve Microsoft Clarity: yalnızca ziyaretçi "analitik" çerezlerine izin verirse yüklenir (Consent Mode v2, temel mod:
 *    onaydan önce Google'a hiçbir istek gitmez).
 * 3. Reklam etiketleri (Google Ads, Meta Pixel, LinkedIn Insight): yalnızca "pazarlama" izni verilirse yüklenir.
 *    Kimlik boşsa etiket hiç yüklenmez; kimliklerin hiçbiri yoksa onay penceresinde pazarlama seçeneği görünmez.
 *
 * Ölçüm kimlikleri gizli bilgi değildir (sayfa kaynağında herkes görür); bu yüzden kodda durabilir.
 * Reklam kampanyası açıldığında ilgili kimliği buraya yazmak yeterli.
 */
export const analyticsConfig = {
  /** GA4 ölçüm kimliği (Analytics → Yönetici → Veri akışları). */
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID ?? "G-56CQFZ3KJK",
  /** Microsoft Clarity proje kimliği (ısı haritası ve oturum kaydı) — "analitik" iznine bağlı. */
  clarityId: process.env.NEXT_PUBLIC_CLARITY_ID ?? "z4v3vs44xq",
  /** Google Ads dönüşüm kimliği, ör. "AW-123456789". Reklam hesabı açılınca doldurulacak. */
  googleAdsId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "",
  /** Google Ads "randevu" dönüşüm etiketi (AW-…/<etiket> içindeki <etiket>). */
  googleAdsBookingLabel: process.env.NEXT_PUBLIC_GOOGLE_ADS_BOOKING_LABEL ?? "",
  /** Meta (Instagram/Facebook) Pixel kimliği — yalnızca rakamlar. */
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
  /** LinkedIn Insight Tag partner kimliği — yalnızca rakamlar. */
  linkedinPartnerId: process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID ?? "",
};

export const hasMarketingTags = Boolean(
  analyticsConfig.googleAdsId || analyticsConfig.metaPixelId || analyticsConfig.linkedinPartnerId,
);
export const hasAnyConsentTags =
  Boolean(analyticsConfig.ga4Id || analyticsConfig.clarityId) || hasMarketingTags;

/** Onay kaydı. Sürüm değişirse (yeni bir araç eklenirse) ziyaretçiye tekrar sorulur. */
export const CONSENT_VERSION = 2;
export const CONSENT_STORAGE_KEY = "hz-consent";
/** Onay en fazla bu kadar gün geçerli; sonra yeniden sorulur. */
export const CONSENT_MAX_AGE_DAYS = 365;

export type ConsentChoice = {
  analytics: boolean;
  marketing: boolean;
  /** ISO tarih — onayın ne zaman verildiğinin kaydı. */
  at: string;
  v: number;
};

/** Sitede ölçülen olaylar. GA4'te "generate_lead" anahtar etkinlik (dönüşüm) olarak işaretli. */
export type AnalyticsEvent =
  | { name: "generate_lead"; params: { method: "booking" | "booking_request"; source: string } }
  | { name: "contact_click"; params: { method: "whatsapp" | "email" | "phone" | "linkedin"; location: string } }
  | { name: "cta_click"; params: { target: string; location: string } };
