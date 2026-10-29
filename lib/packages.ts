import { getCloudflareContext } from "@opennextjs/cloudflare";

/** D1'in burada kullanılan kısmı (tam tipler için @cloudflare/workers-types gerekmez). */
type D1Statement = {
  bind(...values: unknown[]): D1Statement;
  run(): Promise<unknown>;
  all<T>(): Promise<{ results: T[] }>;
};
type D1Database = {
  prepare(query: string): D1Statement;
  batch(statements: D1Statement[]): Promise<unknown>;
};

/**
 * Paketler ve fiyatlar — Cloudflare D1'de ("huntay-site" veritabanı, `DB` bağlantısı).
 * Siteyi yeniden derlemeden /admin panelinden düzenlenir; /packages sayfası her istekte buradan okur.
 * Tablo yoksa ilk okumada oluşturulur ve aşağıdaki başlangıç paketleriyle doldurulur.
 */
export type PackageRow = {
  id: string;
  service_slug: string;
  sort: number;
  active: number;
  featured: number;
  name_tr: string;
  name_en: string;
  summary_tr: string;
  summary_en: string;
  /** Her satır bir madde. */
  includes_tr: string;
  includes_en: string;
  duration_tr: string;
  duration_en: string;
  price_try: number;
  price_usd: number;
  /** 1: "…'den başlayan" fiyat. */
  price_from: number;
  /** Ör. "/ay" — boşsa tek seferlik. */
  unit_tr: string;
  unit_en: string;
  /** Küçük avantaj/indirim notu (ör. ücret mahsubu). */
  perk_tr: string;
  perk_en: string;
  updated_at: string;
};

export type PackageView = {
  id: string;
  serviceSlug: string;
  featured: boolean;
  name: string;
  summary: string;
  includes: string[];
  duration: string;
  price: number;
  currency: "TRY" | "USD";
  priceFrom: boolean;
  unit: string;
  perk: string;
};

const COLUMNS = [
  "id", "service_slug", "sort", "active", "featured",
  "name_tr", "name_en", "summary_tr", "summary_en", "includes_tr", "includes_en",
  "duration_tr", "duration_en", "price_try", "price_usd", "price_from",
  "unit_tr", "unit_en", "perk_tr", "perk_en", "updated_at",
] as const;

const SCHEMA = `CREATE TABLE IF NOT EXISTS packages (
  id TEXT PRIMARY KEY,
  service_slug TEXT NOT NULL DEFAULT '',
  sort INTEGER NOT NULL DEFAULT 0,
  active INTEGER NOT NULL DEFAULT 1,
  featured INTEGER NOT NULL DEFAULT 0,
  name_tr TEXT NOT NULL DEFAULT '',
  name_en TEXT NOT NULL DEFAULT '',
  summary_tr TEXT NOT NULL DEFAULT '',
  summary_en TEXT NOT NULL DEFAULT '',
  includes_tr TEXT NOT NULL DEFAULT '',
  includes_en TEXT NOT NULL DEFAULT '',
  duration_tr TEXT NOT NULL DEFAULT '',
  duration_en TEXT NOT NULL DEFAULT '',
  price_try INTEGER NOT NULL DEFAULT 0,
  price_usd INTEGER NOT NULL DEFAULT 0,
  price_from INTEGER NOT NULL DEFAULT 0,
  unit_tr TEXT NOT NULL DEFAULT '',
  unit_en TEXT NOT NULL DEFAULT '',
  perk_tr TEXT NOT NULL DEFAULT '',
  perk_en TEXT NOT NULL DEFAULT '',
  updated_at TEXT NOT NULL DEFAULT ''
)`;

type Seed = Omit<PackageRow, "updated_at">;

