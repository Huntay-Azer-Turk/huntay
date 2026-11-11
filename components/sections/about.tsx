import { aboutAiProject, philosophy, strategicPartner } from "@/data/profile";
import { getLocale, getTranslations } from "next-intl/server";

export async function About() {
  const locale = (await getLocale()) as "en" | "tr";
  const t = await getTranslations("About");

  // 11 Kasım 2026 (tek odak): bilişsel bilimler, güvenlik, araştırma ve spor blokları sitede yok (data/profile.ts'de duruyor).
  const blocks = [
    { title: t("partnerTitle"), body: strategicPartner[locale] },
    { title: t("aiTitle"), body: aboutAiProject[locale] },
    { title: t("philosophyTitle"), body: philosophy[locale] },
  ];

  return (
    <section id="about" className="border-b border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground">
          {t("title")}
        </h2>
        <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {blocks.map((b) => (
            <article
              key={b.title}
              className="glow-ring rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="font-mono text-sm font-medium text-accent">
                {b.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {b.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
