import type { Localized } from "./types";

/**
 * Olgunluk testleri — /assessment/<slug>. Puanlama lib/assessment-score.ts'de (saf fonksiyonlar).
 * Sorular özgündür; esinlenilen çerçeveler sayfada anılır (NIST CSF 2.0, CIS IG1, Cyber Essentials, AWS
 * Well-Architected, DORA, FinOps, EU DMA, OECD). Hiçbir kurumun metni kopyalanmaz.
 * Her soruda 4 seçenek vardır; seçenek sırası puandır (0–3). "Emin değilim" en düşük seçeneğin içindedir.
 */

export type AssessmentSlug = "ai-readiness" | "security-maturity" | "cloud-health";

/** Profil cevabına göre koşul: profil sorusu `q`'da `any` seçeneklerinden biri seçildiyse doğru. */
export type Condition = { q: string; any: string[] };

export type ProfileQuestion = {
  id: string;
  text: Localized;
  hint?: Localized;
  multi?: boolean;
  options: { id: string; label: Localized }[];
};

export type Question = {
  id: string;
  dimension: string;
  text: Localized;
  hint?: Localized;
  /** 4 seçenek, sırası puandır (0, 1, 2, 3) */
  options: [Localized, Localized, Localized, Localized];
  /** Kritik sorular çift sayılır ve 0/1 cevabı seviyeyi sınırlar */
  critical?: boolean;
  /** Ana puan yerine ayrı bir alt puana (ör. IoT) sayılır */
  group?: string;
  /** Yalnızca bu profil koşulu sağlanırsa gösterilir */
  showIf?: Condition;
  /** Bu profil koşulu sağlanırsa gizlenir */
  hideIf?: Condition;
};

export type Recommendation = {
  /** Koşullar: hepsi sağlanırsa bu öneri seçilir; ilk eşleşen kazanır */
  when?: Condition;
  /** Boyuttaki en düşük soru bu ise */
  lowest?: string;
  title: Localized;
  body: Localized;
  /** İlgili sayfa (yerelleştirilmemiş yol, ör. "/services/ai-agents#offerings") */
  href: string;
  packageId?: string;
};

export type CtaRule = { packageId?: string; when?: Condition };

export type Assessment = {
  slug: AssessmentSlug;
  /** Bağlı olduğu alan sayfası */
  serviceSlug: string;
  title: Localized;
  shortTitle: Localized;
  metaDescription: Localized;
  intro: Localized;
  frameworks: string;
  levels: [Localized, Localized, Localized, Localized];
  levelText: [Localized, Localized, Localized, Localized];
  dimensions: { id: string; label: Localized; group?: string }[];
  profile: ProfileQuestion[];
  questions: Question[];
  recommendations: Record<string, Recommendation[]>;
  /** Kritik sınırlar: bir kritik 0 → `oneZero`, iki+ kritik 0 → `twoZeros`, bir kritik 1 → `oneLow` */
  caps?: { oneZero?: number; twoZeros?: number; oneLow?: number };
  /** Seviye (0–3) → ana çağrı; tanımsız ya da koşulu tutmayan seviyede 30 dk görüşme */
  cta: [CtaRule[], CtaRule[], CtaRule[], CtaRule[]];
  /** Ayrı alt puan grupları (ör. IoT) */
  groups?: { id: string; label: Localized }[];
};

const L = (tr: string, en: string): Localized => ({ tr, en });
const opts = (...pairs: [string, string][]) =>
  pairs.map(([tr, en]) => L(tr, en)) as [Localized, Localized, Localized, Localized];

const sizeQuestion = (id = "size"): ProfileQuestion => ({
  id,
  text: L("Şirketinizde kaç kişi çalışıyor?", "How many people work at your company?"),
  options: [
    { id: "1-9", label: L("1–9", "1–9") },
    { id: "10-49", label: L("10–49", "10–49") },
    { id: "50-249", label: L("50–249", "50–249") },
    { id: "250+", label: L("250+", "250+") },
  ],
});

