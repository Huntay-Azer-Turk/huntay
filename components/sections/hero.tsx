import { heroLead } from "@/data/profile";
import { siteConfig } from "@/lib/site";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight, CalendarClock, Download } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { InstagramIcon, LinkedinIcon, MediumIcon } from "@/components/icons";

export async function Hero() {
  const locale = (await getLocale()) as "en" | "tr";
  const t = await getTranslations("Hero");

  return (
    <section
      id="hero"
      className="relative border-b border-border"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bg-grid absolute inset-0 opacity-40" />
        <div className="absolute -left-40 top-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
        <div className="relative z-10 mb-8">
          <Image
            src="/cv/me.jpg"
            alt="Huntay AzerTürk"
            width={640}
            height={640}
            quality={92}
            sizes="220px"
            className="h-36 w-36 origin-center rounded-full border-2 border-border object-cover shadow-sm transition duration-300 ease-out hover:z-20 hover:scale-125 hover:shadow-xl sm:h-44 sm:w-44 sm:hover:scale-150"
            priority
          />
        </div>
        <p className="mb-4 inline-flex max-w-3xl flex-wrap items-center rounded-full border border-border bg-card px-3 py-1 font-mono text-[11px] uppercase leading-relaxed tracking-widest text-muted-foreground sm:text-xs">
          {t("eyebrow")}
        </p>
        {/* H1 isimle başlar: sayfanın ana varlığı (entity) kişinin kendisi. */}
        <h1 className="max-w-full min-w-0 text-balance break-words text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:max-w-4xl md:text-4xl lg:text-5xl">
          <span className="mb-3 block text-xl font-medium tracking-normal text-accent sm:text-2xl">
            {siteConfig.name}
          </span>
          <span className="sr-only"> — </span>
          {t("role")}
        </h1>
        <p className="mt-4 max-w-full min-w-0 text-balance text-xl font-medium leading-snug text-muted-foreground sm:text-2xl md:max-w-4xl md:text-3xl">
          {t("valueProp")}
        </p>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
          {heroLead[locale]}
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-medium text-[var(--color-on-accent)] transition hover:opacity-90"
          >
            <CalendarClock className="h-4 w-4" aria-hidden />
            {t("ctaBook")}
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition hover:border-accent"
          >
            {t("ctaServices")}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
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
          <a
            href={siteConfig.instagram}
            className="group flex items-center gap-2 hover:text-accent"
            rel="noopener noreferrer"
            target="_blank"
          >
            <InstagramIcon className="h-4 w-4 text-muted-foreground group-hover:text-accent" aria-hidden />
            Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