/** Başlangıç paketleri (29 Ekim 2026). Fiyatlar: önerilen aralık ortası −%30; TL ≈ USD × kur × 0,5. */
const SEED: Seed[] = [
  {
    id: "technical-checkup", service_slug: "fractional-cto", sort: 10, active: 1, featured: 0,
    name_tr: "Teknik Check-up", name_en: "Technical Check-up",
    summary_tr: "Ürününüz, mimariniz veya ekibiniz hakkında 90 dakikalık derinlemesine görüşme ve yazılı yol haritası.",
    summary_en: "A 90-minute deep-dive on your product, architecture or team, followed by a written roadmap.",
    includes_tr: "90 dakikalık görüntülü görüşme\nMevcut durumun ve risklerin değerlendirilmesi\nÖnceliklendirilmiş yazılı öneriler ve yol haritası",
    includes_en: "90-minute video call\nReview of your current state and risks\nPrioritized written recommendations and roadmap",
    duration_tr: "1 gün", duration_en: "1 day",
    price_try: 5500, price_usd: 230, price_from: 0, unit_tr: "", unit_en: "",
    perk_tr: "Ücret, 30 gün içinde başlayan bir pakete veya projeye mahsup edilir.",
    perk_en: "The fee is credited toward any package or project started within 30 days.",
  },
  {
    id: "security-quick-scan", service_slug: "cybersecurity", sort: 20, active: 1, featured: 1,
    name_tr: "Güvenlik Hızlı Tarama", name_en: "Security Quick Scan",
    summary_tr: "Bir web uygulaması veya API için OWASP Top 10 odaklı hızlı güvenlik testi ve uygulanabilir rapor.",
    summary_en: "A fast, OWASP Top 10-focused security test of one web app or API, with an actionable report.",
    includes_tr: "1 web uygulaması veya API\nOWASP Top 10 odaklı otomatik ve manuel test\nRisk seviyeli rapor ve çözüm önerileri\n1 saatlik sonuç sunumu",
    includes_en: "1 web app or API\nAutomated and manual testing focused on the OWASP Top 10\nRisk-rated report with fixes\n1-hour results walkthrough",
    duration_tr: "3–5 iş günü", duration_en: "3–5 business days",
    price_try: 35000, price_usd: 1400, price_from: 0, unit_tr: "", unit_en: "",
    perk_tr: "Ücret, devamında alınacak Sızma Testi Standart paketinden düşülür.",
    perk_en: "The fee is credited if you continue with the Standard Penetration Test.",
  },
  {
    id: "penetration-test-standard", service_slug: "cybersecurity", sort: 30, active: 1, featured: 0,
    name_tr: "Sızma Testi Standart", name_en: "Penetration Test Standard",
    summary_tr: "Web uygulaması ve API'niz için kapsamlı, yetkilendirilmiş sızma testi; düzeltmelerden sonra yeniden test dahil.",
    summary_en: "A thorough, authorized penetration test of your web app and API, including a retest after fixes.",
    includes_tr: "Web uygulaması + API\nKimlik doğrulama, yetkilendirme ve iş mantığı testleri\nKanıtlı, önceliklendirilmiş rapor\nDüzeltmelerden sonra 1 yeniden test",
    includes_en: "Web app + API\nAuthentication, authorization and business-logic testing\nPrioritized report with evidence\n1 retest after fixes",
    duration_tr: "2 hafta", duration_en: "2 weeks",
    price_try: 85000, price_usd: 3500, price_from: 0, unit_tr: "", unit_en: "",
    perk_tr: "", perk_en: "",
  },
  {
    id: "architecture-cloud-review", service_slug: "cloud-devops", sort: 40, active: 1, featured: 0,
    name_tr: "Mimari ve Bulut Maliyet İncelemesi", name_en: "Architecture & Cloud Cost Review",
    summary_tr: "Mimarinizin ve bulut harcamanızın incelenmesi; tasarruf ve ölçeklenme için önceliklendirilmiş yol haritası.",
    summary_en: "A review of your architecture and cloud spend, with a prioritized roadmap for savings and scale.",
    includes_tr: "Mimari ve altyapı incelemesi\nBulut maliyet analizi ve tasarruf fırsatları\nRiskler ve darboğazlar\nÖnceliklendirilmiş yol haritası + sunum",
    includes_en: "Architecture and infrastructure review\nCloud cost analysis and savings opportunities\nRisks and bottlenecks\nPrioritized roadmap + walkthrough",
    duration_tr: "5 iş günü", duration_en: "5 business days",
    price_try: 47500, price_usd: 1900, price_from: 0, unit_tr: "", unit_en: "",
    perk_tr: "Önerileri benimle uygularsanız ücret projeden düşülür.",
    perk_en: "The fee is credited if we implement the recommendations together.",
  },
  {
    id: "ai-agent-pilot", service_slug: "ai-agents", sort: 50, active: 1, featured: 1,
    name_tr: "Yapay Zeka Ajanı Pilotu", name_en: "AI Agent Pilot",
    summary_tr: "Kendi dokümanlarınıza bağlı, tek kanalda çalışan ve canlıya alınmış bir yapay zeka ajanı.",
    summary_en: "A live AI agent on one channel, connected to your own documents.",
    includes_tr: "1 kanal: web sitesi veya WhatsApp\nDokümanlarınıza bağlı bilgi tabanı (RAG)\nİnsana devir ve temel güvenlik sınırları\nCanlıya alma ve 2 hafta destek",
    includes_en: "1 channel: website or WhatsApp\nKnowledge base connected to your documents (RAG)\nHuman handover and basic guardrails\nGo-live and 2 weeks of support",
    duration_tr: "3 hafta", duration_en: "3 weeks",
    price_try: 110000, price_usd: 4500, price_from: 0, unit_tr: "", unit_en: "",
    perk_tr: "", perk_en: "",
  },
  {
    id: "fractional-cto-monthly", service_slug: "fractional-cto", sort: 60, active: 1, featured: 0,
    name_tr: "Fractional CTO", name_en: "Fractional CTO",
    summary_tr: "Tam zamanlı yönetici işe almadan kıdemli teknik liderlik: strateji, mimari kararlar ve ekip koçluğu.",
    summary_en: "Senior technical leadership without a full-time hire: strategy, architecture decisions and team coaching.",
    includes_tr: "Haftada ~8 saat\nHaftalık toplantı ve asenkron destek\nMimari ve teknoloji kararları\nİşe alım ve ekip koçluğu",
    includes_en: "~8 hours per week\nWeekly meeting and async support\nArchitecture and technology decisions\nHiring and team coaching",
    duration_tr: "En az 3 ay", duration_en: "3-month minimum",
    price_try: 70000, price_usd: 2800, price_from: 0, unit_tr: "/ay", unit_en: "/month",
    perk_tr: "3 ay peşin ödemede %10 indirim.", perk_en: "10% off when you prepay 3 months.",
  },
  {
    id: "mvp-development", service_slug: "startup-product-development", sort: 70, active: 1, featured: 0,
    name_tr: "MVP Geliştirme", name_en: "MVP Development",
    summary_tr: "Fikrinizi çalışan, ölçeklenebilir bir ürüne dönüştürüyoruz; kapsam ve fiyat görüşmeden sonra netleşir.",
    summary_en: "We turn your idea into a working, scalable product; scope and price are set after a call.",
    includes_tr: "Kapsam ve önceliklendirme atölyesi\nWeb ve/veya mobil MVP\nBulut altyapısı ve CI/CD\nCanlıya alma",
    includes_en: "Scoping and prioritization workshop\nWeb and/or mobile MVP\nCloud infrastructure and CI/CD\nLaunch",
    duration_tr: "6–12 hafta", duration_en: "6–12 weeks",
    price_try: 250000, price_usd: 10000, price_from: 1, unit_tr: "", unit_en: "",
    perk_tr: "Kapsam görüşmesinden sonra yazılı teklif.", perk_en: "Written proposal after a scoping call.",
  },
];

