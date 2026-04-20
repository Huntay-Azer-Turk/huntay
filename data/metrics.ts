import type { MetricItem } from "./types";

export const metrics: MetricItem[] = [
  {
    id: "years",
    value: 13,
    suffix: "+",
    label: {
      en: "Years engineering & architecture leadership",
      tr: "Yıl mühendislik ve mimari liderlik",
    },
  },
  {
    id: "devices",
    value: 10000,
    suffix: "+",
    label: {
      en: "Active devices under IoT-style operations",
      tr: "Aktif cihaz (IoT operasyon ölçeği)",
    },
  },
  {
    id: "cloud",
    value: 75,
    prefix: "",
    suffix: "%",
    label: {
      en: "Cloud cost reduction (up to)",
      tr: "Bulut maliyet tasarrufu (en fazla)",
    },
  },
  {
    id: "ai",
    value: 100,
    suffix: "%",
    label: {
      en: "Autonomous AI support ecosystems delivered",
      tr: "Otonom yapay zeka destek ekosistemleri",
    },
  },
];
