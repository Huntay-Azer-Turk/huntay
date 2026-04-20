import type { TechGroup } from "./types";

const L = (en: string, tr: string) => ({ en, tr });

/** CV CORE STRENGTHS + yaygın stack (TR sayfasında tam Türkçe açıklamalar) */
export const techStack: TechGroup[] = [
  {
    id: "cloud",
    title: L("Cloud & architecture", "Bulut ve mimari"),
    items: [
      L("GCP", "GCP"),
      L("Kubernetes", "Kubernetes"),
      L("Terraform", "Terraform"),
      L("Microservices", "Mikroservisler"),
      L("Event-driven architecture", "Olay güdümlü mimari"),
      L(".NET Core", ".NET Core"),
      L("Redis", "Redis"),
      L("RabbitMQ", "RabbitMQ"),
    ],
  },
  {
    id: "ai",
    title: L("AI & automation", "Yapay zeka ve otomasyon"),
    items: [
      L("LLM", "LLM"),
      L("RAG", "RAG"),
      L("Dialogflow CX", "Dialogflow CX"),
      L("MLOps", "MLOps"),
      L("Computer Vision (YOLOv8)", "Computer Vision (YOLOv8)"),
      L("AI agents in ERP workflows", "ERP süreçlerinde yapay zeka ajanları"),
    ],
  },
  {
    id: "channels",
    title: L("Channels & integrations", "Kanallar ve entegrasyonlar"),
    items: [L("Meta WhatsApp", "Meta WhatsApp"), L("Chatwoot", "Chatwoot")],
  },
  {
    id: "leadership",
    title: L("Leadership & security", "Liderlik ve güvenlik"),
    items: [
      L(
        "Engineering management (teams up to 8)",
        "Mühendislik yönetimi (8 kişiye varan ekipler)",
      ),
      L("SDLC & digital roadmap", "SDLC ve dijital yol haritası"),
      L("CEH discipline", "CEH disiplini"),
      L(
        "Penetration testing awareness",
        "Sızma testi farkındalığı",
      ),
      L("High-availability design", "Yüksek erişilebilirlik tasarımı"),
    ],
  },
];
