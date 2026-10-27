import type { FaqItem, ServiceItem, StepItem } from "./types";

/**
 * Hizmetler — /services, /services/<slug>, ana sayfa “Hizmetler” bölümü, JSON-LD (Service, OfferCatalog),
 * sitemap ve /llms.txt bu tek kaynaktan beslenir. Yeni hizmet eklemek için bu diziye bir öğe eklemek yeterli.
 * Sayılar (75%, 80%, 10.000+ ...) yalnızca sitede zaten yer alan vaka çalışmalarından alınmıştır.
 */
export const services: ServiceItem[] = [
  {
    slug: "ai-agents",
    icon: "bot",
    title: {
      en: "AI Agents & Automation",
      tr: "Yapay Zeka Ajanları ve Otomasyon",
    },
    tagline: {
      en: "Customer support, sales and operations agents that work 24/7—connected to your own data.",
      tr: "Kendi verilerinize bağlı, 7/24 çalışan müşteri destek, satış ve operasyon ajanları.",
    },
    summary: {
      en: "I design and build production-grade AI agents: assistants that answer customers on WhatsApp and your website, qualify and follow up leads, search your documents and ERP data, and automate repetitive back-office work. They are built on RAG, LangChain/LangGraph and Dialogflow CX, and integrated with the tools you already use.",
      tr: "Canlı ortama hazır yapay zeka ajanları tasarlıyor ve geliştiriyorum: WhatsApp'ta ve web sitenizde müşterilere cevap veren, potansiyel müşterileri değerlendirip takip eden, dokümanlarınızda ve ERP verilerinizde arama yapan, tekrarlayan ofis işlerini otomatikleştiren asistanlar. RAG, LangChain/LangGraph ve Dialogflow CX üzerine kurulur ve zaten kullandığınız araçlara entegre edilir.",
    },
    metaDescription: {
      en: "AI agent development for businesses: WhatsApp and web support agents, sales agents, RAG knowledge assistants and workflow automation, built for production.",
      tr: "İşletmeler için yapay zeka ajanı geliştirme: WhatsApp ve web destek asistanı, satış ajanı, RAG bilgi asistanı ve iş akışı otomasyonu.",
    },
    forWhom: [
      {
        en: "Teams answering the same customer questions every day",
        tr: "Her gün aynı müşteri sorularını cevaplayan ekipler",
      },
      {
        en: "Sales teams losing leads because follow-up is slow",
        tr: "Takip yavaş kaldığı için potansiyel müşteri kaybeden satış ekipleri",
      },
      {
        en: "Companies whose knowledge is scattered across documents, emails and ERP",
        tr: "Bilgisi dokümanlara, e-postalara ve ERP'ye dağılmış şirketler",
      },
      {
        en: "SMEs that want AI results without hiring an AI team",
        tr: "Yapay zeka ekibi kurmadan sonuç almak isteyen KOBİ'ler",
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
        en: "Channels: WhatsApp, website chat, Chatwoot or your CRM",
        tr: "Kanallar: WhatsApp, web sitesi sohbeti, Chatwoot veya CRM'iniz",
      },
      {
        en: "Human handover, guardrails and conversation analytics",
        tr: "İnsana devir, güvenlik sınırları (guardrails) ve konuşma analitiği",
      },
      {
        en: "Deployment, monitoring and continuous improvement",
        tr: "Canlıya alma, izleme ve sürekli iyileştirme",
      },
    ],
    useCases: [
      {
        en: "WhatsApp customer support agent that resolves common requests and hands complex ones to your team",
        tr: "Sık gelen talepleri çözen, karmaşık olanları ekibinize aktaran WhatsApp müşteri destek ajanı",
      },
      {
        en: "Sales agent that answers product questions, qualifies leads and books meetings",
        tr: "Ürün sorularını cevaplayan, potansiyel müşterileri değerlendiren ve toplantı ayarlayan satış ajanı",
      },
      {
        en: "Internal assistant that answers staff questions from manuals, policies and technical docs",
        tr: "Çalışanların sorularını kılavuzlardan, prosedürlerden ve teknik dokümanlardan cevaplayan şirket içi asistan",
      },
      {
        en: "Operations agent that reads ERP data, prepares reports and flags anomalies",
        tr: "ERP verilerini okuyup rapor hazırlayan ve anormallikleri işaretleyen operasyon ajanı",
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
      "Python",
      "GCP",
    ],
    relatedCases: ["ai-ops"],
    faq: [
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
          en: "No. It handles repetitive questions and routes complex or sensitive cases to people with full context. In a previous project, this approach made ticket resolution about 80% faster.",
          tr: "Hayır. Tekrarlayan soruları üstlenir, karmaşık veya hassas durumları tüm bağlamıyla insanlara aktarır. Daha önceki bir projede bu yaklaşım talep çözüm süresini yaklaşık %80 kısalttı.",
        },
      },
    ],
  },
  {
    slug: "fractional-cto",
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
      en: "I act as your part-time CTO or technical advisor: setting technology strategy, reviewing architecture, choosing vendors and tools, hiring and coaching engineers, and making sure the product can scale. Ideal for founders and executives who need experienced judgment on technical decisions.",
      tr: "Yarı zamanlı CTO'nuz veya teknik danışmanınız olarak çalışıyorum: teknoloji stratejisini belirlemek, mimariyi incelemek, tedarikçi ve araç seçmek, mühendis işe alımı ve koçluğu yapmak, ürünün ölçeklenebilmesini sağlamak. Teknik kararlarda deneyimli bir bakışa ihtiyaç duyan kurucular ve yöneticiler için ideal.",
    },
    metaDescription: {
      en: "Fractional CTO and technical consulting for startups and SMEs: technology strategy, architecture reviews, team building and scaling. 13+ years of experience.",
      tr: "Startup ve KOBİ'ler için fractional CTO ve teknik danışmanlık: teknoloji stratejisi, mimari inceleme, ekip kurma ve ölçeklenme. 13+ yıllık deneyim.",
    },
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
        en: "Setting up an engineering team and delivery process from scratch",
        tr: "Sıfırdan mühendislik ekibi ve teslimat süreci kurma",
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
    relatedCases: ["iot-cloud", "hexagonal"],
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
    ],
  },
  {
    slug: "startup-product-development",
    icon: "rocket",
    title: {
      en: "Startup Product Development: Idea to Scale",
      tr: "Startup Ürün Geliştirme: Fikirden Ölçeklenmeye",
    },
    metaTitle: {
      en: "Startup Product Development & MVP",
      tr: "Startup Ürün Geliştirme ve MVP",
    },
    tagline: {
      en: "From idea validation and market research to MVP, launch and growth—end to end.",
      tr: "Fikir doğrulama ve pazar araştırmasından MVP'ye, lansmana ve büyümeye; uçtan uca.",
    },
    summary: {
      en: "I help founders turn an idea into a working, scalable product step by step: validating the problem and the market, defining the MVP, building it on the right architecture, launching, and iterating on real user data. One partner from the first sketch to a product that can grow.",
      tr: "Kuruculara bir fikri adım adım çalışan ve ölçeklenebilen bir ürüne dönüştürmelerinde yardımcı oluyorum: problemi ve pazarı doğrulamak, MVP'yi tanımlamak, doğru mimariyle geliştirmek, lansman yapmak ve gerçek kullanıcı verisiyle iyileştirmek. İlk taslaktan büyüyebilen bir ürüne kadar tek bir partner.",
    },
    metaDescription: {
      en: "End-to-end startup development: idea validation, market research, MVP development, launch and growth. Turn your idea into a scalable product.",
      tr: "Uçtan uca startup geliştirme: fikir doğrulama, pazar araştırması, MVP geliştirme, lansman ve büyüme. Fikrinizi ölçeklenebilir bir ürüne dönüştürün.",
    },
    forWhom: [
      {
        en: "Founders with an idea who want to validate it before investing heavily",
        tr: "Büyük yatırım yapmadan önce fikrini doğrulamak isteyen kurucular",
      },
      {
        en: "Early-stage startups that need an MVP built right the first time",
        tr: "MVP'sini ilk seferde doğru kurmak isteyen erken aşama startup'lar",
      },
      {
        en: "Startups with traction whose product is struggling to scale",
        tr: "Kullanıcı kazanmış ama ürünü ölçeklenmekte zorlanan startup'lar",
      },
      {
        en: "Corporate teams launching a new digital product",
        tr: "Yeni bir dijital ürün çıkaran kurumsal ekipler",
      },
    ],
    deliverables: [
      {
        en: "Problem, market and competitor research",
        tr: "Problem, pazar ve rakip araştırması",
      },
      {
        en: "Product definition: MVP scope, user flows and success metrics",
        tr: "Ürün tanımı: MVP kapsamı, kullanıcı akışları ve başarı metrikleri",
      },
      {
        en: "MVP development (web, mobile, backend and cloud)",
        tr: "MVP geliştirme (web, mobil, backend ve bulut)",
      },
      {
        en: "Launch plan, analytics and feedback loops",
        tr: "Lansman planı, analitik ve geri bildirim döngüleri",
      },
      {
        en: "Growth iterations on a scalable architecture",
        tr: "Ölçeklenebilir mimari üzerinde büyüme iterasyonları",
      },
    ],
    useCases: [
      {
        en: "Validating a SaaS idea with a clickable prototype and a landing page",
        tr: "Bir SaaS fikrini tıklanabilir prototip ve açılış sayfasıyla doğrulama",
      },
      {
        en: "Building a marketplace or booking platform MVP",
        tr: "Pazaryeri veya rezervasyon platformu MVP'si geliştirme",
      },
      {
        en: "Turning a prototype into a production-ready product",
        tr: "Bir prototipi canlıya hazır ürüne dönüştürme",
      },
      {
        en: "Adding AI features that make the product stand out",
        tr: "Ürünü öne çıkaran yapay zeka özellikleri ekleme",
      },
    ],
    tech: ["Next.js", "React", "Flutter", ".NET", "Python", "SQL / NoSQL", "GCP", "Kubernetes"],
    relatedCases: ["iot-cloud", "ai-ops"],
    faq: [
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
      {
        id: "startup-growth",
        question: {
          en: "Do you only build, or also help with growth?",
          tr: "Sadece geliştirme mi yapıyorsunuz, büyümede de destek oluyor musunuz?",
        },
        answer: {
          en: "Both. After launch I help set up analytics, interpret user data, prioritize the roadmap and keep the architecture ready for growth.",
          tr: "İkisi de. Lansmandan sonra analitiği kurmaya, kullanıcı verisini yorumlamaya, yol haritasını önceliklendirmeye ve mimariyi büyümeye hazır tutmaya yardımcı oluyorum.",
        },
      },
    ],
  },
  {
    slug: "web-mobile-development",
    icon: "devices",
    title: {
      en: "Web & Mobile App Development",
      tr: "Web ve Mobil Uygulama Geliştirme",
    },
    tagline: {
      en: "Fast, SEO-ready websites and cross-platform mobile apps with solid backends.",
      tr: "Hızlı, SEO uyumlu web siteleri ve sağlam backend'li çok platformlu mobil uygulamalar.",
    },
    summary: {
      en: "I build modern websites, web applications and iOS/Android apps: Next.js and React on the web, Flutter for mobile, and .NET or Python backends in the cloud. Performance, security and search visibility are built in from day one, not added later.",
      tr: "Modern web siteleri, web uygulamaları ve iOS/Android uygulamaları geliştiriyorum: web'de Next.js ve React, mobilde Flutter, bulutta .NET veya Python backend'ler. Performans, güvenlik ve arama görünürlüğü sonradan eklenmez, ilk günden tasarımın parçasıdır.",
    },
    metaDescription: {
      en: "Web and mobile app development: Next.js websites and web apps, Flutter iOS and Android apps and cloud backends that are fast, secure and SEO-ready.",
      tr: "Web ve mobil uygulama geliştirme: Next.js web siteleri ve web uygulamaları, Flutter ile iOS ve Android uygulamaları ve bulut backend'leri.",
    },
    forWhom: [
      {
        en: "Businesses that need a fast, professional website that ranks",
        tr: "Hızlı, profesyonel ve aramalarda üst sıralara çıkan bir web sitesine ihtiyaç duyan işletmeler",
      },
      {
        en: "Companies digitizing a service with a customer portal or app",
        tr: "Bir hizmetini müşteri portalı veya uygulamayla dijitalleştiren şirketler",
      },
      {
        en: "Startups that need web and mobile from one product strategy",
        tr: "Web ve mobili tek bir ürün stratejisiyle isteyen startup'lar",
      },
      {
        en: "Teams replacing a slow or outdated application",
        tr: "Yavaş veya eskimiş bir uygulamayı yenileyen ekipler",
      },
    ],
    deliverables: [
      {
        en: "User flows and a clean, responsive interface",
        tr: "Kullanıcı akışları ve sade, duyarlı (responsive) arayüz",
      },
      {
        en: "Web apps with Next.js/React or Blazor",
        tr: "Next.js/React veya Blazor ile web uygulamaları",
      },
      {
        en: "iOS and Android apps with Flutter",
        tr: "Flutter ile iOS ve Android uygulamaları",
      },
      {
        en: "APIs, admin panels and integrations",
        tr: "API'ler, yönetim panelleri ve entegrasyonlar",
      },
      {
        en: "Technical SEO, performance and analytics setup",
        tr: "Teknik SEO, performans ve analitik kurulumu",
      },
    ],
    useCases: [
      {
        en: "Corporate website with bilingual content and strong SEO",
        tr: "Çok dilli içerik ve güçlü SEO'ya sahip kurumsal web sitesi",
      },
      {
        en: "Customer portal for orders, tickets or device monitoring",
        tr: "Sipariş, destek talebi veya cihaz izleme için müşteri portalı",
      },
      {
        en: "Booking, membership or e-commerce application",
        tr: "Rezervasyon, üyelik veya e-ticaret uygulaması",
      },
      {
        en: "Mobile companion app for an IoT or SaaS product",
        tr: "IoT veya SaaS ürünü için mobil yardımcı uygulama",
      },
    ],
    tech: ["Next.js", "React", "TypeScript", "Flutter", "Blazor", ".NET", "Python", "SQL / NoSQL"],
    relatedCases: ["iot-cloud", "enmos-meta"],
    faq: [
      {
        id: "web-fullstack",
        question: {
          en: "Do you build both the website and the backend?",
          tr: "Hem web sitesini hem backend'i siz mi geliştiriyorsunuz?",
        },
        answer: {
          en: "Yes: frontend, backend, database, cloud deployment and integrations, so you have one accountable partner for the whole product.",
          tr: "Evet; ön yüz, backend, veritabanı, bulut kurulumu ve entegrasyonlar dahil. Böylece ürünün tamamından sorumlu tek bir partneriniz olur.",
        },
      },
      {
        id: "web-seo",
        question: {
          en: "Will my website be optimized for Google and AI search?",
          tr: "Web sitem Google ve yapay zeka aramaları için optimize edilecek mi?",
        },
        answer: {
          en: "Yes. Sites are built with technical SEO, structured data, fast loading and a clean multilingual setup, so search engines and AI assistants can understand and recommend them.",
          tr: "Evet. Siteler teknik SEO, yapılandırılmış veri, hızlı yükleme ve temiz çok dilli yapı ile kurulur; böylece arama motorları ve yapay zeka asistanları onları anlayıp önerebilir.",
        },
      },
    ],
  },
  {
    slug: "cloud-devops",
    icon: "cloud",
    title: {
      en: "Cloud, DevOps & Cost Optimization",
      tr: "Bulut, DevOps ve Maliyet Optimizasyonu",
    },
    tagline: {
      en: "Reliable infrastructure, automated deployments and a lower cloud bill.",
      tr: "Güvenilir altyapı, otomatik deployment ve daha düşük bulut faturası.",
    },
    summary: {
      en: "I design and run cloud infrastructure that is reliable and affordable: Kubernetes and Docker, CI/CD pipelines, infrastructure as code with Terraform, monitoring and zero-downtime releases. In one of my projects, migrating legacy monoliths to event-driven microservices on GCP cut infrastructure costs by roughly 75%.",
      tr: "Güvenilir ve uygun maliyetli bulut altyapıları tasarlıyor ve işletiyorum: Kubernetes ve Docker, CI/CD hatları, Terraform ile kod olarak altyapı, izleme ve kesintisiz sürüm çıkarma. Bir projemde eski monolitleri GCP üzerinde olay güdümlü mikroservislere taşımak altyapı maliyetini yaklaşık %75 düşürdü.",
    },
    metaDescription: {
      en: "DevOps and cloud consulting: Kubernetes, CI/CD, Terraform, monitoring and cloud cost optimization, with up to 75% lower infrastructure costs in practice.",
      tr: "DevOps ve bulut danışmanlığı: Kubernetes, CI/CD, Terraform, izleme ve bulut maliyet optimizasyonu. Altyapı maliyetlerinde %75'e varan tasarruf.",
    },
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
        en: "Products that need high availability and zero-downtime deploys",
        tr: "Yüksek erişilebilirlik ve kesintisiz deployment gerektiren ürünler",
      },
      {
        en: "Organizations moving between on-premises and the cloud",
        tr: "Şirket içi sunucular ile bulut arasında geçiş yapan kurumlar",
      },
    ],
    deliverables: [
      {
        en: "Cloud cost and architecture audit with quick wins",
        tr: "Hızlı kazanımlar içeren bulut maliyet ve mimari denetimi",
      },
      {
        en: "Kubernetes/Docker platform and infrastructure as code (Terraform)",
        tr: "Kubernetes/Docker platformu ve kod olarak altyapı (Terraform)",
      },
      {
        en: "CI/CD pipelines with automated quality gates",
        tr: "Otomatik kalite kontrollü CI/CD hatları",
      },
      {
        en: "Monitoring, logging and alerting",
        tr: "İzleme, loglama ve alarm",
      },
      {
        en: "Security hardening and disaster-recovery planning",
        tr: "Güvenlik sıkılaştırma ve felaket kurtarma planı",
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
        en: "Debugging production safely with sandbox routing",
        tr: "Sandbox yönlendirmesiyle canlı ortamda güvenli hata ayıklama",
      },
    ],
    tech: ["GCP", "Kubernetes", "Docker", "Terraform", "CI/CD", "RabbitMQ", "MQTT", "Linux"],
    relatedCases: ["iot-cloud", "hexagonal", "sandbox"],
    faq: [
      {
        id: "cloud-savings",
        question: {
          en: "How much can we save on cloud costs?",
          tr: "Bulut maliyetlerinde ne kadar tasarruf edebiliriz?",
        },
        answer: {
          en: "It depends on your current setup. Savings usually come from right-sizing, removing idle resources and better architecture; in one migration to event-driven microservices on GCP, infrastructure costs dropped by roughly 75%. An audit shows your realistic potential.",
          tr: "Mevcut yapınıza bağlı. Tasarruf genellikle doğru boyutlandırma, atıl kaynakları kaldırma ve daha iyi mimariden gelir; GCP'de olay güdümlü mikroservislere yapılan bir geçişte altyapı maliyeti yaklaşık %75 düştü. Bir denetim sizin için gerçekçi potansiyeli gösterir.",
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
    ],
  },
  {
    slug: "microservices-modernization",
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
  {
    slug: "iot-platforms",
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
    slug: "digital-transformation",
    icon: "building",
    title: {
      en: "Digital Transformation for SMEs",
      tr: "KOBİ'ler için Dijital Dönüşüm",
    },
    tagline: {
      en: "Digitize processes, connect your tools and get real-time reports—step by step.",
      tr: "Süreçlerinizi dijitalleştirin, araçlarınızı birbirine bağlayın ve anlık raporlara ulaşın; adım adım.",
    },
    summary: {
      en: "I help small and medium-sized businesses replace manual work with connected digital processes: ERP, CRM and e-commerce integrations, automated reporting, workflow automation and practical AI adoption. We start where the impact is highest and build a roadmap your team can actually follow.",
      tr: "Küçük ve orta ölçekli işletmelerin manuel işleri birbirine bağlı dijital süreçlerle değiştirmesine yardımcı oluyorum: ERP, CRM ve e-ticaret entegrasyonları, otomatik raporlama, iş akışı otomasyonu ve pratik yapay zeka kullanımı. Etkisi en yüksek yerden başlıyor ve ekibinizin gerçekten uygulayabileceği bir yol haritası çıkarıyoruz.",
    },
    metaDescription: {
      en: "Digital transformation for SMEs: process automation, ERP, CRM and e-commerce integrations, automated reporting and practical AI adoption with a clear roadmap.",
      tr: "KOBİ'ler için dijital dönüşüm: süreç otomasyonu, ERP, CRM ve e-ticaret entegrasyonları, otomatik raporlama ve pratik yapay zeka kullanımı.",
    },
    forWhom: [
      {
        en: "SMEs running on spreadsheets, email and manual data entry",
        tr: "Excel, e-posta ve elle veri girişiyle yürüyen KOBİ'ler",
      },
      {
        en: "Companies whose systems don't talk to each other",
        tr: "Sistemleri birbiriyle konuşmayan şirketler",
      },
      {
        en: "Managers who wait days for reports that should be instant",
        tr: "Anlık olması gereken raporları günlerce bekleyen yöneticiler",
      },
      {
        en: "Businesses selling on marketplaces and juggling stock and orders by hand",
        tr: "Pazaryerlerinde satış yapıp stok ve siparişleri elle takip eden işletmeler",
      },
    ],
    deliverables: [
      {
        en: "Process analysis and a prioritized digitalization roadmap",
        tr: "Süreç analizi ve önceliklendirilmiş dijitalleşme yol haritası",
      },
      {
        en: "ERP, CRM, e-commerce and marketplace integrations",
        tr: "ERP, CRM, e-ticaret ve pazaryeri entegrasyonları",
      },
      {
        en: "Automated reports and dashboards with self-service filtering",
        tr: "Self-servis filtrelemeli otomatik raporlar ve paneller",
      },
      {
        en: "Workflow automation and AI assistants for daily tasks",
        tr: "Günlük işler için iş akışı otomasyonu ve yapay zeka asistanları",
      },
      {
        en: "Training and handover so your team owns the result",
        tr: "Sonucun sahibi ekibiniz olsun diye eğitim ve devir teslim",
      },
    ],
    useCases: [
      {
        en: "Syncing orders and stock between your online store, marketplaces such as Trendyol, Hepsiburada or Amazon, and your ERP",
        tr: "Online mağazanız, Trendyol, Hepsiburada veya Amazon gibi pazaryerleri ve ERP'niz arasında sipariş ve stok senkronizasyonu",
      },
      {
        en: "Replacing manual reports with scheduled, self-service dashboards",
        tr: "Manuel raporları zamanlanmış, self-servis panellerle değiştirme",
      },
      {
        en: "Automating quotes, invoices or approval workflows",
        tr: "Teklif, fatura veya onay süreçlerini otomatikleştirme",
      },
      {
        en: "Rolling out an AI assistant for customer messages on WhatsApp",
        tr: "WhatsApp'taki müşteri mesajları için yapay zeka asistanı devreye alma",
      },
    ],
    tech: [".NET", "Python", "React", "Blazor", "SQL / NoSQL", "BigQuery", "REST APIs", "AI agents"],
    relatedCases: ["enmos-meta", "ai-ops"],
    faq: [
      {
        id: "sme-start",
        question: {
          en: "Where should an SME start with digital transformation?",
          tr: "KOBİ'ler dijital dönüşüme nereden başlamalı?",
        },
        answer: {
          en: "With the process that costs the most time or money today—often reporting, order handling or customer messages. A short analysis identifies quick wins first, so early results build momentum for the next steps.",
          tr: "Bugün en çok zaman veya para kaybettiren süreçten; çoğu zaman raporlama, sipariş yönetimi veya müşteri mesajları. Kısa bir analiz önce hızlı kazanımları belirler; böylece ilk sonuçlar sonraki adımlar için ivme sağlar.",
        },
      },
      {
        id: "sme-replace",
        question: {
          en: "Do we need to replace our existing software?",
          tr: "Mevcut yazılımlarımızı değiştirmemiz gerekir mi?",
        },
        answer: {
          en: "Rarely. Most of the value comes from connecting the tools you already use—ERP, accounting, e-commerce, CRM—and automating the work between them.",
          tr: "Nadiren. Değerin çoğu zaten kullandığınız araçları (ERP, muhasebe, e-ticaret, CRM) birbirine bağlamaktan ve aralarındaki işi otomatikleştirmekten gelir.",
        },
      },
    ],
  },
];

export function getService(slug: string): ServiceItem | undefined {
  return services.find((service) => service.slug === slug);
}

/** Birlikte çalışma modelleri — /services sayfası */
export const engagementModels: StepItem[] = [
  {
    id: "intro-call",
    title: { en: "Intro call (30 min)", tr: "Tanışma görüşmesi (30 dk)" },
    body: {
      en: "A short video call to understand your situation and see whether, and how, I can help.",
      tr: "Durumunuzu anlamak ve yardımcı olup olamayacağımı, nasıl olabileceğimi görmek için kısa bir görüntülü görüşme.",
    },
  },
  {
    id: "workshop-audit",
    title: { en: "Workshop or audit", tr: "Atölye veya denetim" },
    body: {
      en: "Fixed-scope deep dives: AI opportunity workshop, architecture review, cloud cost audit or MVP scoping. You get a written report and a prioritized roadmap.",
      tr: "Kapsamı belli derinlemesine çalışmalar: yapay zeka fırsat atölyesi, mimari inceleme, bulut maliyet denetimi veya MVP kapsamlandırma. Yazılı bir rapor ve önceliklendirilmiş bir yol haritası alırsınız.",
    },
  },
  {
    id: "project-delivery",
    title: { en: "Project delivery", tr: "Proje teslimi" },
    body: {
      en: "End-to-end design and build: AI agents, web and mobile apps, cloud platforms or IoT systems, delivered together with your team or as a complete package.",
      tr: "Uçtan uca tasarım ve geliştirme: yapay zeka ajanları, web ve mobil uygulamalar, bulut platformları veya IoT sistemleri; ekibinizle birlikte ya da anahtar teslim.",
    },
  },
  {
    id: "fractional-advisory",
    title: { en: "Fractional CTO & advisory", tr: "Fractional CTO ve danışmanlık" },
    body: {
      en: "Ongoing, part-time technical leadership: strategy, architecture, hiring and team coaching.",
      tr: "Sürekli, yarı zamanlı teknik liderlik: strateji, mimari, işe alım ve ekip koçluğu.",
    },
  },
];

/** Çalışma süreci — /services ve hizmet sayfaları */
export const processSteps: StepItem[] = [
  {
    id: "talk",
    title: { en: "Intro call", tr: "Tanışma görüşmesi" },
    body: {
      en: "We talk about your goals, constraints and timeline. You get an honest first assessment.",
      tr: "Hedeflerinizi, kısıtlarınızı ve zamanlamanızı konuşuruz. Dürüst bir ilk değerlendirme alırsınız.",
    },
  },
  {
    id: "plan",
    title: { en: "Discovery & proposal", tr: "Analiz ve teklif" },
    body: {
      en: "I analyse the problem, your existing systems and the options, then send a clear scope, roadmap and proposal.",
      tr: "Problemi, mevcut sistemlerinizi ve seçenekleri analiz eder; net bir kapsam, yol haritası ve teklif gönderirim.",
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
      en: "Book a 30-minute intro call. We discuss your goals and constraints; afterwards I send a short summary with a suggested approach and, if it makes sense, a proposal.",
      tr: "30 dakikalık bir tanışma görüşmesi planlayın. Hedeflerinizi ve kısıtlarınızı konuşuruz; ardından önerdiğim yaklaşımı içeren kısa bir özet ve uygunsa bir teklif gönderirim.",
    },
  },
  {
    id: "services-sme",
    question: {
      en: "Do you work with small and medium-sized businesses (SMEs)?",
      tr: "Küçük ve orta ölçekli işletmelerle (KOBİ) çalışıyor musunuz?",
    },
    answer: {
      en: "Yes. Many services—AI customer support and sales agents, process automation, integrations and websites—are designed for SMEs that need results without building a large in-house team.",
      tr: "Evet. Yapay zeka destekli müşteri hizmetleri ve satış ajanları, süreç otomasyonu, entegrasyonlar ve web siteleri gibi birçok hizmet, büyük bir ekip kurmadan sonuç almak isteyen KOBİ'ler için tasarlandı.",
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
      en: "It depends on the scope: workshops and audits have a fixed price, project delivery is quoted after discovery, and fractional CTO work is a monthly arrangement. You always get a written proposal before any work starts.",
      tr: "Kapsama göre değişir: atölye ve denetimler sabit fiyatlıdır, proje teslimi analizden sonra fiyatlandırılır, fractional CTO çalışması aylık bir düzenlemedir. Herhangi bir iş başlamadan önce her zaman yazılı bir teklif alırsınız.",
    },
  },
];
