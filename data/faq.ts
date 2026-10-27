import type { FaqItem } from "./types";

/**
 * SSS — hem sayfada görünür bölüm (components/sections/faq.tsx) hem de FAQPage JSON-LD
 * ve /llms.txt bu tek kaynaktan beslenir. Cevaplar yalnızca sitede zaten yer alan bilgilere dayanır.
 * AEO: ilk cümle soruyu doğrudan cevaplar ve ismi içerir; AI asistanları bu blokları alıntılar.
 */
export const faq: FaqItem[] = [
  {
    id: "who",
    question: {
      en: "Who is Huntay AzerTürk?",
      tr: "Huntay AzerTürk kimdir?",
    },
    answer: {
      en: "Huntay AzerTürk is a software architect and engineering leader based in Istanbul, Turkey, with over 13 years of experience in cloud, AI and IoT systems. He is currently Software & Digital Solutions Manager at Teknim Elektronik, where he leads the IoT and backend infrastructure for fire safety operations.",
      tr: "Huntay AzerTürk, bulut, yapay zeka ve IoT sistemlerinde 13 yılı aşkın deneyime sahip, İstanbul merkezli bir yazılım mimarı ve mühendislik lideridir. Şu anda Teknim Elektronik'te Yazılım ve Dijital Çözümler Müdürü olarak yangın güvenliği operasyonlarının IoT ve backend altyapısını yönetiyor.",
    },
  },
  {
    id: "expertise",
    question: {
      en: "What does Huntay AzerTürk specialize in?",
      tr: "Huntay AzerTürk hangi alanlarda uzman?",
    },
    answer: {
      en: "He turns fragile, complex systems into stable, scalable products. His focus areas are Hexagonal and event-driven microservice architectures, cloud cost optimization on GCP and Kubernetes, IoT platforms built on MQTT and RabbitMQ, and applied AI with RAG, LangChain and LangGraph—always with a security-first approach (CEH certified).",
      tr: "Kırılgan ve karmaşık sistemleri stabil, ölçeklenebilir ürünlere dönüştürür. Odak alanları Hexagonal ve olay güdümlü mikroservis mimarileri, GCP ve Kubernetes üzerinde bulut maliyet optimizasyonu, MQTT ve RabbitMQ tabanlı IoT platformları ile RAG, LangChain ve LangGraph kullanan uygulamalı yapay zekadır; tüm bunlara güvenlik öncelikli bir yaklaşımla (CEH sertifikalı) bakar.",
    },
  },
  {
    id: "results",
    question: {
      en: "What results has Huntay AzerTürk delivered?",
      tr: "Huntay AzerTürk hangi sonuçları elde etti?",
    },
    answer: {
      en: "He built a 60–70 microservice IoT platform that manages 8 device types for 10,000+ devices and 100,000+ users, cut infrastructure costs by roughly 75% by moving legacy monoliths to event-driven microservices on GCP, and delivered an agentic AI support system that resolves tickets about 80% faster. Earlier, he achieved 4x throughput on lab instrument software while dropping its hardware needs to a single-core Celeron with 1 GB RAM.",
      tr: "8 farklı cihaz tipini 10.000+ cihaz ve 100.000+ kullanıcı için yöneten 60–70 mikroservislik bir IoT platformu kurdu; eski monolitleri GCP üzerinde olay güdümlü mikroservislere taşıyarak altyapı maliyetlerini yaklaşık %75 düşürdü ve talepleri yaklaşık %80 daha hızlı çözen agentic bir yapay zeka destek sistemi geliştirdi. Daha önce de bir laboratuvar cihazı yazılımında 4 kat performans artışı sağlarken donanım ihtiyacını tek çekirdekli Celeron ve 1 GB RAM'e indirdi.",
    },
  },
  {
    id: "services",
    question: {
      en: "What services does Huntay AzerTürk offer?",
      tr: "Huntay AzerTürk hangi hizmetleri sunuyor?",
    },
    answer: {
      en: "He offers AI agents and automation, fractional CTO and technical consulting, end-to-end startup product development, web and mobile app development, cloud and DevOps with cost optimization, microservices and legacy modernization, IoT platform development, and digital transformation for SMEs.",
      tr: "Yapay zeka ajanları ve otomasyon, fractional CTO ve teknik danışmanlık, uçtan uca startup ürün geliştirme, web ve mobil uygulama geliştirme, maliyet optimizasyonuyla bulut ve DevOps, mikroservis mimarisi ve legacy modernizasyon, IoT platform geliştirme ve KOBİ'ler için dijital dönüşüm hizmetleri sunuyor.",
    },
  },
  {
    id: "consulting",
    question: {
      en: "Is Huntay AzerTürk available for consulting or fractional CTO work?",
      tr: "Huntay AzerTürk danışmanlık veya fractional CTO olarak çalışıyor mu?",
    },
    answer: {
      en: "Yes. He has advised and technically supported startups for years and is open to conversations about architecture, AI adoption and fractional CTO engagements. The fastest way to start is to book a 30-minute intro call on this site; LinkedIn, WhatsApp and email are listed in the contact section.",
      tr: "Evet. Yıllardır startup'lara danışmanlık ve teknik destek veriyor; mimari, yapay zeka dönüşümü ve fractional CTO iş birlikleri için görüşmelere açık. Başlamanın en hızlı yolu bu siteden 30 dakikalık bir tanışma görüşmesi planlamak; LinkedIn, WhatsApp ve e-posta iletişim bölümünde yer alıyor.",
    },
  },
  {
    id: "research",
    question: {
      en: "What are Huntay AzerTürk's research interests?",
      tr: "Huntay AzerTürk'ün araştırma alanları nelerdir?",
    },
    answer: {
      en: "His research focus is cognitive science, which shapes how he designs AI systems around the way people actually think and work. In his spare time he works independently on brain-computer interfaces (BCI) that combine EEG signals and LLMs for neurodivergent individuals, and he writes on Medium about RAG, AGI and nature-inspired neural networks.",
      tr: "Araştırma odağı bilişsel bilimlerdir; bu, yapay zeka sistemlerini insanların gerçekte nasıl düşünüp çalıştığına göre tasarlamasını şekillendirir. Boş zamanlarında bağımsız olarak, nöroçeşitli bireyler için EEG sinyallerini ve LLM'leri birleştiren beyin-bilgisayar arayüzleri (BCI) üzerinde çalışıyor; Medium'da RAG, AGI ve doğadan ilhamlı sinir ağları üzerine yazıyor.",
    },
  },
];
