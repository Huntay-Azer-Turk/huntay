"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Globe } from "lucide-react";

export function LocaleSwitcher() {
  const t = useTranslations("Locale");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <label className="flex shrink-0 items-center gap-1 text-muted-foreground sm:gap-2 sm:text-sm">
      <Globe className="hidden h-4 w-4 shrink-0 sm:block" aria-hidden />
      <span className="sr-only">{t("switch")}</span>
      <select
        className="min-h-[44px] w-[7.25rem] shrink-0 cursor-pointer rounded-lg border border-border bg-card px-2 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-accent sm:min-h-0 sm:w-auto sm:min-w-[8rem] sm:py-1.5 sm:text-sm"
        value={locale}
        onChange={(e) => router.replace(pathname, { locale: e.target.value })}
        aria-label={t("switch")}
      >
        <option value="en">{t("en")}</option>
        <option value="tr">{t("tr")}</option>
      </select>
    </label>
  );
}