/* ================================================================== */
/* 1. Yapay zeka olgunluk testi                                        */
/* ================================================================== */
const ai: Assessment = {
  slug: "ai-readiness",
  serviceSlug: "ai-agents",
  title: L("Yapay Zeka Olgunluk Testi", "AI Readiness Assessment"),
  shortTitle: L("Yapay zeka", "AI"),
  metaDescription: L(
    "Ücretsiz, 3 dakikalık yapay zeka olgunluk testi: şirketinizin yapay zekaya ne kadar hazır olduğunu, hangi süreçte başlamanın mantıklı olduğunu öğrenin. Kayıt yok.",
    "Free 3-minute AI readiness assessment: see how ready your company is for AI and which process to start with. No sign-up.",
  ),
  intro: L(
    "12 soru, yaklaşık 3 dakika, kayıt yok. Sonunda 0–100 arası bir puan, alanlara göre dağılım ve şirketinize uyan ilk 3 adımı görürsünüz.",
    "12 questions, about 3 minutes, no sign-up. You get a 0–100 score, a breakdown by area and the first 3 steps that fit your company.",
  ),
  frameworks: "EU DMA, OECD SME AI Readiness, Microsoft AI Readiness",
  levels: [L("Keşif", "Exploring"), L("Temel", "Foundations"), L("Pilota hazır", "Pilot-ready"), L("Ölçekleme", "Scaling")],
  levelText: [
    L("Yapay zeka henüz gündeminizde değil ya da dağınık. En hızlı kazanç, doğru ilk süreci seçmek ve ekibi güvenli kullanıma hazırlamak.", "AI isn't on your agenda yet, or it's scattered. The quickest win is picking the right first process and preparing your team for safe use."),
    L("Temeller kısmen var. Veriyi ve süreçleri biraz toparlayınca ilk pilot hızlı sonuç verir.", "Some foundations are in place. With a bit of data and process clean-up, a first pilot can deliver quickly."),
    L("Bir pilot için hazırsınız. Doğru kullanım senaryosuyla birkaç hafta içinde ölçülebilir sonuç alabilirsiniz.", "You're ready for a pilot. With the right use case you can see measurable results within weeks."),
    L("Yapay zekayı ölçekleyecek durumdasınız. Odak artık entegrasyon, ölçüm ve yaygınlaştırma.", "You're in a position to scale AI. The focus now is integration, measurement and rollout."),
  ],
  dimensions: [
    { id: "strategy", label: L("Strateji ve kullanım", "Strategy & adoption") },
    { id: "customer", label: L("Müşteri işleri", "Customer operations") },
    { id: "data", label: L("Bilgi ve veri", "Knowledge & data") },
    { id: "process", label: L("Süreç ve entegrasyon", "Processes & integration") },
    { id: "people", label: L("İnsan ve güvenli kullanım", "People & safe use") },
    { id: "ownership", label: L("Sahiplik ve sonuç", "Ownership & results") },
  ],
  profile: [
    sizeQuestion(),
    {
      id: "goal",
      text: L("Önümüzdeki 6 ayda yapay zekadan en çok ne bekliyorsunuz?", "What do you most want from AI in the next 6 months?"),
      options: [
        { id: "sales", label: L("Daha çok talep ve satış", "More leads and sales") },
        { id: "support", label: L("Daha hızlı müşteri desteği", "Faster customer support") },
        { id: "backoffice", label: L("Daha az elle yapılan ofis işi", "Less manual back-office work") },
        { id: "knowledge", label: L("Şirket bilgisine kolay erişim", "Easier access to company know-how") },
        { id: "training", label: L("Çalışanların güvenli kullanımı", "Safe use by staff") },
        { id: "unsure", label: L("Emin değilim", "Not sure yet") },
      ],
    },
  ],
  questions: [
    {
      id: "a1", dimension: "strategy",
      text: L("Önümüzdeki 12 ayda yapay zeka planlarınızda nerede?", "Where is AI in your plans for the next 12 months?"),
      options: opts(["Konuşulmadı / emin değilim", "Not discussed / not sure"], ["İlgi var ama öncelik yok", "Interest, but no priorities"], ["1–2 somut sorun seçildi, sorumlusu belli", "1–2 concrete problems chosen, with an owner"], ["Sorumlusu, bütçesi ve hedefi olan sıralı bir liste var", "A ranked list with owners, budget and targets"]),
    },
    {
      id: "a2", dimension: "strategy",
      text: L("Bugün yapay zekayı en ileri hangi şekilde kullanıyorsunuz?", "What is the most advanced way you use AI today?"),
      options: opts(["Hiç / emin değilim", "Not at all / not sure"], ["Bazı kişiler ücretsiz sohbet araçlarını kullanıyor", "Some people use free chat tools"], ["Onaylı araçlar bazı ekiplerde düzenli kullanılıyor", "Approved tools are used regularly in some teams"], ["Sistemlerimize bağlı, insan kontrolüyle iş yapan yapay zeka var", "AI connected to our systems does tasks with a human check"]),
    },
    {
      id: "a3", dimension: "customer",
      text: L("Web, WhatsApp, Instagram, e-posta ve telefondan gelen talepler nasıl karşılanıyor?", "How are inquiries from the web, WhatsApp, Instagram, email and phone handled?"),
      options: opts(["Kim görürse; bazıları kayboluyor", "Whoever sees them; some get lost"], ["Elle, kısmen Excel'de takip ediliyor", "Manually, partly tracked in Excel"], ["Ortak gelen kutusu veya CRM, hazır cevaplar", "A shared inbox or CRM with templates"], ["Tek CRM'de, aşamalar ve cevap süresi hedefiyle", "One CRM with stages and response-time targets"]),
    },
    {
      id: "a4", dimension: "customer",
      text: L("Ürün ve satış sonrası soruların cevabı nereden geliyor?", "Where do answers to product and after-sales questions come from?"),
      options: opts(["1–2 kişinin hafızasından", "1–2 people's memory"], ["Dağınık dosyalardan", "Scattered files"], ["Güncel bir SSS'den; arıza kayıtları tutuluyor", "An up-to-date FAQ; service tickets are logged"], ["Güncel bilgi bankası ve ölçülen destek kayıtlarından", "A current knowledge base and measured ticketing"]),
    },
    {
      id: "a5", dimension: "data",
      text: L("Bir çalışan güncel prosedürü, fiyat listesini veya sözleşmeyi ne kadar hızlı bulur?", "How fast can an employee find the current procedure, price list or contract?"),
      options: opts(["Bir arkadaşına sorar", "Asks a colleague"], ["Karışık ortak klasörlerde arar", "Searches messy shared folders"], ["Düzenli, sorumlusu belli merkezi bir yerde", "In an organized central place with owners"], ["Sürümlü, erişim kontrollü ve düzenli gözden geçirilen bir yerde", "Versioned, access-controlled and regularly reviewed"]),
    },
    {
      id: "a6", dimension: "data",
      text: L("Müşteri, ürün, stok ve sipariş verileriniz ne kadar güvenilir?", "How reliable is your customer, product, stock and order data?"),
      options: opts(["Excel veya kâğıtta, çok hata var", "In spreadsheets or on paper, many errors"], ["Sistemde ama tutarsız", "In systems, but inconsistent"], ["Çoğu ERP/CRM'de, sorumlusu var", "Mostly in ERP/CRM, with owners"], ["Tek kaynak, kontrollü; raporlara güveniliyor", "One checked source; reports are trusted"]),
    },
    {
      id: "a7", dimension: "process",
      text: L("Teklif, sipariş, stok, fatura ve raporlarda ne kadarı elle yeniden yazılıyor?", "How much of quotes, orders, stock, invoices and reports is retyped by hand?"),
      options: opts(["Çoğu", "Most of it"], ["Epey", "A lot"], ["Biraz", "Some"], ["Çok az", "Very little"]),
    },
    {
      id: "a8", dimension: "process",
      text: L("ERP, CRM, pazaryerleri (Trendyol, Hepsiburada vb.) ve muhasebe/e-fatura birbirine otomatik veri aktarıyor mu?", "Do your ERP, CRM, marketplaces and accounting/e-invoicing exchange data automatically?"),
      options: opts(["Hayır / emin değilim", "No / not sure"], ["Yalnızca Excel/CSV ile", "Only via Excel/CSV"], ["Ana akışlar bağlı", "The main flows are connected"], ["Çoğu API ile bağlı", "Most are connected via APIs"]),
    },
    {
      id: "a9", dimension: "people",
      text: L("Çalışanlar yapay zeka araçlarını kullanıp çıktısını kontrol edebiliyor mu?", "Can your staff use AI tools and check their output?"),
      options: opts(["Araçları tanımıyorlar", "They don't know the tools"], ["Birkaç kişi kendi kendine öğrendi", "A few taught themselves"], ["Bazı ekipler eğitim aldı", "Some teams were trained"], ["Role göre eğitim ve şirket içi yol göstericiler var", "Role-based training and internal champions"]),
    },
    {
      id: "a10", dimension: "people",
      text: L("Hangi şirket ve müşteri verisinin yapay zeka araçlarına girebileceğine dair bir kural var mı (KVKK)?", "Is there a rule on which company and customer data may go into AI tools (KVKK/GDPR)?"),
      options: opts(["Yok / emin değilim", "No / not sure"], ["Sözlü uyarılar var", "Verbal warnings"], ["Yazılı kural var, eğitim yok", "A written rule, no training"], ["Kural, eğitim, kurumsal hesaplar ve kontrol var", "Rule, training, business accounts and checks"]),
    },
    {
      id: "a11", dimension: "ownership",
      text: L("Yapay zeka ve dijital iyileştirmenin sorumlusu kim?", "Who owns AI and digital improvement?"),
      options: opts(["Kimse", "Nobody"], ["Patron, vakit bulduğunda", "The owner, when there's time"], ["Belli bir kişi, kısmi zamanı var", "A named person with some time"], ["Zamanı, bütçesi ve düzenli gözden geçirmesi olan bir sorumlu", "A named owner with time, budget and regular reviews"]),
    },
    {
      id: "a12", dimension: "ownership",
      text: L("Bir değişikliğin işe yaradığını nasıl anlıyorsunuz?", "How do you know whether a change worked?"),
      options: opts(["Anlamıyoruz", "We don't"], ["İçgüdüyle", "Gut feeling"], ["Ara sıra bazı sayılarla", "Some numbers, occasionally"], ["Önce/sonra ölçümü ve takip edilen hedeflerle", "Before/after measurement and tracked targets"]),
    },
  ],
  recommendations: {
    strategy: [
      {
        title: L("Doğru ilk süreci seçin", "Pick the right first process"),
        body: L("Hangi süreçte yapay zekanın en çok getiri sağlayacağını ve verinizin ne kadar hazır olduğunu netleştiren kısa bir tarama, boşa giden pilotları önler.", "A short scan that shows where AI would pay off most and how ready your data is prevents wasted pilots."),
        href: "/services/ai-agents", packageId: "ai-opportunity-scan",
      },
    ],
    customer: [
      {
        lowest: "a4",
        title: L("Destek ve teknik servis asistanı", "Support & technical service assistant"),
        body: L("Sık sorulan soruları kılavuzlarınızdan cevaplayan, arıza kaydı açan ve karmaşık durumları ekibinize devreden bir asistan. Bilgi henüz dağınıksa ilk adım dokümanları toparlamak.", "An assistant that answers common questions from your manuals, opens tickets and hands complex cases to your team. If knowledge is still scattered, step one is pulling the documents together."),
        href: "/services/ai-agents", packageId: "ai-agent-pilot",
      },
      {
        title: L("Satış asistanı", "Sales assistant"),
        body: L("Web sitesi, WhatsApp ve Instagram'dan gelen talepleri hemen karşılayan, nitelendiren, teklife veya randevuya taşıyan ve CRM'e işleyen bir asistan; kaybolan talepleri durdurur.", "An assistant that answers inquiries from your website, WhatsApp and Instagram immediately, qualifies them, moves them to a quote or meeting and logs them in your CRM, so leads stop getting lost."),
        href: "/services/ai-agents", packageId: "ai-agent-pilot",
      },
    ],
    data: [
      {
        lowest: "a6",
        title: L("Önce veriyi toparlayın", "Clean up the data first"),
        body: L("Müşteri, ürün ve stok verisi tutarsızsa yapay zeka da hatalı cevap verir. Tek kaynak ve sorumlu belirlemek, her yapay zeka projesinin ön koşulu.", "If customer, product and stock data is inconsistent, AI will give wrong answers too. One source of truth with an owner is a precondition for any AI project."),
        href: "/services/ai-agents", packageId: "ai-opportunity-scan",
      },
      {
        title: L("Şirket içi bilgi asistanı", "Internal knowledge assistant"),
        body: L("Çalışanların prosedür, fiyat listesi ve dokümanlardan kaynağı gösterilerek cevap aldığı bir asistan; arkadaşına sorma zamanını azaltır.", "An assistant that answers staff questions from procedures, price lists and documents with sources shown, cutting the time spent asking colleagues."),
        href: "/services/ai-agents",
      },
    ],
    process: [
      {
        title: L("İş akışı otomasyonu", "Workflow automation"),
        body: L("Teklif, sipariş, stok ve fatura arasındaki elle veri girişini ERP, CRM, e-ticaret ve pazaryeri entegrasyonlarıyla kaldırmak; gerektiği yerde yapay zeka adımları eklemek.", "Removing manual data entry between quotes, orders, stock and invoices through ERP, CRM, e-commerce and marketplace integrations, with AI steps where they help."),
        href: "/services/ai-agents",
      },
    ],
    people: [
      {
        title: L("Ekip eğitimi ve kullanım kuralları", "Team training and usage rules"),
        body: L("Çalışanlarınız zaten yapay zeka araçlarını kullanıyor olabilir. Uygulamalı bir eğitim ve hangi verinin bu araçlara girebileceğine dair net kurallar (KVKK) riski azaltır, verimi artırır.", "Your staff may already be using AI tools. Hands-on training and clear rules on which data may go into them (KVKK/GDPR) reduce risk and raise productivity."),
        href: "/services/ai-agents",
      },
    ],
    ownership: [
      {
        title: L("Sorumlu ve ölçüm belirleyin", "Name an owner and a measure"),
        body: L("Bir sorumlu ve önce/sonra ölçümü olmadan projeler yarıda kalır. Her iyileştirme için tek bir hedef sayı (ör. cevap süresi) belirleyin.", "Without an owner and a before/after measure, projects stall. Set one target number (e.g. response time) for each improvement."),
        href: "/services/ai-agents",
      },
    ],
  },
  cta: [[{ packageId: "ai-opportunity-scan" }], [{ packageId: "ai-opportunity-scan" }], [], []],
};

