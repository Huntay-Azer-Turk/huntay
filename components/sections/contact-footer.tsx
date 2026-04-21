import { siteConfig } from "@/lib/site";
import { getTranslations } from "next-intl/server";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { LinkedinIcon, MediumIcon } from "@/components/icons";

export async function ContactFooter() {
  const t = await getTranslations("Contact");
  const tf = await getTranslations("Footer");

  return (
    <>
      <section id="contact" className="border-b border-border py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            {t("title")}
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">{t("subtitle")}</p>
          <div className="mt-10 flex flex-wrap gap-4">
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
      <footer className="py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-center text-sm text-muted-foreground sm:flex-row sm:text-left sm:px-6">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. {tf("rights")}
          </p>
          <p className="font-mono text-xs">{tf("built")}</p>
        </div>
      </footer>
    </>
  );
}
