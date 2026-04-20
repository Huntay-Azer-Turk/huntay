import type { TimelineEntry } from "./types";

/**
 * Huntay_Azerturk_CV_Final.pdf + LinkedIn experience ile uyumlu.
 * Kronoloji: güncel → geçmiş (Teknim rolleri, Kassara, İran dönemi).
 */
export const experience: TimelineEntry[] = [
  {
    id: "teknim-sdsm",
    org: {
      en: "Teknim Elektronik San. Tic. A.Ş.",
      tr: "Teknim Elektronik San. Tic. A.Ş.",
    },
    role: {
      en: "Software and Digital Solutions Manager",
      tr: "Yazılım ve Dijital Çözümler Müdürü",
    },
    period: { en: "Dec 2025 – Present", tr: "Ara 2025 – Günümüz" },
    location: { en: "Istanbul, Turkey · Hybrid", tr: "İstanbul, Türkiye · Hibrit" },
    highlights: [
      {
        en: "Leading proprietary IoT and backend infrastructure for fire safety operations—scalability, reliability, and new markets.",
        tr: "Yangın güvenliği operasyonlarında özel IoT ve backend altyapısının tasarım liderliği—ölçeklenebilirlik, güvenilirlik ve yeni pazarlar.",
      },
      {
        en: "Managing a team of 5 engineers; owning the digital roadmap across software and system initiatives.",
        tr: "5 mühendislik ekibini yönetme; yazılım ve sistem girişimleri genelinde dijital yol haritasına sahiplik.",
      },
      {
        en: "LLM-based technical support using RAG, Google Dialogflow CX, and Meta WhatsApp—~80% faster resolution.",
        tr: "RAG, Google Dialogflow CX ve Meta WhatsApp ile LLM tabanlı teknik destek—çözüm süresinde yaklaşık %80 iyileşme.",
      },
    ],
  },
  {
    id: "teknim-arch",
    org: {
      en: "Teknim Elektronik San. Tic. A.Ş.",
      tr: "Teknim Elektronik San. Tic. A.Ş.",
    },
    role: {
      en: "Software Architect Team Lead",
      tr: "Yazılım Mimarı Takım Lideri",
    },
    period: { en: "Nov 2020 – Nov 2025", tr: "Kas 2020 – Kas 2025" },
    location: { en: "Istanbul, Turkey", tr: "İstanbul, Türkiye" },
    highlights: [
      {
        en: "Hybrid cloud architecture for 10,000+ devices—strict uptime and real-time response.",
        tr: "10.000+ cihaz için hibrit bulut mimarisi—sıkı uptime ve gerçek zamanlı yanıt.",
      },
      {
        en: "Legacy monoliths → event-driven microservices on GCP; ~75% infrastructure cost reduction.",
        tr: "Eski monolitlerden GCP üzerinde olay güdümlü mikroservislere; altyapı maliyetinde yaklaşık %75 düşüş.",
      },
      {
        en: "Stronger delivery: CI/CD, cleaner workflows, and consistent engineering standards.",
        tr: "Daha güçlü teslimat: CI/CD, daha temiz iş akışları ve tutarlı mühendislik standartları.",
      },
    ],
  },
  {
    id: "teknim-sse",
    org: {
      en: "Teknim Elektronik San. Tic. A.Ş.",
      tr: "Teknim Elektronik San. Tic. A.Ş.",
    },
    role: { en: "Senior Software Engineer", tr: "Kıdemli Yazılım Mühendisi" },
    period: { en: "Oct 2018 – Oct 2020", tr: "Eki 2018 – Eki 2020" },
    location: { en: "Istanbul, Turkey", tr: "İstanbul, Türkiye" },
    highlights: [
      {
        en: "Refactored critical C++ into maintainable .NET Core microservices.",
        tr: "Kritik C++ bileşenlerini sürdürülebilir .NET Core mikroservislerine dönüştürme.",
      },
      {
        en: "High-throughput messaging with Redis and RabbitMQ—real-time alerts and hardware integrations.",
        tr: "Redis ve RabbitMQ ile yüksek hacimli mesajlaşma—gerçek zamanlı uyarılar ve donanım entegrasyonları.",
      },
    ],
  },
  {
    id: "kassara",
    org: { en: "Kassara.app", tr: "Kassara.app" },
    role: {
      en: "Founder & Lead Architect — Product Launch",
      tr: "Kurucu ve Baş Mimari — Ürün Lansmanı",
    },
    period: { en: "2023 – 2025", tr: "2023 – 2025" },
    location: { en: "Istanbul, Turkey", tr: "İstanbul, Türkiye" },
    highlights: [
      {
        en: "AI-based B2C product combining computer vision with behavioral profiling—MVP to live release.",
        tr: "Bilgisayarlı görü ve davranış profillemesini birleştiren yapay zeka tabanlı B2C ürün—MVP’den canlı yayına.",
      },
      {
        en: "Led a 6-person team through delivery and iteration.",
        tr: "6 kişilik ekiple teslimat ve iterasyon liderliği.",
      },
    ],
  },
  {
    id: "iran-combined",
    org: {
      en: "Nano Mabna Iranian / Pooyandegan Rah Saadat",
      tr: "Nano Mabna Iranian / Pooyandegan Rah Saadat",
    },
    role: {
      en: "Senior Backend Developer / Team Lead",
      tr: "Kıdemli Backend Geliştirici / Takım Lideri",
    },
    period: { en: "2015 – 2018", tr: "2015 – 2018" },
    location: { en: "Iran", tr: "İran" },
    highlights: [
      {
        en: "Managed an 8-person engineering team in data-heavy healthcare monitoring—real-time processing and accuracy.",
        tr: "Veri yoğun sağlık izleme ortamında 8 kişilik mühendislik ekibi—gerçek zamanlı işleme ve doğruluk kritik.",
      },
    ],
  },
];
