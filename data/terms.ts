import type { LegalSection } from "./types";

/**
 * Kullanım koşulları (/terms). ChatGPT eklenti dizini MCP incelemesi için herkese açık bir
 * "Terms of Service" adresi ister. Metin sitenin, randevu akışının ve MCP sunucusunun gerçekte
 * nasıl çalıştığını anlatır; davranış değişirse burayı ve tarihi güncelleyin.
 * Metinde URL'den hemen sonra nokta gelebilir; bağlantıya dönüştürülürken noktalama dışarıda kalır.
 */
export const termsUpdatedAt = "2026-10-28";

export const termsSections: LegalSection[] = [
  {
    id: "about",
    title: { en: "About these terms", tr: "Bu koşullar hakkında" },
    body: [
      {
        en: "These terms apply to this website (huntayazerturk.com) and to its AI assistant integration, the MCP server at https://huntayazerturk.com/mcp (the “server”). Both are run by Huntay AzerTürk, Istanbul, Türkiye. By using the website or connecting the server to an AI assistant, you accept these terms. Questions: huntay.azerturk@gmail.com.",
        tr: "Bu koşullar bu web sitesi (huntayazerturk.com) ve sitenin yapay zeka asistanı entegrasyonu olan https://huntayazerturk.com/mcp adresindeki MCP sunucusu (“sunucu”) için geçerlidir. İkisi de Huntay AzerTürk (İstanbul, Türkiye) tarafından yürütülür. Siteyi kullanarak veya sunucuyu bir yapay zeka asistanına bağlayarak bu koşulları kabul etmiş olursunuz. Sorularınız için: huntay.azerturk@gmail.com.",
      },
    ],
  },
  {
    id: "content",
    title: { en: "Website content", tr: "Site içeriği" },
    body: [
      {
        en: "The content describes my services, past projects and views for general information. It is not professional advice for your specific situation, and results from past projects do not guarantee results for yours.",
        tr: "İçerik; hizmetlerimi, geçmiş projelerimi ve görüşlerimi genel bilgilendirme amacıyla anlatır. Kendi durumunuza özel profesyonel tavsiye değildir ve geçmiş projelerdeki sonuçlar sizin projeniz için garanti oluşturmaz.",
      },
      {
        en: "You may link to the content and quote it with attribution. Search engines and AI assistants may index it and use it to answer questions, as described in https://huntayazerturk.com/robots.txt. Please don't republish the site or its materials as your own.",
        tr: "İçeriğe bağlantı verebilir, kaynak göstererek alıntı yapabilirsiniz. Arama motorları ve yapay zeka asistanları içeriği https://huntayazerturk.com/robots.txt dosyasında belirtildiği şekilde dizinleyip soruları yanıtlamak için kullanabilir. Lütfen siteyi veya materyallerini kendinize aitmiş gibi yeniden yayımlamayın.",
      },
    ],
  },
  {
    id: "booking",
    title: { en: "Booking an intro call", tr: "Tanışma görüşmesi planlama" },
    body: [
      {
        en: "You can book a 30-minute intro video call on the Book a call page or through a connected AI assistant. A booking is a real calendar appointment: please give your real name and email address, and use the links in the confirmation email to reschedule or cancel if your plans change.",
        tr: "Görüşme planla sayfasından veya bağlı bir yapay zeka asistanı üzerinden 30 dakikalık tanışma görüşmesi planlayabilirsiniz. Randevu gerçek bir takvim kaydıdır: lütfen gerçek adınızı ve e-posta adresinizi verin; planınız değişirse onay e-postasındaki bağlantılarla randevuyu erteleyin veya iptal edin.",
      },
      {
        en: "An intro call creates no obligation for either side. Any paid work is agreed separately in writing (a proposal or contract) before it starts.",
        tr: "Tanışma görüşmesi iki taraf için de herhangi bir yükümlülük doğurmaz. Ücretli her iş, başlamadan önce ayrıca yazılı olarak (teklif veya sözleşmeyle) kararlaştırılır.",
      },
      {
        en: "I may cancel or decline bookings that look automated, are made for someone else without their consent, or are unrelated to working together, and I may reschedule if something unavoidable comes up. You will be informed by email.",
        tr: "Otomatik oluşturulmuş görünen, başka biri adına onun izni olmadan yapılan veya birlikte çalışmayla ilgisi olmayan randevuları iptal edebilir ya da reddedebilirim; kaçınılmaz bir durum olursa görüşmeyi yeniden planlayabilirim. Bu durumlarda size e-postayla bilgi verilir.",
      },
    ],
  },
  {
    id: "ai-assistants",
    title: { en: "AI assistant integration (MCP server)", tr: "Yapay zeka asistanı entegrasyonu (MCP sunucusu)" },
    body: [
      {
        en: "The server is offered at no cost and without an account, so that AI assistants can show my profile, services, case studies and FAQ, check my availability and book an intro call when you ask. Answers are written by your AI assistant, which may summarize or rephrase; this website is the authoritative source, so check it or ask me directly when something matters.",
        tr: "Sunucu, yapay zeka asistanlarının siz istediğinizde profilimi, hizmetlerimi, vaka çalışmalarımı ve SSS'yi gösterebilmesi, boş saatlerime bakabilmesi ve tanışma görüşmesi oluşturabilmesi için ücretsiz ve hesap gerektirmeden sunulur. Yanıtları yapay zeka asistanınız yazar; özetleyebilir veya farklı ifade edebilir. Esas kaynak bu web sitesidir; önemli bir konuda siteyi kontrol edin veya doğrudan bana sorun.",
      },
      {
        en: "Use the server only for its intended purpose: don't send automated or excessive requests, try to disrupt or probe it, or create bookings for someone without their consent. Access may be limited, changed, suspended or discontinued at any time.",
        tr: "Sunucuyu yalnızca amacına uygun kullanın: otomatik veya aşırı sayıda istek göndermeyin, sunucuyu bozmaya ya da yoklamaya çalışmayın ve bir başkası adına onun izni olmadan randevu oluşturmayın. Erişim her zaman sınırlandırılabilir, değiştirilebilir, askıya alınabilir veya sonlandırılabilir.",
      },
      {
        en: "Your use of the assistant itself (ChatGPT, Claude, Gemini or another) is governed by that provider's own terms.",
        tr: "Asistanın kendisini (ChatGPT, Claude, Gemini veya bir başkası) kullanımınız, ilgili sağlayıcının kendi koşullarına tabidir.",
      },
    ],
  },
  {
    id: "third-parties",
    title: { en: "Third-party services and links", tr: "Üçüncü taraf hizmetler ve bağlantılar" },
    body: [
      {
        en: "Bookings run on Cal.com and calls take place on Google Meet; the site also links to other websites such as LinkedIn, Medium, GitHub and WhatsApp. These services have their own terms, and I am not responsible for their content or availability.",
        tr: "Randevular Cal.com üzerinden yürür, görüşmeler Google Meet'te yapılır; site ayrıca LinkedIn, Medium, GitHub ve WhatsApp gibi başka sitelere bağlantı verir. Bu hizmetlerin kendi koşulları vardır; içeriklerinden veya erişilebilirliklerinden sorumlu değilim.",
      },
    ],
  },
  {
    id: "liability",
    title: { en: "No warranty and limitation of liability", tr: "Garanti reddi ve sorumluluğun sınırlandırılması" },
    body: [
      {
        en: "The website and the server are provided “as is” and “as available”. I aim to keep them accurate and running, but I don't guarantee that they are error-free or always available, or that a time shown as free is still open when you book.",
        tr: "Web sitesi ve sunucu “olduğu gibi” ve “erişilebildiği ölçüde” sunulur. Doğru ve çalışır durumda tutmaya özen gösteririm; ancak hatasız veya her zaman erişilebilir olacaklarını ya da boş görünen bir saatin randevu anında hâlâ müsait olacağını garanti etmem.",
      },
      {
        en: "To the extent the law allows, I am not liable for indirect or consequential losses arising from use of the website, the server or their content. Nothing in these terms limits rights you have under mandatory law, including consumer protection law.",
        tr: "Yasanın izin verdiği ölçüde, web sitesinin, sunucunun veya içeriklerinin kullanımından doğan dolaylı zararlardan sorumlu değilim. Bu koşullardaki hiçbir hüküm, tüketicinin korunmasına ilişkin kurallar dâhil, emredici hukuktan doğan haklarınızı sınırlamaz.",
      },
    ],
  },
  {
    id: "privacy",
    title: { en: "Privacy", tr: "Gizlilik" },
    body: [
      {
        en: "How personal data is handled, including booking details, is explained in the privacy policy: https://huntayazerturk.com/privacy.",
        tr: "Randevu bilgileri dâhil kişisel verilerin nasıl işlendiği gizlilik politikasında anlatılır: https://huntayazerturk.com/tr/privacy.",
      },
    ],
  },
  {
    id: "law",
    title: { en: "Governing law", tr: "Uygulanacak hukuk" },
    body: [
      {
        en: "These terms are governed by the laws of the Republic of Türkiye, and the courts of Istanbul have jurisdiction. This does not affect mandatory consumer protection rules that apply where you live.",
        tr: "Bu koşullar Türkiye Cumhuriyeti hukukuna tabidir; İstanbul mahkemeleri ve icra daireleri yetkilidir. Bu hüküm, yaşadığınız yerde uygulanan emredici tüketici koruma kurallarını etkilemez.",
      },
    ],
  },
  {
    id: "changes",
    title: { en: "Changes", tr: "Değişiklikler" },
    body: [
      {
        en: "If these terms change, the updated version will be published on this page with a new date.",
        tr: "Bu koşullar değişirse güncel hâli yeni bir tarihle bu sayfada yayımlanır.",
      },
    ],
  },
];