/* ================================================================== */
/* 2. Siber güvenlik olgunluk testi                                    */
/* ================================================================== */
const has = (...any: string[]): Condition => ({ q: "has", any });

const security: Assessment = {
  slug: "security-maturity",
  serviceSlug: "cybersecurity",
  title: L("Siber Güvenlik Olgunluk Testi", "Cybersecurity Maturity Assessment"),
  shortTitle: L("Siber güvenlik", "Cybersecurity"),
  metaDescription: L(
    "KOBİ'ler için ücretsiz, 3 dakikalık siber güvenlik olgunluk testi: MFA, yedekleme, güncellemeler, dolandırıcılık ve KVKK. Puanınızı ve ilk 3 adımı hemen görün. Kayıt yok.",
    "Free 3-minute cybersecurity maturity assessment for SMEs: MFA, backups, updates, fraud and data protection. See your score and first 3 steps instantly. No sign-up.",
  ),
  intro: L(
    "Yaklaşık 12 soru, 3 dakika, kayıt yok. Soruların bir kısmı şirketinize göre değişir. Sonunda 0–100 arası bir puan, alanlara göre dağılım ve önce kapatmanız gereken açıkları görürsünüz.",
    "About 12 questions, 3 minutes, no sign-up. Some questions adapt to your company. You get a 0–100 score, a breakdown by area and the gaps to close first.",
  ),
  frameworks: "NIST CSF 2.0, CIS Controls IG1, UK Cyber Essentials, KVKK",
  levels: [L("Başlangıç", "Exposed"), L("Temel", "Foundational"), L("Gelişmiş", "Managed"), L("Dayanıklı", "Resilient")],
  levelText: [
    L("Birkaç temel kontrol eksik ve bunlar saldırganların en sık kullandığı kapılar. İyi haber: en etkili adımlar genellikle ucuz ve hızlı.", "A few basic controls are missing, and these are the doors attackers use most. The good news: the most effective steps are usually cheap and quick."),
    L("Temeller kısmen yerinde ama birkaç önemli açık var. Önce aşağıdaki ilk adımı kapatın.", "Some basics are in place, but there are a few important gaps. Close the first step below first."),
    L("Güvenlik düzenli yönetiliyor. Sıradaki adım, güvendiğiniz yerleri bağımsız bir testle kanıtlamak.", "Security is managed regularly. The next step is proving it with an independent test."),
    L("Güçlü bir temel var. Odak artık sürekli test, tatbikat ve tedarik zinciri.", "You have a strong base. The focus now is continuous testing, drills and the supply chain."),
  ],
  dimensions: [
    { id: "identity", label: L("Kimlik ve erişim", "Identity & access") },
    { id: "recovery", label: L("Yedek ve kurtarma", "Backup & recovery") },
    { id: "exposure", label: L("Güncelleme ve dışa açıklık", "Updates & exposure") },
    { id: "cloud", label: L("Bulut ve cihazlar", "Cloud & devices") },
    { id: "people", label: L("İnsan ve dolandırıcılık", "People & fraud") },
    { id: "governance", label: L("Yönetim ve tedarik zinciri", "Governance & supply chain") },
  ],
  profile: [
    sizeQuestion(),
    {
      id: "has",
      multi: true,
      text: L("Hangileri sizde var? (birden fazla seçebilirsiniz)", "Which of these apply to you? (select all that apply)"),
      hint: L("Bazı sorular buna göre gösterilir.", "Some questions depend on this."),
      options: [
        { id: "website", label: L("Web sitesi veya e-mağaza", "Website or online shop") },
        { id: "app", label: L("Web uygulaması, portal, API veya mobil uygulama", "Web app, portal, API or mobile app") },
        { id: "dev", label: L("Yazılım geliştiriyoruz (kendimiz veya ajansla)", "We develop software (in-house or via an agency)") },
        { id: "cloud", label: L("Bulut (Microsoft 365, Google Workspace, AWS, Azure)", "Cloud (Microsoft 365, Google Workspace, AWS, Azure)") },
        { id: "iot", label: L("Bağlı cihazlar, IoT veya makineler", "Connected devices, IoT or machines") },
        { id: "products", label: L("Sattığımız yazılımlı/firmware'li ürünler", "Products we sell that contain software or firmware") },
      ],
    },
  ],
  questions: [
    {
      id: "s1", dimension: "identity", critical: true,
      text: L("Çalışanlar e-postaya veya bulut uygulamalarına girerken şifreden başka bir şey soruluyor mu?", "When staff sign in to email or cloud apps, are they asked for anything besides a password?"),
      hint: L("Örneğin SMS kodu veya telefondan onay (MFA).", "For example a text code or an app approval (MFA)."),
      options: opts(["Hayır / emin değilim", "No / not sure"], ["Yalnızca bazı kişilerde veya uygulamalarda", "Only for some people or apps"], ["Herkeste, e-posta ve bulutta", "For everyone, on email and cloud"], ["Herkeste; uzaktan erişim ve yönetici hesapları dahil", "For everyone, including remote access and admin accounts"]),
    },
    {
      id: "s2", dimension: "identity",
      text: L("Kimde tam yönetici yetkisi var?", "Who has full administrator rights?"),
      options: opts(["Çalışanların çoğunda / emin değilim", "Most staff / not sure"], ["Birkaç kişide; aynı hesapla e-posta ve web de kullanılıyor", "A few people, who also use those accounts for email and web"], ["Belli kişilerde, ayrı yönetici hesabıyla", "Named people, with separate admin accounts"], ["Ayrıca MFA, düzenli kontrol; ayrılanın yetkisi aynı gün kapanıyor", "Plus MFA and reviews; leavers lose access the same day"]),
    },
    {
      id: "s3", dimension: "recovery", critical: true,
      text: L("Bugün fidye yazılımı sistemlerinizi kilitlese her şeyi geri yükleyebilir misiniz?", "If ransomware locked your systems today, could you restore everything?"),
      options: opts(["Yedek yok / emin değilim", "No backups / not sure"], ["Yedek var ama aynı ağda veya hiç denenmedi", "Backups exist, but on the same network or never tested"], ["Ayrı veya çevrimdışı kopyası olan otomatik yedek, bir kez denendi", "Automatic backups with a separate or offline copy, tested once"], ["Ayrıca son 6 ayda geri yükleme denendi, kurtarma süresi biliniyor", "Plus a restore tested in the last 6 months and a known recovery time"]),
    },
    {
      id: "s4", dimension: "recovery",
      text: L("Yarın bir ihlal yaşansa kim ne yapacağını biliyor mu?", "If you had a breach tomorrow, would people know what to do?"),
      options: opts(["Hayır", "No"], ["Bilgi işlemciyi ararız; yazılı bir şey yok", "We'd call our IT person; nothing is written"], ["İletişim kişilerini ve KVKK'ya 72 saatte bildirimi içeren yazılı plan var", "A written plan with contacts and the 72-hour data-breach notification step"], ["Ayrıca son 12 ayda tatbikat yapıldı", "Plus a drill in the last 12 months"]),
    },
    {
      id: "s5", dimension: "exposure", critical: true,
      text: L("Güvenlik güncellemeleri, güvenlik duvarı ve VPN dahil, ne kadar hızlı yükleniyor?", "How fast are security updates installed, including on firewalls and VPNs?"),
      options: opts(["Rastgele / bazı sistemler artık desteklenmiyor", "Ad hoc / some systems are no longer supported"], ["Bilgisayarlar otomatik; ağ cihazlarına bakılmıyor", "PCs update automatically; network devices aren't checked"], ["Kritik güncellemeler her yerde yaklaşık 2 hafta içinde", "Critical updates everywhere within about 2 weeks"], ["İnternete açık cihazlar birkaç gün içinde; merkezi takip, desteklenmeyen sistem yok", "Internet-facing devices within days; tracked centrally, nothing unsupported"]),
    },
    {
      id: "s6", dimension: "exposure", showIf: has("app", "website"),
      text: L("Web siteniz, uygulamanız veya API'niz en son ne zaman bağımsız biri tarafından test edildi?", "When was your website, app or API last tested by someone independent?"),
      options: opts(["Hiç / emin değilim", "Never / not sure"], ["Yalnızca otomatik tarama veya geliştiricinin kendi kontrolü", "Only automated scans or the developers' own checks"], ["Son 2 yıl içinde bağımsız bir OWASP testi", "An independent OWASP-style test in the last 2 years"], ["Son 12 ayda ve büyük değişikliklerden sonra; düzeltmeler yeniden test edildi", "In the last 12 months and after major changes; fixes retested"]),
    },
    {
      id: "s7", dimension: "cloud",
      text: L("Microsoft 365, Google Workspace, AWS veya Azure'daki güvenlik ayarlarını kim kontrol ediyor?", "Who checks the security settings in Microsoft 365, Google Workspace, AWS or Azure?"),
      options: opts(["Kimse / emin değilim", "Nobody / not sure"], ["Bir kez kuruldu, hiç gözden geçirilmedi", "Set up once, never reviewed"], ["Ara sıra bir kontrol listesiyle", "Occasionally, against a checklist"], ["Her yıl gözden geçiriliyor veya alarmla izleniyor", "Reviewed yearly or monitored with alerts"]),
    },
    {
      id: "s8", dimension: "cloud", showIf: has("iot", "products"),
      text: L("Kameralar, sensörler, makineler veya sattığınız cihazlar için durum nedir?", "What is the situation with cameras, sensors, machines or devices you sell?"),
      options: opts(["Neyin bağlı olduğunu bilmiyoruz", "We don't know what's connected"], ["Listeli ama varsayılan şifreler kalmış olabilir", "Listed, but default passwords may remain"], ["Varsayılan şifreler değişti, ayrı ağda, güncelleniyor", "Defaults changed, on a separate network, kept updated"], ["Ayrıca sattığımız ürünlerde açık bildirme süreci ve güvenli güncelleme var", "Plus vulnerability handling and secure updates for products we sell"]),
    },
    {
      id: "s9", dimension: "people",
      text: L("Çalışanlar oltalama (phishing) ve dolandırıcılığı tanımayı nasıl öğreniyor?", "How do staff learn to spot phishing and scams?"),
      options: opts(["Öğrenmiyor", "They don't"], ["Yalnızca işe girişte", "Only at onboarding"], ["Yılda bir eğitimle", "Yearly training"], ["Kısa ve düzenli eğitim, sahte SMS/arama denemeleri, kolay bildirim yolu", "Short regular training, simulated texts/calls, an easy way to report"]),
    },
    {
      id: "s10", dimension: "people",
      text: L("“Patron” veya bir tedarikçi olduğunu söyleyen biri arama, mesaj ya da sesli notla acil ödeme veya yeni banka hesabı istiyor. Ne olur?", "Someone claiming to be the boss or a supplier urgently asks, by call, message or voice note, for a payment or new bank details. What happens?"),
      options: opts(["Çalışanlar genelde yapar", "Staff usually comply"], ["Kime geldiğine bağlı", "It depends who gets it"], ["Önce her zaman bilinen numaradan geri aranır", "Staff always call back on a known number first"], ["Ayrıca belli tutarın üstünde çift onay; ses klonlama ve deepfake eğitimi", "Plus dual approval above a set amount, and deepfake/voice-cloning training"]),
    },
    {
      id: "s11", dimension: "governance",
      text: L("Güvenlikten sorumlu belli bir kişi ve sistemlerinizin, kişisel verilerin nerede tutulduğunun güncel bir listesi var mı?", "Is there a named security owner and an up-to-date list of your systems and where personal data is kept?"),
      options: opts(["Hayır", "No"], ["Biri “IT'ye bakıyor”, yazılı bir şey yok", "Someone looks after IT; nothing is written"], ["Sorumlu kişi, liste ve yazılı KVKK tedbirleri var", "A named owner, a list and documented data-protection measures"], ["Ayrıca yıllık risk değerlendirmesi ve veri işleyenlerle sözleşmeler", "Plus a yearly risk assessment and contracts with data processors"]),
    },
    {
      id: "s12a", dimension: "governance", showIf: has("dev"),
      text: L("Geliştirdiğiniz yazılımda güvenlik nasıl kontrol ediliyor?", "How is security checked in the software you build?"),
      options: opts(["Özel bir kontrol yok", "Not specifically"], ["Gayriresmi kod incelemesi", "Informal code review"], ["CI/CD'de otomatik kod ve bağımlılık taraması", "Automated code and dependency scanning in CI/CD"], ["Ayrıca tehdit modellemesi ve yayın öncesi test", "Plus threat modelling and pre-release testing"]),
    },
    {
      id: "s12b", dimension: "governance", hideIf: has("dev"),
      text: L("BT hizmet sağlayıcılarınızın sistemlerinize erişimini nasıl kontrol ediyorsunuz?", "How do you control your IT providers' access to your systems?"),
      options: opts(["Hiç", "Not at all"], ["İtibarlarına güveniyoruz", "We trust their reputation"], ["Sözleşmede güvenlik maddeleri ve hesaplarında MFA", "Security clauses in contracts and MFA on their accounts"], ["Ayrıca yıllık gözden geçirme, erişim kaydı; gerekmeyince kapatılıyor", "Plus yearly review and logged access, removed when not needed"]),
    },
  ],
  recommendations: {
    identity: [
      {
        lowest: "s1",
        title: L("Herkeste MFA'yı açın", "Turn on MFA for everyone"),
        body: L("E-posta ve bulut hesaplarında çok faktörlü doğrulama, hesap ele geçirmelerinin büyük çoğunluğunu engeller ve genellikle bir günde açılabilir. Yönetici hesaplarından başlayın.", "Multi-factor authentication on email and cloud accounts blocks the vast majority of account takeovers and can usually be switched on in a day. Start with admin accounts."),
        href: "/services/cybersecurity",
      },
      {
        title: L("Yönetici yetkilerini daraltın", "Narrow down admin rights"),
        body: L("Yönetici yetkisini birkaç kişiye ve ayrı hesaplara indirin, ayrılan çalışanların erişimini aynı gün kapatın. Bulut ortamında bunu bir bulut güvenliği incelemesi netleştirir.", "Limit admin rights to a few people with separate accounts and remove leavers' access the same day. In the cloud, a cloud security review makes this concrete."),
        href: "/services/cybersecurity",
      },
    ],
    recovery: [
      {
        title: L("Yedeği bir kez geri yükleyin", "Restore your backup once"),
        body: L("Ayrı veya çevrimdışı bir kopya ve gerçekten denenmiş bir geri yükleme, fidye yazılımına karşı en güçlü sigortadır. Yanına KVKK bildirim adımını içeren kısa bir olay planı ekleyin.", "A separate or offline copy and a restore that has actually been tested are the strongest insurance against ransomware. Add a short incident plan that includes the data-breach notification step."),
        href: "/services/cybersecurity",
      },
    ],
    exposure: [
      {
        lowest: "s6", when: has("app", "website"),
        title: L("Web uygulamanızı test ettirin", "Get your web app tested"),
        body: L("İnternete açık uygulamalar ve API'ler en sık saldırılan yerler. OWASP Top 10 odaklı kısa bir tarama en önemli açıkları önceliklendirilmiş bir raporla gösterir.", "Internet-facing apps and APIs are among the most attacked targets. A short OWASP Top 10-focused scan shows the most important gaps in a prioritized report."),
        href: "/services/cybersecurity", packageId: "security-quick-scan",
      },
      {
        title: L("Güncellemeleri takvime bağlayın", "Put updates on a schedule"),
        body: L("Güvenlik duvarı, VPN ve sunucular dahil kritik güncellemeleri birkaç gün içinde yükleyin; artık desteklenmeyen sistemleri ayırın veya değiştirin. Saldırıların büyük kısmı bilinen ama kapatılmamış açıklardan girer.", "Install critical updates within days, including firewalls, VPNs and servers, and isolate or replace unsupported systems. Most attacks come in through known but unpatched holes."),
        href: "/services/cybersecurity",
      },
    ],
    cloud: [
      {
        lowest: "s8",
        title: L("Bağlı cihazları güvenceye alın", "Secure your connected devices"),
        body: L("Cihaz listesini çıkarın, varsayılan şifreleri değiştirin ve cihazları ayrı bir ağa alın. AB'ye cihaz satıyorsanız Siber Dayanıklılık Yasası (CRA) açık bildirme süreci istiyor.", "List your devices, change default passwords and move them to a separate network. If you sell devices into the EU, the Cyber Resilience Act requires a vulnerability-handling process."),
        href: "/services/cybersecurity",
      },
      {
        title: L("Bulut ayarlarını gözden geçirin", "Review your cloud settings"),
        body: L("Microsoft 365, Google Workspace veya AWS/Azure'daki kimlik, paylaşım ve erişim ayarları çoğu zaman ilk kurulumdan beri hiç kontrol edilmemiştir. Kısa bir bulut güvenliği incelemesi riskli ayarları bulur.", "Identity, sharing and access settings in Microsoft 365, Google Workspace or AWS/Azure are often unchanged since setup. A short cloud security review finds the risky ones."),
        href: "/services/cybersecurity",
      },
    ],
    people: [
      {
        title: L("Çalışanlara dolandırıcılığı tanıtın", "Teach staff to spot fraud"),
        body: L("Kısa ve uygulamalı bir oturum (oltalama, sahte fatura, ses klonlama) ve “ödeme talebinde her zaman bilinen numaradan geri ara” kuralı, en pahalı dolandırıcılık türlerini durdurur.", "A short hands-on session (phishing, fake invoices, voice cloning) and a 'always call back on a known number before paying' rule stop the most expensive kinds of fraud."),
        href: "/services/cybersecurity",
      },
    ],
    governance: [
      {
        lowest: "s12a", when: has("dev"),
        title: L("Güvenliği yazılım sürecine ekleyin", "Build security into development"),
        body: L("CI/CD hattına otomatik kod ve bağımlılık taraması, kritik bölümlere güvenli kod incelemesi eklemek açıkları canlıya çıkmadan yakalar.", "Adding automated code and dependency scanning to CI/CD and secure code review for critical parts catches holes before they reach production."),
        href: "/services/cybersecurity",
      },
      {
        title: L("90 günlük güvenlik yol haritası", "A 90-day security roadmap"),
        body: L("Bir sorumlu, sistem ve kişisel veri listesi ve önceliklendirilmiş bir plan, dağınık önlemleri yönetilebilir hale getirir. Bir olgunluk değerlendirmesi bu planı çıkarır.", "An owner, a list of systems and personal data, and a prioritized plan turn scattered measures into something manageable. A maturity assessment produces that plan."),
        href: "/services/cybersecurity",
      },
    ],
  },
  caps: { oneZero: 59, twoZeros: 39, oneLow: 79 },
  cta: [[], [], [{ packageId: "security-quick-scan", when: has("app", "website") }], [{ packageId: "security-quick-scan", when: has("app", "website") }]],
};

