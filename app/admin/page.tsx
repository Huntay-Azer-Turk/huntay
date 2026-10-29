import { deletePackageAction, savePackageAction, toggleActiveAction } from "./actions";
import { services } from "@/data/services";
import { checkAdmin } from "@/lib/admin-auth";
import { listAllPackages, type PackageRow } from "@/lib/packages";
import Link from "next/link";
import { connection } from "next/server";

/**
 * Basit yönetim paneli: paket ekle / düzenle / yayından kaldır.
 * Kaydedilen değişiklik /packages sayfasında hemen görünür (sayfa her istekte veritabanından okur).
 */
type Props = { searchParams: Promise<Record<string, string | undefined>> };

const input =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none";
const label = "block text-xs font-medium uppercase tracking-wide text-muted-foreground";
const btn = "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition";
const btnPrimary = `${btn} bg-accent text-[var(--color-on-accent)] hover:opacity-90`;
const btnSecondary = `${btn} border border-border bg-card hover:border-accent`;

const fmt = (n: number, currency: string, locale: string) =>
  new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }).format(n);

export default async function AdminPage({ searchParams }: Props) {
  await connection();
  const check = await checkAdmin();
  if (!check.ok) {
    return (
      <main className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold">Erişim yok</h1>
        <p className="mt-3 text-muted-foreground">{check.reason}</p>
      </main>
    );
  }

  const params = await searchParams;
  const rows = await listAllPackages();
  const editing: Partial<PackageRow> | null = params.new
    ? { active: 1, sort: (rows.at(-1)?.sort ?? 0) + 10 }
    : params.edit
      ? (rows.find((r) => r.id === params.edit) ?? null)
      : null;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Paketler ve fiyatlar</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Kaydettiğiniz değişiklik sitede hemen görünür:{" "}
            <a href="/tr/packages" target="_blank" className="text-accent hover:underline">/tr/packages</a> ·{" "}
            <a href="/packages" target="_blank" className="text-accent hover:underline">/packages</a>
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>{check.email}</span>
          <Link href="/admin?new=1" className={btnPrimary}>+ Yeni paket</Link>
        </div>
      </header>

      {params.saved ? (
        <p className="mt-6 rounded-lg border border-accent/40 bg-accent/10 px-4 py-3 text-sm">
          Kaydedildi: <strong>{params.saved}</strong>
        </p>
      ) : null}
      {params.deleted ? (
        <p className="mt-6 rounded-lg border border-border bg-card px-4 py-3 text-sm">Paket silindi.</p>
      ) : null}

      {editing ? <PackageForm row={editing} /> : null}

      <section className="mt-8 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-card text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Sıra</th>
              <th className="px-4 py-3">Paket</th>
              <th className="px-4 py-3">Fiyat (TR)</th>
              <th className="px-4 py-3">Fiyat (EN)</th>
              <th className="px-4 py-3">Durum</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-border">
                <td className="px-4 py-3 text-muted-foreground">{row.sort}</td>
                <td className="px-4 py-3">
                  <div className="font-medium">{row.name_tr}</div>
                  <div className="text-xs text-muted-foreground">{row.name_en} · {row.id}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {row.price_from ? "≥ " : ""}{fmt(row.price_try, "TRY", "tr-TR")}{row.unit_tr}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {row.price_from ? "≥ " : ""}{fmt(row.price_usd, "USD", "en-US")}{row.unit_en}
                </td>
                <td className="px-4 py-3">
                  <form action={toggleActiveAction}>
                    <input type="hidden" name="id" value={row.id} />
                    <button className={`${btn} px-2 py-1 text-xs ${row.active ? "bg-accent/15 text-accent" : "bg-card text-muted-foreground"}`}>
                      {row.active ? "Yayında" : "Gizli"}
                    </button>
                  </form>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin?edit=${encodeURIComponent(row.id)}`} className={btnSecondary}>Düzenle</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <p className="mt-4 text-xs text-muted-foreground">
        &quot;Gizli&quot; paketler sitede görünmez ama silinmez. Fiyatlar tam sayı girilir (ör. 35000). TR sayfasında TL, EN sayfasında USD gösterilir.
      </p>
    </main>
  );
}

function PackageForm({ row }: { row: Partial<PackageRow> }) {
  const isNew = !row.id;
  const field = (name: keyof PackageRow, title: string, opts: { area?: boolean; hint?: string } = {}) => (
    <label className="block space-y-1">
      <span className={label}>{title}</span>
      {opts.area ? (
        <textarea name={name} defaultValue={String(row[name] ?? "")} rows={4} className={input} />
      ) : (
        <input name={name} defaultValue={String(row[name] ?? "")} className={input} />
      )}
      {opts.hint ? <span className="block text-xs text-muted-foreground">{opts.hint}</span> : null}
    </label>
  );

  return (
    <section className="mt-8 rounded-2xl border border-accent/40 bg-card p-6">
      <h2 className="text-lg font-semibold">{isNew ? "Yeni paket" : `Düzenle: ${row.name_tr}`}</h2>
      <form action={savePackageAction} className="mt-6 space-y-6">
        <input type="hidden" name="id" value={row.id ?? ""} />

        <div className="grid gap-4 sm:grid-cols-2">
          {field("name_tr", "Ad (TR)")}
          {field("name_en", "Ad (EN)")}
          {field("summary_tr", "Kısa açıklama (TR)", { area: true })}
          {field("summary_en", "Kısa açıklama (EN)", { area: true })}
          {field("includes_tr", "Neler dahil (TR)", { area: true, hint: "Her satır bir madde" })}
          {field("includes_en", "Neler dahil (EN)", { area: true, hint: "One item per line" })}
          {field("duration_tr", "Süre (TR)", { hint: "ör. 2 hafta" })}
          {field("duration_en", "Süre (EN)", { hint: "e.g. 2 weeks" })}
        </div>

        <div className="grid gap-4 sm:grid-cols-4">
          {field("price_try", "Fiyat TL")}
          {field("price_usd", "Fiyat USD")}
          {field("unit_tr", "Birim (TR)", { hint: "ör. /ay — boş: tek sefer" })}
          {field("unit_en", "Birim (EN)", { hint: "e.g. /month" })}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {field("perk_tr", "Avantaj / indirim notu (TR)", { area: true, hint: "ör. Ücret projeden düşülür — boş bırakılabilir" })}
          {field("perk_en", "Avantaj / indirim notu (EN)", { area: true })}
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <label className="block space-y-1">
            <span className={label}>İlgili hizmet</span>
            <select name="service_slug" defaultValue={row.service_slug ?? ""} className={input}>
              <option value="">—</option>
              {services.map((s) => (
                <option key={s.slug} value={s.slug}>{s.title.tr}</option>
              ))}
            </select>
          </label>
          {field("sort", "Sıra", { hint: "Küçük sayı önce gösterilir" })}
          <div className="flex flex-col justify-end gap-2 text-sm">
            <label className="flex items-center gap-2"><input type="checkbox" name="active" defaultChecked={row.active !== 0} /> Sitede yayında</label>
            <label className="flex items-center gap-2"><input type="checkbox" name="featured" defaultChecked={Boolean(row.featured)} /> Öne çıkan</label>
            <label className="flex items-center gap-2"><input type="checkbox" name="price_from" defaultChecked={Boolean(row.price_from)} /> Başlangıç fiyatı (en az)</label>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button className={btnPrimary}>Kaydet</button>
          <Link href="/admin" className={btnSecondary}>Vazgeç</Link>
        </div>
      </form>

      {!isNew ? (
        <form action={deletePackageAction} className="mt-8 flex flex-wrap items-end gap-3 border-t border-border pt-6">
          <input type="hidden" name="id" value={row.id} />
          <label className="block space-y-1">
            <span className={label}>Kalıcı silmek için kimliği yazın: {row.id}</span>
            <input name="confirm" className={input} autoComplete="off" />
          </label>
          <button className={`${btn} border border-red-500/50 text-red-500 hover:bg-red-500/10`}>Sil</button>
        </form>
      ) : null}
    </section>
  );
}
