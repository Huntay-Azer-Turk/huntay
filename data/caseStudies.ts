import type { CaseStudy } from "./types";

export const caseStudies: CaseStudy[] = [
  {
    id: "bare-metal",
    title: {
      en: "Bare Metal: 4x throughput on a single-core Celeron",
      tr: "Bare Metal: Tek çekirdekli Celeron'da 4x throughput",
    },
    action: {
      en: "Inherited a centrifuge/spectrometer control system that crashed on i7 + 8GB RAM. Stripped out the bloat, made the mechanical and optical pipelines fully async, and pulled analysis to the core.",
      tr: "i7 + 8GB RAM'de bile çöken bir santrifüj/spektrometre kontrol sistemini devraldım. Şişirilmiş kodu temizledim, mekanik ve optik akışları tamamen asenkron yaptım, veri analizini merkeze taşıdım.",
    },
    result: {
      en: "4x throughput while dropping the hardware requirement to a single-core Celeron with 1GB RAM. Real Bare Metal performance.",
      tr: "Sistem hızı 4 katına çıktı, donanım gereksinimi tek çekirdekli Celeron + 1GB RAM seviyesine düştü. Gerçek Bare Metal performans.",
    },
    tags: {
      en: ".NET · Multi-threading · Async · Hardware",
      tr: ".NET · Multi-threading · Async · Donanım",
    },
  },
  {
    id: "hexagonal",
    title: {
      en: "Hexagonal: 60+ service cloud → 3 Windows services",
      tr: "Hexagonal: 60+ servislik bulut → 3 Windows servisi",
    },
    action: {
      en: "Closed/military sites couldn't touch the internet. Because the system was built around Hexagonal Architecture and clean interfaces, I bypassed the API Gateway and merged just the Application Layer into a monolith.",
      tr: "İnternete çıkamayan kapalı/askeri tesisler için baştan Hexagonal mimari ve temiz interface'ler üzerine kurduğum sistemi değerlendirdim. API Gateway'i bypass edip sadece Application Layer'ı monolite indirdim.",
    },
    result: {
      en: "Kubernetes and RabbitMQ swapped for SQLite, MQTT, and in-memory. The full 60+ service cloud platform now runs as 3 lightweight Windows services—without changing a single line of business logic.",
      tr: "Kubernetes ve RabbitMQ; SQLite, MQTT ve In-Memory teknolojilerine düşürüldü. 60+ servislik bulut yapısı, tek satır iş mantığı değişmeden 3 hafif Windows servisi olarak çalışmaya başladı.",
    },
    tags: {
      en: "Hexagonal · Ports & Adapters · Monolith · On-premises",
      tr: "Hexagonal · Ports & Adapters · Monolit · On-premises",
    },
  },
  {
    // 11 Kasım 2026, Huntay: tek projenin "3 mühendisle 100.000 kullanıcı" anlatımı absürt duruyordu; farklı üretici
    // firmalardaki sonuçların özeti olarak yeniden yazıldı (oranlar Huntay'ın verdiği aralıklar). Kimlik aynı (#case-ai-ops).
    id: "ai-ops",
    title: {
      en: "Help desk assistants at manufacturers",
      tr: "Üretici firmalarda help desk asistanı",
    },
    action: {
      en: "At different manufacturers, we set up AI-supported help desks that answer the repetitive fault and documentation questions from dealers, technicians and users from the company's own manuals and past tickets.",
      tr: "Farklı üretici firmalarda, bayilerden, teknisyenlerden ve kullanıcılardan gelen tekrarlı arıza ve doküman sorularını firmanın kendi kılavuzları ve geçmiş talepleriyle yanıtlayan yapay zekâ destekli help desk sistemleri kurduk.",
    },
    result: {
      en: "Help desk workload and response times improved by 30–70% and customer satisfaction by 15–40% depending on the company; we also achieved a 10–30% improvement in the companies' costs and sales.",
      tr: "Help desk iş yükü ve yanıt süreleri firmaya göre %30–70, müşteri memnuniyeti %15–40 iyileşti; firmaların maliyet ve satışlarında da %10–30 iyileşme sağladık.",
    },
    tags: {
      en: "Help desk · Technical service · Dealer support · RAG",
      tr: "Help desk · Teknik servis · Bayi desteği · RAG",
    },
  },
  {
    id: "enmos-meta",
    title: {
      en: "Reports without waiting for a developer",
      tr: "Yazılımcı beklemeden rapor",
    },
    action: {
      en: "Every new report needed a developer. We built an engine that lets users create, filter and schedule complex reports themselves.",
      tr: "Her yeni rapor bir yazılımcı gerektiriyordu. Kullanıcıların karmaşık raporları kendilerinin oluşturup filtreleyebildiği ve zamanlayabildiği bir motor kurduk.",
    },
    result: {
      en: "Teams create and schedule their own reports; the developer bottleneck for reporting is gone.",
      tr: "Ekipler raporlarını kendileri hazırlayıp zamanlıyor; raporlamadaki yazılımcı darboğazı ortadan kalktı.",
    },
    tags: {
      en: "Reporting · ERP data · Self-service",
      tr: "Raporlama · ERP verisi · Self-servis",
    },
  },
  {
    id: "iot-cloud",
    title: {
      en: "10,000+ field devices on one platform",
      tr: "10.000+ saha cihazı tek platformda",
    },
    action: {
      en: "Field devices of 8 types (fire panels, intruder alarms, cameras, suppression systems) were managed through an unreliable outsourced system. We replaced it with a single platform of our own, with web and mobile apps.",
      tr: "8 farklı tipte saha cihazı (yangın panelleri, hırsız alarmları, kameralar, söndürme sistemleri) sürekli kopan dış kaynaklı bir sistemle yönetiliyordu. Yerine web ve mobil uygulamalarıyla tek bir kendi platformumuzu kurduk.",
    },
    result: {
      en: "One platform now serves 10,000+ devices and 100,000+ users, and engineers can debug a single faulty device without disrupting the rest.",
      tr: "Tek platform artık 10.000+ cihaza ve 100.000+ kullanıcıya hizmet veriyor; mühendisler arızalı tek bir cihazı diğerlerini kesintiye uğratmadan inceleyebiliyor.",
    },
    tags: {
      en: "Field devices · IoT · Mobile · Service data",
      tr: "Saha cihazları · IoT · Mobil · Servis verisi",
    },
  },
  {
    id: "sandbox",
    title: {
      en: "Production sandbox without disrupting 10,000 devices",
      tr: "10.000 cihazı bozmadan production sandbox",
    },
    action: {
      en: "Designed an A/B-test-style routing layer that lets engineers redirect a single faulty device or user into a sandbox/debug environment—live, on production traffic.",
      tr: "Mühendislerin, üretim trafiği üzerinde tek bir arızalı cihazı veya kullanıcıyı sandbox/debug ortamına yönlendirmesine izin veren A/B test tarzı bir yönlendirme katmanı tasarladım.",
    },
    result: {
      en: "Faster root-cause analysis with zero downtime for the other 10,000+ devices in production.",
      tr: "Production'daki diğer 10.000+ cihaz için sıfır kesintiyle çok daha hızlı kök neden analizi.",
    },
    tags: {
      en: "Production debugging · A/B routing · Zero downtime",
      tr: "Production debug · A/B yönlendirme · Sıfır kesinti",
    },
  },
];

/**
 * Sitede gösterilen vakalar (11 Kasım 2026, Huntay: "sitenin odak noktası tek bir şey; her şey yapan izleniminden
 * çıkıyoruz"). Yalnız teknik servis ve help desk asistanını kanıtlayan vaka. Diğerleri silinmedi: MCP search/fetch
 * (lib/content.ts) dizin onayına kadar aynı kalır.
 */
export const SITE_CASE_IDS = ["ai-ops"] as const;
export const siteCaseStudies: CaseStudy[] = caseStudies.filter((item) =>
  (SITE_CASE_IDS as readonly string[]).includes(item.id),
);
