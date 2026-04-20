import type { Localized, TimelineEntry } from "./types";

export const education: TimelineEntry[] = [
  {
    id: "uast",
    org: {
      en: "University of Applied Science and Technology",
      tr: "Uygulamalı Bilim ve Teknoloji Üniversitesi",
    },
    role: {
      en: "B.Sc., Computer and Information Systems Security / Information Assurance",
      tr: "Lisans, Bilgisayar ve Bilgi Sistemleri Güvenliği / Bilgi Güvencesi",
    },
    period: { en: "2012 – 2015", tr: "2012 – 2015" },
  },
];

/** CV — Certifications & interests */
export const credentials: { certs: Localized[]; interests: Localized } = {
  certs: [
    {
      en: "CEH (Certified Ethical Hacker)",
      tr: "CEH (Certified Ethical Hacker)",
    },
    {
      en: "Software Architectural Design",
      tr: "Yazılım Mimari Tasarımı (Software Architectural Design)",
    },
  ],
  interests: {
    en: "Active CrossFit athlete—high-intensity training and performance discipline.",
    tr: "Aktif CrossFit sporcusu—yüksek yoğunluklu antrenman ve performans disiplini.",
  },
};
