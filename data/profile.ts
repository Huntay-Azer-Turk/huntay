import type { Localized } from "./types";

/**
 * CV SUMMARY özeti (PDF ile uyumlu).
 * İlk cümle ismi içerir: arama motorları ve AI asistanları genelde ilk cümleyi "kim" cevabı olarak alıntılar.
 */
export const heroLead: Localized = {
  // 11 Kasım 2026: LinkedIn "Hakkında" ile aynı yapı. 12 Kasım 2026 (öz geçmiş kipi): LinkedIn'deki yeni "Hakkında"nın
  // ikinci paragrafıyla aynı (ilk paragraf girişte); danışmanlık ve satış dili yok.
  en: "Huntay AzerTürk is a software architect working on system architecture, microservices, cloud and IoT platforms. He brings AI into real products, from retrieval-augmented assistants to agent-based workflows.",
  tr: "Huntay AzerTürk; sistem mimarisi, mikroservisler, bulut ve IoT platformları üzerine çalışan bir yazılım mimarı. Yapay zekâyı RAG tabanlı asistanlardan ajan tabanlı iş akışlarına kadar gerçek ürünlere taşıyor.",
};

export const philosophy: Localized = {
  en: "I'm not a fan of over-engineering. I believe in keeping things simple, fast, and cost-effective. My goal is to build architectures that get out of the way and let the hardware—and the team—do their best work.",
  tr: "Gereksiz karmaşadan ve aşırı mühendislikten (over-engineering) hiç hoşlanmam. İşi basit, hızlı ve maliyet etkin tutmaya inanıyorum. Amacım, donanımın ve ekibin gerçek potansiyelini ortaya çıkaran, sade ama güçlü mimariler kurmak.",
};

/** Bilişsel bilimler: araştırma / güncel okuma alanı (üniversite iddiası yok) */
export const aboutAcademic: Localized = {
  en: "Cognitive science is my research focus and a field I keep studying and reading about—it gives me a distinct angle on software. I don't just see AI as a tool; I see it as a way to design systems that align with how humans actually think and work.",
  tr: "Bilişsel bilimler araştırma alanım ve güncel olarak derinlemesine okuduğum bir konu; bu da bana yazılıma çok farklı bir açıdan bakma şansı veriyor. Yapay zekayı sadece bir kod parçası olarak değil, insan zihniyle uyumlu çalışan sistemler tasarlamanın bir yolu olarak görüyorum.",
};

export const aboutSecurity: Localized = {
  en: "Security isn't an afterthought for me—it's the foundation. I build systems that don't just scale when things go right, but hold strong when things go wrong.",
  tr: "Güvenlik benim için sonradan eklenen bir yama değil, işin temelidir. Sadece işler yolundayken değil, kriz anlarında da ayakta kalan sağlam altyapılar kurarım.",
};

/** CV — RAG, Dialogflow CX, Meta WhatsApp; LinkedIn özetinde Chatwoot */
export const aboutAiProject: Localized = {
  en: "I've built autonomous support systems using Meta WhatsApp, Chatwoot, and Dialogflow CX. By integrating RAG architectures, we improved help desk workload and response times by 30–70% and customer satisfaction by 15–40% across different projects.",
  tr: "Meta WhatsApp, Chatwoot ve Dialogflow CX kullanarak otonom destek sistemleri geliştirdim. RAG mimarilerini entegre ederek farklı projelerde help desk iş yükünü ve yanıt sürelerini %30–70, müşteri memnuniyetini %15–40 iyileştirdik.",
};

export const aboutDiscipline: Localized = {
  en: "I bring the same discipline from my CrossFit and boxing routines into my code. High performance requires focus, consistency, and a strong foundation—whether in the gym or in system architecture.",
  tr: "CrossFit ve boks antrenmanlarımdaki disiplini doğrudan yazdığım koda da yansıtıyorum. Yüksek performans; odaklanma, tutarlılık ve sağlam bir temel gerektirir—ister spor salonunda ister sistem mimarisinde.",
};

/** 11 Kasım 2026: startup danışmanlığı yerine üreticilere yönelik çalışma biçimi (konumlandırma: üreticiler için yapay zekâ). */
export const strategicPartner: Localized = {
  en: "As an executive, you should be focusing on your business, not on technology. I first find the repetitive questions and bottlenecks that eat your central teams' time, measure where AI will actually help, and then build it without replacing your ERP or service software. I run the work myself from start to finish.",
  tr: "Bir yönetici olarak teknolojiyle değil işinizle ilgilenmelisiniz. Ben önce merkez ekiplerinizin vaktini alan tekrarlı soruları ve darboğazı bulur, yapay zekânın nerede gerçekten işe yarayacağını ölçer, sonra ERP ve servis yazılımlarınızı değiştirmeden kurarım. İşi baştan sona bizzat yürütürüm.",
};

/** CV — Writing & Research */
export const aboutResearch: Localized = {
  en: "I regularly write on Medium about things like RAG chunking, nature-inspired networks, and the reality of AGI. In my spare time I also work independently on Brain-Computer Interfaces (BCI) using EEG signals and LLMs for neurodivergent individuals.",
  tr: "Medium'da RAG parçalama, doğadan ilhamlı ağlar ve AGI'nin gerçekliği gibi konularda teknik yazılar yazıyorum. Boş zamanlarımda, bağımsız olarak, nöroçeşitli bireyler için EEG sinyalleri ve LLM'ler kullanan Brain-Computer Interfaces (BCI) üzerinde çalışıyorum.",
};
