"use client";

import { Link } from "@/i18n/navigation";
import {
  analyticsConfig,
  CONSENT_MAX_AGE_DAYS,
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  hasAnyConsentTags,
  hasMarketingTags,
  type ConsentChoice,
} from "@/lib/analytics";
import { track } from "@/lib/track";
import { buttonPrimary, buttonSecondary } from "@/lib/ui";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Çerez onayı + ölçüm etiketleri.
 * - Onaydan önce hiçbir çerez yazılmaz, Google/Meta/LinkedIn'e istek gitmez.
 * - "Kabul et" ve "Reddet" eşit ağırlıkta; tercih alt bilgideki "Çerez ayarları" ile her an değiştirilebilir.
 * - Tercih tarayıcıda (localStorage) tarih ve sürümle saklanır; 12 ay sonra veya sürüm değişince yeniden sorulur.
 */
export const OPEN_CONSENT_EVENT = "hz:open-consent";

function readChoice(): ConsentChoice | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const choice = JSON.parse(raw) as ConsentChoice;
    const ageDays = (Date.now() - new Date(choice.at).getTime()) / 86_400_000;
    if (choice.v !== CONSENT_VERSION || !(ageDays < CONSENT_MAX_AGE_DAYS)) return null;
    return choice;
  } catch {
    return null;
  }
}

function saveChoice(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(choice));
  } catch {
    /* Depolama kapalıysa tercih yalnızca bu sayfa için geçerli olur. */
  }
}

function loadScript(src: string) {
  if (document.querySelector(`script[src="${src}"]`)) return;
  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

/** Google etiketi (GA4 + Google Ads). Consent Mode v2 sinyalleri her durumda gönderilir. */
function loadGoogle(choice: ConsentChoice) {
  const { ga4Id, googleAdsId } = analyticsConfig;
  const useGa = choice.analytics && Boolean(ga4Id);
  const useAds = choice.marketing && Boolean(googleAdsId);
  if (!useGa && !useAds) return;
  if (!window.gtag) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // gtag.js "arguments" nesnesini bekler; dizi verilirse komutlar işlenmez.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
    });
    window.gtag("js", new Date());
  }
  window.gtag("consent", "update", {
    analytics_storage: choice.analytics ? "granted" : "denied",
    ad_storage: choice.marketing ? "granted" : "denied",
    ad_user_data: choice.marketing ? "granted" : "denied",
    ad_personalization: choice.marketing ? "granted" : "denied",
  });
  if (useGa) window.gtag("config", ga4Id);
  if (useAds) window.gtag("config", googleAdsId);
  loadScript(`https://www.googletagmanager.com/gtag/js?id=${useGa ? ga4Id : googleAdsId}`);
}

function loadMeta() {
  const id = analyticsConfig.metaPixelId;
  if (!id || window.fbq) return;
  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) (fbq.callMethod as (...a: unknown[]) => void)(...args);
    else fbq.queue!.push(args);
  } as NonNullable<Window["fbq"]> & { push?: unknown; loaded?: boolean; version?: string };
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq = fbq;
  loadScript("https://connect.facebook.net/en_US/fbevents.js");
  fbq("init", id);
  fbq("track", "PageView");
}

/** Microsoft Clarity: yalnızca analitik izniyle; reklam depolaması reddedilmiş olarak işaretlenir. */
function loadClarity(choice: ConsentChoice) {
  const id = analyticsConfig.clarityId;
  if (!id || !choice.analytics) return;
  if (!window.clarity) {
    const clarity = function (...args: unknown[]) {
      clarity.q!.push(args);
    } as NonNullable<Window["clarity"]>;
    clarity.q = [];
    window.clarity = clarity;
    loadScript(`https://www.clarity.ms/tag/${id}`);
  }
  window.clarity("consentv2", {
    ad_Storage: choice.marketing ? "granted" : "denied",
    analytics_Storage: "granted",
  });
}

function loadLinkedIn() {
  const id = analyticsConfig.linkedinPartnerId;
  if (!id || window.lintrk) return;
  window._linkedin_partner_id = id;
  window._linkedin_data_partner_ids = [...(window._linkedin_data_partner_ids ?? []), id];
  const lintrk = function (...args: unknown[]) {
    lintrk.q!.push(args);
  } as NonNullable<Window["lintrk"]>;
  lintrk.q = [];
  window.lintrk = lintrk;
  loadScript("https://snap.licdn.com/li/lms-analytics/insight.min.js");
}

function applyChoice(choice: ConsentChoice) {
  loadGoogle(choice);
  loadClarity(choice);
  if (choice.marketing) {
    loadMeta();
    loadLinkedIn();
  }
}

