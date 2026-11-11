import { resolveServiceSlug } from "@/data/catalog";
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

/**
 * Başlangıç paketleri (29 Ekim 2026). Fiyatlar: önerilen aralık ortası −%30; TL ≈ USD × kur × 0,5.
 * 11 Kasım 2026: KOBİ'ler için yapay zekâ odağı — fırsat taraması, müşteri hizmetleri pilotu, anahtar teslim kurulum
 * (₺250.000'den başlayan) ve genişleme tasarım paketleri (₺47.500) eklendi. Aynı gün akşam: odak tamamen yapay zekâ
 * dönüşümü — her birim (teknik servis, kalite, üretim, satış, pazarlama, pazar araştırması, satın alma, güvenlik)
 * tasarım paketiyle; öne çıkan teklif teknik servis / help desk asistanı (tarama → pilot → canlı kurulum).
 * Birim tasarım paketleri 'başlangıç fiyatı' (Huntay: sabit etiket fiyat 'yumurta satar gibi'); kesin fiyat kapsama göre.
 * Aynı gün: paketlerde yalnız teknik servis yolu kalır (Huntay); birim tasarım paketleri pasif, kapsam ve fiyat ön görüşmede.
 * Fiyatlar piyasa araştırmasıyla (yurt dışı: hazırlık denetimi $3.5–8.5K, destek asistanı PoC €6–15K) birime göre
 * farklı ve küsuratlı; bulut, güvenlik ve CTO paketleri pasif (silinmedi). Canlıdaki D1 bu listeden değil /admin'den güncellenir.
 */
