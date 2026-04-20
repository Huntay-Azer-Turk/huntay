"use client";

import { useTranslations } from "next-intl";
import { Laptop, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import { startTransition, useEffect, useState } from "react";

export function ThemeToggle() {
  const t = useTranslations("Theme");
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    startTransition(() => setMounted(true));
  }, []);

  if (!mounted) {
    return (
      <span className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-border bg-card opacity-50 sm:h-9 sm:w-9 sm:min-h-0 sm:min-w-0" />
    );
  }

  const current = theme ?? resolvedTheme ?? "bare-metal";
  const next = current === "bare-metal" ? "corporate" : "bare-metal";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-border bg-card text-foreground transition hover:border-accent hover:text-accent sm:h-9 sm:w-9 sm:min-h-0 sm:min-w-0"
      aria-label={t("toggleTheme")}
      title={`${t("bareMetal")} / ${t("corporate")}`}
    >
      {current === "bare-metal" ? (
        <Sparkles className="h-4 w-4" aria-hidden />
      ) : (
        <Laptop className="h-4 w-4" aria-hidden />
      )}
    </button>
  );
}
