import { Breadcrumbs } from "@/components/services/breadcrumbs";
import type { LegalSection } from "@/data/types";
import type { AppLocale } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

type Props = {
  locale: AppLocale;
  title: string;
  updatedLabel: string;
  /** YYYY-MM-DD */
  updatedAt: string;
  sections: LegalSection[];
  breadcrumbs: { label: string; home: string; current: string };
};

const linkClass = "text-accent hover:underline";

/**
 * Metindeki https:// adreslerini tıklanabilir yapar (veri düz metin olarak tutulur).
 * Cümle sonundaki noktalama bağlantıya dahil edilmez; sitenin kendi sayfaları aynı sekmede açılır.
 */
function linkify(text: string) {
  return text.split(/(https?:\/\/[^\s,)]*[^\s,).;:!?])/g).map((part, index) => {
    if (!/^https?:\/\//.test(part)) return part;
    const label = part.replace(/^https?:\/\//, "").replace(/\/$/, "");
    if (part.startsWith(siteConfig.baseUrl)) {
      return (
        <a key={index} href={part.slice(siteConfig.baseUrl.length) || "/"} className={linkClass}>
          {label}
        </a>
      );
    }
    return (
      <a key={index} href={part} target="_blank" rel="noopener noreferrer" className={linkClass}>
        {label}
      </a>
    );
  });
}

/** Gizlilik politikası ve kullanım koşulları için ortak sayfa düzeni. */
export function LegalDocument({ locale, title, updatedLabel, updatedAt, sections, breadcrumbs }: Props) {
  const updated = new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(updatedAt));

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Breadcrumbs
          label={breadcrumbs.label}
          items={[{ name: breadcrumbs.home, href: "/" }, { name: breadcrumbs.current }]}
        />
        <h1 className="mt-10 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">{title}</h1>
        <p className="mt-4 font-mono text-xs text-muted-foreground">
          {updatedLabel}: <time dateTime={updatedAt}>{updated}</time>
        </p>
        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`}>
              <h2 id={`${section.id}-title`} className="text-xl font-semibold text-foreground">
                {section.title[locale]}
              </h2>
              <div className="mt-3 space-y-3 leading-relaxed text-muted-foreground">
                {section.body.map((paragraph) => (
                  <p key={paragraph.en}>{linkify(paragraph[locale])}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
