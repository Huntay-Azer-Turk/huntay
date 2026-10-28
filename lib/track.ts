"use client";

import { analyticsConfig, type AnalyticsEvent } from "@/lib/analytics";

/**
 * Olay gönderimi. Etiketler yalnızca ziyaretçi izin verdiyse yüklenir; burada yalnızca yüklü olanlara
 * gönderilir. İzin yoksa olay hiçbir yere gitmez (Cloudflare Web Analytics olay toplamaz, yalnızca sayfa görüntüleme).
 */
type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    fbq?: ((...args: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[] };
    _fbq?: unknown;
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[] };
    lintrk?: ((...args: unknown[]) => void) & { q?: unknown[] };
    _linkedin_partner_id?: string;
    _linkedin_data_partner_ids?: string[];
  }
}

export function track(event: AnalyticsEvent) {
  if (typeof window === "undefined") return;
  const { gtag, fbq } = window;
  gtag?.("event", event.name, event.params);

  // Clarity'de kayıtları bu olaylara göre süzebilmek için.
  window.clarity?.("event", event.name);

  if (event.name === "generate_lead" && event.params.method === "booking") {
    const { googleAdsId, googleAdsBookingLabel } = analyticsConfig;
    if (googleAdsId && googleAdsBookingLabel) {
      gtag?.("event", "conversion", { send_to: `${googleAdsId}/${googleAdsBookingLabel}` });
    }
    fbq?.("track", "Schedule");
  }
  if (event.name === "contact_click") {
    fbq?.("track", "Contact");
  }
}
