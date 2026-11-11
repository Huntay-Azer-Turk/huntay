import { Link } from "@/i18n/navigation";
import { buttonPrimary } from "@/lib/ui";
import { CalendarClock, Check } from "lucide-react";
import { getTranslations } from "next-intl/server";

/**
 * Ana sayfa "Uzmanlık ve yaklaşım" (11 Kasım 2026). LinkedIn "Hakkında" metniyle aynı yapı: uzmanlık paragrafı,
 * üç odak alanı, tek eylem çağrısı. Bulut/IoT, güvenlik ve teknik liderlik burada yok (gizli hizmetler,
 * data/catalog.ts): ana sayfa "her şeyi yapan" izlenimi vermesin.
 */
const FOCUS = ["focus1", "focus2", "focus3"] as const;

export async function Expertise() {
  const t = await getTranslations("Expertise");

  return (
    <section id="expertise" className="scroll-mt-16 border-b border-border py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">{t("eyebrow")}</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">{t("title")}</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">{t("body")}</p>
          <Link href="/book" className={`${buttonPrimary} mt-8`}>
            <CalendarClock className="h-4 w-4" aria-hidden />
            {t("book")}
          </Link>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <h3 className="text-lg font-semibold text-foreground">{t("focusTitle")}</h3>
          <ul className="mt-4 space-y-3">
            {FOCUS.map((key) => (
              <li key={key} className="flex gap-3 text-muted-foreground">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                <span>{t(key)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