async function db(): Promise<D1Database> {
  const { env } = await getCloudflareContext({ async: true });
  const binding = (env as unknown as { DB?: D1Database }).DB;
  if (!binding) throw new Error("D1 binding DB is not configured");
  return binding;
}

let schemaReady = false;

async function ensureSchema(database: D1Database) {
  if (schemaReady) return;
  await database.prepare(SCHEMA).run();
  const { results } = await database.prepare("SELECT COUNT(*) AS n FROM packages").all<{ n: number }>();
  if (!results[0]?.n) {
    const now = new Date().toISOString();
    await database.batch(SEED.map((row) => insertStatement(database, { ...row, updated_at: now })));
  }
  schemaReady = true;
}

function insertStatement(database: D1Database, row: PackageRow) {
  const placeholders = COLUMNS.map(() => "?").join(", ");
  const updates = COLUMNS.filter((c) => c !== "id").map((c) => `${c} = excluded.${c}`).join(", ");
  return database
    .prepare(`INSERT INTO packages (${COLUMNS.join(", ")}) VALUES (${placeholders}) ON CONFLICT(id) DO UPDATE SET ${updates}`)
    .bind(...COLUMNS.map((c) => row[c]));
}

/** Tüm paketler (yönetim paneli için; pasifler dahil). */
export async function listAllPackages(): Promise<PackageRow[]> {
  const database = await db();
  await ensureSchema(database);
  const { results } = await database.prepare("SELECT * FROM packages ORDER BY sort, id").all<PackageRow>();
  return results;
}

/** Sitede gösterilen paketler, seçilen dilde. Hata olursa boş liste döner (sayfa yine açılır). */
export async function getPackages(lang: "en" | "tr"): Promise<PackageView[]> {
  try {
    const rows = (await listAllPackages()).filter((row) => row.active);
    return rows.map((row) => toView(row, lang));
  } catch (error) {
    console.error("packages: read failed", error);
    return [];
  }
}

export function toView(row: PackageRow, lang: "en" | "tr"): PackageView {
  const tr = lang === "tr";
  return {
    id: row.id,
    serviceSlug: row.service_slug,
    featured: Boolean(row.featured),
    name: tr ? row.name_tr : row.name_en,
    summary: tr ? row.summary_tr : row.summary_en,
    includes: (tr ? row.includes_tr : row.includes_en).split("\n").map((s) => s.trim()).filter(Boolean),
    duration: tr ? row.duration_tr : row.duration_en,
    price: tr ? row.price_try : row.price_usd,
    currency: tr ? "TRY" : "USD",
    priceFrom: Boolean(row.price_from),
    unit: tr ? row.unit_tr : row.unit_en,
    perk: tr ? row.perk_tr : row.perk_en,
  };
}

export function formatPrice(pkg: PackageView, lang: "en" | "tr"): string {
  return new Intl.NumberFormat(lang === "tr" ? "tr-TR" : "en-US", {
    style: "currency",
    currency: pkg.currency,
    maximumFractionDigits: 0,
  }).format(pkg.price);
}

export async function savePackage(row: PackageRow) {
  const database = await db();
  await ensureSchema(database);
  await insertStatement(database, { ...row, updated_at: new Date().toISOString() }).run();
}

export async function deletePackage(id: string) {
  const database = await db();
  await ensureSchema(database);
  await database.prepare("DELETE FROM packages WHERE id = ?").bind(id).run();
}

export const packageColumns = COLUMNS;
