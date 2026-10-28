import type { Localized } from "./types";

/**
 * /assistant — MCP bağlayıcısının herkese açık dokümantasyonu.
 * Claude ve ChatGPT dizinleri; amaç, kurulum, araçlar, en az 3 örnek komut,
 * sorun giderme ve destek bilgisini içeren bir sayfa ister. MCP araçları değişirse burayı da güncelleyin.
 */

export type AssistantTool = {
  name: string;
  access: "read" | "write";
  description: Localized;
};

export const assistantTools: AssistantTool[] = [
  {
    name: "get_availability",
    access: "read",
    description: {
      en: "Shows open 30-minute slots for an intro call, read live from the booking calendar, in the user's time zone.",
      tr: "Tanışma görüşmesi için boş 30 dakikalık saatleri, randevu takviminden canlı olarak ve kullanıcının saat diliminde gösterir.",
    },
  },
  {
    name: "book_intro_call",
    access: "write",
    description: {
      en: "Books a 30-minute Google Meet call at a chosen slot. Needs the attendee's name and email; Cal.com sends the calendar invitation.",
      tr: "Seçilen saate 30 dakikalık Google Meet görüşmesi oluşturur. Katılımcının adı ve e-postası gerekir; takvim davetini Cal.com gönderir.",
    },
  },
  {
    name: "list_services",
    access: "read",
    description: {
      en: "Lists the consulting and development services, optionally ranked by how well they fit a described need.",
      tr: "Danışmanlık ve geliştirme hizmetlerini listeler; isteğe bağlı olarak anlatılan ihtiyaca uygunluğuna göre sıralar.",
    },
  },
  {
    name: "get_service",
    access: "read",
    description: {
      en: "Returns one service in detail: who it is for, deliverables, use cases, technologies and FAQ.",
      tr: "Bir hizmetin ayrıntılarını verir: kimler için olduğu, çıktılar, kullanım senaryoları, teknolojiler ve SSS.",
    },
  },
  {
    name: "search",
    access: "read",
    description: {
      en: "Keyword search across services, case studies, FAQ, experience and articles on huntayazerturk.com.",
      tr: "huntayazerturk.com'daki hizmetler, vaka çalışmaları, SSS, deneyim ve yazılarda anahtar kelimeyle arama yapar.",
    },
  },
  {
    name: "fetch",
    access: "read",
    description: {
      en: "Returns the full text of a document found with search.",
      tr: "search ile bulunan bir dokümanın tam metnini döndürür.",
    },
  },
  {
    name: "get_profile",
    access: "read",
    description: {
      en: "Returns Huntay AzerTürk's professional background, current role and contact links.",
      tr: "Huntay AzerTürk'ün profesyonel geçmişini, güncel rolünü ve iletişim linklerini döndürür.",
    },
  },
];

export const examplePrompts: Localized[] = [
  {
    en: "Book a 30-minute intro call with Huntay AzerTürk next Tuesday afternoon.",
    tr: "Huntay AzerTürk ile gelecek salı öğleden sonra 30 dakikalık bir tanışma görüşmesi ayarla.",
  },
  {
    en: "Which of Huntay AzerTürk's services fits a startup that needs an MVP in three months?",
    tr: "Üç ayda MVP çıkarması gereken bir startup için Huntay AzerTürk'ün hangi hizmeti uygun?",
  },
  {
    en: "Show Huntay AzerTürk's case studies about reducing cloud costs.",
    tr: "Huntay AzerTürk'ün bulut maliyetini düşürmeyle ilgili vaka çalışmalarını göster.",
  },
  {
    en: "What does Huntay AzerTürk's AI agents service include, and how is pricing handled?",
    tr: "Huntay AzerTürk'ün yapay zeka ajanları hizmeti neleri kapsıyor, fiyatlandırma nasıl yapılıyor?",
  },
];

export type SetupStep = { client: string; steps: Localized };

