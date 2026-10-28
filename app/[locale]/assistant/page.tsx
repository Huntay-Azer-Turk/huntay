import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/services/breadcrumbs";
import {
  assistantTools,
  dataHandling,
  examplePrompts,
  setupSteps,
  troubleshooting,
} from "@/data/assistant";
import { Link } from "@/i18n/navigation";
import { MCP_SERVER_VERSION, mcpEndpoint } from "@/lib/mcp/meta";
import { buildAssistantGraph, buildMetadata, type AppLocale } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { buttonSecondary, containerClass, h2Class } from "@/lib/ui";
import { CalendarClock, Mail, MessageSquareText } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Assistant" });
  return buildMetadata({
    locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/assistant",
  });
}

/**
 * MCP bağlayıcısının herkese açık dokümantasyonu (Claude ve ChatGPT dizinleri bunu ister):
 * amaç, kurulum, araçlar, örnek komutlar, sorun giderme, veri kullanımı ve destek.
 */
export default async function AssistantPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);
  const locale = rawLocale as AppLocale;
  const t = await getTranslations({ locale, namespace: "Assistant" });
  const tb = await getTranslations({ locale, namespace: "Breadcrumbs" });

  const card = "rounded-2xl border border-border bg-card p-6";

  return (
    <>
      <JsonLd
        data={buildAssistantGraph(
          locale,
          { title: t("metaTitle"), description: t("metaDescription") },
          { home: tb("home"), assistant: tb("assistant") },
          { version: MCP_SERVER_VERSION, endpoint: mcpEndpoint },
        )}
      />

      <section className="relative border-b border-border">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="bg-grid absolute inset-0 opacity-40" />
          <div className="absolute -left-40 top-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        </div>
        <div className={`relative ${containerClass} py-16 sm:py-24`}>
          <Breadcrumbs
            label={tb("label")}
            items={[{ name: tb("home"), href: "/" }, { name: tb("assistant") }]}
          />
          <p className="mt-10 font-mono text-xs uppercase tracking-widest text-accent">
            {t("eyebrow")} · {t("versionLabel")} {MCP_SERVER_VERSION}
          </p>
          <h1 className="mt-3 max-w-4xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {t("intro")}
          </p>
          <p className="mt-10 text-sm font-medium text-foreground">{t("serverUrl")}</p>
          <code className="mt-2 block max-w-xl select-all break-all rounded-xl border border-border bg-card px-4 py-3 font-mono text-sm text-accent">
            {mcpEndpoint}
          </code>
          <p className="mt-3 text-sm text-muted-foreground">{t("transport")}</p>
        </div>
      </section>

      <section className="border-b border-border py-16 sm:py-20">
        <div className={`${containerClass} grid gap-10 lg:grid-cols-2`}>
          <div>
            <h2 className={h2Class}>{t("setupTitle")}</h2>
            <ul className="mt-6 space-y-4">
              {setupSteps.map((step) => (
                <li key={step.client} className={card}>
                  <h3 className="font-semibold text-foreground">{step.client}</h3>
                  <p className="mt-2 break-words text-sm leading-relaxed text-muted-foreground">
                    {step.steps[locale]}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className={h2Class}>{t("promptsTitle")}</h2>
            <ul className="mt-6 space-y-3">
              {examplePrompts.map((prompt) => (
                <li key={prompt.en} className="flex gap-3 text-muted-foreground">
                  <MessageSquareText className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden />
                  <span>“{prompt[locale]}”</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b border-border py-16 sm:py-20">
        <div className={containerClass}>
          <h2 className={h2Class}>{t("toolsTitle")}</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {assistantTools.map((tool) => (
              <li key={tool.name} className={card}>
                <div className="flex flex-wrap items-center gap-2">
                  <code className="font-mono text-sm text-foreground">{tool.name}</code>
                  <span
                    className={`rounded-full px-2 py-0.5 font-mono text-xs ${
                      tool.access === "write"
                        ? "bg-accent text-[var(--color-on-accent)]"
                        : "border border-border text-muted-foreground"
                    }`}
                  >
                    {tool.access === "write" ? t("write") : t("read")}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {tool.description[locale]}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-border py-16 sm:py-20">
        <div className={`${containerClass} grid gap-10 lg:grid-cols-2`}>
          <div>
            <h2 className={h2Class}>{t("troubleshootingTitle")}</h2>
            <dl className="mt-6 space-y-5">
              {troubleshooting.map((item) => (
                <div key={item.question.en}>
                  <dt className="font-semibold text-foreground">{item.question[locale]}</dt>
                  <dd className="mt-1 text-muted-foreground">{item.answer[locale]}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="space-y-8">
            <div>
              <h2 className={h2Class}>{t("dataTitle")}</h2>
              <p className="mt-6 leading-relaxed text-muted-foreground">{dataHandling[locale]}</p>
              <Link href="/privacy" className="mt-3 inline-block text-sm font-medium text-accent hover:underline">
                {t("privacyLink")}
              </Link>
            </div>
            <div>
              <h2 className={h2Class}>{t("supportTitle")}</h2>
              <p className="mt-6 text-muted-foreground">{t("supportText")}</p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={`mailto:${siteConfig.contactEmail}`} className={buttonSecondary}>
                  <Mail className="h-4 w-4" aria-hidden />
                  {siteConfig.contactEmail}
                </a>
                <Link href="/book" className={buttonSecondary}>
                  <CalendarClock className="h-4 w-4" aria-hidden />
                  {t("bookCta")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
