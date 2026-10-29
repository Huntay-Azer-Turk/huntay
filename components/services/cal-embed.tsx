"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { track } from "@/lib/track";
import { useEffect, useRef, useState } from "react";

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
  const t = useTranslations("BookPage");
  const namespace = calLink.split("/").pop() || "booking";
  const containerId = `cal-inline-${namespace}`;
  const initialized = useRef(false);
  const [ready, setReady] = useState(false);
  // /packages sayfasından gelindiyse (?package=<paket adı>) seçilen paket randevu notuna yazılır.
  const [selectedPackage, setSelectedPackage] = useState("");
  const theme = resolvedTheme === "corporate" ? "light" : "dark";

  useEffect(() => {
    if (!resolvedTheme) return;
    const Cal = getCal();
    const pkg = (new URLSearchParams(window.location.search).get("package") ?? "").slice(0, 80);
    if (!initialized.current) {
      initialized.current = true;
      Cal("init", namespace, { origin: "https://app.cal.com" });
      Cal.ns?.[namespace]?.("inline", {
        elementOrSelector: `#${containerId}`,
        calLink,
        config: {
          layout: "month_view",
          theme,
          ...(pkg ? { notes: `${t("packageNotePrefix")}: ${pkg}` } : {}),
        },
      });
      // Cal.com'un kendi yükleyicisi kaybolurken takvimi aşağı itiyor (CLS). Takvim hazır olana kadar
      // görünmez tutulur; görünmez öğelerin kayması ölçüme girmez. Olay gelmezse 10 sn sonra yine gösterilir.
      Cal.ns?.[namespace]?.("on", { action: "linkReady", callback: () => setReady(true) });
      window.setTimeout(() => setReady(true), 10_000);
      // Randevu tamamlanınca dönüşüm olayı (ziyaretçi izin vermediyse hiçbir yere gönderilmez).
      Cal.ns?.[namespace]?.("on", {
        action: "bookingSuccessful",
        callback: () => track({ name: "generate_lead", params: { method: "booking", source: "book_page" } }),
      });
    }
    Cal.ns?.[namespace]?.("ui", {
      theme,
      cssVarsPerTheme,
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  }, [resolvedTheme, theme, calLink, namespace, containerId, t]);

  useEffect(() => {
    const pkg = (new URLSearchParams(window.location.search).get("package") ?? "").slice(0, 80);
    // Adres çubuğu yalnızca tarayıcıda okunabilir; bilgi satırı ilk çizimden sonra eklenir.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (pkg) setSelectedPackage(pkg);
  }, []);

  // Takvim yüklenmeden önce son yüksekliği kadar yer ayrılır; aksi hâlde sayfa aşağı kayar (CLS).
  // Ölçümler (29 Ekim, Cal.com ay görünümü): telefonda ~1260px, 640–815px arası ~1450px (alt alta düzen),
  // ≥816px'te (kapsayıcı ~768px+) yan yana düzen ~560px.
  return (
    // Yer ayırma (min-height) dış kapsayıcıda: Cal.com'un <cal-inline> öğesi min-height'i iç kutudan
    // miras alıyor ve takvimi o yüksekliğin ortasına yerleştiriyor (üstte boşluk kalıyordu).
    <div className="relative min-h-[1250px] sm:min-h-[1440px] min-[816px]:min-h-[560px]">
      {selectedPackage ? (
        <p className="border-b border-border px-4 py-3 text-sm text-foreground">
          {t("selectedPackage")}: <strong>{selectedPackage}</strong>
        </p>
      ) : null}
      {!ready ? (
        <p className="absolute inset-x-0 top-16 text-center text-sm text-muted-foreground" aria-live="polite">
          {t("loading")}
        </p>
      ) : null}
      <div
        id={containerId}
        className={`w-full overflow-auto ${ready ? "" : "invisible"}`}
      />
    </div>
  );
}
