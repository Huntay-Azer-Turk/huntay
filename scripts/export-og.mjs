// Paylaşım görsellerini (1200×630 PNG) yerel sunucudan indirip public/og/<dil>/<anahtar>.png olarak kaydeder.
// Kullanım: önce siteyi çalıştırın (ör. `npm run dev` veya `npx wrangler dev`), sonra:
//   node scripts/export-og.mjs http://localhost:3000
import { mkdir, readFile, writeFile } from "node:fs/promises";

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const servicesSource = await readFile(new URL("../data/services.ts", import.meta.url), "utf8");
const slugs = [...servicesSource.matchAll(/^\s{4}slug: "([^"]+)"/gm)].map((m) => m[1]);
const keys = ["home", "services", "book", ...slugs.map((s) => `service-${s}`)];

for (const lang of ["en", "tr"]) {
  await mkdir(new URL(`../public/og/${lang}/`, import.meta.url), { recursive: true });
  for (const key of keys) {
    const res = await fetch(`${base}/api/og/${lang}/${key}`);
    if (!res.ok) throw new Error(`${lang}/${key}: HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(new URL(`../public/og/${lang}/${key}.png`, import.meta.url), buf);
    console.log(`og/${lang}/${key}.png ${buf.length} bytes`);
  }
}
