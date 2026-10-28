import { ConsentSettingsButton } from "@/components/analytics/consent-manager";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site";
import { getTranslations } from "next-intl/server";

/** Tüm sayfalarda görünen alt bilgi: önemli sayfalara iç linkler, gizlilik/kullanım koşulları ve telif. */
export async function SiteFooter() {
  const t = await getTranslations("Footer");
  const linkClass = "transition hover:text-accent";
  const links = [
    { href: "/services", label: t("services") },
    { href: "/book", label: t("book") },
    { href: "/assistant", label: t("assistant") },
    { href: "/privacy", label: t("privacy") },
    { href: "/terms", label: t("terms") },
  ];

  return (
    <footer className="border-t border-border py-10 text-sm text-muted-foreground">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <nav aria-label={t("navLabel")}>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:justify-start">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <ConsentSettingsButton label={t("cookies")} className={linkClass} />
            </li>
          </ul>
        </nav>
        <div className="mt-6 flex flex-col items-center justify-between gap-2 text-center md:flex-row md:text-left">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. {t("rights")}
          </p>
          <p className="font-mono text-xs">{t("built")}</p>
        </div>
      </div>
    </footer>
  );
}