export const setupSteps: SetupStep[] = [
  {
    client: "Claude",
    steps: {
      en: "Settings → Connectors → Add custom connector. Name it “Huntay AzerTürk”, paste the server address and save. No sign-in is needed.",
      tr: "Settings → Connectors → Add custom connector. Adını “Huntay AzerTürk” koyun, sunucu adresini yapıştırıp kaydedin. Giriş gerekmez.",
    },
  },
  {
    client: "ChatGPT",
    steps: {
      en: "Settings → Apps → Advanced settings → turn on Developer mode → Create app. Paste the server address and choose “No authentication”.",
      tr: "Settings → Apps → Advanced settings → Developer mode'u açın → Create app. Sunucu adresini yapıştırın ve “No authentication” seçin.",
    },
  },
  {
    client: "Gemini",
    steps: {
      en: "gemini.google.com → Settings → Connected Apps → Add a custom app, then paste the server address (Google currently offers custom apps in the US, in English).",
      tr: "gemini.google.com → Settings → Connected Apps → Add a custom app, ardından sunucu adresini yapıştırın (Google özel uygulamaları şu an ABD'de ve İngilizce sunuyor).",
    },
  },
  {
    client: "Cursor, VS Code & other MCP clients",
    steps: {
      en: "Add a remote MCP server that uses Streamable HTTP with the server address. Example: {\"mcpServers\": {\"huntayazerturk\": {\"url\": \"https://huntayazerturk.com/mcp\"}}}",
      tr: "Sunucu adresiyle Streamable HTTP kullanan uzak bir MCP sunucusu ekleyin. Örnek: {\"mcpServers\": {\"huntayazerturk\": {\"url\": \"https://huntayazerturk.com/mcp\"}}}",
    },
  },
];

export const troubleshooting: { question: Localized; answer: Localized }[] = [
  {
    question: { en: "No times are shown", tr: "Hiç boş saat görünmüyor" },
    answer: {
      en: "There may be no open slot in the requested range. Ask for later dates, or open the booking page at huntayazerturk.com/book.",
      tr: "İstenen aralıkta boş saat olmayabilir. Daha ileri tarihleri isteyin ya da huntayazerturk.com/tr/book sayfasını açın.",
    },
  },
  {
    question: { en: "The times look shifted", tr: "Saatler kaymış görünüyor" },
    answer: {
      en: "Times default to Europe/Istanbul. Tell the assistant your city or time zone and it will show local times.",
      tr: "Saatler varsayılan olarak Europe/Istanbul dilimindedir. Asistana şehrinizi veya saat diliminizi söyleyin; yerel saatleri gösterir.",
    },
  },
  {
    question: { en: "The booking failed", tr: "Randevu oluşturulamadı" },
    answer: {
      en: "The slot may have just been taken. Ask the assistant to check availability again and pick another time.",
      tr: "Saat az önce dolmuş olabilir. Asistandan boş saatlere tekrar bakmasını isteyip başka bir saat seçin.",
    },
  },
  {
    question: { en: "How do I cancel or reschedule?", tr: "Nasıl iptal eder veya ertelerim?" },
    answer: {
      en: "Use the links in the confirmation email sent by Cal.com.",
      tr: "Cal.com'un gönderdiği onay e-postasındaki bağlantıları kullanın.",
    },
  },
];

export const dataHandling: Localized = {
  en: "The server needs no account, does not store conversations and keeps no personal data itself. Free times are read from Cal.com; your name, email and notes are sent to Cal.com only when you ask to book. Details are in the privacy policy.",
  tr: "Sunucu hesap gerektirmez, sohbetleri saklamaz ve kendisi kişisel veri tutmaz. Boş saatler Cal.com'dan okunur; adınız, e-postanız ve notlarınız yalnızca randevu almak istediğinizde Cal.com'a iletilir. Ayrıntılar gizlilik politikasında.",
};
