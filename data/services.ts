import { aiUnitOfferings } from "./ai-units";
import type { FaqItem, ServiceItem, StepItem } from "./types";

/**
 * Hizmetler — /services, /services/<slug>, ana sayfa “Hizmetler” bölümü, JSON-LD (Service, OfferCatalog),
 * sitemap, /llms.txt, Markdown sürümleri ve MCP bu tek kaynaktan beslenir.
 *
 * Yapı (Kasım 2026): 3 uzmanlık alanı (pillar) + Fractional CTO çalışma modeli (model) + alanların
 * derinlemesine alt sayfaları (deep-dive). Kaldırılan eski hizmet adresleri ve MCP'nin donmuş slug listesi
 * data/catalog.ts'deki uyumluluk katmanında yeni sayfalara eşlenir — bir hizmeti silerken oraya da bakın.
 *
 * Sayılar (75%, 40–70%, 10.000+ ...) yalnızca sitede zaten yer alan vaka çalışmalarından alınmıştır.
 */
export const services: ServiceItem[] = [
  /* ------------------------------------------------------------------ */
  /* Alan 1 — Yapay zeka                                                 */
  /* ------------------------------------------------------------------ */
  {
    slug: "ai-agents",
    role: "pillar",
    icon: "bot",
    // 11 Kasım 2026: tek görünen hizmet (slug MCP için aynı kaldı). Akşam (Huntay: "sitenin odak noktası tek bir şey"):
    // yalnız teknik servis ve help desk asistanı; diğer birimler anılmıyor.
    title: {
      en: "Technical Service & Help Desk AI Assistant for Manufacturers",
      tr: "Üreticiler için Teknik Servis ve Help Desk Asistanı",
    },
    metaTitle: {
      en: "AI Technical Service & Help Desk Assistant for Manufacturers",
      tr: "Üreticiler için Yapay Zekâ Teknik Servis ve Help Desk Asistanı",
    },
    tagline: {
      en: "Answers your dealers', technicians' and users' repetitive fault and documentation questions from your own manuals, without replacing your software.",
      tr: "Bayilerinizin, teknisyenlerinizin ve kullanıcılarınızın tekrarlı arıza ve doküman sorularını, yazılımınızı değiştirmeden kendi kılavuzlarınızla yanıtlar.",
    },
    summary: {
      en: "Your central team's time goes to the same fault, installation and usage questions from dealers, technicians and users. The assistant answers them from your own manuals, service bulletins and past tickets, opens a ticket and hands over to your team when needed, and works alongside your ERP and service software instead of replacing them. It starts with a fixed-price opportunity scan, goes live on one channel in a 3-week pilot, and moves to a production rollout once the results are measured.",
      tr: "Merkez ekibinizin vakti bayilerden, teknisyenlerden ve kullanıcılardan gelen aynı arıza, kurulum ve kullanım sorularına gidiyor. Asistan bunları kendi kılavuzlarınız, teknik bültenleriniz ve geçmiş taleplerinizle yanıtlar; gerekince arıza kaydı açıp ekibinize devreder; ERP ve servis yazılımlarınızın yerine geçmez, yanında çalışır. Sabit fiyatlı bir fırsat taramasıyla başlar, 3 haftalık pilotla tek kanalda canlıya alınır, sonuç ölçülünce canlı kuruluma geçilir.",
    },
    metaDescription: {
      en: "AI technical service and help desk assistant for manufacturers with dealer and service networks: answers repetitive fault and documentation questions from your own manuals. Scan, 3-week pilot, production rollout.",
      tr: "Bayi ve servis ağı olan üreticiler için yapay zekâ teknik servis ve help desk asistanı: tekrarlı arıza ve doküman sorularını kendi kılavuzlarınızla yanıtlar. Tarama, 3 haftalık pilot, canlı kurulum.",
    },
    offerings: [
      {
        id: "ai-scan",
        title: { en: "AI opportunity scan", tr: "Yapay zekâ fırsat taraması" },
        body: {
          en: "Which questions reach your central team most often, how ready your manuals and ticket data are, and the expected impact of the assistant.",
          tr: "Merkez ekibinize en sık hangi soruların geldiği, kılavuz ve talep verinizin ne kadar hazır olduğu ve asistanın beklenen etkisi.",
        },
        packageId: "ai-opportunity-scan",
      },
      // 11 Kasım 2026: birim tek kaynaktan (data/ai-units.ts); akşamdan beri yalnız teknik servis ve help desk.
      ...aiUnitOfferings(),
      {
        id: "ai-measure",
        title: { en: "Measurement & improvement", tr: "Ölçüm ve iyileştirme" },
        body: {
          en: "Before/after metrics, conversation analytics and regular improvement rounds, so you can see what each change actually delivered.",
          tr: "Önce/sonra ölçümleri, konuşma analitiği ve düzenli iyileştirme turları; böylece her değişikliğin gerçekte ne kazandırdığını görürsünüz.",
        },
      },
    ],
    forWhom: [
      {
        en: "Manufacturers and distributors whose dealers and service points keep asking headquarters the same questions",
        tr: "Bayileri ve servis noktaları merkeze sürekli aynı soruları soran üretici ve distribütörler",
      },
      {
        en: "Technical service and support teams answering the same fault and usage questions every day",
        tr: "Her gün aynı arıza ve kullanım sorularını yanıtlayan teknik servis ve destek ekipleri",
      },
      {
        en: "Companies whose manuals, service bulletins and past tickets are scattered and known by only a few people",
        tr: "Kılavuzları, teknik bültenleri ve geçmiş talepleri dağınık olan, doğru cevabı yalnız birkaç kişinin bildiği şirketler",
      },
      {
        en: "Manufacturers that want results without hiring an AI team or replacing their software",
        tr: "Yapay zekâ ekibi kurmadan ve yazılımını değiştirmeden sonuç almak isteyen üreticiler",
      },
    ],
    deliverables: [
      {
        en: "Use-case analysis and ROI-driven prioritization",
        tr: "Kullanım senaryosu analizi ve getiriye göre önceliklendirme",
      },
      {
        en: "A working AI agent connected to your data (RAG) and tools",
        tr: "Verilerinize (RAG) ve araçlarınıza bağlı, çalışan bir yapay zeka ajanı",
      },
      {
        en: "Channels: dealer portal, WhatsApp, website chat, email or your service system",
        tr: "Kanallar: bayi portalı, WhatsApp, web sitesi sohbeti, e-posta veya servis sisteminiz",
      },
      {
        en: "Human handover, guardrails and conversation analytics",
        tr: "İnsana devir, güvenlik sınırları (guardrails) ve konuşma analitiği",
      },
      {
        en: "Deployment, monitoring, team training and continuous improvement",
        tr: "Canlıya alma, izleme, ekip eğitimi ve sürekli iyileştirme",
      },
    ],
    useCases: [
      {
        en: "A dealer asks what a fault code means; the assistant answers from the manual and service bulletin, with the page reference",
        tr: "Bayi bir arıza kodunun ne anlama geldiğini sorar; asistan kılavuz ve teknik bültenden, sayfa kaynağıyla yanıtlar",
      },
      {
        en: "A field technician asks for installation or replacement steps for a specific model",
        tr: "Sahadaki teknisyen belirli bir modelin kurulum ya da parça değişim adımlarını sorar",
      },
      {
        en: "When the answer isn't in the documents, the assistant opens a ticket and hands it to your team with the full context",
        tr: "Cevap dokümanlarda yoksa asistan arıza kaydı açar ve tüm bağlamıyla ekibinize devreder",
      },
      {
        en: "Repeated questions show which manuals are missing or unclear, so your team can fix them",
        tr: "Tekrarlanan sorular hangi kılavuzun eksik ya da anlaşılmaz olduğunu gösterir; ekibiniz düzeltebilir",
      },
    ],
    tech: [
      "LangChain",
      "LangGraph",
      "RAG",
      "Vector databases",
      "Dialogflow CX",
      "Chatwoot",
      "WhatsApp Business API",
      "REST APIs",
      "Python",
      "GCP",
    ],
    relatedCases: ["ai-ops"],
    faq: [
      {
        id: "sme-start",
        question: {
          en: "Why start with technical service and the help desk?",
          tr: "Neden teknik servis ve help desk'ten başlıyorsunuz?",
        },
        answer: {
          en: "Because the result is visible fastest there and the data is already in your hands: manuals, service bulletins and past tickets. The assistant takes the repetitive questions off your central team within weeks, and the effect can be measured in resolution time.",
          tr: "Çünkü sonuç en hızlı orada görülür ve veri zaten elinizdedir: kılavuzlar, teknik bültenler ve geçmiş talepler. Asistan birkaç hafta içinde tekrarlı soruları merkez ekibinizin üzerinden alır; etkisi çözüm süresiyle ölçülebilir.",
        },
      },
      {
        id: "ai-agents-data",
        question: {
          en: "What does an AI agent need to work well?",
          tr: "Bir yapay zeka ajanının iyi çalışması için ne gerekir?",
        },
        answer: {
          en: "Clear use cases and access to the right knowledge: documents, FAQs, product data or ERP records. I start by mapping these sources, then build retrieval (RAG) so answers are grounded in your own data instead of the model's guesses.",
          tr: "Net kullanım senaryoları ve doğru bilgiye erişim: dokümanlar, SSS'ler, ürün verileri veya ERP kayıtları. Önce bu kaynakları haritalıyor, ardından cevapların modelin tahminlerine değil sizin verilerinize dayanması için arama altyapısını (RAG) kuruyorum.",
        },
      },
      {
        id: "ai-agents-team",
        question: {
          en: "Will an AI agent replace my support team?",
          tr: "Yapay zeka ajanı destek ekibimin yerini mi alır?",
        },
        answer: {
          en: "No. It handles repetitive questions and routes complex or sensitive cases to people with full context. In different projects, this approach cut ticket resolution time by 40–70%.",
          tr: "Hayır. Tekrarlayan soruları üstlenir, karmaşık veya hassas durumları tüm bağlamıyla insanlara aktarır. Farklı projelerde bu yaklaşım talep çözüm süresini %40–70 arasında kısalttı.",
        },
      },
      {
        id: "sme-replace",
        question: {
          en: "Do we need to replace our existing software?",
          tr: "Mevcut yazılımlarımızı değiştirmemiz gerekir mi?",
        },
        answer: {
          en: "No. The assistant works alongside your ERP, service software and dealer portal and reads from them; your team keeps using the tools it knows.",
          tr: "Hayır. Asistan ERP'nizin, servis yazılımınızın ve bayi portalınızın yanında çalışır ve onlardan okur; ekibiniz bildiği araçları kullanmaya devam eder.",
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Alan 2 — Bulut, IoT ve mimari                                       */
  /* ------------------------------------------------------------------ */
  {
    slug: "cloud-devops",
    role: "pillar",
    icon: "cloud",
    title: {
      en: "Cloud, IoT & Architecture",
      tr: "Bulut, IoT ve Mimari",
    },
    metaTitle: {
      en: "Cloud, IoT & Software Architecture Consulting",
      tr: "Bulut, IoT ve Yazılım Mimarisi Danışmanlığı",
    },
    tagline: {
      en: "Systems that scale, keep costs under control and stay up.",
      tr: "Ölçeklenen, maliyeti kontrol altında ve kesintisiz çalışan sistemler.",
    },
    summary: {
      en: "I review, design and modernize the systems your business runs on: cloud architecture and costs, the path from a fragile monolith to a maintainable structure, automated delivery and monitoring, IoT platforms and performance under load—in the cloud, on-premises or both. In one project, moving legacy monoliths to event-driven microservices on GCP cut infrastructure costs by roughly 75%; the IoT platform I built runs 10,000+ devices for 100,000+ users.",
      tr: "İşinizin üzerinde çalıştığı sistemleri inceliyor, tasarlıyor ve modernize ediyorum: bulut mimarisi ve maliyetleri, kırılgan bir monolitten bakımı kolay bir yapıya geçiş, otomatik teslimat ve izleme, IoT platformları ve yük altında performans; bulutta, şirket içinde ya da ikisinde birden. Bir projede eski monolitleri GCP üzerinde olay güdümlü mikroservislere taşımak altyapı maliyetini yaklaşık %75 düşürdü; kurduğum IoT platformu 10.000+ cihazı ve 100.000+ kullanıcıyı çalıştırıyor.",
    },
    metaDescription: {
      en: "Cloud, IoT and architecture consulting: cost reviews, modernization, DevOps, IoT platforms, performance and on-premises deployments. Up to 75% lower cloud costs.",
      tr: "Bulut, IoT ve mimari danışmanlığı: maliyet incelemesi, modernizasyon, DevOps, IoT platformu, performans ve şirket içi kurulum. %75'e varan maliyet düşüşü.",
    },
    offerings: [
      {
        id: "cloud-review",
        title: { en: "Architecture & cloud cost review", tr: "Mimari ve bulut maliyet incelemesi" },
        body: {
          en: "Where the money and the risk are in your current setup, quick wins and a prioritized roadmap. In one migration, infrastructure costs dropped by roughly 75%.",
          tr: "Mevcut yapınızda paranın ve riskin nereye gittiği, hızlı kazanımlar ve önceliklendirilmiş bir yol haritası. Bir geçişte altyapı maliyeti yaklaşık %75 düştü.",
        },
        packageId: "architecture-cloud-review",
      },
      {
        id: "cloud-modernization",
        title: { en: "Modernization", tr: "Modernizasyon" },
        body: {
          en: "From a monolith to a modular monolith or microservices step by step—without a risky big-bang rewrite—or consolidating too many services into fewer.",
          tr: "Monolitten modüler monolite veya mikroservislere riskli bir “sıfırdan yazma” yapmadan adım adım geçiş; ya da gereğinden fazla servisi daha aza indirme.",
        },
        serviceSlug: "microservices-modernization",
      },
      {
        id: "cloud-devops",
        title: { en: "DevOps & reliability", tr: "DevOps ve güvenilirlik" },
        body: {
          en: "CI/CD, Docker and Kubernetes, infrastructure as code with Terraform, monitoring and alerting, backups and disaster recovery that are actually tested.",
          tr: "CI/CD, Docker ve Kubernetes, Terraform ile kod olarak altyapı, izleme ve alarm, gerçekten test edilmiş yedekleme ve felaket kurtarma.",
        },
      },
      {
        id: "cloud-iot",
        title: { en: "IoT platforms", tr: "IoT platformları" },
        body: {
          en: "Device connectivity over MQTT, device management, remote firmware updates, alarms and dashboards—proven with 10,000+ devices and 100,000+ users.",
          tr: "MQTT ile cihaz bağlantısı, cihaz yönetimi, uzaktan firmware güncelleme, alarmlar ve paneller; 10.000+ cihaz ve 100.000+ kullanıcıyla kanıtlanmış.",
        },
        serviceSlug: "iot-platforms",
      },
      {
        id: "cloud-performance",
        title: { en: "Performance & scaling", tr: "Performans ve ölçeklenme" },
        body: {
          en: "Load tests, bottleneck analysis, database tuning and migrations (for example to PostgreSQL), so traffic peaks stop being a risk.",
          tr: "Yük testleri, darboğaz analizi, veritabanı iyileştirme ve geçişleri (ör. PostgreSQL'e), böylece trafik zirveleri risk olmaktan çıkar.",
        },
      },
      {
        id: "cloud-onprem",
        title: { en: "On-premises & closed networks", tr: "Şirket içi ve kapalı ağ kurulumları" },
        body: {
          en: "One codebase that runs as a 60+ service cloud platform or as 3 lightweight services at offline, air-gapped sites.",
          tr: "Aynı kod tabanının hem 60+ servislik bir bulut platformu hem de internetten izole sahalarda 3 hafif servis olarak çalışması.",
        },
      },
    ],
    forWhom: [
      {
        en: "Companies whose cloud bill keeps growing faster than usage",
        tr: "Bulut faturası kullanımdan daha hızlı büyüyen şirketler",
      },
      {
        en: "Teams deploying manually and fearing every release",
        tr: "Elle deployment yapan ve her sürümden çekinen ekipler",
      },
      {
        en: "Hardware manufacturers that need a cloud platform for their devices",
        tr: "Cihazları için bulut platformuna ihtiyaç duyan donanım üreticileri",
      },
      {
        en: "Products that must run in the cloud, on-premises or both",
        tr: "Bulutta, şirket içinde ya da ikisinde birden çalışması gereken ürünler",
      },
    ],
    deliverables: [
      {
        en: "Architecture and cloud cost assessment with quick wins",
        tr: "Hızlı kazanımlar içeren mimari ve bulut maliyet değerlendirmesi",
      },
      {
        en: "A step-by-step modernization or migration roadmap",
        tr: "Adım adım modernizasyon veya geçiş yol haritası",
      },
      {
        en: "Kubernetes/Docker platform, CI/CD and infrastructure as code (Terraform)",
        tr: "Kubernetes/Docker platformu, CI/CD ve kod olarak altyapı (Terraform)",
      },
      {
        en: "Monitoring, logging, alerting and disaster-recovery planning",
        tr: "İzleme, loglama, alarm ve felaket kurtarma planı",
      },
      {
        en: "IoT connectivity, device management and dashboards",
        tr: "IoT bağlantısı, cihaz yönetimi ve paneller",
      },
    ],
    useCases: [
      {
        en: "Cutting a growing cloud bill without hurting performance",
        tr: "Büyüyen bir bulut faturasını performanstan ödün vermeden düşürme",
      },
      {
        en: "Moving a manually deployed app to automated CI/CD",
        tr: "Elle deploy edilen bir uygulamayı otomatik CI/CD'ye taşıma",
      },
      {
        en: "Running the same system in the cloud and at offline, on-premises sites",
        tr: "Aynı sistemi hem bulutta hem çevrimdışı şirket içi tesislerde çalıştırma",
      },
      {
        en: "Remote monitoring and firmware management for thousands of devices",
        tr: "Binlerce cihazın uzaktan izlenmesi ve firmware yönetimi",
      },
    ],
    tech: ["GCP", "Kubernetes", "Docker", "Terraform", "CI/CD", "MQTT", "RabbitMQ", ".NET", "Redis", "Linux"],
    relatedCases: ["iot-cloud", "hexagonal", "sandbox", "bare-metal"],
    faq: [
      {
        id: "cloud-savings",
        question: {
          en: "How much can we save on cloud costs?",
          tr: "Bulut maliyetlerinde ne kadar tasarruf edebiliriz?",
        },
        answer: {
          en: "It depends on your current setup. Savings usually come from right-sizing, removing idle resources and better architecture; in one migration to event-driven microservices on GCP, infrastructure costs dropped by roughly 75%. A review shows your realistic potential.",
          tr: "Mevcut yapınıza bağlı. Tasarruf genellikle doğru boyutlandırma, atıl kaynakları kaldırma ve daha iyi mimariden gelir; GCP'de olay güdümlü mikroservislere yapılan bir geçişte altyapı maliyeti yaklaşık %75 düştü. Bir inceleme sizin için gerçekçi potansiyeli gösterir.",
        },
      },
      {
        id: "cloud-providers",
        question: {
          en: "Do you work only with Google Cloud?",
          tr: "Sadece Google Cloud ile mi çalışıyorsunuz?",
        },
        answer: {
          en: "Most of my production experience is on GCP and Kubernetes, but the principles—containers, infrastructure as code, CI/CD and observability—apply to other clouds and on-premises environments too.",
          tr: "Canlı ortam deneyimimin çoğu GCP ve Kubernetes üzerinde; ancak konteynerler, kod olarak altyapı, CI/CD ve gözlemlenebilirlik prensipleri diğer bulutlarda ve şirket içi ortamlarda da geçerli.",
        },
      },
      {
        id: "cloud-microservices",
        question: {
          en: "Are microservices always the right choice?",
          tr: "Mikroservis her zaman doğru seçim mi?",
        },
        answer: {
          en: "No. Microservices add operational cost. I recommend them where independent scaling or deployment really pays off, and a well-structured modular monolith where it doesn't.",
          tr: "Hayır. Mikroservisler operasyonel maliyet getirir. Bağımsız ölçeklenme veya deployment gerçekten fayda sağladığında öneriyorum; sağlamadığında iyi yapılandırılmış modüler bir monolit daha doğru olur.",
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Alan 3 — Siber güvenlik                                             */
  /* ------------------------------------------------------------------ */
  {
    slug: "cybersecurity",
    role: "pillar",
    icon: "shield",
    title: {
      en: "Cybersecurity & Secure Software",
      tr: "Siber Güvenlik ve Güvenli Yazılım",
    },
    metaTitle: {
      en: "Penetration Testing, Security Assessments & Secure Code",
      tr: "Sızma Testi, Güvenlik Değerlendirmesi ve Güvenli Kod",
    },
    tagline: {
      en: "Find the weak points before attackers do—then fix them in the code, the data and the infrastructure.",
      tr: "Zayıf noktaları saldırganlardan önce bulun; sonra kodda, veride ve altyapıda kalıcı olarak kapatın.",
    },
    summary: {
      en: "I assess, test and harden what attackers actually target: web applications and APIs, cloud setups, connected devices, backups and the people who receive phishing calls. You get a prioritized report written for both engineers and management, and—unlike a test-only engagement—hands-on help fixing what was found, from code changes to key management, CI/CD security checks and a tested recovery plan.",
      tr: "Saldırganların gerçekten hedeflediği yerleri değerlendiriyor, test ediyor ve güçlendiriyorum: web uygulamaları ve API'ler, bulut yapılandırmaları, bağlı cihazlar, yedekler ve oltalama aramalarını karşılayan çalışanlar. Hem mühendislerin hem yönetimin okuyabileceği, önceliklendirilmiş bir rapor alırsınız; yalnızca test yapılan bir çalışmanın aksine, kod değişikliklerinden anahtar yönetimine, CI/CD güvenlik kontrollerine ve test edilmiş bir kurtarma planına kadar bulunan açıkların kapatılmasında da birebir destek veririm.",
    },
    metaDescription: {
      en: "Cybersecurity for SMEs: maturity assessment, OWASP web/API scans, penetration testing, cloud and IoT security, secure code, ransomware readiness and training.",
      tr: "KOBİ'ler için siber güvenlik: olgunluk değerlendirmesi, OWASP web/API taraması, sızma testi, bulut ve IoT güvenliği, güvenli kod, fidye yazılımına hazırlık.",
    },
    offerings: [
      {
        id: "sec-maturity",
        title: { en: "Security maturity assessment", tr: "Güvenlik olgunluk değerlendirmesi" },
        body: {
          en: "Where your company stands on the controls that matter most for SMEs—MFA, backups, updates, access, awareness—with a 90-day roadmap.",
          tr: "KOBİ'ler için en çok önem taşıyan kontrollerde (MFA, yedekleme, güncellemeler, erişim, farkındalık) şirketinizin nerede durduğu ve 90 günlük bir yol haritası.",
        },
      },
      {
        id: "sec-scan",
        title: { en: "Web & API security scan (OWASP Top 10)", tr: "Web ve API güvenlik taraması (OWASP Top 10)" },
        body: {
          en: "A fixed-scope check of your web app or API against the most common attack types, with a prioritized report.",
          tr: "Web uygulamanızın veya API'nizin en yaygın saldırı türlerine karşı kapsamı belli bir kontrolü ve önceliklendirilmiş rapor.",
        },
        packageId: "security-quick-scan",
      },
      {
        id: "sec-pentest",
        title: { en: "Penetration test & retest", tr: "Sızma testi ve yeniden test" },
        body: {
          en: "Authorized, in-depth testing of web apps, APIs, mobile apps or cloud configuration—then a retest to confirm each issue is closed.",
          tr: "Web uygulaması, API, mobil uygulama veya bulut yapılandırmasının yetkilendirilmiş, derinlemesine testi; ardından her açığın kapandığını doğrulayan yeniden test.",
        },
        packageId: "penetration-test-standard",
      },
      {
        id: "sec-cloud",
        title: { en: "Cloud security review", tr: "Bulut güvenliği incelemesi" },
        body: {
          en: "Identity and access, network exposure, secrets and Kubernetes configuration in your cloud and SaaS tools.",
          tr: "Bulutunuzda ve SaaS araçlarınızda kimlik ve erişim, ağ erişimi, gizli anahtarlar ve Kubernetes yapılandırması.",
        },
      },
      {
        id: "sec-iot",
        title: { en: "IoT & product security", tr: "IoT ve ürün güvenliği" },
        body: {
          en: "Device identity, secure firmware updates and a vulnerability-handling process—important for manufacturers selling into the EU under the Cyber Resilience Act.",
          tr: "Cihaz kimliği, güvenli firmware güncellemesi ve açık bildirme süreci; AB Siber Dayanıklılık Yasası (CRA) kapsamında AB'ye satış yapan üreticiler için önemli.",
        },
      },
      {
        id: "sec-code",
        title: { en: "Secure software development", tr: "Güvenli yazılım geliştirme" },
        body: {
          en: "Secure code review of authentication, authorization, input handling and secrets, plus automated code and dependency scanning in CI/CD.",
          tr: "Kimlik doğrulama, yetkilendirme, girdi işleme ve gizli anahtarlar için güvenli kod incelemesi; CI/CD'de otomatik kod ve bağımlılık taraması.",
        },
      },
      {
        id: "sec-ransomware",
        title: { en: "Ransomware readiness", tr: "Fidye yazılımına hazırlık" },
        body: {
          en: "Backups with a tested restore, an incident response plan including the KVKK/GDPR notification step, and the technical measures behind them.",
          tr: "Geri yüklemesi test edilmiş yedekler, KVKK bildirim adımını içeren olay müdahale planı ve bunların arkasındaki teknik tedbirler.",
        },
      },
      {
        id: "sec-awareness",
        title: { en: "Employee awareness training", tr: "Çalışan farkındalık eğitimi" },
        body: {
          en: "Short, practical sessions on phishing, fake invoices, deepfakes and voice-cloned calls—and what to do when something looks wrong.",
          tr: "Oltalama, sahte faturalar, deepfake ve ses klonlamalı aramalar üzerine kısa, uygulamalı oturumlar ve şüpheli bir durumda ne yapılacağı.",
        },
      },
    ],
    forWhom: [
      {
        en: "Companies launching a product that handles customer or payment data",
        tr: "Müşteri veya ödeme verisi işleyen bir ürünü yayına alacak şirketler",
      },
      {
        en: "Teams preparing for a customer security review, an audit or KVKK/GDPR compliance",
        tr: "Müşteri güvenlik değerlendirmesine, denetime veya KVKK/GDPR uyumuna hazırlanan ekipler",
      },
      {
        en: "SMEs and startups without an in-house security engineer",
        tr: "Şirket içinde güvenlik mühendisi olmayan KOBİ'ler ve startup'lar",
      },
      {
        en: "Businesses that suspect a vulnerability or recently had a security incident",
        tr: "Bir güvenlik açığından şüphelenen veya yakın zamanda güvenlik olayı yaşamış işletmeler",
      },
    ],
    deliverables: [
      {
        en: "Scoping and written authorization before any test",
        tr: "Her testten önce kapsam belirleme ve yazılı yetkilendirme",
      },
      {
        en: "Penetration test of web apps, APIs, mobile apps or cloud configuration (OWASP-based)",
        tr: "Web uygulaması, API, mobil uygulama veya bulut yapılandırması sızma testi (OWASP tabanlı)",
      },
      {
        en: "Secure code review of authentication, authorization, input handling and secrets",
        tr: "Kimlik doğrulama, yetkilendirme, girdi işleme ve gizli anahtarlar için güvenli kod incelemesi",
      },
      {
        en: "Encryption design: TLS, data at rest, password hashing and key management",
        tr: "Şifreleme tasarımı: TLS, saklanan verinin şifrelenmesi, parola özetleme ve anahtar yönetimi",
      },
      {
        en: "Prioritized report with risk levels, evidence and concrete fixes",
        tr: "Risk seviyeleri, kanıtlar ve somut çözümlerle önceliklendirilmiş rapor",
      },
      {
        en: "Remediation support, a retest, and security checks in your CI/CD pipeline",
        tr: "Açıkların kapatılmasında destek, yeniden test ve CI/CD hattınıza güvenlik kontrolleri",
      },
    ],
    useCases: [
      {
        en: "Pre-launch penetration test of a SaaS web app and its API",
        tr: "Bir SaaS web uygulamasının ve API'sinin yayın öncesi sızma testi",
      },
      {
        en: "Mobile app (Android/iOS) and backend test for insecure storage and broken access control",
        tr: "Mobil uygulama (Android/iOS) ve backend'inde güvensiz veri saklama ve hatalı erişim kontrolü testi",
      },
      {
        en: "Encrypting personal data and moving secrets out of code into a managed vault",
        tr: "Kişisel verilerin şifrelenmesi ve koddaki gizli anahtarların yönetilen bir kasaya taşınması",
      },
      {
        en: "Hardening cloud and Kubernetes configuration: IAM, network exposure and secrets",
        tr: "Bulut ve Kubernetes yapılandırmasının güçlendirilmesi: IAM, ağ erişimi ve gizli anahtarlar",
      },
    ],
    tech: [
      "OWASP Top 10 / ASVS",
      "Burp Suite",
      "OWASP ZAP",
      "Nmap",
      "SAST / DAST",
      "TLS",
      "AES / RSA",
      "KMS / Vault",
      "Kubernetes",
      "GCP",
    ],
    relatedCases: [],
    faq: [
      {
        id: "cybersecurity-authorization",
        question: {
          en: "Is a penetration test safe for my live system?",
          tr: "Sızma testi canlı sistemim için güvenli mi?",
        },
        answer: {
          en: "Testing starts only after we agree in writing on the scope, the time window and what is off-limits. Where possible I test on a staging copy; on production I avoid destructive tests and coordinate with your team so nothing is disrupted.",
          tr: "Test, kapsam, zaman aralığı ve dokunulmayacak alanlar üzerinde yazılı olarak anlaştıktan sonra başlar. Mümkünse staging kopyasında test ediyorum; canlı ortamda yıkıcı testlerden kaçınır ve hiçbir şeyin aksamaması için ekibinizle koordineli çalışırım.",
        },
      },
      {
        id: "cybersecurity-fix",
        question: {
          en: "Do you only report problems, or also fix them?",
          tr: "Sadece açıkları mı raporluyorsunuz, yoksa kapatıyor musunuz da?",
        },
        answer: {
          en: "Both. As a software architect I work directly with your engineers on the fixes—code changes, encryption, key management and pipeline checks—and then retest to confirm each issue is closed.",
          tr: "İkisini de. Yazılım mimarı olarak düzeltmelerde (kod değişiklikleri, şifreleme, anahtar yönetimi ve CI/CD kontrolleri) doğrudan mühendislerinizle çalışır, ardından her açığın kapandığını yeniden test ederek doğrularım.",
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Çalışma modeli — Fractional CTO                                     */
  /* ------------------------------------------------------------------ */
  {
    slug: "fractional-cto",
    role: "model",
    icon: "compass",
    title: {
      en: "Fractional CTO & Technical Consulting",
      tr: "Fractional CTO ve Teknik Danışmanlık",
    },
    tagline: {
      en: "Senior technical leadership—without a full-time executive hire.",
      tr: "Tam zamanlı yönetici işe almadan kıdemli teknik liderlik.",
    },
    summary: {
      en: "I act as your part-time CTO or technical advisor across all three areas—AI, cloud/IoT and security: setting technology strategy, reviewing architecture, choosing vendors and tools, hiring and coaching engineers, and leading the build of a new product from idea to MVP. Ideal for founders and executives who need experienced judgment on technical decisions.",
      tr: "Üç alanın tamamında (yapay zeka, bulut/IoT ve güvenlik) yarı zamanlı CTO'nuz veya teknik danışmanınız olarak çalışıyorum: teknoloji stratejisini belirlemek, mimariyi incelemek, tedarikçi ve araç seçmek, mühendis işe alımı ve koçluğu yapmak, yeni bir ürünü fikirden MVP'ye kadar yönetmek. Teknik kararlarda deneyimli bir bakışa ihtiyaç duyan kurucular ve yöneticiler için ideal.",
    },
    metaDescription: {
      en: "Fractional CTO and technical consulting for startups and SMEs: technology strategy, architecture reviews, team building and CTO-led MVPs. 13+ years of experience.",
      tr: "Startup ve KOBİ'ler için fractional CTO ve teknik danışmanlık: teknoloji stratejisi, mimari inceleme, ekip kurma ve CTO liderliğinde MVP. 13+ yıllık deneyim.",
    },
    offerings: [
      {
        id: "cto-monthly",
        title: { en: "Monthly technical leadership", tr: "Aylık teknik liderlik" },
        body: {
          en: "Technology strategy and roadmap, architecture decisions and regular reviews with your team—at a fraction of a full-time executive's cost.",
          tr: "Teknoloji stratejisi ve yol haritası, mimari kararlar ve ekibinizle düzenli incelemeler; tam zamanlı bir yöneticinin maliyetinin çok altında.",
        },
        packageId: "fractional-cto-monthly",
      },
      {
        id: "cto-checkup",
        title: { en: "Technical check-up & due diligence", tr: "Teknik check-up ve due diligence" },
        body: {
          en: "A short, fixed-price look at your product, code and team—or a technical review before an investment or acquisition.",
          tr: "Ürününüze, kodunuza ve ekibinize kısa, sabit fiyatlı bir bakış; ya da yatırım veya satın alma öncesi teknik inceleme.",
        },
        packageId: "technical-checkup",
      },
      {
        id: "cto-team",
        title: { en: "Team building & engineering process", tr: "Ekip kurma ve mühendislik süreçleri" },
        body: {
          en: "Hiring support, team structure, code standards and a delivery process your team can keep running.",
          tr: "İşe alım desteği, ekip yapısı, kod standartları ve ekibinizin sürdürebileceği bir teslimat süreci.",
        },
      },
      {
        id: "cto-mvp",
        title: { en: "CTO-led MVP", tr: "CTO liderliğinde MVP" },
        body: {
          en: "Validating the idea, defining the MVP scope, building it on the right architecture and launching—one accountable lead from the first sketch to a product that can grow.",
          tr: "Fikri doğrulamak, MVP kapsamını tanımlamak, doğru mimariyle geliştirmek ve yayına almak; ilk taslaktan büyüyebilen bir ürüne kadar sorumluluğu üstlenen tek bir lider.",
        },
        packageId: "mvp-development",
      },
      {
        id: "cto-vendors",
        title: { en: "Agency & vendor oversight", tr: "Ajans ve tedarikçi yönetimi" },
        body: {
          en: "Reviewing the work of your outsourced team, setting standards and making build-vs-buy decisions with you.",
          tr: "Dış ekibinizin işini incelemek, standartları belirlemek ve geliştir-ya-da-satın-al kararlarını sizinle birlikte vermek.",
        },
      },
    ],
    forWhom: [
      {
        en: "Non-technical founders building a software product",
        tr: "Yazılım ürünü geliştiren teknik olmayan kurucular",
      },
      {
        en: "Startups preparing to scale or raise investment",
        tr: "Ölçeklenmeye veya yatırım almaya hazırlanan startup'lar",
      },
      {
        en: "Companies whose outsourced or legacy system keeps failing",
        tr: "Dış kaynaklı ya da eski sistemi sürekli sorun çıkaran şirketler",
      },
      {
        en: "Teams that want architecture decisions reviewed by a senior engineer",
        tr: "Mimari kararlarını kıdemli bir mühendise doğrulatmak isteyen ekipler",
      },
    ],
    deliverables: [
      {
        en: "Technology strategy and roadmap aligned with business goals",
        tr: "İş hedefleriyle uyumlu teknoloji stratejisi ve yol haritası",
      },
      {
        en: "Architecture and code reviews with prioritized recommendations",
        tr: "Önceliklendirilmiş önerilerle mimari ve kod incelemeleri",
      },
      {
        en: "Build-vs-buy and vendor decisions",
        tr: "Geliştir ya da satın al ve tedarikçi kararları",
      },
      {
        en: "Hiring support, team structure and engineering processes",
        tr: "İşe alım desteği, ekip yapısı ve mühendislik süreçleri",
      },
      {
        en: "Security-first practices (CEH certified)",
        tr: "Güvenlik öncelikli uygulamalar (CEH sertifikalı)",
      },
    ],
    useCases: [
      {
        en: "Technical due diligence before an investment or acquisition",
        tr: "Yatırım veya satın alma öncesi teknik inceleme (due diligence)",
      },
      {
        en: "Replacing an unreliable outsourced platform with an in-house one",
        tr: "Güvenilmez dış kaynaklı bir platformu şirket içi bir platformla değiştirme",
      },
      {
        en: "Turning a validated idea or a prototype into a production-ready MVP",
        tr: "Doğrulanmış bir fikri veya prototipi canlıya hazır bir MVP'ye dönüştürme",
      },
      {
        en: "Regular architecture reviews as a sparring partner for your tech lead",
        tr: "Teknik liderinize sparring partner olarak düzenli mimari incelemeler",
      },
    ],
    tech: [
      "Software architecture",
      "Cloud strategy",
      "Microservices",
      "Security",
      "Team building",
      "Agile & TDD",
    ],
    relatedCases: ["iot-cloud", "hexagonal", "ai-ops"],
    faq: [
      {
        id: "fractional-cto-what",
        question: {
          en: "What is a fractional CTO?",
          tr: "Fractional CTO nedir?",
        },
        answer: {
          en: "A fractional CTO is an experienced technology leader who works with your company part-time, covering strategy, architecture and team leadership at a fraction of the cost of a full-time executive.",
          tr: "Fractional CTO, şirketinizle yarı zamanlı çalışan deneyimli bir teknoloji lideridir; strateji, mimari ve ekip liderliğini tam zamanlı bir yöneticinin maliyetinin çok altında üstlenir.",
        },
      },
      {
        id: "fractional-cto-team",
        question: {
          en: "Can you work alongside our existing developers or agency?",
          tr: "Mevcut yazılımcılarımız veya ajansımızla birlikte çalışabilir misiniz?",
        },
        answer: {
          en: "Yes. I can work with your in-house developers or an external agency: reviewing work, setting standards and making sure the architecture supports where the business is going.",
          tr: "Evet. Şirket içi yazılımcılarınızla veya dış ajansınızla birlikte çalışabilirim; işleri inceler, standartları belirler ve mimarinin işin gideceği yönü desteklemesini sağlarım.",
        },
      },
      {
        id: "startup-idea",
        question: {
          en: "Can you help if I only have an idea?",
          tr: "Sadece bir fikrim varsa yardımcı olabilir misiniz?",
        },
        answer: {
          en: "Yes. We start with research and validation—who has the problem, how they solve it today and what they would pay for—so you invest in an MVP only when the idea holds up.",
          tr: "Evet. Araştırma ve doğrulamayla başlıyoruz: problemi kim yaşıyor, bugün nasıl çözüyor ve neye para öder. Böylece MVP'ye ancak fikir sağlam çıkarsa yatırım yaparsınız.",
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Derinlemesine alt sayfalar (Bulut, IoT ve mimari alanının parçası)   */
  /* ------------------------------------------------------------------ */
  {
    slug: "iot-platforms",
    role: "deep-dive",
    parent: "cloud-devops",
    icon: "cpu",
    title: {
      en: "IoT Platform Development",
      tr: "IoT Platform Geliştirme",
    },
    tagline: {
      en: "Connect, monitor and manage thousands of devices from one secure platform.",
      tr: "Binlerce cihazı tek ve güvenli bir platformdan bağlayın, izleyin ve yönetin.",
    },
    summary: {
      en: "I build end-to-end IoT platforms: device connectivity over MQTT, real-time monitoring, alarms and remote management, web and mobile apps, and the production-line tooling around them. The fire safety platform I built manages 8 device types for 10,000+ devices and 100,000+ users.",
      tr: "Uçtan uca IoT platformları geliştiriyorum: MQTT ile cihaz bağlantısı, gerçek zamanlı izleme, alarm ve uzaktan yönetim, web ve mobil uygulamalar ve bunların etrafındaki üretim hattı araçları. Yangın güvenliği için kurduğum platform, 10.000+ cihaz ve 100.000+ kullanıcı için 8 farklı cihaz tipini yönetiyor.",
    },
    metaDescription: {
      en: "IoT platform development: MQTT device connectivity, real-time monitoring, alarms, remote management and mobile apps, proven with 10,000+ devices.",
      tr: "IoT platform geliştirme: MQTT cihaz bağlantısı, gerçek zamanlı izleme, alarm, uzaktan yönetim ve mobil uygulamalar. 10.000+ cihazda kanıtlanmış deneyim.",
    },
    forWhom: [
      {
        en: "Hardware manufacturers that need a cloud platform for their devices",
        tr: "Cihazları için bulut platformuna ihtiyaç duyan donanım üreticileri",
      },
      {
        en: "Companies monitoring equipment across many sites",
        tr: "Birçok sahadaki ekipmanı izleyen şirketler",
      },
      {
        en: "Teams whose current IoT backend can't keep up with growth",
        tr: "Mevcut IoT backend'i büyümeye yetişemeyen ekipler",
      },
      {
        en: "Products that need offline or on-premises operation",
        tr: "Çevrimdışı veya şirket içinde çalışması gereken ürünler",
      },
    ],
    deliverables: [
      {
        en: "Device connectivity and messaging (MQTT, RabbitMQ)",
        tr: "Cihaz bağlantısı ve mesajlaşma (MQTT, RabbitMQ)",
      },
      {
        en: "Real-time dashboards, alarms and notifications",
        tr: "Gerçek zamanlı paneller, alarmlar ve bildirimler",
      },
      {
        en: "Remote configuration, firmware and license management",
        tr: "Uzaktan yapılandırma, firmware ve lisans yönetimi",
      },
      {
        en: "Web and mobile apps for customers and technicians",
        tr: "Müşteriler ve teknisyenler için web ve mobil uygulamalar",
      },
      {
        en: "Scalable, secure cloud or on-premises deployment",
        tr: "Ölçeklenebilir ve güvenli bulut veya şirket içi kurulum",
      },
    ],
    useCases: [
      {
        en: "Remote monitoring of fire panels, intruder alarms and cameras",
        tr: "Yangın panelleri, hırsız alarmları ve kameraların uzaktan izlenmesi",
      },
      {
        en: "Production-line tool that flashes the correct firmware by serial number",
        tr: "Seri numarasına göre doğru firmware'i yükleyen üretim hattı aracı",
      },
      {
        en: "Replacing hardware license dongles with an online licensing service",
        tr: "Donanım lisans anahtarlarını (dongle) çevrim içi lisanslama servisiyle değiştirme",
      },
      {
        en: "Live debugging of a single faulty device without affecting the fleet",
        tr: "Filoyu etkilemeden tek bir arızalı cihazda canlı hata ayıklama",
      },
    ],
    tech: ["MQTT", "RabbitMQ", ".NET", "React", "Flutter", "Kubernetes", "GCP", "Redis"],
    relatedCases: ["iot-cloud", "sandbox", "hexagonal"],
    faq: [
      {
        id: "iot-scale",
        question: {
          en: "How many devices can the platform handle?",
          tr: "Platform kaç cihazı kaldırabilir?",
        },
        answer: {
          en: "The architecture scales horizontally. The platform I built runs 10,000+ devices of 8 different types and serves 100,000+ users in production.",
          tr: "Mimari yatay olarak ölçeklenir. Geliştirdiğim platform canlı ortamda 8 farklı tipte 10.000+ cihazı çalıştırıyor ve 100.000+ kullanıcıya hizmet veriyor.",
        },
      },
      {
        id: "iot-offline",
        question: {
          en: "Can the system work without internet access?",
          tr: "Sistem internet erişimi olmadan çalışabilir mi?",
        },
        answer: {
          en: "Yes. With a Hexagonal design, the same business logic can run as a cloud platform or as lightweight on-premises services for closed or air-gapped sites.",
          tr: "Evet. Hexagonal tasarım sayesinde aynı iş mantığı hem bulut platformu hem de kapalı veya internetten izole tesisler için hafif şirket içi servisler olarak çalışabilir.",
        },
      },
    ],
  },
  {
    slug: "microservices-modernization",
    role: "deep-dive",
    parent: "cloud-devops",
    icon: "boxes",
    title: {
      en: "Microservices Architecture & Legacy Modernization",
      tr: "Mikroservis Mimarisi ve Legacy Modernizasyon",
    },
    metaTitle: {
      en: "Microservices & Legacy Modernization",
      tr: "Mikroservis Mimarisi ve Modernizasyon",
    },
    tagline: {
      en: "Turn fragile monoliths into stable, scalable systems—without a risky big-bang rewrite.",
      tr: "Kırılgan monolitleri riskli bir “sıfırdan yazma” yapmadan stabil ve ölçeklenebilir sistemlere dönüştürün.",
    },
    summary: {
      en: "I modernize legacy systems step by step: Hexagonal and event-driven architectures, microservices where they pay off, and performance tuning down to the bare metal. I rebuilt a crashing C/C++ tool in .NET in 45 days and designed one codebase that runs as a 60+ service cloud platform or as 3 lightweight Windows services.",
      tr: "Eski sistemleri adım adım modernize ediyorum: Hexagonal ve olay güdümlü mimariler, fayda sağladığı yerde mikroservisler ve donanıma kadar inen performans optimizasyonu. Sürekli çöken bir C/C++ aracını 45 günde .NET ile yeniden yazdım; aynı kod tabanını hem 60+ servislik bir bulut platformu hem de 3 hafif Windows servisi olarak çalışacak şekilde tasarladım.",
    },
    metaDescription: {
      en: "Microservices architecture and legacy modernization: monolith to microservices, Hexagonal and event-driven design, .NET modernization and performance tuning.",
      tr: "Mikroservis mimarisi ve legacy modernizasyon: monolitten mikroservise geçiş, Hexagonal ve olay güdümlü tasarım, .NET modernizasyonu ve performans iyileştirme.",
    },
    forWhom: [
      {
        en: "Companies stuck with a legacy system nobody wants to touch",
        tr: "Kimsenin dokunmak istemediği eski bir sisteme bağlı kalan şirketler",
      },
      {
        en: "Monoliths that slow down every release and can't scale",
        tr: "Her sürümü yavaşlatan ve ölçeklenemeyen monolitler",
      },
      {
        en: "Products that must run both in the cloud and on-premises",
        tr: "Hem bulutta hem şirket içinde çalışması gereken ürünler",
      },
      {
        en: "Teams planning a rewrite and looking for a safer path",
        tr: "Yeniden yazma planlayan ve daha güvenli bir yol arayan ekipler",
      },
    ],
    deliverables: [
      {
        en: "Architecture assessment and a step-by-step migration roadmap",
        tr: "Mimari değerlendirme ve adım adım geçiş yol haritası",
      },
      {
        en: "Clear domain boundaries and Hexagonal (ports & adapters) design",
        tr: "Net alan sınırları ve Hexagonal (ports & adapters) tasarım",
      },
      {
        en: "Event-driven integration with RabbitMQ or MQTT",
        tr: "RabbitMQ veya MQTT ile olay güdümlü entegrasyon",
      },
      {
        en: "Incremental migration with zero downtime",
        tr: "Kesintisiz, aşamalı geçiş",
      },
      {
        en: "Performance profiling and optimization",
        tr: "Performans profili çıkarma ve optimizasyon",
      },
    ],
    useCases: [
      {
        en: "Splitting a monolith into services one domain at a time",
        tr: "Bir monoliti alan alan servislere ayırma",
      },
      {
        en: "Rewriting unmaintainable C/C++ components in modern .NET",
        tr: "Bakımı imkânsız C/C++ bileşenlerini modern .NET ile yeniden yazma",
      },
      {
        en: "Making one codebase deployable to the cloud and to air-gapped sites",
        tr: "Tek bir kod tabanını hem buluta hem internetten izole tesislere kurulabilir hale getirme",
      },
      {
        en: "Making a slow system fast again on less hardware",
        tr: "Yavaş bir sistemi daha az donanımla yeniden hızlı hale getirme",
      },
    ],
    tech: [".NET / C#", "C / C++", "Hexagonal Architecture", "Microservices", "RabbitMQ", "Redis", "SQLite", "Kubernetes"],
    relatedCases: ["hexagonal", "bare-metal", "enmos-meta"],
    faq: [
      {
        id: "modernization-rewrite",
        question: {
          en: "Should we rewrite our legacy system from scratch?",
          tr: "Eski sistemimizi sıfırdan mı yazmalıyız?",
        },
        answer: {
          en: "Usually not in one go. A step-by-step migration—isolating domains, wrapping them behind clean interfaces and moving them one by one—keeps the business running and reduces risk.",
          tr: "Genellikle tek seferde değil. Alanları ayırıp temiz arayüzlerin arkasına alarak ve tek tek taşıyarak yapılan aşamalı bir geçiş, işin durmamasını sağlar ve riski azaltır.",
        },
      },
      {
        id: "modernization-microservices",
        question: {
          en: "Are microservices always the right choice?",
          tr: "Mikroservis her zaman doğru seçim mi?",
        },
        answer: {
          en: "No. Microservices add operational cost. I recommend them where independent scaling or deployment really pays off, and a well-structured modular monolith where it doesn't.",
          tr: "Hayır. Mikroservisler operasyonel maliyet getirir. Bağımsız ölçeklenme veya deployment gerçekten fayda sağladığında öneriyorum; sağlamadığında iyi yapılandırılmış modüler bir monolit daha doğru olur.",
        },
      },
    ],
  },
];

export function getService(slug: string): ServiceItem | undefined {
  return services.find((service) => service.slug === slug);
}

/**
 * Birlikte çalışma modelleri — /services Markdown sürümü (AI asistanları okur).
 * 11 Kasım 2026: yalnız yapay zekâ dönüşümü; bulut, güvenlik ve fractional CTO gizli hizmetler (data/catalog.ts).
 */
export const engagementModels: StepItem[] = [
  {
    id: "intro-call",
    title: { en: "Intro call (30 min)", tr: "Tanışma görüşmesi (30 dk)" },
    body: {
      en: "We pin down the bottleneck, what it costs you in time and money, and whether my expertise fits your need.",
      tr: "Darboğazı, bunun size zaman ve para olarak maliyetini ve uzmanlığımın ihtiyacınıza uyup uymadığını netleştiririz.",
    },
  },
  {
    id: "workshop-audit",
    title: { en: "AI opportunity scan", tr: "Yapay zekâ fırsat taraması" },
    body: {
      en: "A fixed-price scan for the technical service and help desk. You get a written report, pilot scope and success criteria.",
      tr: "Teknik servis ve help desk için sabit fiyatlı tarama. Yazılı rapor, pilot kapsamı ve başarı ölçütleri alırsınız.",
    },
  },
  {
    id: "project-delivery",
    title: { en: "Pilot and production rollout", tr: "Pilot ve canlı kurulum" },
    body: {
      en: "First a pilot on one channel, then a production rollout once the results are measured: with your own manuals, without replacing your ERP or service software, together with your team or as a complete package.",
      tr: "Önce tek kanalda pilot, sonuç ölçülünce canlı kurulum: kendi kılavuzlarınızla, ERP ve servis yazılımınızı değiştirmeden; ekibinizle birlikte ya da anahtar teslim.",
    },
  },
];

/** Çalışma süreci — /services ve hizmet sayfaları */
export const processSteps: StepItem[] = [
  {
    id: "talk",
    title: { en: "Intro call", tr: "Tanışma görüşmesi" },
    body: {
      en: "We clarify the bottleneck, its impact on time and cost, and your goals—and whether my expertise is the right fit.",
      tr: "Darboğazı, zaman ve maliyete etkisini ve hedeflerinizi netleştiririz; uzmanlığımın doğru eşleşme olup olmadığını açıkça değerlendiririz.",
    },
  },
  {
    id: "plan",
    title: { en: "Review & proposal", tr: "İnceleme ve teklif" },
    body: {
      en: "Usually a fixed-scope review of your systems and options, followed by a clear scope, roadmap and proposal.",
      tr: "Genellikle sistemlerinizin ve seçeneklerin sabit kapsamlı bir incelemesi; ardından net bir kapsam, yol haritası ve teklif.",
    },
  },
  {
    id: "build",
    title: { en: "Build in short iterations", tr: "Kısa iterasyonlarla geliştirme" },
    body: {
      en: "Work happens in short sprints with regular demos, so you see progress early and can steer.",
      tr: "İş, düzenli demolarla kısa sprintlerde ilerler; ilerlemeyi erkenden görür ve yön verebilirsiniz.",
    },
  },
  {
    id: "launch",
    title: { en: "Launch & handover", tr: "Canlıya alma ve devir" },
    body: {
      en: "Production rollout with monitoring, documentation and knowledge transfer to your team.",
      tr: "İzleme, dokümantasyon ve ekibinize bilgi aktarımıyla canlıya geçiş.",
    },
  },
  {
    id: "grow",
    title: { en: "Grow", tr: "Büyüme" },
    body: {
      en: "Optional ongoing support, optimization and advisory as your product and team grow.",
      tr: "Ürününüz ve ekibiniz büyüdükçe isteğe bağlı sürekli destek, optimizasyon ve danışmanlık.",
    },
  },
];

/** /services sayfasının SSS’si (FAQPage JSON-LD ile aynı kaynak) */
export const servicesFaq: FaqItem[] = [
  {
    id: "services-start",
    question: {
      en: "How does working together start?",
      tr: "Birlikte çalışma nasıl başlar?",
    },
    answer: {
      en: "Book a 30-minute intro call. We pin down the problem and its impact; if my expertise fits, we agree on the right first step—usually a fixed-scope review package—and you get a written proposal before any work starts.",
      tr: "30 dakikalık bir tanışma görüşmesi planlayın. Sorunu ve etkisini netleştiririz; uzmanlığım uygunsa doğru ilk adımda (genellikle sabit kapsamlı bir inceleme paketi) anlaşırız ve herhangi bir iş başlamadan önce yazılı bir teklif alırsınız.",
    },
  },
  {
    id: "services-sme",
    question: {
      en: "Do you work with small and medium-sized businesses (SMEs)?",
      tr: "Küçük ve orta ölçekli işletmelerle (KOBİ) çalışıyor musunuz?",
    },
    answer: {
      en: "Yes. Our packages are built for manufacturers and distributors with 10–500 employees and a dealer or service network that want results without building a large in-house AI team.",
      tr: "Evet. Paketlerimiz, büyük bir yapay zekâ ekibi kurmadan sonuç almak isteyen, bayi ve servis ağı olan 10–500 çalışanlı üretici ve distribütörler için tasarlandı.",
    },
  },
  {
    id: "services-language",
    question: {
      en: "Do you work remotely, in English or Turkish?",
      tr: "Uzaktan, Türkçe veya İngilizce çalışıyor musunuz?",
    },
    answer: {
      en: "Yes. Calls and documentation can be in English or Turkish, and work can be done remotely or in person in Istanbul.",
      tr: "Evet. Görüşmeler ve dokümantasyon Türkçe veya İngilizce olabilir; çalışma uzaktan ya da İstanbul'da yüz yüze yürütülebilir.",
    },
  },
  {
    id: "services-pricing",
    question: {
      en: "How are projects priced?",
      tr: "Projeler nasıl fiyatlandırılıyor?",
    },
    answer: {
      en: "Prices are listed on the packages page: the opportunity scan and the pilot have fixed prices, the production rollout a starting price that is finalized in a written proposal after the pilot. You always get a written proposal before any work starts.",
      tr: "Fiyatlar paketler sayfasında yazar: fırsat taraması ve pilot sabit fiyatlı, canlı kurulum başlangıç fiyatlıdır ve pilottan sonra yazılı teklifle netleşir. Herhangi bir iş başlamadan önce her zaman yazılı bir teklif alırsınız.",
    },
  },
];
