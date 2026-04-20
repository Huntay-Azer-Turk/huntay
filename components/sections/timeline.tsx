import { credentials, education } from "@/data/education";
import { experience } from "@/data/experience";
import { getLocale, getTranslations } from "next-intl/server";

export async function Timeline() {
  const locale = (await getLocale()) as "en" | "tr";
  const t = await getTranslations("Timeline");

  return (
    <section id="timeline" className="border-b border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground">
          {t("experienceTitle")}
        </h2>
        <ol className="relative mt-12 space-y-10 border-l border-border pl-6 sm:pl-8">
          {experience.map((item) => (
            <li key={item.id} className="relative">
              {/* Düğüm çizgi üzerinde; metin pl ile düğümden ayrılır (tarih çakışması önlenir) */}
              <span
                className="absolute -left-[6px] top-1.5 z-0 h-3 w-3 rounded-full border-2 border-accent bg-background sm:-left-[9px]"
                aria-hidden
              />
              <div className="relative z-10 pl-3 sm:pl-2">
                <p className="font-mono text-xs text-accent">{item.period[locale]}</p>
                <h3 className="mt-1 text-lg font-semibold text-foreground">
                  {item.role[locale]}
                </h3>
                <p className="text-sm text-muted-foreground">{item.org[locale]}</p>
                {item.location ? (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.location[locale]}
                  </p>
                ) : null}
                {item.highlights?.map((h, i) => (
                  <p key={i} className="mt-2 text-sm text-muted-foreground">
                    {h[locale]}
                  </p>
                ))}
              </div>
            </li>
          ))}
        </ol>

        <h2 className="mt-20 text-3xl font-semibold tracking-tight text-foreground">
          {t("educationTitle")}
        </h2>
        <ol className="relative mt-12 space-y-10 border-l border-border pl-6 sm:pl-8">
          {education.map((item) => (
            <li key={item.id} className="relative">
              <span
                className="absolute -left-[6px] top-1.5 z-0 h-3 w-3 rounded-full border-2 border-accent bg-background sm:-left-[9px]"
                aria-hidden
              />
              <div className="relative z-10 pl-3 sm:pl-2">
                <p className="font-mono text-xs text-accent">{item.period[locale]}</p>
                <h3 className="mt-1 text-lg font-semibold text-foreground">
                  {item.role[locale]}
                </h3>
                <p className="text-sm text-muted-foreground">{item.org[locale]}</p>
              </div>
            </li>
          ))}
        </ol>

        <h2 className="mt-16 text-2xl font-semibold tracking-tight text-foreground">
          {t("credentialsTitle")}
        </h2>
        <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
          {credentials.certs.map((c) => (
            <li key={c.en} className="flex gap-2">
              <span className="text-accent">—</span>
              {c[locale]}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted-foreground">{credentials.interests[locale]}</p>
      </div>
    </section>
  );
}