/* ================================================================== */
/* 3. Bulut ve mimari sağlık testi (+ IoT dalı)                        */
/* ================================================================== */
const devices = (...any: string[]): Condition => ({ q: "devices", any });

const cloud: Assessment = {
  slug: "cloud-health",
  serviceSlug: "cloud-devops",
  title: L("Bulut ve Mimari Sağlık Testi", "Cloud & Architecture Health Check"),
  shortTitle: L("Bulut ve mimari", "Cloud & architecture"),
  metaDescription: L(
    "Ücretsiz, 3–4 dakikalık bulut ve mimari sağlık testi: maliyet, mimari, teslimat, yedekleme, izleme ve performans. Bağlı cihazınız varsa IoT soruları da. Kayıt yok.",
    "Free 3–4 minute cloud and architecture health check: cost, architecture, delivery, backups, monitoring and performance, plus IoT questions if you have devices. No sign-up.",
  ),
  intro: L(
    "12 soru (bağlı cihazınız varsa 4 IoT sorusu daha), yaklaşık 3–4 dakika, kayıt yok. Bulutta, şirket içinde veya karışık çalışan sistemler için uygundur.",
    "12 questions (plus 4 IoT questions if you have connected devices), about 3–4 minutes, no sign-up. Works for systems in the cloud, on-premises or both.",
  ),
  frameworks: "AWS Well-Architected (IoT Lens dahil), DORA, FinOps, NIST IR 8259A",
  levels: [L("Riskli", "At risk"), L("Kırılgan", "Fragile"), L("Sağlam", "Solid"), L("Olgun", "Mature")],
  levelText: [
    L("Sistemleriniz büyümeyi ve aksilikleri kaldırmakta zorlanabilir. Önce en riskli noktayı kapatmak, sonra maliyeti ve teslimatı düzene sokmak gerekiyor.", "Your systems may struggle with growth and incidents. Close the riskiest point first, then get cost and delivery under control."),
    L("Çalışıyor ama kırılgan: bir aksilik veya trafik artışı pahalıya patlayabilir. Aşağıdaki ilk adım en büyük riski azaltır.", "It works, but it's fragile: an incident or traffic spike could get expensive. The first step below reduces the biggest risk."),
    L("Sağlam bir temel var. Kazanç artık maliyet optimizasyonunda ve teslimat hızında.", "You have a solid base. The gains now are in cost optimization and delivery speed."),
    L("Olgun bir yapı. Odak sürekli iyileştirme, kapasite planlama ve büyümeye hazırlık.", "A mature setup. The focus is continuous improvement, capacity planning and readiness for growth."),
  ],
  dimensions: [
    { id: "cost", label: L("Maliyet", "Cost") },
    { id: "architecture", label: L("Mimari", "Architecture") },
    { id: "delivery", label: L("Teslimat", "Delivery") },
    { id: "resilience", label: L("Dayanıklılık", "Resilience") },
    { id: "operations", label: L("İşletme ve güvenlik", "Operations & security") },
    { id: "performance", label: L("Performans ve veri", "Performance & data") },
    { id: "iot", label: L("IoT", "IoT"), group: "iot" },
  ],
  groups: [{ id: "iot", label: L("IoT alt puanı", "IoT sub-score") }],
  profile: [
    {
      id: "engineers",
      text: L("Kaç yazılımcınız var (dış ekip dahil)?", "How many developers do you have (including external)?"),
      options: [
        { id: "1-5", label: L("1–5", "1–5") },
        { id: "6-20", label: L("6–20", "6–20") },
        { id: "21-50", label: L("21–50", "21–50") },
        { id: "50+", label: L("50+", "50+") },
      ],
    },
    {
      id: "hosting",
      text: L("Sistemleriniz nerede çalışıyor?", "Where do your systems run?"),
      options: [
        { id: "cloud", label: L("Bulutta (AWS, Azure, Google Cloud vb.)", "In the cloud (AWS, Azure, Google Cloud, etc.)") },
        { id: "onprem", label: L("Kendi sunucularımızda / kapalı ağda", "On our own servers / closed network") },
        { id: "hybrid", label: L("Karışık", "A mix") },
      ],
    },
    {
      id: "structure",
      text: L("Uygulamanız nasıl bir yapıda?", "How is your application structured?"),
      options: [
        { id: "single", label: L("Tek büyük uygulama", "One large application") },
        { id: "few", label: L("Birkaç servis", "A few services") },
        { id: "many", label: L("10'dan fazla servis", "More than 10 services") },
        { id: "unsure", label: L("Emin değilim", "Not sure") },
      ],
    },
    {
      id: "devices",
      text: L("Sistemlerinize bağlı kaç cihaz var (sensör, panel, makine vb.)?", "How many connected devices do your systems have (sensors, panels, machines, etc.)?"),
      hint: L("Cihaz varsa 4 IoT sorusu eklenir.", "If you have devices, 4 IoT questions are added."),
      options: [
        { id: "none", label: L("Yok", "None") },
        { id: "lt100", label: L("100'den az", "Fewer than 100") },
        { id: "100-10k", label: L("100–10.000", "100–10,000") },
        { id: "10k+", label: L("10.000+", "10,000+") },
      ],
    },
  ],
  questions: [
    {
      id: "c1", dimension: "cost",
      text: L("Geçen ayın altyapı faturası neden değişti diye sorulsa ne kadar hızlı cevap verirsiniz?", "If asked why last month's infrastructure bill changed, how fast could you answer?"),
      options: opts(["Veremeyiz, sorumlusu yok", "We couldn't; nobody owns it"], ["Günlerce uğraşırız", "After days of digging"], ["Aynı gün; aylık gözden geçirme ve bütçe alarmı var", "Same day; monthly review and budget alerts"], ["Hemen; maliyetler ürüne göre etiketli, anormallik alarmı var", "Instantly; costs tagged per product with anomaly alerts"]),
    },
    {
      id: "c2", dimension: "cost",
      text: L("Boşta veya gereğinden büyük kaynakları (7/24 açık test ortamları, büyük sunucular) en son ne zaman temizlediniz?", "When did you last remove idle or oversized resources (test environments running 24/7, oversized servers)?"),
      options: opts(["Hiç / emin değilim", "Never / not sure"], ["Bir kez, fatura şokundan sonra", "Once, after a bill shock"], ["Yılda birkaç kez", "A few times a year"], ["Sürekli; zamanlama, otomatik ölçekleme, indirimli planlar", "Continuously: schedules, autoscaling, discount plans"]),
    },
    {
      id: "c3", dimension: "architecture",
      text: L("Tek bir iş alanını (ör. faturalama) diğerlerini yeniden yayınlamadan değiştirebiliyor musunuz?", "Can you change one business area (e.g. invoicing) without redeploying the others?"),
      options: opts(["Her şey birbirine bağlı", "Everything is tangled"], ["Nadiren; her sürüm hep birlikte çıkıyor", "Rarely; everything is released together"], ["Çoğunlukla", "Mostly"], ["Evet; kendi verisi olan bağımsız modüller", "Yes; independent modules that own their data"]),
    },
    {
      id: "c4", dimension: "architecture",
      text: L("Yeni bir geliştirici küçük bir değişikliği ne kadar sürede güvenle canlıya alır?", "How long until a new developer safely ships a small change?"),
      options: opts(["Aylar / yalnızca 1–2 kişi yapabiliyor", "Months / only 1–2 people can"], ["1–3 ay", "1–3 months"], ["2–4 hafta", "2–4 weeks"], ["2 haftadan az", "Under 2 weeks"]),
    },
    {
      id: "c5", dimension: "delivery",
      text: L("Bir değişiklik canlıya nasıl çıkıyor?", "How does a change reach production?"),
      options: opts(["Elle kopyalama, SSH veya panelden tıklama", "Manual copying, SSH or console clicks"], ["Tek kişinin çalıştırdığı betiklerle", "Scripts one person runs"], ["Testli otomatik bir hatla (CI/CD)", "An automated pipeline with tests (CI/CD)"], ["Ayrıca altyapı kod olarak tanımlı, konteyner kullanılıyor", "Plus infrastructure as code and containers"]),
    },
    {
      id: "c6", dimension: "delivery",
      text: L("Bir sürüm bir şeyi bozduğunda kullanıcılar ne kadar sürede normale döner?", "When a release breaks something, how long until users are fine again?"),
      options: opts(["Bir gün veya daha fazla", "A day or more"], ["Saatler", "Hours"], ["1 saatten az", "Under an hour"], ["Dakikalar; geri alma veya özellik anahtarları var", "Minutes; rollback or feature flags"]),
    },
    {
      id: "c7", dimension: "resilience", critical: true,
      text: L("Canlı veriyi yedekten en son ne zaman deneme amaçlı geri yüklediniz?", "When did you last test-restore production data from a backup?"),
      options: opts(["Güvenilir yedeğimiz yok / emin değilim", "We have no reliable backups / not sure"], ["Hiç denemedik", "Never tested"], ["Son 12 ay içinde", "Within the last 12 months"], ["En az 3 ayda bir; başka bir yerde kopyası var", "At least quarterly, with an off-site copy"]),
    },
    {
      id: "c8", dimension: "resilience",
      text: L("Ana sunucunuz veya veritabanınız bir gün çökse ne olur?", "If your main server or database went down for a day, what would happen?"),
      options: opts(["Düzelene kadar kapalıyız", "We're down until it's fixed"], ["Bir kişiye bağlı", "It depends on one person"], ["Yazılı plan var, prova edilmedi", "A written plan, never rehearsed"], ["Yedekli yapı ve prova edilmiş plan", "A redundant setup and a rehearsed plan"]),
    },
    {
      id: "c9", dimension: "operations",
      text: L("Canlı sistemin bozulduğunu nasıl fark ediyorsunuz?", "How do you find out that production is broken?"),
      options: opts(["Müşteri söylüyor", "Customers tell us"], ["Şikayetten sonra loglara bakıyoruz", "We check logs after complaints"], ["Otomatik alarmlarla", "Automated alerts"], ["Kullanıcı odaklı hedeflere bağlı alarm, merkezi log, nöbetçi", "Alerts on user-facing targets, central logs, on-call"]),
    },
    {
      id: "c10", dimension: "operations", critical: true,
      text: L("Yönetici erişimleri ve gizli bilgiler (şifreler, API anahtarları) nasıl yönetiliyor?", "How are admin access and secrets (passwords, API keys) handled?"),
      options: opts(["Ortak hesaplar; anahtarlar kodun içinde", "Shared logins; keys in the code"], ["Kişisel hesaplar ama geniş yönetici yetkisi", "Personal accounts, but broad admin rights"], ["MFA, en az yetki, şifre kasası", "MFA, least privilege, a secrets manager"], ["Ayrıca erişim gözden geçirmeleri ve otomatik yama", "Plus access reviews and automated patching"]),
    },
    {
      id: "c11", dimension: "performance",
      text: L("Trafik birden iki katına çıkarsa ne olur?", "What happens if traffic suddenly doubles?"),
      options: opts(["Yavaşlar veya çöker", "It slows down or crashes"], ["Elle büyütürüz", "We scale up by hand"], ["Darboğazlar biliniyor, kısmen otomatik ölçekleme", "Bottlenecks are known; some autoscaling"], ["Düzenli yük testleri; sınırlar biliniyor", "Regular load tests; limits are known"]),
    },
    {
      id: "c12", dimension: "performance",
      text: L("Ana veritabanınız ne kadar sağlıklı?", "How healthy is your main database?"),
      options: opts(["Sık zaman aşımı oluyor", "Frequent timeouts"], ["Kullanıcı şikayet edince düzeltiliyor", "Fixed when users complain"], ["İzleniyor ve indeksli", "Monitored and indexed"], ["Ayrıca kapasite planı ve sürümlü şema değişiklikleri", "Plus capacity planning and versioned schema changes"]),
    },
    {
      id: "i1", dimension: "iot", group: "iot", critical: true, showIf: devices("lt100", "100-10k", "10k+"),
      text: L("Her cihaz kendini sisteme nasıl tanıtıyor?", "How does each device prove who it is?"),
      options: opts(["Tüm cihazlarda aynı anahtar / emin değilim", "The same key on every device / not sure"], ["Cihaza özel anahtar, elle yükleniyor", "Unique keys, installed by hand"], ["Cihaza özel sertifika", "Per-device certificates"], ["Otomatik kurulum ve sertifika yenileme", "Zero-touch provisioning with certificate rotation"]),
    },
    {
      id: "i2", dimension: "iot", group: "iot", showIf: devices("lt100", "100-10k", "10k+"),
      text: L("Sahadaki cihazların yazılımını (firmware) nasıl güncelliyorsunuz?", "How do you update firmware on devices in the field?"),
      options: opts(["Uzaktan güncelleyemiyoruz", "We can't update remotely"], ["Uzaktan ama tek tek", "Remotely, but one by one"], ["İmzalı, toplu uzaktan güncelleme (OTA)", "Signed over-the-air (OTA) campaigns"], ["Aşamalı dağıtım ve otomatik geri alma", "Staged rollouts with automatic rollback"]),
    },
    {
      id: "i3", dimension: "iot", group: "iot", showIf: devices("lt100", "100-10k", "10k+"),
      text: L("Cihazlar çevrimdışı olunca veya mesajlar birden artınca veriye ne oluyor?", "What happens to data when devices go offline or messages spike?"),
      options: opts(["Kayboluyor", "It's lost"], ["Destek kaydı gelince fark ediyoruz", "We notice from support tickets"], ["Cihaz biriktirip sonra gönderiyor", "Devices buffer and resend"], ["Biriktir-gönder, mesaj önceliği ve sınırlar, filo paneli", "Store-and-forward, prioritization and limits, fleet dashboards"]),
    },
    {
      id: "i4", dimension: "iot", group: "iot", critical: true, showIf: devices("lt100", "100-10k", "10k+"),
      text: L("Biri bugün cihazınızda bir güvenlik açığı bildirse ne olur?", "If someone reported a vulnerability in your device today, what would happen?"),
      options: opts(["Bir süreç yok", "There's no process"], ["Duruma göre hallederiz", "We'd handle it ad hoc"], ["Yayınlanmış iletişim adresi ve bileşen listesi (SBOM) var", "A published contact point and a component list (SBOM)"], ["Yazılı süreç, OTA yaması ve CRA sürelerinde bildirim", "A written process, OTA patching and reporting within CRA deadlines"]),
    },
  ],
  recommendations: {
    cost: [
      {
        title: L("Maliyet ve mimari incelemesi", "Cost and architecture review"),
        body: L("Faturanın nereye gittiğini, boşta duran kaynakları ve mimari kaynaklı israfı gösteren bir inceleme, genellikle ilk ayda kendini çıkaran hızlı kazanımlar bulur.", "A review that shows where the bill goes, which resources sit idle and where the architecture wastes money usually finds quick wins that pay for themselves in the first month."),
        href: "/services/cloud-devops", packageId: "architecture-cloud-review",
      },
    ],
    architecture: [
      {
        when: { q: "structure", any: ["many"] },
        title: L("Servisleri sadeleştirin", "Simplify your services"),
        body: L("Gereğinden fazla servis, her değişikliği yavaşlatır ve işletme maliyetini artırır. Bazı servisleri birleştirmek veya modüler bir yapıya geçmek ekibi hızlandırır.", "Too many services slow every change and raise running costs. Merging some of them or moving to a modular structure speeds the team up."),
        href: "/services/microservices-modernization", packageId: "architecture-cloud-review",
      },
      {
        title: L("Adım adım modernizasyon", "Step-by-step modernization"),
        body: L("Her şeyin birbirine bağlı olduğu bir yapıyı sıfırdan yazmadan, alan alan modüllere ayırmak riski ve sürüm korkusunu azaltır.", "Splitting a tangled system into modules one area at a time—without a risky rewrite—reduces risk and the fear of releases."),
        href: "/services/microservices-modernization", packageId: "architecture-cloud-review",
      },
    ],
    delivery: [
      {
        title: L("Otomatik teslimat hattı", "An automated delivery pipeline"),
        body: L("Testli bir CI/CD hattı, konteynerler ve tek tıkla geri alma; sürümleri kişilere bağımlı olmaktan çıkarır ve bozulmaları dakikalar içinde düzeltir.", "A tested CI/CD pipeline, containers and one-click rollback take releases out of individual hands and fix breakages in minutes."),
        href: "/services/cloud-devops",
      },
    ],
    resilience: [
      {
        title: L("Yedekleme ve felaket kurtarma tatbikatı", "Backup and disaster-recovery drill"),
        body: L("Yedekten gerçekten geri yükleyebildiğinizi bir tatbikatla doğrulayın ve tek bir kişiye ya da sunucuya bağlı noktaları kaldırın.", "Prove with a drill that you can actually restore from backup, and remove points that depend on a single person or server."),
        href: "/services/cloud-devops",
      },
    ],
    operations: [
      {
        lowest: "c10",
        title: L("Erişimleri ve gizli anahtarları toparlayın", "Clean up access and secrets"),
        body: L("Ortak hesapları kaldırın, MFA açın ve koddaki anahtarları bir şifre kasasına taşıyın. Sonrasında bir güvenlik testi kalan açıkları gösterir.", "Remove shared logins, turn on MFA and move keys out of code into a secrets manager. A security test then shows what's left."),
        href: "/services/cybersecurity", packageId: "security-quick-scan",
      },
      {
        title: L("İzleme ve alarm", "Monitoring and alerting"),
        body: L("Sorunları müşteriden önce görmek için kullanıcı odaklı alarmlar ve merkezi loglama kurun.", "Set up user-focused alerts and central logging so you see problems before your customers do."),
        href: "/services/cloud-devops",
      },
    ],
    performance: [
      {
        title: L("Yük testi ve veritabanı iyileştirme", "Load testing and database tuning"),
        body: L("Darboğazı bir yük testiyle bulun; çoğu zaman sorun veritabanındadır. İndeksleme, sorgu iyileştirme veya doğru veritabanına geçiş trafik zirvelerini risk olmaktan çıkarır.", "Find the bottleneck with a load test—it's usually the database. Indexing, query tuning or moving to the right database take the risk out of traffic peaks."),
        href: "/services/cloud-devops", packageId: "architecture-cloud-review",
      },
    ],
    iot: [
      {
        title: L("IoT platformu ve CRA hazırlığı", "IoT platform and CRA readiness"),
        body: L("Cihaza özel kimlik, güvenli uzaktan güncelleme, kopmalara dayanıklı veri akışı ve açık bildirme süreci; AB'ye cihaz satıyorsanız Siber Dayanıklılık Yasası için de gerekli.", "Per-device identity, secure remote updates, data flows that survive disconnects and a vulnerability-handling process—also required under the Cyber Resilience Act if you sell devices into the EU."),
        href: "/services/iot-platforms",
      },
    ],
  },
  caps: { oneZero: 59 },
  cta: [[{ packageId: "architecture-cloud-review" }], [{ packageId: "architecture-cloud-review" }], [{ packageId: "architecture-cloud-review" }], []],
};

export const assessments: Assessment[] = [ai, security, cloud];

export function getAssessment(slug: string): Assessment | undefined {
  return assessments.find((item) => item.slug === slug);
}
