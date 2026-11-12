import { heroLead } from "@/data/profile";
import { siteConfig } from "@/lib/site";
import { SELLING_ENABLED } from "@/lib/site-mode";
import { getLocale, getTranslations } from "next-intl/server";
import { CalendarClock, Mail, Tag } from "lucide-react";
import { LinkedinIcon } from "@/components/icons";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

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
        {/* 11 Kasım 2026: tek ana eylem (görüşme) + paketler; sosyal ve asistan bağlantıları İletişim bölümünde ve alt bilgide.
            12 Kasım 2026: öz geçmiş kipinde (lib/site-mode.ts) LinkedIn ve iletişim. */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          {SELLING_ENABLED ? (
            <SalesActions ctaBook={t("ctaBook")} ctaPackages={t("ctaPackages")} />
          ) : (
            <CvActions linkedin={t("ctaLinkedin")} contact={t("ctaContact")} />
          )}
        </div>
      </div>
    </section>
  );
}

function CvActions({ linkedin, contact }: { linkedin: string; contact: string }) {
  return (
    <>
      <a
        href={siteConfig.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-medium text-[var(--color-on-accent)] transition hover:opacity-90"
      >
        <LinkedinIcon className="h-4 w-4" aria-hidden />
        {linkedin}
      </a>
      <a
        href="#contact"
        className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition hover:border-accent"
      >
        <Mail className="h-4 w-4" aria-hidden />
        {contact}
      </a>
    </>
  );
}

function SalesActions({ ctaBook, ctaPackages }: { ctaBook: string; ctaPackages: string }) {
  return (
    <>
      <Link
        href="/book"
        className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-medium text-[var(--color-on-accent)] transition hover:opacity-90"
      >
        <CalendarClock className="h-4 w-4" aria-hidden />
        {ctaBook}
      </Link>
      <Link
        href="/packages"
        className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition hover:border-accent"
      >
        <Tag className="h-4 w-4" aria-hidden />
        {ctaPackages}
      </Link>
    </>
  );
}
