import type { FaqItem } from "./types";

/**
 * SSS — hem sayfada görünür bölüm (components/sections/faq.tsx) hem de FAQPage JSON-LD
 * ve /llms.txt bu tek kaynaktan beslenir. Cevaplar yalnızca sitede zaten yer alan bilgilere dayanır.
 * AEO: ilk cümle soruyu doğrudan cevaplar ve ismi içerir; AI asistanları bu blokları alıntılar.
 * 11 Kasım 2026: cevaplar "Üreticiler için Yapay Zekâ Danışmanı" konumuna göre yeniden yazıldı; fractional CTO sorusu
 * "nasıl başlıyor" oldu, araştırma sorusu /about sayfasındaki "Yazı ve araştırma" bloğunda kaldı.
 */
export const faq: FaqItem[] = [
  {
    id: "who",
    question: {
      en: "Who is Huntay AzerTürk?",
      tr: "Huntay AzerTürk kimdir?",
    },
    answer: {
      en: "Huntay AzerTürk is an Istanbul-based AI consultant for manufacturers and distributors with dealer and service networks. With over 13 years in systems architecture, he uses AI to answer the repetitive fault and documentation questions that take up headquarters teams' time, without replacing the company's existing software.",
      tr: "Huntay AzerTürk, bayi ve servis ağı olan üretici ve distribütörler için İstanbul merkezli bir yapay zekâ danışmanıdır. 13 yılı aşkın sistem mimarisi deneyimiyle, merkez ekiplerin vaktini alan tekrarlı arıza ve doküman sorularını şirketin mevcut yazılımını değiştirmeden yapay zekâyla yanıtlar.",
    },
  },
  {
    id: "expertise",
    question: {
      en: "What does Huntay AzerTürk specialize in?",
      tr: "Huntay AzerTürk hangi alanlarda uzman?",
    },
    answer: {
      en: "AI transformation for manufacturers, starting with technical service and help desk assistants that answer from a company's own manuals, service bulletins and past tickets (RAG, LangChain and LangGraph). He connects these assistants to ERP, IoT and service data, drawing on his background in IoT platforms and software architecture, then extends the same approach to quality control, production, sales and procurement.",
      tr: "Üreticilerde yapay zekâ dönüşümü; başlangıç noktası şirketin kendi kılavuzları, teknik bültenleri ve geçmiş talepleriyle cevap veren teknik servis ve help desk asistanlarıdır (RAG, LangChain ve LangGraph). IoT platformları ve yazılım mimarisindeki geçmişiyle bu asistanları ERP, IoT ve servis verisine bağlar; ardından aynı yöntemi kalite kontrol, üretim, satış ve satın almaya taşır.",
    },
  },
  {
    id: "results",
    question: {
      en: "What results has Huntay AzerTürk delivered?",
      tr: "Huntay AzerTürk hangi sonuçları elde etti?",
    },
    answer: {
      en: "Across different projects, his AI support systems cut ticket resolution time by 40–70%; one of them lets 3 engineers carry a 100,000-user support load. He also built a platform that manages 10,000+ field devices of 8 types for 100,000+ users.",
      tr: "Farklı projelerde kurduğu yapay zekâ destek sistemleri talep çözüm süresini %40–70 kısalttı; bunlardan biri 3 mühendisin 100.000 kullanıcılı destek yükünü taşımasını sağlıyor. Ayrıca 8 farklı tipte 10.000+ saha cihazını 100.000+ kullanıcı için yöneten bir platform kurdu.",
    },
  },
  {
    id: "services",
    question: {
      en: "What services does Huntay AzerTürk offer?",
      tr: "Huntay AzerTürk hangi hizmetleri sunuyor?",
    },
    answer: {
      en: "AI transformation for manufacturers and distributors. It starts with a technical service and help desk assistant that answers dealers', technicians' and users' questions from your own manuals (opportunity scan, then a 3-week pilot, then a production rollout). Further units each have their own design package: quality control automation, production efficiency and maintenance, sales, marketing, market research, procurement and security team assistants.",
      tr: "Üretici ve distribütörler için yapay zekâ dönüşümü. Başlangıç, bayilerin, teknisyenlerin ve kullanıcıların sorularını kendi kılavuzlarınızla yanıtlayan teknik servis ve help desk asistanıdır (fırsat taraması, 3 haftalık pilot, canlı kurulum). Diğer birimlerin her birinin kendi tasarım paketi vardır: kalite kontrol otomasyonu, üretim verimliliği ve bakım, satış, pazarlama, pazar araştırması, satın alma ve güvenlik ekibi asistanları.",
    },
  },
  {
    id: "start",
    question: {
      en: "How does working with Huntay AzerTürk start?",
      tr: "Huntay AzerTürk ile çalışma nasıl başlıyor?",
    },
    answer: {
      en: "With a 30-minute assessment call. If there is a fit, the usual path is a fixed-price AI opportunity scan (5 business days), then a technical service and help desk assistant pilot live on one channel in 3 weeks, and a production rollout once it works. Prices are listed on the packages page; the scan and design packages come with a refund guarantee.",
      tr: "30 dakikalık bir ön değerlendirme görüşmesiyle. Uygunsa olağan yol sabit fiyatlı yapay zekâ fırsat taraması (5 iş günü), ardından 3 haftada tek kanalda canlıya alınan teknik servis ve help desk asistanı pilotu ve işe yarayınca canlı kurulumdur. Fiyatlar paketler sayfasında yazar; tarama ve tasarım paketlerinde ücret iadesi garantisi vardır.",
    },
  },
  {
    id: "ai-booking",
    question: {
      en: "Can I book a call with Huntay AzerTürk from ChatGPT, Claude or Gemini?",
      tr: "Huntay AzerTürk ile ChatGPT, Claude veya Gemini üzerinden görüşme planlayabilir miyim?",
    },
    answer: {
      en: "Yes. In ChatGPT, add the Huntay AzerTürk app from the app directory: https://chatgpt.com/plugins/plugin_asdk_app_6ae1c947a1d88191a9da39819af029d1. His assistant is also available as an MCP server at https://huntayazerturk.com/mcp; add this address as a custom connector or app in ChatGPT, Claude, Gemini or any MCP-compatible assistant and ask it to book an intro call: it shows his free times in the chat and books the 30-minute Google Meet call for you. You can also book directly on the Book a call page.",
      tr: "Evet. ChatGPT'de uygulama dizininden Huntay AzerTürk uygulamasını eklemeniz yeterli: https://chatgpt.com/plugins/plugin_asdk_app_6ae1c947a1d88191a9da39819af029d1. Asistan ayrıca https://huntayazerturk.com/mcp adresinde bir MCP sunucusu olarak çalışıyor; bu adresi ChatGPT, Claude, Gemini veya MCP uyumlu herhangi bir asistana özel bağlayıcı (connector) ya da uygulama olarak ekleyip tanışma görüşmesi istemeniz yeterli: boş saatlerini sohbetin içinde gösterir ve 30 dakikalık Google Meet görüşmesini sizin için oluşturur. Dilerseniz doğrudan Görüşme planla sayfasından da randevu alabilirsiniz.",
    },
  },
];
