"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

/**
 * Cal.com satır içi (inline) randevu takvimi — resmi embed.js betiğiyle.
 * Site temasına uyar: "bare-metal" → koyu, "corporate" → açık.
 */

type CalFn = ((...args: unknown[]) => void) & {
  loaded?: boolean;
  ns?: Record<string, (...args: unknown[]) => void>;
  q?: unknown[];
};

declare global {
  interface Window {
    Cal?: CalFn;
  }
}

const EMBED_SCRIPT = "https://app.cal.com/embed/embed.js";

/** Takvimdeki vurgu renkleri site temasıyla aynı (app/globals.css). */
const cssVarsPerTheme = {
  dark: { "cal-brand": "#22d3ee", "cal-brand-emphasis": "#67e8f9", "cal-brand-text": "#0a0a0a" },
  light: { "cal-brand": "#0f766e", "cal-brand-emphasis": "#115e59", "cal-brand-text": "#f8fafc" },
};

/** Cal.com’un resmi yükleyici kodunun okunur hâli: komutları kuyruğa alır, betik yüklenince işler. */
function getCal(): CalFn {
  if (window.Cal) return window.Cal;
  const push = (target: { q?: unknown[] }, args: unknown) => {
    (target.q = target.q || []).push(args);
  };
  const cal = function (...args: unknown[]) {
    if (!cal.loaded) {
      cal.ns = {};
      cal.q = cal.q || [];
      const script = document.createElement("script");
      script.src = EMBED_SCRIPT;
      script.async = true;
      document.head.appendChild(script);
      cal.loaded = true;
    }
    if (args[0] === "init") {
      const namespace = args[1];
      const api = function (...apiArgs: unknown[]) {
        push(api, apiArgs);
      } as CalFn;
      if (typeof namespace === "string") {
        cal.ns![namespace] = cal.ns![namespace] || api;
        push(cal.ns![namespace] as CalFn, args);
        push(cal, ["initNamespace", namespace]);
      } else {
        push(cal, args);
      }
      return;
    }
    push(cal, args);
  } as CalFn;
  window.Cal = cal;
  return cal;
}

type Props = {
  /** "kullanici/randevu-tipi", ör. "huntay/intro-call" */
  calLink: string;
};

export function CalEmbed({ calLink }: Props) {
  const { resolvedTheme } = useTheme();
  const namespace = calLink.split("/").pop() || "booking";
  const containerId = `cal-inline-${namespace}`;
  const initialized = useRef(false);
  const theme = resolvedTheme === "corporate" ? "light" : "dark";

  useEffect(() => {
    if (!resolvedTheme) return;
    const Cal = getCal();
    if (!initialized.current) {
      initialized.current = true;
      Cal("init", namespace, { origin: "https://app.cal.com" });
      Cal.ns?.[namespace]?.("inline", {
        elementOrSelector: `#${containerId}`,
        calLink,
        config: { layout: "month_view", theme },
      });
    }
    Cal.ns?.[namespace]?.("ui", {
      theme,
      cssVarsPerTheme,
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  }, [resolvedTheme, theme, calLink, namespace, containerId]);

  return <div id={containerId} className="min-h-[560px] w-full overflow-auto" />;
}
