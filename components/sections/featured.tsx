import { featured } from "@/data/featured";
import { getLocale, getTranslations } from "next-intl/server";
import { ExternalLink } from "lucide-react";

export async function Featured() {
  const locale = (await getLocale()) as "en" | "tr";
  const t = await getTranslations("Featured");

  return (
    <section id="featured" className="border-b border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground">
          {t("title")}
        </h2>
        <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>
        <ul className="mt-12 space-y-4">
          {featured.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between gap-4 rounded-xl border border-border bg-card px-4 py-4 transition hover:border-accent"
              >
                <div>
                  <p className="font-medium text-foreground group-hover:text-accent">
                    {item.title[locale]}
                  </p>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    {item.source}
                  </p>
                </div>
                <ExternalLink
                  className="mt-1 h-4 w-4 shrink-0 text-muted-foreground group-hover:text-accent"
                  aria-hidden
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
