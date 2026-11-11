import type { Localized } from "./types";

/**
 * CV SUMMARY özeti (PDF ile uyumlu).
 * İlk cümle ismi içerir: arama motorları ve AI asistanları genelde ilk cümleyi "kim" cevabı olarak alıntılar.
 */
export const heroLead: Localized = {
  en: "Every engagement is led by me, Huntay AzerTürk: an Istanbul-based software architect with over 13 years of experience. Across different projects, AI cut support ticket resolution time by 40–70%; in another project, cloud costs dropped by roughly 75%; and I built an IoT platform that runs 10,000+ devices. First we pin down where AI pays off and what it costs you not to act, then we deliver it together with your team.",
  tr: "Her işi bizzat ben yürütüyorum: Huntay AzerTürk; İstanbul merkezli, 13 yılı aşkın deneyime sahip yazılım mimarı. Farklı projelerde yapay zekâyla destek taleplerinin çözüm süresi %40–70 arasında kısaldı, bir başka projede bulut maliyeti yaklaşık %75 düştü; 10.000+ cihazı çalıştıran bir IoT platformu kurdum. Önce yapay zekânın nerede getiri sağlayacağını ve beklemenin size maliyetini netleştiriyoruz, sonra ekibinizle birlikte hayata geçiriyoruz.",
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
  en: "I've built autonomous support systems using Meta WhatsApp, Chatwoot, and Dialogflow CX. By integrating RAG architectures, we cut resolution times for complex technical requests by 40–70% across different projects.",
  tr: "Meta WhatsApp, Chatwoot ve Dialogflow CX kullanarak otonom destek sistemleri geliştirdim. RAG mimarilerini entegre ederek, karmaşık teknik sorunların çözüm süresini farklı projelerde %40–70 arasında kısalttık.",
};

export const aboutDiscipline: Localized = {
  en: "I bring the same discipline from my CrossFit and boxing routines into my code. High performance requires focus, consistency, and a strong foundation—whether in the gym or in system architecture.",
  tr: "CrossFit ve boks antrenmanlarımdaki disiplini doğrudan yazdığım koda da yansıtıyorum. Yüksek performans; odaklanma, tutarlılık ve sağlam bir temel gerektirir—ister spor salonunda ister sistem mimarisinde.",
};

export const strategicPartner: Localized = {
  en: "For years I have advised startups and backed them technically. If you're a founder or executive, you should be focusing on your business, not worrying about technical bottlenecks. I step in to clear the fog, map out a solid technical strategy, and make sure your product scales smoothly.",
  tr: "Yıllardır startup'lara danışmanlık yapıyor ve teknik olarak destek veriyorum. Bir kurucu veya yönetici olarak teknik pürüzlerle değil, işinizi büyütmekle ilgilenmelisiniz. Ben tam bu noktada devreye girip teknik belirsizlikleri ortadan kaldırıyor, net bir yol haritası çiziyor ve ürününüzün sorunsuz ölçeklenmesini sağlıyorum.",
};

/** CV — Writing & Research */
export const aboutResearch: Localized = {
  en: "I regularly write on Medium about things like RAG chunking, nature-inspired networks, and the reality of AGI. In my spare time I also work independently on Brain-Computer Interfaces (BCI) using EEG signals and LLMs for neurodivergent individuals.",
  tr: "Medium'da RAG parçalama, doğadan ilhamlı ağlar ve AGI'nin gerçekliği gibi konularda teknik yazılar yazıyorum. Boş zamanlarımda, bağımsız olarak, nöroçeşitli bireyler için EEG sinyalleri ve LLM'ler kullanan Brain-Computer Interfaces (BCI) üzerinde çalışıyorum.",
};
