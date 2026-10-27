import { Breadcrumbs } from "@/components/services/breadcrumbs";
import { privacySections, privacyUpdatedAt } from "@/data/privacy";
import { buildMetadata, type AppLocale } from "@/lib/seo";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });
  return buildMetadata({
    locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/privacy",
  });
}

/** Metindeki https:// adreslerini tıklanabilir yapar (veri düz metin olarak tutulur). */
function linkify(text: string) {
  return text.split(/(https?:\/\/[^\s,)]+)/g).map((part, index) =>
    /^https?:\/\//.test(part) ? (
      <a
        key={index}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent hover:underline"
      >
        {part.replace(/^https?:\/\//, "").replace(/\/$/, "")}
      </a>
    ) : (
      part
    ),
  );
}

export default async function PrivacyPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);
  const locale = rawLocale as AppLocale;
  const t = await getTranslations({ locale, namespace: "Privacy" });
  const tb = await getTranslations({ locale, namespace: "Breadcrumbs" });
  const updated = new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(privacyUpdatedAt));

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Breadcrumbs
          label={tb("label")}
          items={[{ name: tb("home"), href: "/" }, { name: tb("privacy") }]}
        />
        <h1 className="mt-10 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 font-mono text-xs text-muted-foreground">
          {t("updated")}: <time dateTime={privacyUpdatedAt}>{updated}</time>
        </p>
        <div className="mt-12 space-y-10">
          {privacySections.map((section) => (
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
