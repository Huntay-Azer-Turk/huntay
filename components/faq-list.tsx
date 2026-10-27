import type { FaqItem } from "@/data/types";
import { ChevronDown } from "lucide-react";

/**
 * Yerel <details> ile SSS listesi: JS gerektirmez, cevaplar HTML’de tam olarak bulunur
 * (JS çalıştırmayan AI tarayıcıları için). FAQPage JSON-LD ile aynı veriden beslenmeli.
 */
export function FaqList({ items, locale }: { items: FaqItem[]; locale: "en" | "tr" }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
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
  );
}
