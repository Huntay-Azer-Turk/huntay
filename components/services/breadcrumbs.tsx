import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";

type Crumb = { name: string; href?: string };

/** Görünür sayfa konumu — BreadcrumbList JSON-LD ile aynı sıra. */
export function Breadcrumbs({ items, label }: { items: Crumb[]; label: string }) {
  return (
    <nav aria-label={label} className="text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.name}-${index}`} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link href={item.href} className="transition hover:text-accent">
                  {item.name}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className="text-foreground">
                  {item.name}
                </span>
              )}
              {!isLast ? <ChevronRight className="h-3.5 w-3.5" aria-hidden /> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
