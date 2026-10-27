import { FaqList } from "@/components/faq-list";
import { faq } from "@/data/faq";
import { getLocale, getTranslations } from "next-intl/server";

/** Görünür SSS — FAQPage JSON-LD ile aynı kaynak (data/faq.ts). */
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
        <div className="mt-12">
          <FaqList items={faq} locale={locale} />
        </div>
      </div>
    </section>
  );
}
