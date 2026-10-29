"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";
import { useLocale, useTranslations } from "next-intl";
import { CalendarClock, Menu, X } from "lucide-react";
import NextLink from "next/link";
import { useState } from "react";
import { LocaleSwitcher } from "@/components/interactive/locale-switcher";
import { ThemeToggle } from "@/components/interactive/theme-toggle";

/**
 * Ana sayfa bölümleri (#about …). Hizmetler ayrı bir sayfa: /services.
 * "Rakamlar" (#metrics) ve "Teknolojiler" (#stack) menüde yer almıyor — bölümler sayfada duruyor;
 * Hizmetler ve "Görüşme planla" eklenince menü tek satıra sığsın diye.
 */
const sectionKeys = ["about", "cases", "timeline", "featured", "faq", "contact"] as const;
/** Masaüstü menüde yer kalsın diye (Paketler eklendi) "Deneyim" ve "Yazılar" yalnızca mobil menüde. */
const desktopSectionKeys = ["cases", "faq", "contact"] as const;

const linkClass =
  "whitespace-nowrap rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-card hover:text-foreground";

export function SiteHeader() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Bölüm linkleri her sayfadan ana sayfaya gider: "/#about" (EN), "/tr#about" (TR)
  const home = locale === routing.defaultLocale ? "" : `/${locale}`;
  const sectionHref = (key: string) => (home ? `${home}#${key}` : `/#${key}`);
  const onServices = pathname.startsWith("/services");
  const onPackages = pathname.startsWith("/packages");

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl min-w-0 items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-6">
        <Link
          href="/"
          className="shrink-0 font-mono text-sm font-semibold tracking-tight text-foreground"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          {siteConfig.name.split(" ")[0]}
          <span className="text-accent">.</span>
        </Link>

        {/* lg altı: bağlantılar + dil seçici + tema + "Görüşme planla" tek satıra sığmıyor; hamburger menü. */}
        <nav className="hidden items-center lg:flex" aria-label={t("ariaMain")}>
          <NextLink href={sectionHref("about")} className={linkClass}>
            {t("about")}
          </NextLink>
          <Link
            href="/services"
            className={`${linkClass} ${onServices ? "text-foreground" : ""}`}
            aria-current={onServices ? "page" : undefined}
          >
            {t("services")}
          </Link>
          <Link
            href="/packages"
            className={`${linkClass} ${onPackages ? "text-foreground" : ""}`}
            aria-current={onPackages ? "page" : undefined}
          >
            {t("packages")}
          </Link>
          {desktopSectionKeys.map((key) => (
            <NextLink key={key} href={sectionHref(key)} className={linkClass}>
              {t(key)}
            </NextLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <LocaleSwitcher />
          <div className="shrink-0">
            <ThemeToggle />
          </div>
          <Link
            href="/book"
            className="hidden items-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-sm font-medium text-[var(--color-on-accent)] transition hover:opacity-90 md:inline-flex"
          >
            <CalendarClock className="h-4 w-4" aria-hidden />
            {t("book")}
          </Link>
          <button
            type="button"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-border bg-card lg:hidden sm:h-9 sm:w-9 sm:min-h-0 sm:min-w-0"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? t("closeMenu") : t("openMenu")}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-background px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label={t("ariaMobile")}>
            <NextLink
              href={sectionHref("about")}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground"
              onClick={() => setOpen(false)}
            >
              {t("about")}
            </NextLink>
            <Link
              href="/services"
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground"
              onClick={() => setOpen(false)}
            >
              {t("services")}
            </Link>
            <Link
              href="/packages"
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground"
              onClick={() => setOpen(false)}
            >
              {t("packages")}
            </Link>
            {sectionKeys.slice(1).map((key) => (
              <NextLink
                key={key}
                href={sectionHref(key)}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground"
                onClick={() => setOpen(false)}
              >
                {t(key)}
              </NextLink>
            ))}
            <Link
              href="/book"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-medium text-[var(--color-on-accent)]"
              onClick={() => setOpen(false)}
            >
              <CalendarClock className="h-4 w-4" aria-hidden />
              {t("book")}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
