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
    id: "ai-ops",
    title: {
      en: "AI support assistant: a 100,000-user load with 3 engineers",
      tr: "Yapay zekâ destek asistanı: 3 mühendisle 100.000 kullanıcı",
    },
    action: {
      en: "Support questions were piling up on a small engineering team. We built an assistant that reads the technical documentation and resolves user issues step by step, and connected it to WhatsApp and the support desk.",
      tr: "Destek soruları küçük bir mühendis ekibinin üzerine yığılıyordu. Teknik dokümanları okuyup kullanıcı sorunlarını adım adım çözen bir asistan kurduk; WhatsApp'a ve destek paneline bağladık.",
    },
    result: {
      en: "3 engineers now carry a 100,000-user support load; across different projects, resolution time dropped by 40–70%.",
      tr: "3 mühendis artık 100.000 kullanıcılı destek yükünü taşıyor; farklı projelerde talep çözüm süresi %40–70 kısaldı.",
    },
    tags: {
      en: "Help desk · Technical documentation · WhatsApp · RAG",
      tr: "Help desk · Teknik doküman · WhatsApp · RAG",
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
