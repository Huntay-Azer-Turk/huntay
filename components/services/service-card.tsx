import type { ServiceItem } from "@/data/types";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Check } from "lucide-react";
import { ServiceIcon } from "./service-icon";

/**
 * Hizmet kartı — ana sayfa “Hizmetler” bölümü ve /services sayfası.
 * `highlights`: alan kartlarında "neler yapıyorum" listesinden ilk birkaç madde.
 */
export function ServiceCard({
  service,
  locale,
  detailsLabel,
  headingLevel = "h3",
  highlights,
}: {
  service: ServiceItem;
  locale: "en" | "tr";
  detailsLabel: string;
  headingLevel?: "h2" | "h3";
  highlights?: string[];
}) {
  const Heading = headingLevel;
  return (
    <Link
      href={`/services/${service.slug}`}
      className="glow-ring group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition hover:border-accent"
    >
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-accent">
        <ServiceIcon icon={service.icon} className="h-5 w-5" />
      </span>
      <Heading className="mt-4 text-lg font-semibold text-foreground group-hover:text-accent">
        {service.title[locale]}
      </Heading>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.tagline[locale]}</p>
      {highlights?.length ? (
        <ul className="mt-4 space-y-2">
          {highlights.map((item) => (
            <li key={item} className="flex gap-2 text-sm text-foreground">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
      <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-accent">
        {detailsLabel}
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
      </span>
    </Link>
  );
}
