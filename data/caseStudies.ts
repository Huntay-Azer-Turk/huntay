import type { CaseStudy } from "./types";

export const caseStudies: CaseStudy[] = [
  {
    id: "cloud",
    title: {
      en: "Cloud cost optimization & scale",
      tr: "Bulut maliyet optimizasyonu ve ölçekleme",
    },
    action: {
      en: "Moved heavy stacks from monolith toward 60+ microservices on Kubernetes with Terraform and GCP.",
      tr: "Hantal yapıları monolitikten 60+ mikroservise (Kubernetes, Terraform, GCP) taşıdım.",
    },
    result: {
      en: "Up to ~75% infrastructure cost reduction and 99.9% high-availability posture.",
      tr: "Altyapı maliyetlerinde yaklaşık %75 düşüş ve %99.9 yüksek erişilebilirlik.",
    },
    tags: {
      en: "Kubernetes · Terraform · GCP · Microservices",
      tr: "Kubernetes · Terraform · GCP · Mikroservisler",
    },
  },
  {
    id: "ai-ops",
    title: {
      en: "AI-accelerated operations",
      tr: "AI ile hızlanan operasyonlar",
    },
    action: {
      en: "RAG architecture with LLM and Dialogflow CX integrated into customer support flows.",
      tr: "Müşteri destek süreçlerine RAG mimarisi, LLM ve Dialogflow CX entegrasyonu.",
    },
    result: {
      en: "~80% reduction in support delays; fully autonomous resolution path where designed.",
      tr: "Destek gecikmelerinde yaklaşık %80 azalma; tasarlanan akışlarda tam otonomi.",
    },
    tags: {
      en: "RAG · LLM · Dialogflow CX · MLOps",
      tr: "RAG · LLM · Dialogflow CX · MLOps",
    },
  },
  {
    id: "kassara",
    title: {
      en: "End-to-end product leadership (Kassara.app)",
      tr: "Uçtan uca ürün liderliği (Kassara.app)",
    },
    action: {
      en: "Founding leadership for a computer-vision AI B2C product—from concept to production.",
      tr: "Bilgisayarlı görü odaklı B2C yapay zeka ürününde kurucu liderlik—kavramdan prodüksiyona.",
    },
    result: {
      en: "Full architecture ownership: MVP through live production delivery.",
      tr: "MVP’den canlı prodüksiyona tam mimari ve stratejik teslimat.",
    },
    tags: {
      en: "Computer Vision · Product · Architecture",
      tr: "Computer Vision · Ürün · Mimari",
    },
  },
];
