import { siteConfig } from "@/lib/site";
import { buttonPrimary, buttonSecondary } from "@/lib/ui";
import { CalendarClock, Mail, MessageCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";

/**
 * Randevu alanı (/book). lib/site.ts:
 * - bookingEmbedUrl varsa takvim sayfaya gömülür (Google Takvim randevu planı, Cal.com vb.)
 * - yalnızca bookingUrl varsa takvim yeni sekmede açılır
 * - ikisi de yoksa WhatsApp / e-posta ile hazır mesajlı randevu talebi gösterilir
 */
export async function Booking() {
  const t = await getTranslations("BookPage");
  const { bookingEmbedUrl, bookingUrl, whatsappUrl, contactEmail } = siteConfig;

  if (bookingEmbedUrl) {
    return (
      <div className="overflow-hidden rounded-2xl border border-border bg-white">
        <iframe
          src={bookingEmbedUrl}
          title={t("iframeTitle")}
          loading="lazy"
          className="block h-[720px] w-full border-0"
        />
        {bookingUrl ? (
          <div className="border-t border-border bg-card p-4 text-center">
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-accent hover:underline"
            >
              {t("openCalendar")}
            </a>
          </div>
        ) : null}
      </div>
    );
  }

  if (bookingUrl) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8">
        <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className={buttonPrimary}>
          <CalendarClock className="h-4 w-4" aria-hidden />
          {t("openCalendar")}
        </a>
      </div>
    );
  }

  const message = t("requestMessage");
  const whatsappHref = whatsappUrl
    ? `${whatsappUrl}${whatsappUrl.includes("?") ? "&" : "?"}text=${encodeURIComponent(message)}`
    : "";
  const mailHref = contactEmail
    ? `mailto:${contactEmail}?subject=${encodeURIComponent(t("requestSubject"))}&body=${encodeURIComponent(message)}`
    : "";

  return (
    <div className="rounded-2xl border border-border bg-card p-8">
      <h2 className="text-xl font-semibold text-foreground">{t("requestTitle")}</h2>
      <p className="mt-3 max-w-xl text-muted-foreground">{t("requestText")}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {whatsappHref ? (
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={buttonPrimary}>
            <MessageCircle className="h-4 w-4" aria-hidden />
            {t("requestWhatsapp")}
          </a>
        ) : null}
        {mailHref ? (
          <a href={mailHref} className={buttonSecondary}>
            <Mail className="h-4 w-4" aria-hidden />
            {t("requestEmail")}
          </a>
        ) : null}
      </div>
    </div>
  );
}
