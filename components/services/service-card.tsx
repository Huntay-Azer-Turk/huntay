import type { ServiceItem } from "@/data/types";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { ServiceIcon } from "./service-icon";

/** Hizmet kartı — ana sayfa “Hizmetler” bölümü ve /services sayfası. */
export function ServiceCard({
  service,
  locale,
  detailsLabel,
  headingLevel = "h3",
}: {
  service: ServiceItem;
  locale: "en" | "tr";
  detailsLabel: string;
  headingLevel?: "h2" | "h3";
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
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {service.tagline[locale]}
      </p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
        {detailsLabel}
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
      </span>
    </Link>
  );
}
