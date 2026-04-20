import { personJsonLd } from "@/lib/seo";

export function JsonLd({ locale }: { locale: string }) {
  const data = personJsonLd(locale);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
