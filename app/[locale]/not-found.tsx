import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col justify-center px-4 py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        404
      </p>
      <h1 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {t("title")}
      </h1>
      <p className="mt-3 text-balance text-muted-foreground">{t("description")}</p>
      <Link
        href="/"
        className="mt-8 inline-flex justify-center rounded-xl bg-accent px-5 py-3 text-sm font-medium text-[var(--color-on-accent)] transition hover:opacity-90"
      >
        {t("backHome")}
      </Link>
    </div>
  );
}
