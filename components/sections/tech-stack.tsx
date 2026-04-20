import { techStack } from "@/data/techStack";
import { getLocale, getTranslations } from "next-intl/server";

export async function TechStack() {
  const locale = (await getLocale()) as "en" | "tr";
  const t = await getTranslations("Stack");

  return (
    <section id="stack" className="border-b border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground">
          {t("title")}
        </h2>
        <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {techStack.map((group) => (
            <div key={group.id} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-mono text-sm font-medium text-accent">
                {group.title[locale]}
              </h3>
              <ul className="mt-4 space-y-2">
                {group.items.map((item) => (
                  <li
                    key={item.en}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {item[locale]}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
