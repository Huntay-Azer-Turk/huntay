import type { CaseStudy } from "./types";

export const caseStudies: CaseStudy[] = [
  {
    id: "bare-metal",
    title: {
      en: "Bare Metal: 4x throughput on a single-core Celeron",
      tr: "Bare Metal: Tek çekirdekli Celeron'da 4 kat hız",
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
    id: "iot-cloud",
    title: {
      en: "Multi-platform IoT cloud (10,000+ devices, 100,000+ users)",
      tr: "Çok platformlu IoT bulutu (10.000+ cihaz, 100.000+ kullanıcı)",
    },
    action: {
      en: "Killed the dependency on an unreliable outsourced infrastructure and built a 60-70 microservice ecosystem from scratch—Docker, Kubernetes, RabbitMQ, MQTT, .NET backend, React micro-frontends, Flutter mobile.",
      tr: "Sürekli kopan dış kaynaklı altyapıya olan bağımlılığı kestim ve sıfırdan 60-70 mikroservislik bir ekosistem inşa ettim—Docker, Kubernetes, RabbitMQ, MQTT, .NET backend, React micro-frontends, Flutter mobil.",
    },
    result: {
      en: "One platform now manages 8 different device types (fire panels, intruder alarms, cameras, suppression) at full scale.",
      tr: "Tek bir platform; yangın panelleri, hırsız alarmları, kameralar ve söndürme sistemleri dahil 8 farklı cihaz tipini eş zamanlı olarak yönetiyor.",
    },
    tags: {
      en: "Kubernetes · GCP · MQTT · React · Flutter",
      tr: "Kubernetes · GCP · MQTT · React · Flutter",
    },
  },
  {
    id: "cloud-cost",
    title: {
      en: "75% cloud cost reduction with event-driven microservices",
      tr: "Olay güdümlü mikroservislerle %75 bulut maliyet düşüşü",
    },
    action: {
      en: "Migrated legacy monoliths to event-driven microservices on GCP with Kubernetes and Terraform.",
      tr: "Eski monolit yapıları, GCP üzerinde Kubernetes ve Terraform ile olay güdümlü mikroservislere taşıdım.",
    },
    result: {
      en: "Roughly 75% infrastructure cost reduction while maintaining 99.9% high-availability.",
      tr: "Altyapı maliyetlerinde yaklaşık %75 düşüş ve %99.9 yüksek erişilebilirlik.",
    },
    tags: {
      en: "Kubernetes · Terraform · GCP · Event-driven",
      tr: "Kubernetes · Terraform · GCP · Olay güdümlü",
    },
  },
  {
    id: "ai-ops",
    title: {
      en: "Autonomous support: 80% faster ticket resolution",
      tr: "Otonom destek: %80 daha hızlı çözüm",
    },
    action: {
      en: "Started with LangChain/LangGraph RAG tests, then moved to GCP for zero-maintenance. Integrated Meta WhatsApp, Chatwoot, and Dialogflow CX.",
      tr: "LangChain/LangGraph tabanlı RAG testleriyle başlayıp bakım maliyetini sıfırlamak için GCP'ye geçtim. Meta WhatsApp, Chatwoot ve Dialogflow CX entegre ettim.",
    },
    result: {
      en: "An autonomous network that reads the company's technical docs and resolves user issues without human involvement—handling a 100,000-user load with just 3 engineers.",
      tr: "İnsan müdahalesine ihtiyaç duymadan firmanın teknik dokümanlarını anlayıp kullanıcı sorunlarını kendi başına çözen otonom bir ağ—3 mühendislik ekibi ile 100.000 kullanıcılı yükü kaldırıyor.",
    },
    tags: {
      en: "RAG · LLM · Dialogflow CX · WhatsApp · Chatwoot",
      tr: "RAG · LLM · Dialogflow CX · WhatsApp · Chatwoot",
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
