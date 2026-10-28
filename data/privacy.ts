import type { LegalSection } from "./types";

/**
 * Gizlilik politikası (/privacy). ChatGPT uygulama dizini gibi platformlar MCP sunucusu için
 * herkese açık bir gizlilik politikası ister. Metin, sitenin ve MCP sunucusunun gerçekte
 * ne yaptığını anlatır; bir şey değişirse (ör. analitik eklenirse) burayı güncelleyin.
 */
export const privacyUpdatedAt = "2026-10-28";

export const privacySections: LegalSection[] = [
  {
    id: "who",
    title: { en: "Who is responsible", tr: "Sorumlu kişi" },
    body: [
      {
        en: "This website (huntayazerturk.com) and its AI assistant integration are run by Huntay AzerTürk, Istanbul, Turkey. For any privacy question or request, email huntay.azerturk@gmail.com.",
        tr: "Bu web sitesi (huntayazerturk.com) ve yapay zeka asistanı entegrasyonu Huntay AzerTürk (İstanbul, Türkiye) tarafından yürütülür. Gizlilikle ilgili her türlü soru ve talep için: huntay.azerturk@gmail.com.",
      },
    ],
  },
  {
    id: "website",
    title: { en: "Visiting the website", tr: "Web sitesini ziyaret ettiğinizde" },
    body: [
      {
        en: "The website has no user accounts or contact forms and does not use advertising or tracking cookies. Your light/dark theme choice is stored only in your own browser.",
        tr: "Sitede kullanıcı hesabı veya iletişim formu yoktur; reklam ya da takip çerezi kullanılmaz. Açık/koyu tema tercihiniz yalnızca kendi tarayıcınızda saklanır.",
      },
      {
        en: "The site is hosted on Cloudflare, which processes technical data such as IP address, browser type and request logs to deliver and protect the site.",
        tr: "Site Cloudflare üzerinde barındırılır; Cloudflare, siteyi sunmak ve korumak için IP adresi, tarayıcı türü ve istek kayıtları gibi teknik verileri işler.",
      },
    ],
  },
  {
    id: "booking",
    title: { en: "Booking a call", tr: "Görüşme planladığınızda" },
    body: [
      {
        en: "Bookings are handled by Cal.com. When you book on the Book a call page or through an AI assistant, your name, email address, time zone and any notes you add are sent to Cal.com to create the booking and email you a confirmation. The meeting is added to my Google Calendar with a Google Meet link.",
        tr: "Randevular Cal.com üzerinden yönetilir. Görüşme planla sayfasından veya bir yapay zeka asistanı üzerinden randevu aldığınızda adınız, e-posta adresiniz, saat diliminiz ve eklediğiniz notlar; randevuyu oluşturmak ve size onay e-postası göndermek için Cal.com'a iletilir. Görüşme, Google Meet linkiyle birlikte Google Takvimime eklenir.",
      },
      {
        en: "I use this information only to prepare for and hold the call and to follow up with you about it. It is never sold or shared for marketing.",
        tr: "Bu bilgileri yalnızca görüşmeye hazırlanmak, görüşmeyi yapmak ve sonrasında sizinle iletişime geçmek için kullanırım. Asla satılmaz veya pazarlama amacıyla paylaşılmaz.",
      },
    ],
  },
  {
    id: "ai-assistants",
    title: { en: "AI assistants (MCP server)", tr: "Yapay zeka asistanları (MCP sunucusu)" },
    body: [
      {
        en: "If you connect https://huntayazerturk.com/mcp to an AI assistant such as ChatGPT, Claude or Gemini, the assistant sends requests to this server on your behalf. The server needs no account, does not store your conversations and keeps no personal data itself: profile and service information comes from this website, free times are read from Cal.com, and your name, email and notes are passed to Cal.com only when you ask to book a call.",
        tr: "https://huntayazerturk.com/mcp adresini ChatGPT, Claude veya Gemini gibi bir yapay zeka asistanına bağlarsanız, asistan sizin adınıza bu sunucuya istek gönderir. Sunucu hesap gerektirmez, sohbetlerinizi saklamaz ve kendisi kişisel veri tutmaz: profil ve hizmet bilgileri bu siteden gelir, boş saatler Cal.com'dan okunur; adınız, e-postanız ve notlarınız yalnızca randevu almak istediğinizde Cal.com'a iletilir.",
      },
      {
        en: "Your use of the assistant itself is governed by that provider's own privacy policy.",
        tr: "Asistanın kendisini kullanımınız, ilgili sağlayıcının kendi gizlilik politikasına tabidir.",
      },
    ],
  },
  {
    id: "third-parties",
    title: { en: "Service providers", tr: "Hizmet sağlayıcılar" },
    body: [
      {
        en: "Cal.com (scheduling, https://cal.com/privacy), Google (Calendar and Meet, https://policies.google.com/privacy) and Cloudflare (hosting, https://www.cloudflare.com/privacypolicy/). Each processes data under its own privacy policy.",
        tr: "Cal.com (randevu, https://cal.com/privacy), Google (Takvim ve Meet, https://policies.google.com/privacy) ve Cloudflare (barındırma, https://www.cloudflare.com/privacypolicy/). Her biri verileri kendi gizlilik politikasına göre işler.",
      },
    ],
  },
  {
    id: "rights",
    title: { en: "Retention and your rights", tr: "Saklama süresi ve haklarınız" },
    body: [
      {
        en: "Booking details are kept only as long as needed for our communication and any legal obligations. Under the GDPR and Turkey's KVKK you can ask to access, correct or delete your data at any time by emailing huntay.azerturk@gmail.com; you can also cancel or reschedule a booking with the links in your confirmation email.",
        tr: "Randevu bilgileri yalnızca iletişimimiz ve olası yasal yükümlülükler için gerektiği süre boyunca saklanır. KVKK ve GDPR kapsamında verilerinize erişmeyi, düzeltilmesini veya silinmesini istediğiniz zaman huntay.azerturk@gmail.com adresine yazarak talep edebilirsiniz; randevunuzu onay e-postasındaki bağlantılarla iptal edebilir veya erteleyebilirsiniz.",
      },
    ],
  },
  {
    id: "changes",
    title: { en: "Changes", tr: "Değişiklikler" },
    body: [
      {
        en: "If this policy changes, the updated version will be published on this page with a new date.",
        tr: "Bu politika değişirse güncel hâli yeni bir tarihle bu sayfada yayımlanır.",
      },
    ],
  },
];
