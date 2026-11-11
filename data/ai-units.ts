import type { Localized, ServiceOffering } from "./types";

/**
 * Yapay zekâ dönüşümünün birimleri (11 Kasım 2026, Huntay: "odak tamamen AI transformation; her birim ayrı paket").
 * Tek kaynak: hizmetler sayfası, ai-agents hizmet sayfası (offerings) ve ana sayfadaki "Sonraki adımlar" buradan okur.
 * İlk birim (teknik servis ve help desk) öne çıkan tekliftir: fırsat taraması → pilot (ai-agent-pilot) → canlı kurulum.
 * Diğer birimler arka planda: hazır paket ve fiyat yok (Huntay, 11 Kasım: "paketlerde sadece teknik servis kalsın");
 * help desk'te sonuç alındıktan sonra kapsam ve fiyat ön görüşmede belirlenir. packageId yalnız öne çıkan birimde.
 */
export const LEAD_UNIT_ID = "support-helpdesk";
export type AiUnitIcon =
  | "headset"
  | "scan"
  | "factory"
  | "cart"
  | "megaphone"
  | "radar"
  | "truck"
  | "shield";

export type AiUnit = {
  id: string;
  packageId?: string;
  icon: AiUnitIcon;
  title: Localized;
  body: Localized;
};

export const aiUnits: AiUnit[] = [
  {
    id: "support-helpdesk",
    packageId: "ai-agent-pilot",
    icon: "headset",
    title: { en: "Technical service & help desk assistant", tr: "Teknik servis ve help desk asistanı" },
    body: {
      en: "Answers fault, installation and usage questions from dealers, technicians and users from your own manuals, and opens a ticket and hands over to your team when needed. Across different projects, help desk workload and response times improved by 30–70%.",
      tr: "Bayilerin, teknisyenlerin ve kullanıcıların arıza, kurulum ve kullanım sorularını kendi kılavuzlarınızla otomatik yanıtlar; gerekince arıza kaydı açıp ekibinize devreder. Farklı projelerde help desk iş yükü ve yanıt süreleri %30–70 iyileşti.",
    },
  },
  {
    id: "quality",
    icon: "scan",
    title: { en: "Quality control automation & efficiency", tr: "Kalite kontrol otomasyonu ve verimlilik" },
    body: {
      en: "Catches defects earlier from image, measurement and complaint data, shortens inspection time and reduces scrap. We first check that your data and cameras make it feasible.",
      tr: "Görüntü, ölçüm ve şikâyet verisinden hatayı daha erken yakalar, kontrol süresini kısaltır, fireyi azaltır. Önce veri ve kameraların bunu mümkün kılıp kılmadığına bakılır.",
    },
  },
  {
    id: "production",
    icon: "factory",
    title: { en: "Production efficiency & maintenance", tr: "Üretim verimliliği ve bakım" },
    body: {
      en: "Finds where losses come from in downtime, scrap and maintenance data; AI that warns about failures in advance and helps plan maintenance.",
      tr: "Duruş, fire ve bakım verisinden kayıpların kaynağını bulur; arızayı önceden haber veren ve bakımı planlamaya yardım eden yapay zekâ.",
    },
  },
  {
    id: "sales",
    icon: "cart",
    title: { en: "Sales assistant", tr: "Satış asistanı" },
    body: {
      en: "Handles inquiries from web, WhatsApp and email, answers price and stock questions, speeds up quotes and follow-up, and hands ready buyers to your sales team.",
      tr: "Web, WhatsApp ve e-postadan gelen talepleri karşılar, fiyat ve stok sorularını yanıtlar, teklifi ve takibi hızlandırır, hazır müşteriyi satış ekibinize aktarır.",
    },
  },
  {
    id: "marketing",
    icon: "megaphone",
    title: { en: "Marketing assistant", tr: "Pazarlama asistanı" },
    body: {
      en: "Produces content, catalogs and campaigns in your brand's voice and connects customer follow-up to your CRM and email.",
      tr: "Markanızın diliyle içerik, katalog ve kampanya üretir; müşteri takibini CRM ve e-postanıza bağlar.",
    },
  },
  {
    id: "market-research",
    icon: "radar",
    title: { en: "Market research assistant", tr: "Pazar araştırması asistanı" },
    body: {
      en: "Regularly scans competitors, prices, tenders and industry news, and gives management a short, sourced weekly summary.",
      tr: "Rakipleri, fiyatları, ihaleleri ve sektör haberlerini düzenli tarar; yönetime kısa ve kaynaklı haftalık özet sunar.",
    },
  },
  {
    id: "procurement",
    icon: "truck",
    title: { en: "Procurement & supply assistant", tr: "Satın alma ve tedarik asistanı" },
    body: {
      en: "Compares supplier quotes, tracks orders and delivery dates, and suggests stock and purchase orders.",
      tr: "Tedarikçi tekliflerini karşılaştırır, sipariş ve teslim tarihlerini takip eder, stok ve sipariş önerir.",
    },
  },
  {
    id: "security",
    icon: "shield",
    title: { en: "Security team assistant", tr: "Güvenlik ekibi asistanı" },
    body: {
      en: "Triages and summarizes alerts and logs, answers security policy and GDPR/KVKK questions, and takes load off small IT teams.",
      tr: "Alarm ve kayıtları önceliklendirip özetler; güvenlik politikası ve KVKK sorularını yanıtlar, küçük BT ekiplerinin yükünü alır.",
    },
  },
];

/**
 * ai-agents hizmet sayfasının "Bu alanda neler yapıyoruz" listesi için. 11 Kasım 2026 akşamı (tek odak): yalnız öne
 * çıkan birim; diğer birimler sitede anılmıyor ama veri olarak duruyor (ileride açılabilir).
 */
export function aiUnitOfferings(): ServiceOffering[] {
  return aiUnits.filter((unit) => unit.id === LEAD_UNIT_ID).map((unit) => ({
    id: `ai-${unit.id}`,
    title: unit.title,
    body: unit.body,
    ...(unit.packageId ? { packageId: unit.packageId } : {}),
  }));
}
