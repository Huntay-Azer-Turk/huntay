import type { MetricItem } from "./types";

/**
 * Ana sayfa "Rakamlarla kanıt". 11 Kasım 2026: yapay zekâ yolunun rakamları öne alındı; bulut maliyeti (%75)
 * ana sayfadan çıktı (bulut sayfasında ve vaka çalışmasında duruyor) — odak dağılmasın.
 */
export const metrics: MetricItem[] = [
  {
    id: "ai",
    value: 70,
    rangeFrom: 40,
    suffix: "%",
    label: {
      en: "Faster support ticket resolution with AI (across projects)",
      tr: "Yapay zekâyla daha hızlı destek talebi çözümü (projelere göre)",
    },
  },
  {
    id: "support-users",
    value: 100000,
    label: {
      en: "Users supported by an AI support system run by 3 engineers",
      tr: "Kullanıcılı destek yükünü 3 mühendisle taşıyan yapay zekâ destek sistemi",
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
