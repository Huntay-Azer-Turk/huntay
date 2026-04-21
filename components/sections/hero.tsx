import { heroLead } from "@/data/profile";
import { siteConfig } from "@/lib/site";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";
import { LinkedinIcon, MediumIcon } from "@/components/icons";

export async function Hero() {
  const locale = (await getLocale()) as "en" | "tr";
  const t = await getTranslations("Hero");

  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-border"
    >
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute -left-40 top-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
        <div className="mb-8">
          <Image
            src="/cv/me.png"
            alt="Huntay AzerTürk"
            width={96}
            height={96}
            className="rounded-full border-2 border-border object-cover shadow-sm"
            priority
          />
        </div>
        <p className="mb-4 inline-flex max-w-3xl flex-wrap items-center rounded-full border border-border bg-card px-3 py-1 font-mono text-[11px] uppercase leading-relaxed tracking-widest text-muted-foreground sm:text-xs">
          {t("eyebrow")}
        </p>
        <h1 className="max-w-full min-w-0 text-balance break-words text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:max-w-4xl md:text-5xl lg:text-6xl">
          {t("role")}
        </h1>
        <p className="mt-4 max-w-full min-w-0 text-balance text-xl font-medium leading-snug text-muted-foreground sm:text-2xl md:max-w-4xl md:text-3xl">
          {t("valueProp")}
        </p>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
          {heroLead[locale]}
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <a
            href={
              siteConfig.contactEmail
                ? `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(t("mailtoSubject"))}`
                : "#contact"
            }
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-medium text-[var(--color-on-accent)] transition hover:opacity-90"
          >
            {t("ctaContact")}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
          <a
            href={siteConfig.cvPath}
            download={siteConfig.cvDownloadFileName}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition hover:border-accent"
          >
            <Download className="h-4 w-4" aria-hidden />
            {t("ctaCv")}
          </a>
        </div>
        <div className="mt-16 flex flex-wrap gap-6 text-sm text-muted-foreground">
          <a
            href={siteConfig.linkedin}
            className="group flex items-center gap-2 hover:text-accent"
            rel="noopener noreferrer"
            target="_blank"
          >
            <LinkedinIcon className="h-4 w-4 text-muted-foreground group-hover:text-accent" aria-hidden />
            LinkedIn
          </a>
          <a
            href={siteConfig.medium}
            className="group flex items-center gap-2 hover:text-accent"
            rel="noopener noreferrer"
            target="_blank"
          >
            <MediumIcon className="h-4 w-4 text-muted-foreground group-hover:text-accent" aria-hidden />
            Medium
          </a>
        </div>
      </div>
    </section>
  );
}
