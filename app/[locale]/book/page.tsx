import { JsonLd } from "@/components/seo/json-ld";
import { Booking } from "@/components/services/booking";
import { Breadcrumbs } from "@/components/services/breadcrumbs";
import { InstagramIcon, LinkedinIcon } from "@/components/icons";
import { Link } from "@/i18n/navigation";
import { buildBookGraph, buildMetadata, type AppLocale } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { buttonPrimary, containerClass, h2Class } from "@/lib/ui";
import { Bot, Check, Mail, MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "BookPage" });
  return buildMetadata({
    locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/book",
  });
}

const expectKeys = ["expect1", "expect2", "expect3", "expect4"] as const;
const assistantKeys = ["aiClaude", "aiChatgpt", "aiGemini"] as const;

export default async function BookPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);
  const locale = rawLocale as AppLocale;
  const t = await getTranslations({ locale, namespace: "BookPage" });
  const tb = await getTranslations({ locale, namespace: "Breadcrumbs" });
  const tc = await getTranslations({ locale, namespace: "Contact" });

  const contactLink =
    "flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition hover:border-accent";

  return (
    <>
      <JsonLd
        data={buildBookGraph(
          locale,
          { title: t("metaTitle"), description: t("metaDescription") },
          { home: tb("home"), book: tb("book") },
        )}
      />

      <section className="relative">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="bg-grid absolute inset-0 opacity-40" />
          <div className="absolute -left-40 top-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        </div>
        <div className={`relative ${containerClass} py-16 sm:py-24`}>
          <Breadcrumbs label={tb("label")} items={[{ name: tb("home"), href: "/" }, { name: tb("book") }]} />
          <p className="mt-10 font-mono text-xs uppercase tracking-widest text-accent">
            {t("eyebrow")}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {t("intro")}
          </p>

          {/* Takvim tam genişlikte: Cal.com ay görünümü ancak ~1000px üstünde yan yana (kısa) düzene geçiyor. */}
          <div className="mt-12">
            <h2 className="sr-only">{t("calendarTitle")}</h2>
            <Booking />
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-semibold text-foreground">{t("expectTitle")}</h2>
              <ul className="mt-4 space-y-3">
                {expectKeys.map((key) => (
                  <li key={key} className="flex gap-3 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                    <span>{t(key)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-semibold text-foreground">{t("otherTitle")}</h2>
              <div className="mt-4 grid gap-3">
                {siteConfig.whatsappUrl ? (
                  <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className={contactLink}>
                    <MessageCircle className="h-4 w-4 text-accent" aria-hidden />
                    {tc("whatsapp")}
                  </a>
                ) : null}
                {siteConfig.contactEmail ? (
                  <a href={`mailto:${siteConfig.contactEmail}`} className={contactLink}>
                    <Mail className="h-4 w-4 text-accent" aria-hidden />
                    {tc("email")}
                  </a>
                ) : null}
                <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className={contactLink}>
                  <LinkedinIcon className="h-4 w-4 text-accent" aria-hidden />
                  {tc("linkedin")}
                </a>
                <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className={contactLink}>
                  <InstagramIcon className="h-4 w-4 text-accent" aria-hidden />
                  {tc("instagram")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sohbet içinden randevu: MCP sunucusu (app/mcp/route.ts) */}
      <section id="ai-assistants" className="scroll-mt-20 border-t border-border py-16 sm:py-20">
        <div className={`${containerClass} grid gap-8 lg:grid-cols-5`}>
          <div className="lg:col-span-3">
            <h2 className={h2Class}>{t("aiTitle")}</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{t("aiText")}</p>
            <a
              href={siteConfig.chatgptAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonPrimary} mt-6`}
            >
              {t("openInChatgpt")}
            </a>
            <p className="mt-8 text-sm font-medium text-foreground">{t("aiUrlLabel")}</p>
            <code className="mt-2 block select-all break-all rounded-xl border border-border bg-card px-4 py-3 font-mono text-sm text-accent">
              {`${siteConfig.baseUrl}/mcp`}
            </code>
            <p className="mt-3 text-sm text-muted-foreground">{t("aiNote")}</p>
            <Link href="/assistant" className="mt-4 inline-block text-sm font-medium text-accent hover:underline">
              {t("aiDocs")} →
            </Link>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 lg:col-span-2">
            <h3 className="font-semibold text-foreground">{t("aiStepsTitle")}</h3>
            <ul className="mt-4 space-y-3">
              {assistantKeys.map((key) => (
                <li key={key} className="flex gap-3 text-sm text-muted-foreground">
                  <Bot className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                  <span>{t(key)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
