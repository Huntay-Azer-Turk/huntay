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
      en: "Technical service and help desk AI assistants for manufacturers that answer from a company's own manuals, service bulletins and past tickets (RAG, LangChain and LangGraph). He connects these assistants to ERP and service software without replacing them, drawing on 13+ years in software architecture.",
      tr: "Üreticiler için, şirketin kendi kılavuzları, teknik bültenleri ve geçmiş talepleriyle cevap veren teknik servis ve help desk yapay zekâ asistanları (RAG, LangChain ve LangGraph). 13 yılı aşkın yazılım mimarisi deneyimiyle bu asistanları ERP ve servis yazılımlarını değiştirmeden onlara bağlar.",
    },
  },
  {
    id: "results",
    question: {
      en: "What results has Huntay AzerTürk delivered?",
      tr: "Huntay AzerTürk hangi sonuçları elde etti?",
    },
    answer: {
      en: "At different manufacturers, the help desk systems he set up improved help desk workload and response times by 30–70%, customer satisfaction by 15–40%, and the companies' costs and sales by 10–30%.",
      tr: "Farklı üretici firmalarda kurduğu help desk sistemleriyle iş yükü ve yanıt süreleri %30–70, müşteri memnuniyeti %15–40, firmaların maliyet ve satışları %10–30 iyileşti.",
    },
  },
  {
    id: "services",
    question: {
      en: "What services does Huntay AzerTürk offer?",
      tr: "Huntay AzerTürk hangi hizmetleri sunuyor?",
    },
    answer: {
      en: "A technical service and help desk AI assistant for manufacturers and distributors with dealer and service networks. It answers dealers', technicians' and users' repetitive fault and documentation questions from your own manuals, without replacing your software. The path: a fixed-price opportunity scan, a 3-week pilot live on one channel, then a production rollout.",
      tr: "Bayi ve servis ağı olan üretici ve distribütörler için yapay zekâ teknik servis ve help desk asistanı. Bayilerin, teknisyenlerin ve kullanıcıların tekrarlı arıza ve doküman sorularını, yazılımınızı değiştirmeden kendi kılavuzlarınızla yanıtlar. Yol: sabit fiyatlı fırsat taraması, tek kanalda 3 haftalık pilot, ardından canlı kurulum.",
    },
  },
  {
    id: "start",
    question: {
      en: "How does working with Huntay AzerTürk start?",
      tr: "Huntay AzerTürk ile çalışma nasıl başlıyor?",
    },
    answer: {
      en: "With a 30-minute assessment call. If there is a fit, the usual path is a fixed-price AI opportunity scan (5 business days), then a technical service and help desk assistant pilot live on one channel in 3 weeks, and a production rollout once it works. Prices are listed on the packages page; the scan comes with a refund guarantee.",
      tr: "30 dakikalık bir ön değerlendirme görüşmesiyle. Uygunsa olağan yol sabit fiyatlı yapay zekâ fırsat taraması (5 iş günü), ardından 3 haftada tek kanalda canlıya alınan teknik servis ve help desk asistanı pilotu ve işe yarayınca canlı kurulumdur. Fiyatlar paketler sayfasında yazar; taramada ücret iadesi garantisi vardır.",
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
