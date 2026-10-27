import { siteConfig } from "@/lib/site";
import { getTranslations } from "next-intl/server";
import { CalendarClock, Mail, Phone, MessageCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { InstagramIcon, LinkedinIcon, MediumIcon } from "@/components/icons";

/** İletişim bölümü (ana sayfa). Alt bilgi tüm sayfalarda: components/layout/site-footer.tsx */
export async function ContactFooter() {
  const t = await getTranslations("Contact");

  return (
    <>
      <section id="contact" className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            {t("title")}
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">{t("subtitle")}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-medium text-[var(--color-on-accent)] transition hover:opacity-90"
            >
              <CalendarClock className="h-4 w-4" aria-hidden />
              {t("book")}
            </Link>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium transition hover:border-accent"
            >
              <LinkedinIcon className="h-4 w-4" aria-hidden />
              {t("linkedin")}
            </a>
            <a
              href={siteConfig.medium}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium transition hover:border-accent"
            >
              <MediumIcon className="h-4 w-4" aria-hidden />
              {t("medium")}
            </a>
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium transition hover:border-accent"
            >
              <InstagramIcon className="h-4 w-4" aria-hidden />
              {t("instagram")}
            </a>
            {siteConfig.phoneDisplay ? (
              <a
                href={`tel:${siteConfig.phoneTel}`}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium transition hover:border-accent"
              >
                <Phone className="h-4 w-4" aria-hidden />
                {siteConfig.phoneDisplay}
              </a>
            ) : null}
            {siteConfig.whatsappUrl ? (
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium transition hover:border-accent"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                {t("whatsapp")}
              </a>
            ) : null}
            {siteConfig.contactEmail ? (
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium transition hover:border-accent"
              >
                <Mail className="h-4 w-4" aria-hidden />
                {t("email")}
              </a>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
