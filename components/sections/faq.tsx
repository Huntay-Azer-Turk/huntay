import { faq } from "@/data/faq";
import { getLocale, getTranslations } from "next-intl/server";
import { ChevronDown } from "lucide-react";

/**
 * Görünür SSS — FAQPage JSON-LD ile aynı kaynak (data/faq.ts).
 * Yerel <details>: JS gerektirmez, cevaplar HTML’de tam olarak bulunur (JS çalıştırmayan AI tarayıcıları için).
 */
export async function Faq() {
  const locale = (await getLocale()) as "en" | "tr";
  const t = await getTranslations("Faq");

  return (
    <section id="faq" className="border-b border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground">
          {t("title")}
        </h2>
        <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>
        <div className="mt-12 space-y-4">
          {faq.map((item) => (
            <details
              key={item.id}
              id={`faq-${item.id}`}
              className="group scroll-mt-24 rounded-2xl border border-border bg-card px-6 py-5 transition open:border-accent/40"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 [&::-webkit-details-marker]:hidden">
                <h3 className="text-base font-semibold text-foreground sm:text-lg">
                  {item.question[locale]}
                </h3>
                <ChevronDown
                  className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <p className="mt-4 max-w-4xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {item.answer[locale]}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