/** İzin geri alındığında bu sitenin ölçüm çerezlerini siler. */
function clearTrackingCookies() {
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`, `.${host.replace(/^www\./, "")}`];
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0]?.trim();
    if (!name || !/^(_ga|_gid|_gcl_|_fbp|_fbc|li_|lidc|bcookie|_uet|_clck|_clsk|CLID)/.test(name)) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
}

function contactMethod(href: string): "whatsapp" | "email" | "phone" | "linkedin" | null {
  if (href.startsWith("mailto:")) return "email";
  if (href.startsWith("tel:")) return "phone";
  if (/^https?:\/\/(api\.)?(wa\.me|whatsapp\.com)/.test(href)) return "whatsapp";
  if (/^https?:\/\/([a-z]+\.)?linkedin\.com\//.test(href)) return "linkedin";
  return null;
}

export function ConsentManager() {
  const t = useTranslations("Consent");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const current = useRef<ConsentChoice | null>(null);

  useEffect(() => {
    if (!hasAnyConsentTags) return;
    const choice = readChoice();
    current.current = choice;
    if (choice) {
      applyChoice(choice);
    } else {
      // Tarayıcıya özel (localStorage) tercih ancak istemcide okunabilir; pencere ilk çizimden sonra açılır.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(true);
    }
    const reopen = () => {
      const saved = current.current;
      setAnalytics(saved?.analytics ?? false);
      setMarketing(saved?.marketing ?? false);
      setDetails(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  // Meta Pixel tek sayfa uygulamasında sayfa değişimlerini kendisi görmez (GA4 geliştirilmiş ölçümle görür).
  const firstPath = useRef(true);
  useEffect(() => {
    if (firstPath.current) {
      firstPath.current = false;
      return;
    }
    window.fbq?.("track", "PageView");
  }, [pathname]);

  // İletişim ve randevu bağlantılarına tıklamalar (izin yoksa track() hiçbir şey göndermez).
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.("a");
      const href = anchor?.getAttribute("href");
      if (!anchor || !href) return;
      const location = window.location.pathname;
      const method = contactMethod(href);
      if (method) {
        track({ name: "contact_click", params: { method, location } });
        return;
      }
      if (/^\/(tr\/)?book\/?$/.test(href) && !/\/book\/?$/.test(location)) {
        track({ name: "cta_click", params: { target: "book", location } });
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  const decide = useCallback((next: { analytics: boolean; marketing: boolean }) => {
    const previous = current.current;
    const choice: ConsentChoice = { ...next, at: new Date().toISOString(), v: CONSENT_VERSION };
    saveChoice(choice);
    current.current = choice;
    setOpen(false);
    const revoked =
      (previous?.analytics && !choice.analytics) || (previous?.marketing && !choice.marketing);
    if (revoked) {
      window.gtag?.("consent", "update", {
        analytics_storage: choice.analytics ? "granted" : "denied",
        ad_storage: choice.marketing ? "granted" : "denied",
        ad_user_data: choice.marketing ? "granted" : "denied",
        ad_personalization: choice.marketing ? "granted" : "denied",
      });
      window.fbq?.("consent", "revoke");
      window.clarity?.("consentv2", { ad_Storage: "denied", analytics_Storage: "denied" });
      clearTrackingCookies();
      // Yüklenmiş etiketler bellekten ancak sayfa yenilenince tamamen çıkar.
      window.location.reload();
      return;
    }
    applyChoice(choice);
  }, []);

  if (!open || !hasAnyConsentTags) return null;

  const toggleClass =
    "mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[var(--color-accent)] disabled:cursor-not-allowed";

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      className="fixed inset-x-3 bottom-3 z-50 sm:inset-x-auto sm:right-4 sm:bottom-4 sm:max-w-md"
    >
      <div className="rounded-2xl border border-border bg-card p-5 text-sm text-foreground shadow-2xl">
        <h2 id="consent-title" className="text-base font-semibold">
          {t("title")}
        </h2>
        <p className="mt-2 text-muted-foreground">
          {t("body")}{" "}
          <Link href="/privacy#cookies" className="text-accent underline-offset-2 hover:underline">
            {t("policy")}
          </Link>
        </p>

        {details ? (
          <ul className="mt-4 space-y-3">
            <li className="flex gap-3">
              <input type="checkbox" checked disabled className={toggleClass} id="consent-necessary" />
              <label htmlFor="consent-necessary">
                <span className="font-medium">{t("necessary")}</span>
                <span className="block text-muted-foreground">{t("necessaryDesc")}</span>
              </label>
            </li>
            <li className="flex gap-3">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className={toggleClass}
                id="consent-analytics"
              />
              <label htmlFor="consent-analytics" className="cursor-pointer">
                <span className="font-medium">{t("analytics")}</span>
                <span className="block text-muted-foreground">{t("analyticsDesc")}</span>
              </label>
            </li>
            {hasMarketingTags ? (
              <li className="flex gap-3">
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className={toggleClass}
                  id="consent-marketing"
                />
                <label htmlFor="consent-marketing" className="cursor-pointer">
                  <span className="font-medium">{t("marketing")}</span>
                  <span className="block text-muted-foreground">{t("marketingDesc")}</span>
                </label>
              </li>
            ) : null}
          </ul>
        ) : null}

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            className={`${buttonSecondary} px-3 py-2`}
            onClick={() => decide({ analytics: false, marketing: false })}
          >
            {t("reject")}
          </button>
          <button
            type="button"
            className={`${buttonSecondary} px-3 py-2`}
            onClick={() => decide({ analytics: true, marketing: hasMarketingTags })}
          >
            {t("accept")}
          </button>
          {details ? (
            <button
              type="button"
              className={`${buttonPrimary} col-span-2 px-3 py-2`}
              onClick={() => decide({ analytics, marketing: hasMarketingTags && marketing })}
            >
              {t("save")}
            </button>
          ) : (
            <button
              type="button"
              className="col-span-2 py-1 text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
              onClick={() => setDetails(true)}
            >
              {t("customize")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/** Alt bilgideki "Çerez ayarları" bağlantısı. */
export function ConsentSettingsButton({ label, className }: { label: string; className?: string }) {
  if (!hasAnyConsentTags) return null;
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
    >
      {label}
    </button>
  );
}