const SEED: Seed[] = [
  {
    id: "technical-checkup", service_slug: "fractional-cto", sort: 10, active: 0, featured: 0,
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
    id: "security-quick-scan", service_slug: "cybersecurity", sort: 20, active: 0, featured: 0,
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
    id: "penetration-test-standard", service_slug: "cybersecurity", sort: 30, active: 0, featured: 0,
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
    id: "architecture-cloud-review", service_slug: "cloud-devops", sort: 40, active: 0, featured: 0,
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
    id: "ai-opportunity-scan", service_slug: "ai-agents", sort: 45, active: 1, featured: 0,
    name_tr: "Yapay Zeka Fırsat Taraması", name_en: "AI Opportunity Scan",
    summary_tr: "Şirketinizde yapay zekanın en çok getiri sağlayacağı süreçleri bulan; verinizin, araçlarınızın ve ekibinizin ne kadar hazır olduğunu ölçen sabit kapsamlı inceleme ve yol haritası.",
    summary_en: "A fixed-scope review that finds where AI pays off most in your company and measures how ready your data, tools and team are, with a roadmap.",
    includes_tr: "Yönetim ve 2–3 ekip üyesiyle görüşmeler\nSüreç, veri ve araç incelemesi (ERP, CRM, e-ticaret, mesaj kanalları)\nGetiriye göre sıralanmış 3–5 kullanım senaryosu\nUygulama yol haritası, tahmini süre ve maliyet\n1 saatlik sonuç sunumu",
    includes_en: "Interviews with management and 2–3 team members\nProcess, data and tool review (ERP, CRM, e-commerce, messaging channels)\n3–5 use cases ranked by return\nImplementation roadmap with estimated time and cost\n1-hour results walkthrough",
    duration_tr: "5 iş günü", duration_en: "5 business days",
    price_try: 34750, price_usd: 1450, price_from: 0, unit_tr: "", unit_en: "",
    perk_tr: "Ücret, devamında alınacak Teknik Servis ve Help Desk Asistanı pilotundan düşülür.",
    perk_en: "The fee is credited toward the Technical Service & Help Desk Assistant pilot.",
  },
  {
    id: "ai-agent-pilot", service_slug: "ai-agents", sort: 50, active: 1, featured: 1,
    name_tr: "Teknik Servis ve Help Desk Asistanı — Pilot", name_en: "Technical Service & Help Desk Assistant — Pilot",
    summary_tr: "Bayilerinizden, teknisyenlerden ve kullanıcılardan gelen arıza, kurulum ve kullanım sorularını kendi kılavuzlarınızla otomatik yanıtlayan, gerekince arıza kaydı açıp ekibinize devreden asistan; tek kanalda canlıda, mevcut yazılımınız değişmez.",
    summary_en: "An assistant that automatically answers fault, installation and usage questions from your dealers, technicians and users using your own manuals, and opens a ticket and hands over to your team when needed; live on one channel, your existing software stays as it is.",
    includes_tr: "1 kanal: web sitesi, WhatsApp, e-posta ya da bayi portalı\nKılavuz, teknik bülten ve geçmiş taleplere bağlı bilgi tabanı\nOtomatik yanıt, arıza kaydı ve insana devir\nÖlçüm: otomatik yanıtlanan soru oranı ve çözüm süresi\nCanlıya alma ve 2 hafta destek",
    includes_en: "1 channel: website, WhatsApp, email or dealer portal\nKnowledge base connected to manuals, service bulletins and past tickets\nAutomatic answers, ticket creation and human handover\nMeasurement: share of questions answered automatically and resolution time\nGo-live and 2 weeks of support",
    duration_tr: "3 hafta", duration_en: "3 weeks",
    price_try: 109500, price_usd: 4450, price_from: 0, unit_tr: "", unit_en: "",
    perk_tr: "",
    perk_en: "",
  },
  {
    id: "ai-production-rollout", service_slug: "ai-agents", sort: 55, active: 1, featured: 0,
    name_tr: "Teknik Servis ve Help Desk Asistanı — Canlı Kurulum", name_en: "Technical Service & Help Desk Assistant — Production Rollout",
    summary_tr: "Pilotta işe yarayan asistanı birden fazla kanala, ekiplerinize ve mevcut sistemlerinize bağlı; ölçülen ve sürdürülen bir ürüne dönüştürüyoruz.",
    summary_en: "We turn the assistant that worked in the pilot into a measured, maintained product connected to more channels, your teams and your existing systems.",
    includes_tr: "Çok kanallı kurulum (web, WhatsApp, e-posta, şirket içi)\nERP, CRM veya servis sistemi entegrasyonu\nYetki, KVKK ve güvenlik sınırları\nYönetim paneli: soru, çözüm süresi ve memnuniyet ölçümü\nEkip eğitimi ve 1 ay destek",
    includes_en: "Multi-channel rollout (web, WhatsApp, email, internal)\nERP, CRM or service-desk integration\nPermissions, GDPR/KVKK and security guardrails\nDashboard: questions, resolution time and satisfaction\nTeam training and 1 month of support",
    duration_tr: "4–8 hafta", duration_en: "4–8 weeks",
    price_try: 254900, price_usd: 10450, price_from: 1, unit_tr: "", unit_en: "",
    perk_tr: "Kapsam görüşmesinden sonra yazılı teklif.",
    perk_en: "Written proposal after a scoping call.",
  },
  {
    id: "ai-market-research", service_slug: "ai-agents", sort: 65, active: 0, featured: 0,
    name_tr: "Pazar Araştırması Asistanı — Tasarım", name_en: "Market Research Assistant — Design",
    summary_tr: "Rakipleri, fiyatları, ihaleleri ve sektör haberlerini düzenli tarayıp yönetime kısa ve kaynaklı özetler sunan yapay zekâ asistanının tasarımı.",
    summary_en: "Design of an AI assistant that regularly scans competitors, prices, tenders and industry news and gives management short, sourced summaries.",
    includes_tr: "Takip edilecek rakip, ürün, ihale ve kaynak listesinin çıkarılması\nFiyat, ürün ve haber taraması için veri kaynakları planı\nHaftalık özet ve uyarı akışı (e-posta, Teams, WhatsApp)\nPilot kapsamı, tahmini maliyet ve başarı ölçütleri\n1 saatlik sonuç sunumu",
    includes_en: "List of competitors, products, tenders and sources to track\nData source plan for price, product and news scanning\nWeekly summary and alert flow (email, Teams, WhatsApp)\nPilot scope, estimated cost and success criteria\n1-hour results walkthrough",
    duration_tr: "5 iş günü", duration_en: "5 business days",
    price_try: 36400, price_usd: 1490, price_from: 1, unit_tr: "", unit_en: "",
    perk_tr: "Kesin fiyat, ön görüşmede kapsam netleşince yazılı teklifle verilir; pilot ve kurulum da tasarımdan sonra tekliflenir. Pilota geçerseniz tasarım ücreti pilottan düşülür.",
    perk_en: "The exact price is set in a written proposal once the scope is clear; pilot and rollout are quoted after the design. If you move to a pilot, the design fee is deducted from it.",
  },
  {
    id: "ai-procurement", service_slug: "ai-agents", sort: 66, active: 0, featured: 0,
    name_tr: "Satın Alma ve Tedarik Asistanı — Tasarım", name_en: "Procurement & Supply Assistant — Design",
    summary_tr: "Tedarikçi tekliflerini karşılaştıran, sipariş ve teslim tarihlerini takip eden, stok ve sipariş önerileri sunan yapay zekâ asistanının tasarımı.",
    summary_en: "Design of an AI assistant that compares supplier quotes, tracks orders and delivery dates, and suggests stock and purchase orders.",
    includes_tr: "Satın alma süreci, tedarikçi ve teklif akışının incelemesi\nERP stok, sipariş ve tedarikçi verisi bağlantı planı\nTeklif karşılaştırma, gecikme uyarısı ve sipariş önerisi senaryoları\nPilot kapsamı, tahmini maliyet ve başarı ölçütleri\n1 saatlik sonuç sunumu",
    includes_en: "Review of your purchasing process, suppliers and quote flow\nConnection plan for ERP stock, order and supplier data\nQuote comparison, delay alert and purchase suggestion scenarios\nPilot scope, estimated cost and success criteria\n1-hour results walkthrough",
    duration_tr: "5 iş günü", duration_en: "5 business days",
    price_try: 48600, price_usd: 1980, price_from: 1, unit_tr: "", unit_en: "",
    perk_tr: "Kesin fiyat, ön görüşmede kapsam netleşince yazılı teklifle verilir; pilot ve kurulum da tasarımdan sonra tekliflenir. Pilota geçerseniz tasarım ücreti pilottan düşülür.",
    perk_en: "The exact price is set in a written proposal once the scope is clear; pilot and rollout are quoted after the design. If you move to a pilot, the design fee is deducted from it.",
  },
  {
    id: "ai-production-efficiency", service_slug: "ai-agents", sort: 62, active: 0, featured: 0,
    name_tr: "Üretim Verimliliği ve Bakım — Tasarım", name_en: "Production Efficiency & Maintenance — Design",
    summary_tr: "Duruş, fire, bakım ve vardiya verilerinizden kayıpların nereden geldiğini bulan; arıza öngörüsü ve bakım planlaması için yapay zekâ çözümünün tasarımı.",
    summary_en: "Design of an AI solution that finds where losses come from in your downtime, scrap, maintenance and shift data, and supports failure prediction and maintenance planning.",
    includes_tr: "Üretim, bakım ve kalite verilerinin incelemesi (MES/ERP, Excel, makine kayıtları)\nDuruş, fire ve darboğaz analizi\nBakım kayıtlarından arıza öngörüsü fizibilitesi\nPilot kapsamı, tahmini maliyet ve başarı ölçütleri\n1 saatlik sonuç sunumu",
    includes_en: "Review of production, maintenance and quality data (MES/ERP, Excel, machine logs)\nDowntime, scrap and bottleneck analysis\nFeasibility of failure prediction from maintenance records\nPilot scope, estimated cost and success criteria\n1-hour results walkthrough",
    duration_tr: "5 iş günü", duration_en: "5 business days",
    price_try: 52400, price_usd: 2150, price_from: 1, unit_tr: "", unit_en: "",
    perk_tr: "Kesin fiyat, ön görüşmede kapsam netleşince yazılı teklifle verilir; pilot ve kurulum da tasarımdan sonra tekliflenir. Pilota geçerseniz tasarım ücreti pilottan düşülür.",
    perk_en: "The exact price is set in a written proposal once the scope is clear; pilot and rollout are quoted after the design. If you move to a pilot, the design fee is deducted from it.",
  },
  {
    id: "ai-quality-control", service_slug: "ai-agents", sort: 61, active: 0, featured: 0,
    name_tr: "Kalite Kontrol Otomasyonu ve Verimlilik — Tasarım", name_en: "Quality Control Automation & Efficiency — Design",
    summary_tr: "Görüntü, ölçüm ve şikâyet verilerinizle hatayı daha erken yakalayan, kontrol süresini kısaltan ve fireyi azaltan yapay zekâ otomasyonunun fizibilitesi ve tasarımı.",
    summary_en: "Feasibility and design of AI automation that catches defects earlier from your image, measurement and complaint data, shortens inspection time and reduces scrap.",
    includes_tr: "Kalite süreçleri, hata kayıtları ve müşteri şikâyetlerinin incelemesi\nVeri hazırlığı: kamera, etiketleme ve veri ihtiyacı\nGörüntü işleme ya da kural tabanlı çözüm önerisi\nPilot kapsamı, tahmini maliyet ve başarı ölçütleri\n1 saatlik sonuç sunumu",
    includes_en: "Review of quality processes, defect records and customer complaints\nData readiness: cameras, labeling and data needs\nComputer vision or rule-based solution proposal\nPilot scope, estimated cost and success criteria\n1-hour results walkthrough",
    duration_tr: "5 iş günü", duration_en: "5 business days",
    price_try: 57900, price_usd: 2350, price_from: 1, unit_tr: "", unit_en: "",
    perk_tr: "Kesin fiyat, ön görüşmede kapsam netleşince yazılı teklifle verilir; pilot ve kurulum da tasarımdan sonra tekliflenir. Pilota geçerseniz tasarım ücreti pilottan düşülür.",
    perk_en: "The exact price is set in a written proposal once the scope is clear; pilot and rollout are quoted after the design. If you move to a pilot, the design fee is deducted from it.",
  },
  {
    id: "ai-sales-assistant", service_slug: "ai-agents", sort: 63, active: 0, featured: 0,
    name_tr: "Satış Asistanı — Tasarım", name_en: "Sales Assistant — Design",
    summary_tr: "Web, WhatsApp ve e-postadan gelen talepleri karşılayan, fiyat ve stok sorularını yanıtlayan, teklif ve takibi hızlandırıp satış ekibinize hazır müşteri aktaran yapay zekâ asistanının tasarımı.",
    summary_en: "Design of an AI assistant that handles inquiries from web, WhatsApp and email, answers price and stock questions, speeds up quotes and follow-up, and hands ready buyers to your sales team.",
    includes_tr: "Satış süreci ve sık sorulan teklif/sipariş sorularının analizi\nÜrün kataloğu, fiyat listesi ve CRM bağlantı planı\nTalep nitelendirme ve satışa devir akışı\nPilot kapsamı, tahmini maliyet ve başarı ölçütleri\n1 saatlik sonuç sunumu",
    includes_en: "Analysis of your sales process and common quote/order questions\nConnection plan for product catalog, price list and CRM\nLead qualification and sales handover flow\nPilot scope, estimated cost and success criteria\n1-hour results walkthrough",
    duration_tr: "5 iş günü", duration_en: "5 business days",
    price_try: 44900, price_usd: 1850, price_from: 1, unit_tr: "", unit_en: "",
    perk_tr: "Kesin fiyat, ön görüşmede kapsam netleşince yazılı teklifle verilir; pilot ve kurulum da tasarımdan sonra tekliflenir. Pilota geçerseniz tasarım ücreti pilottan düşülür.",
    perk_en: "The exact price is set in a written proposal once the scope is clear; pilot and rollout are quoted after the design. If you move to a pilot, the design fee is deducted from it.",
  },
  {
    id: "ai-marketing-assistant", service_slug: "ai-agents", sort: 64, active: 0, featured: 0,
    name_tr: "Pazarlama Asistanı — Tasarım", name_en: "Marketing Assistant — Design",
    summary_tr: "İçerik, katalog, kampanya ve müşteri takibini hızlandıran, markanızın diliyle çalışan yapay zekâ asistanının tasarımı.",
    summary_en: "Design of an AI assistant that speeds up content, catalogs, campaigns and customer follow-up in your brand's voice.",
    includes_tr: "Pazarlama kanalları ve içerik üretim sürecinin incelemesi\nMarka dili ve ürün bilgisinden içerik ve katalog üretim akışı\nKampanya ve müşteri takibi (CRM, e-posta) otomasyon planı\nPilot kapsamı, tahmini maliyet ve başarı ölçütleri\n1 saatlik sonuç sunumu",
    includes_en: "Review of your marketing channels and content process\nContent and catalog flow built from your brand voice and product data\nAutomation plan for campaigns and customer follow-up (CRM, email)\nPilot scope, estimated cost and success criteria\n1-hour results walkthrough",
    duration_tr: "5 iş günü", duration_en: "5 business days",
    price_try: 38750, price_usd: 1590, price_from: 1, unit_tr: "", unit_en: "",
    perk_tr: "Kesin fiyat, ön görüşmede kapsam netleşince yazılı teklifle verilir; pilot ve kurulum da tasarımdan sonra tekliflenir. Pilota geçerseniz tasarım ücreti pilottan düşülür.",
    perk_en: "The exact price is set in a written proposal once the scope is clear; pilot and rollout are quoted after the design. If you move to a pilot, the design fee is deducted from it.",
  },
  {
    id: "ai-security-assistant", service_slug: "ai-agents", sort: 67, active: 0, featured: 0,
    name_tr: "Güvenlik Ekibi Yardımcı Asistanı — Tasarım", name_en: "Security Team Copilot — Design",
    summary_tr: "Alarm ve kayıtları önceliklendiren, güvenlik politikası ve KVKK sorularını yanıtlayan, küçük BT ekiplerinin yükünü alan asistanın tasarımı.",
    summary_en: "Design of an assistant that triages alerts and logs and answers security policy and GDPR/KVKK questions, taking load off small IT teams.",
    includes_tr: "Mevcut güvenlik araçları, alarm ve kayıt akışının incelemesi\nAlarm önceliklendirme ve özetleme senaryoları\nPolitika, KVKK ve prosedür soruları için bilgi tabanı\nPilot kapsamı, tahmini maliyet ve başarı ölçütleri\n1 saatlik sonuç sunumu",
    includes_en: "Review of your security tools, alerts and log flow\nAlert triage and summarization scenarios\nKnowledge base for policy, GDPR/KVKK and procedure questions\nPilot scope, estimated cost and success criteria\n1-hour results walkthrough",
    duration_tr: "5 iş günü", duration_en: "5 business days",
    price_try: 46250, price_usd: 1890, price_from: 1, unit_tr: "", unit_en: "",
    perk_tr: "Kesin fiyat, ön görüşmede kapsam netleşince yazılı teklifle verilir; pilot ve kurulum da tasarımdan sonra tekliflenir. Pilota geçerseniz tasarım ücreti pilottan düşülür.",
    perk_en: "The exact price is set in a written proposal once the scope is clear; pilot and rollout are quoted after the design. If you move to a pilot, the design fee is deducted from it.",
  },
  {
    id: "fractional-cto-monthly", service_slug: "fractional-cto", sort: 60, active: 0, featured: 0,
    name_tr: "Fractional CTO", name_en: "Fractional CTO",
    summary_tr: "Tam zamanlı yönetici işe almadan kıdemli teknik liderlik: strateji, mimari kararlar ve ekip koçluğu.",
    summary_en: "Senior technical leadership without a full-time hire: strategy, architecture decisions and team coaching.",
    includes_tr: "Öncelikli erişim, haftalık mimari inceleme ve aylık yol haritası güncellemesi\nHaftalık toplantı ve asenkron destek\nMimari ve teknoloji kararları\nİşe alım ve ekip koçluğu",
    includes_en: "Priority access, weekly architecture review and monthly roadmap update\nWeekly meeting and async support\nArchitecture and technology decisions\nHiring and team coaching",
    duration_tr: "En az 3 ay", duration_en: "3-month minimum",
    price_try: 70000, price_usd: 2800, price_from: 0, unit_tr: "/ay", unit_en: "/month",
    perk_tr: "3 ay peşin ödemede %10 indirim.", perk_en: "10% off when you prepay 3 months.",
  },
  {
    id: "mvp-development", service_slug: "fractional-cto", sort: 70, active: 0, featured: 0,
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
    // Eski hizmet slug'ları (ör. "startup-product-development") katalog katmanında güncel hizmete çevrilir.
    serviceSlug: resolveServiceSlug(row.service_slug) ?? "",
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
