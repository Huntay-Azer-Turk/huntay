import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site";
import { buttonPrimary, buttonSecondary } from "@/lib/ui";
import { CalendarClock, MessageCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";

/** Sayfa sonu çağrı bloğu: tanışma görüşmesi + WhatsApp (+ isteğe bağlı tüm hizmetler). */
export async function CtaBlock({ showServicesLink = false }: { showServicesLink?: boolean }) {
  const t = await getTranslations("Cta");

  return (
    <div className="glow-ring rounded-2xl border border-border bg-card p-8 sm:p-10">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {t("title")}
      </h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">{t("text")}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link href="/book" className={buttonPrimary}>
          <CalendarClock className="h-4 w-4" aria-hidden />
          {t("book")}
        </Link>
        {siteConfig.whatsappUrl ? (
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonSecondary}
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            {t("whatsapp")}
          </a>
        ) : null}
        {showServicesLink ? (
          <Link href="/services" className={buttonSecondary}>
            {t("services")}
          </Link>
        ) : null}
      </div>
    </div>
  );
}
