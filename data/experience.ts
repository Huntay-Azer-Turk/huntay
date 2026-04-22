import type { TimelineEntry } from "./types";

/**
 * Tam kariyer haritası: 2009'da algoritmik temellerden günümüzde Cloud-Native + Cognitive AI'ye.
 * Kronoloji: güncel → geçmiş.
 */
export const experience: TimelineEntry[] = [
  {
    id: "teknim-sdsm",
    org: {
      en: "Teknim Elektronik San. Tic. A.Ş.",
      tr: "Teknim Elektronik San. Tic. A.Ş.",
    },
    role: {
      en: "Software & Digital Solutions Manager",
      tr: "Yazılım ve Dijital Çözümler Müdürü",
    },
    period: { en: "Dec 2025 – Present", tr: "Ara 2025 – Günümüz" },
    location: { en: "Istanbul, Turkey · Hybrid", tr: "İstanbul, Türkiye · Hibrit" },
    highlights: [
      {
        en: "Leading the entire IoT and backend infrastructure for fire safety operations—focused on scalability, reliability, and opening up new markets.",
        tr: "Yangın güvenliği operasyonlarındaki tüm IoT ve backend altyapısının liderliğini yapıyorum—ölçeklenebilirlik, güvenilirlik ve yeni pazarlara açılım odaklı.",
      },
      {
        en: "Architected an 'Agentic' support system using LangChain and LangGraph for complex chain-of-thought reasoning, looping, and branching, powered by Python vector databases (RAG).",
        tr: "Karmaşık karar verme süreçleri (chain of thought, looping, branching) için LangChain ve LangGraph kullanarak 'Agentic' bir destek sistemi tasarladım; Python tabanlı vektör veritabanlarıyla (RAG) güçlendirdim."
      },
      {
        en: "Later integrated this autonomous architecture into GCP with Dialogflow CX, Chatwoot, and Meta WhatsApp, achieving roughly 80% faster ticket resolution.",
        tr: "Bu otonom mimariyi daha sonra GCP üzerinde Dialogflow CX, Chatwoot ve Meta WhatsApp ile entegre ederek talep çözüm sürelerinde yaklaşık %80 iyileşme sağladım."
      },
      {
        en: "Future projection: migrating ERP data to BigQuery for AI agent swarms, and conducting R&D on Brain-Computer Interfaces (BCI) using EEG signals and LLMs for neurodivergent individuals.",
        tr: "Gelecek vizyonu: ERP verilerini BigQuery'ye taşıyarak AI ajan sürüleri (swarm) kurmak ve nöroçeşitlilik için EEG sinyallerini LLM'ler ile işleyen Beyin-Bilgisayar Arayüzü (BCI) Ar-Ge'si yapmak."
      }
    ],
  },
  {
    id: "teknim-arch",
    org: {
      en: "Teknim Elektronik San. Tic. A.Ş.",
      tr: "Teknim Elektronik San. Tic. A.Ş.",
    },
    role: {
      en: "Software Architect & Team Lead",
      tr: "Yazılım Mimarı ve Takım Lideri",
    },
    period: { en: "Nov 2020 – Nov 2025", tr: "Kas 2020 – Kas 2025" },
    location: { en: "Istanbul, Turkey", tr: "İstanbul, Türkiye" },
    highlights: [
      {
        en: "Replaced an outsourced and unreliable infrastructure by building a 60-70 microservice ecosystem from scratch on Linux—Docker, Kubernetes, RabbitMQ, MQTT.",
        tr: "Dışarıdan alınan ve sürekli kopan altyapıyı tamamen kapatıp, Linux üzerinde sıfırdan 60-70 mikroservislik bir ekosistem inşa ettim—Docker, Kubernetes, RabbitMQ, MQTT.",
      },
      {
        en: "Single platform serving 8 different device types (fire panels, intruder alarms, cameras, suppression systems) for 10,000+ devices and 100,000+ end users.",
        tr: "Yangın panelleri, hırsız alarmları, kameralar ve söndürme sistemleri dahil 8 farklı cihaz tipini, 10.000+ cihaz ve 100.000+ son kullanıcıya tek platformdan hizmet verecek şekilde birleştirdim.",
      },
      {
        en: "Migrated legacy monoliths to event-driven microservices on GCP—roughly 75% infrastructure cost reduction.",
        tr: "Eski monolit yapıları GCP üzerinde olay güdümlü mikroservislere taşıdım—altyapı maliyetlerinde yaklaşık %75 düşüş.",
      },
      {
        en: "Designed a Hexagonal Architecture that lets the same business logic run as either a 60+ service cloud platform OR as 3 lightweight Windows services for closed/military networks—zero business code change.",
        tr: "Aynı iş mantığının hem 60+ servisli bir bulut platformu hem de kapalı/askeri ağlar için 3 hafif Windows servisi olarak çalışmasını sağlayan Hexagonal mimari tasarladım—iş kodunda tek satır değişiklik yok.",
      },
      {
        en: "Built a one-click sandbox/debug architecture so any faulty device or user could be redirected to a safe environment without disrupting the 10,000+ devices in production.",
        tr: "Production'daki 10.000+ cihazı kesintiye uğratmadan, arıza yapan tek bir cihazı veya kullanıcıyı tek tıkla sandbox/debug ortamına yönlendiren bir mimari kurdum.",
      },
    ],
  },
  {
    id: "enmos",
    org: { en: "Enmos", tr: "Enmos" },
    role: { en: "Software Architect — Dynamic Systems", tr: "Yazılım Mimarı — Dinamik Sistemler" },
    period: { en: "2022", tr: "2022" },
    location: { en: "Istanbul, Turkey", tr: "İstanbul, Türkiye" },
    highlights: [
      {
        en: "Designed a meta-programming layer: a runtime SQL query and reporting engine using .NET, Blazor, React, DevExpress, and NoSQL.",
        tr: ".NET, Blazor, React, DevExpress ve NoSQL kullanarak çalışma zamanında (runtime) SQL sorgusu ve rapor üreten bir meta-programlama katmanı tasarladım."
      },
      {
        en: "Eliminated developer dependency for new reports by implementing dynamic filtering and scheduled cron-jobs for enterprise data analysis.",
        tr: "Dinamik filtreleme ve zamanlanmış görevler (cron-jobs) ekleyerek, kurumsal veri analizi ve yeni rapor ihtiyaçlarında yazılımcı bağımlılığını %100 ortadan kaldırdım."
      }
    ]
  },
  {
    id: "teknim-sse",
    org: {
      en: "Teknim Elektronik San. Tic. A.Ş.",
      tr: "Teknim Elektronik San. Tic. A.Ş.",
    },
    role: { en: "Senior Software Engineer", tr: "Kıdemli Yazılım Mühendisi" },
    period: { en: "Oct 2018 – Oct 2020", tr: "Eki 2018 – Eki 2020" },
    location: { en: "Istanbul, Turkey", tr: "İstanbul, Türkiye" },
    highlights: [
      {
        en: "Replaced an unmaintainable legacy C/C++ fire alarm configuration tool with a clean .NET core in just 45 days using Agile and TDD.",
        tr: "Sürekli çöken ve bakımı imkansız hale gelmiş eski C/C++ yangın alarm konfigürasyon aracını, Agile ve TDD ile sadece 45 günde .NET üzerinde sıfırdan yazdım.",
      },
      {
        en: "Industry-first: removed physical license dongles and shipped an ERP-integrated autonomous licensing service—then launched the first web-based fire monitoring system using React + MQTT.",
        tr: "Sektörde bir ilk: fiziksel donanım anahtarlarını (lisans dongle'ları) kaldırıp ERP entegreli otonom bir lisanslama servisi yazdım. Aynı altyapıyla React + MQTT kullanan ilk web tabanlı yangın izleme sistemini piyasaya sürdük.",
      },
      {
        en: "Built a mini-MES system that automatically reads device serial numbers on the production line and flashes the correct firmware—running for 6 years with zero production errors.",
        tr: "Üretim hattında cihazların seri numarasını okuyup doğru yazılımı (hex) otomatik gömen bir mini-MES sistemi geliştirdim—6 yıldır sıfır üretim hatası ile çalışıyor.",
      },
      {
        en: "Refactored critical C++ components into maintainable .NET Core microservices with Redis and RabbitMQ for high-throughput hardware messaging.",
        tr: "Kritik C++ bileşenlerini sürdürülebilir .NET Core mikroservislerine dönüştürdüm; Redis ve RabbitMQ ile yüksek hacimli donanım mesajlaşması.",
      },
    ],
  },
  {
    id: "kassara",
    org: { en: "Kassara.app", tr: "Kassara.app" },
    role: {
      en: "Founder & Lead Architect",
      tr: "Kurucu ve Baş Mimari",
    },
    period: { en: "2023 – 2025", tr: "2023 – 2025" },
    location: { en: "Istanbul, Turkey", tr: "İstanbul, Türkiye" },
    highlights: [
      {
        en: "Founded a B2C AI product combining computer vision (YOLOv8) with behavioral profiling—architecture, AI infrastructure, and business model entirely my own.",
        tr: "Bilgisayarlı görü (YOLOv8) ve davranış profillemesini birleştiren B2C bir yapay zeka ürünü kurdum—mimarisi, AI altyapısı ve iş modeli tamamen bana ait.",
      },
      {
        en: "Took the product from concept to live production with a 6-person team.",
        tr: "Ürünü 6 kişilik bir ekiple kavramdan canlı prodüksiyona kadar getirdim.",
      },
    ],
  },
  {
    id: "nanomabna",
    org: {
      en: "Nano Mabna Iranian",
      tr: "Nano Mabna Iranian",
    },
    role: {
      en: "Senior Backend Developer & Team Lead",
      tr: "Kıdemli Backend Geliştirici ve Takım Lideri",
    },
    period: { en: "2016 – 2018", tr: "2016 – 2018" },
    location: { en: "Iran", tr: "İran" },
    highlights: [
      {
        en: "Inherited a centrifuge and spectrometer control system that crashed even on i7 + 8GB RAM. Refactored it from the ground up with async pipelines.",
        tr: "i7 işlemci ve 8GB RAM'de bile çöken bir santrifüj ve spektrometre kontrol sistemini devraldım. Asenkron iş hatlarıyla baştan yazdım.",
      },
      {
        en: "True Bare Metal win: 4x throughput increase while dropping the hardware requirement to a single-core Celeron with 1GB RAM.",
        tr: "Gerçek bir Bare Metal başarısı: Sistem hızını 4 katına çıkarırken donanım gereksinimini tek çekirdekli Celeron işlemci ve 1GB RAM seviyesine düşürdüm.",
      },
      {
        en: "Wrote custom algorithms turning raw optical signals into clinical lab results.",
        tr: "Ham optik sinyalleri klinik laboratuvar sonuçlarına dönüştüren özel algoritmalar yazdım.",
      },
    ],
  },
  {
    id: "pooyandegan",
    org: {
      en: "Pooyandegan Rah Saadat",
      tr: "Pooyandegan Rah Saadat",
    },
    role: {
      en: "Software Engineer — Real-Time Critical Care",
      tr: "Yazılım Mühendisi — Gerçek Zamanlı Kritik Bakım",
    },
    period: { en: "2013 – 2016", tr: "2013 – 2016" },
    location: { en: "Iran", tr: "İran" },
    highlights: [
      {
        en: "Built a zero-latency monitoring system for life-critical hardware: 14-channel ECG, SpO2, ventilators—using pure multi-threading and ConcurrentQueue to fully decouple I/O from UI.",
        tr: "Yaşamsal donanımlar (14 kanal EKG, SpO2, ventilatör) için sıfır gecikmeli bir izleme sistemi kurdum—saf multi-threading ve ConcurrentQueue ile I/O ve UI katmanlarını tamamen ayırdım.",
      },
      {
        en: "Synchronized data streams over both TCP/IP and Serial Port for bedside and central multi-patient monitoring.",
        tr: "TCP/IP ve Serial Port üzerinden eş zamanlı veri akışı sağlayarak hem hasta başı hem de merkezi çoklu hasta izleme yapılabilen bir sistem kurdum.",
      },
      {
        en: "Early IoT vision: streamed ambulance data directly into doctors' screens as an early warning system.",
        tr: "Erken dönem IoT vizyonu: Ambulans verisini doğrudan doktorların ekranına düşüren bir erken uyarı sistemi geliştirdim.",
      },
    ],
  },
  {
    id: "early-clinical",
    org: { en: "Independent Project", tr: "Bağımsız Proje" },
    role: {
      en: "Full-Stack Developer — Clinical Automation",
      tr: "Full-Stack Geliştirici — Klinik Otomasyonu",
    },
    period: { en: "2013", tr: "2013" },
    location: { en: "Iran", tr: "İran" },
    highlights: [
      {
        en: "Built a complete electronic health record (EHR), appointment, and finance management system for clinics on .NET + SQL Server.",
        tr: "Klinikler için .NET ve SQL Server üzerinde tam teşekküllü bir elektronik hasta kayıt (EHR), randevu ve finans yönetim sistemi geliştirdim.",
      },
    ],
  },
  {
    id: "early-cyber",
    org: { en: "Cyber Crime Unit Project", tr: "Siber Suçlarla Mücadele Projesi" },
    role: {
      en: "Mobile Threat Intelligence Engineer",
      tr: "Mobil Tehdit İstihbaratı Mühendisi",
    },
    period: { en: "2011", tr: "2011" },
    location: { en: "Iran", tr: "İran" },
    highlights: [
      {
        en: "Designed a low-level Android (Java) intelligence application disguised as a harmless reading app—asynchronously collecting data with root-level access.",
        tr: "Java kullanarak Android üzerinde, zararsız bir kitap uygulamasının arkasına gizlenmiş ve root erişimi olan asenkron bir istihbarat yazılımı tasarladım.",
      },
      {
        en: "Used in active operations by Cyber Crime units. This deep dive into vulnerability and zero-trust thinking still shapes my security architecture today.",
        tr: "Siber Suçlarla Mücadele birimleri tarafından aktif operasyonlarda kullanıldı. Zafiyet (vulnerability) ve zero-trust düşüncesindeki bu derin tecrübe, bugünkü güvenlik mimarimin temelini oluşturuyor.",
      },
    ],
  },
  {
    id: "early-ai",
    org: { en: "Academic Research", tr: "Akademik Araştırma" },
    role: {
      en: "Algorithm Engineer — Heuristic Optimization",
      tr: "Algoritma Mühendisi — Heuristik Optimizasyon",
    },
    period: { en: "2009", tr: "2009" },
    location: { en: "Iran", tr: "İran" },
    highlights: [
      {
        en: "Replaced brute-force search algorithms with custom Genetic Algorithms and Ant Colony Optimization—my first real foothold in applied AI.",
        tr: "Brute-Force arama algoritmalarını yerine sıfırdan yazdığım Genetik Algoritmalar ve Karınca Kolonisi optimizasyonu koydum—uygulamalı yapay zekaya ilk ciddi adımım.",
      },
      {
        en: "Set the foundation for the resource-minimization mindset I still apply to every system I build.",
        tr: "Bugün hâlâ her sisteme uyguladığım kaynak minimizasyonu disiplininin temellerini bu proje attı.",
      },
    ],
  },
];
