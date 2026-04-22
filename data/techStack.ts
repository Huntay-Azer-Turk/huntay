import type { TechGroup } from "./types";

const L = (en: string, tr: string) => ({ en, tr });

/** CV CORE STRENGTHS + yaygın stack (TR sayfasında tam Türkçe açıklamalar) */
export const techStack: TechGroup[] = [
  {
    id: "core",
    title: L("Core Engineering & Languages", "Çekirdek Mühendislik ve Diller"),
    items: [
      L(".NET / C#", ".NET / C#"),
      L("Python", "Python"),
      L("C / C++ (Hardware/Legacy)", "C / C++ (Donanım/Legacy)"),
      L("Java (Low-level/Android)", "Java (Düşük seviye/Android)"),
      L("TypeScript / React / Blazor", "TypeScript / React / Blazor"),
      L("SQL / NoSQL", "SQL / NoSQL"),
    ],
  },
  {
    id: "ai",
    title: L("AI & Cognitive Science", "Yapay Zeka ve Bilişsel Bilimler"),
    items: [
      L("LangChain & LangGraph", "LangChain & LangGraph"),
      L("RAG & Vector Databases", "RAG ve Vektör Veritabanları"),
      L("LLM Orchestration", "LLM Orkestrasyonu"),
      L("Computer Vision (YOLOv8)", "Bilgisayarlı Görü (YOLOv8)"),
      L("Dialogflow CX", "Dialogflow CX"),
      L("AI Agents in ERP", "ERP Süreçlerinde AI Ajanları"),
    ],
  },
  {
    id: "cloud",
    title: L("Cloud & Distributed Systems", "Bulut ve Dağıtık Sistemler"),
    items: [
      L("Kubernetes & Docker", "Kubernetes & Docker"),
      L("GCP (Google Cloud)", "GCP (Google Cloud)"),
      L("RabbitMQ & MQTT", "RabbitMQ & MQTT"),
      L("Terraform", "Terraform"),
      L("Microservices", "Mikroservisler"),
    ],
  },
  {
    id: "architecture",
    title: L("Architecture & Leadership", "Mimari ve Liderlik"),
    items: [
      L("Hexagonal Architecture", "Hexagonal Mimari"),
      L("Bare Metal Optimization", "Bare Metal Optimizasyonu"),
      L("Event-driven Design", "Olay Güdümlü Tasarım"),
      L("High-availability (Zero-downtime)", "Yüksek Erişilebilirlik (Sıfır Kesinti)"),
      L("CEH / Security-first approach", "CEH / Güvenlik Öncelikli Yaklaşım"),
      L("Engineering Management", "Mühendislik Yönetimi"),
    ],
  },
];
