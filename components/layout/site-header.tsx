"use client";

import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { LocaleSwitcher } from "@/components/interactive/locale-switcher";
import { ThemeToggle } from "@/components/interactive/theme-toggle";

const navKeys = [
  "about",
  "metrics",
  "cases",
  "stack",
  "timeline",
  "featured",
  "contact",
] as const;

export function SiteHeader() {
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl min-w-0 items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-6">
        <Link
          href="/"
          className="shrink-0 font-mono text-sm font-semibold tracking-tight text-foreground"
        >
          {siteConfig.name.split(" ")[0]}
          <span className="text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label={t("ariaMain")}>
          {navKeys.map((key) => (
            <a
              key={key}
              href={`#${key}`}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-card hover:text-foreground"
            >
              {t(key)}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <LocaleSwitcher />
          <div className="shrink-0">
            <ThemeToggle />
          </div>
          <button
            type="button"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-border bg-card md:hidden sm:h-9 sm:w-9 sm:min-h-0 sm:min-w-0"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? t("closeMenu") : t("openMenu")}
          >
            {open ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-background px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1" aria-label={t("ariaMobile")}>
            {navKeys.map((key) => (
              <a
                key={key}
                href={`#${key}`}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground"
                onClick={() => setOpen(false)}
              >
                {t(key)}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
