import type { MetricItem } from "./types";

/**
 * Ana sayfa "Rakamlarla kanıt". 11 Kasım 2026: yapay zekâ yolunun rakamları öne alındı; bulut maliyeti (%75)
 * ana sayfadan çıktı (bulut sayfasında ve vaka çalışmasında duruyor) — odak dağılmasın.
 */
export const metrics: MetricItem[] = [
  {
    // 11 Kasım 2026, Huntay: oranlar her yerde aynı set — iş yükü/yanıt süreleri %30–70, memnuniyet %15–40, maliyet/satış %10–30.
    id: "ai",
    value: 70,
    rangeFrom: 30,
    suffix: "%",
    label: {
      en: "Improvement in help desk workload and response times (across projects)",
      tr: "Help desk iş yükünde ve yanıt sürelerinde iyileşme (projelere göre)",
    },
  },
  {
    // 11 Kasım 2026, Huntay: "3 mühendisle 100.000 kullanıcı" yanlıştı; yerine müşteri memnuniyeti artışı (Huntay'ın aralığı).
    id: "satisfaction",
    value: 40,
    rangeFrom: 15,
    suffix: "%",
    label: {
      en: "Increase in customer satisfaction (across projects)",
      tr: "Müşteri memnuniyetinde artış (projelere göre)",
    },
  },
  {
    id: "costs-sales",
    value: 30,
    rangeFrom: 10,
    suffix: "%",
    label: {
      en: "Improvement in costs and sales (across projects)",
      tr: "Maliyet ve satışlarda iyileşme (projelere göre)",
    },
  },
  {
    id: "devices",
    value: 10000,
    suffix: "+",
    label: {
      en: "Field devices connected to a single platform",
      tr: "Sahadaki cihaz tek platformdan yönetiliyor",
    },
  },
  {
    id: "years",
    value: 13,
    suffix: "+",
    label: {
      en: "Years in systems architecture and engineering leadership",
      tr: "Yıl sistem mimarisi ve mühendislik liderliği",
    },
  },
];

/** Sitede gösterilen rakamlar (11 Kasım 2026, tek odak): saha cihazı sayısı (IoT) çıktı. */
export const siteMetrics: MetricItem[] = metrics.filter((item) => item.id !== "devices");
