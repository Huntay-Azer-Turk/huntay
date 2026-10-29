"use server";

import { checkAdmin } from "@/lib/admin-auth";
import { deletePackage, listAllPackages, savePackage, type PackageRow } from "@/lib/packages";
import { redirect } from "next/navigation";

async function requireAdmin() {
  const check = await checkAdmin();
  if (!check.ok) throw new Error(check.reason);
}

const text = (form: FormData, key: string) => String(form.get(key) ?? "").trim();
const int = (form: FormData, key: string) => {
  const n = Number(String(form.get(key) ?? "").replace(/[^\d-]/g, ""));
  return Number.isFinite(n) ? Math.round(n) : 0;
};
const flag = (form: FormData, key: string) => (form.get(key) ? 1 : 0);

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/ı/g, "i").replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export async function savePackageAction(form: FormData) {
  await requireAdmin();
  const id = text(form, "id") || slugify(text(form, "name_en") || text(form, "name_tr"));
  if (!id) redirect("/admin?error=name");
  const row: PackageRow = {
    id,
    service_slug: text(form, "service_slug"),
    sort: int(form, "sort"),
    active: flag(form, "active"),
    featured: flag(form, "featured"),
    name_tr: text(form, "name_tr"),
    name_en: text(form, "name_en"),
    summary_tr: text(form, "summary_tr"),
    summary_en: text(form, "summary_en"),
    includes_tr: text(form, "includes_tr"),
    includes_en: text(form, "includes_en"),
    duration_tr: text(form, "duration_tr"),
    duration_en: text(form, "duration_en"),
    price_try: int(form, "price_try"),
    price_usd: int(form, "price_usd"),
    price_from: flag(form, "price_from"),
    unit_tr: text(form, "unit_tr"),
    unit_en: text(form, "unit_en"),
    perk_tr: text(form, "perk_tr"),
    perk_en: text(form, "perk_en"),
    updated_at: "",
  };
  await savePackage(row);
  redirect(`/admin?saved=${encodeURIComponent(id)}`);
}

export async function toggleActiveAction(form: FormData) {
  await requireAdmin();
  const id = text(form, "id");
  const row = (await listAllPackages()).find((p) => p.id === id);
  if (row) await savePackage({ ...row, active: row.active ? 0 : 1 });
  redirect("/admin");
}

export async function deletePackageAction(form: FormData) {
  await requireAdmin();
  const id = text(form, "id");
  if (id && text(form, "confirm") === id) await deletePackage(id);
  redirect("/admin?deleted=1");
}
