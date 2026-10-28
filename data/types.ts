export type Localized = { en: string; tr: string };

export type MetricItem = {
  id: string;
  value: number;
  suffix?: string;
  prefix?: string;
  label: Localized;
};

export type CaseStudy = {
  id: string;
  title: Localized;
  action: Localized;
  result: Localized;
  tags: Localized;
};

export type TechGroup = {
  id: string;
  title: Localized;
  /** Teknoloji adları çoğu dilde aynı; açıklayıcı satırlar EN/TR ayrılır */
  items: Localized[];
};

export type TimelineEntry = {
  id: string;
  org: Localized;
  role: Localized;
  period: Localized;
  location?: Localized;
  highlights?: Localized[];
};

export type FeaturedItem = {
  id: string;
  title: Localized;
  href: string;
  source: string;
};

export type FaqItem = {
  id: string;
  question: Localized;
  answer: Localized;
};

export type ServiceIcon =
  | "bot"
  | "compass"
  | "rocket"
  | "devices"
  | "cloud"
  | "boxes"
  | "cpu"
  | "building";

export type ServiceItem = {
  /** URL parçası: /services/<slug> (EN) ve /tr/services/<slug> (TR) */
  slug: string;
  icon: ServiceIcon;
  title: Localized;
  /** <title> için daha kısa başlık (opsiyonel; yoksa `title` kullanılır) */
  metaTitle?: Localized;
  /** Kartlarda görünen tek cümlelik özet */
  tagline: Localized;
  /** Hizmet sayfasının giriş paragrafı */
  summary: Localized;
  /** <meta name="description"> — ~150 karakter */
  metaDescription: Localized;
  forWhom: Localized[];
  deliverables: Localized[];
  useCases: Localized[];
  tech: string[];
  /** data/caseStudies.ts id’leri — "sahada kanıtlanmış" bölümü */
  relatedCases: string[];
  faq: FaqItem[];
};

export type StepItem = {
  id: string;
  title: Localized;
  body: Localized;
};

/** Gizlilik politikası ve kullanım koşulları gibi hukuki sayfaların bölümleri. */
export type LegalSection = { id: string; title: Localized; body: Localized[] };
