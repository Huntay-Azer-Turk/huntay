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
