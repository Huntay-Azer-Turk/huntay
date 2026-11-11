import { Link } from "@/i18n/navigation";
import { buttonPrimary, buttonSecondary } from "@/lib/ui";
import { LEAD_UNIT_ID, aiUnits, type AiUnitIcon } from "@/data/ai-units";
import {
  ArrowRight,
  CalendarClock,
  Factory,
  Headset,
  Megaphone,
  Radar,
  ScanSearch,
  ShieldCheck,
  ShoppingCart,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

/**
 * Ana sayfa "Nasıl çalışıyoruz" bölümü (11 Kasım 2026): üreticilerde yapay zekâ dönüşümü teknik servis ve help desk
 * asistanıyla başlar. Sıra: müşterinin derdi → üç adım (tarama, help desk pilotu, canlı kurulum) → diğer birimler
 * (data/ai-units.ts, her biri kendi tasarım paketine) → kanıt.
 * Adımlar ve birimler paketler sayfasındaki paket kimliklerine bağlanır (#id); paket D1'de pasifse bağlantı sayfanın başına düşer.
 */
const STEPS = [
  { key: "step1", packageId: "ai-opportunity-scan" },
  { key: "step2", packageId: "ai-agent-pilot" },
  { key: "step3", packageId: "ai-production-rollout" },
] as const;

const UNIT_ICONS: Record<AiUnitIcon, LucideIcon> = {
  headset: Headset,
  scan: ScanSearch,
  factory: Factory,
  cart: ShoppingCart,
  megaphone: Megaphone,
  radar: Radar,
  truck: Truck,
  shield: ShieldCheck,
};

const OTHER_UNITS = aiUnits.filter((unit) => unit.id !== LEAD_UNIT_ID);

export async function AiPath() {
  const t = await getTranslations("AiPath");
  const locale = (await getLocale()) as "en" | "tr";

  return (
    <section id="how" className="scroll-mt-16 border-b border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">{t("eyebrow")}</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">{t("title")}</h2>
        <p className="mt-2 max-w-3xl text-muted-foreground">{t("subtitle")}</p>

        <div className="mt-10 rounded-2xl border border-border bg-card p-6 sm:p-8">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <Headset className="h-5 w-5 text-accent" aria-hidden />
            {t("painTitle")}
          </h3>
          <ul className="mt-4 space-y-3">
            {(["pain1", "pain2", "pain3"] as const).map((key) => (
              <li key={key} className="flex gap-3 text-muted-foreground">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                <span>{t(key)}</span>
              </li>
            ))}
          </ul>
        </div>

        <h3 className="mt-12 text-xl font-semibold text-foreground">{t("stepsTitle")}</h3>
        <ol className="mt-6 grid gap-6 md:grid-cols-3">
          {STEPS.map((step) => (
            <li key={step.key}>
              <Link
                href={`/packages#${step.packageId}`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition hover:border-accent"
              >
                <span className="font-semibold text-foreground group-hover:text-accent">{t(`${step.key}Title`)}</span>
                <span className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`${step.key}Text`)}</span>
              </Link>
            </li>
          ))}
        </ol>

        <h3 className="mt-12 text-xl font-semibold text-foreground">{t("areasTitle")}</h3>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {OTHER_UNITS.map((unit) => {
            const Icon = UNIT_ICONS[unit.icon];
            return (
              <li key={unit.id}>
                <Link
                  href={`/packages#${unit.packageId}`}
                  className="group flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition hover:border-accent"
                >
                  <Icon className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                  <span className="flex-1">{unit.title[locale]}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden />
                </Link>
              </li>
            );
          })}
        </ul>

        <p className="mt-10 max-w-3xl border-l-2 border-accent pl-4 text-sm text-muted-foreground">{t("proof")}</p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link href="/book" className={buttonPrimary}>
            <CalendarClock className="h-4 w-4" aria-hidden />
            {t("book")}
          </Link>
          <Link href="/packages" className={buttonSecondary}>
            {t("packages")}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
