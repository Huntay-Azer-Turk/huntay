import { getService, services } from "./services";
import type { ServiceItem } from "./types";

/**
 * Katalog / uyumluluk katmanı.
 *
 * Site dışına verilen her şey (eski hizmet adresleri, MCP araçlarının donmuş slug listesi, D1'deki paketlerin
 * `service_slug` değerleri, paylaşılmış linkler) buradan geçer. Hizmet yapısı değişse bile dış arayüzler kırılmaz:
 * - Kaldırılan bir hizmetin adresi `retiredServiceSlugs` ile yeni sayfaya 308 yönlenir (next.config.ts).
 * - MCP `get_service` eski slug'ları kabul etmeye devam eder ve güncel hizmete eşler.
 * - Paketlerin eski `service_slug` değerleri okunurken güncel hizmete çevrilir.
 *
 * Aşağıdaki doğrulama modül yüklenirken çalışır; boşta kalan bir eşleme varsa derleme hata verir.
 */

/**
 * Gizli hizmetler (11 Kasım 2026, Huntay: "odak tamamen AI transformation"). Menüde, ana sayfada, hizmetler ve
 * paketler sayfasında, sitemap'te, yapılandırılmış veride ve /llms.txt'te görünmez; sayfaları açılır ama noindex.
 * Silinmedi: MCP `get_service` bu slug'ları kullanıyor (dizin incelemeleri bitene kadar şema donuk). İncelemeler
 * bitince `retiredServiceSlugs` ile ai-agents'a yönlendirilip silinebilir.
 */
export const hiddenServiceSlugs: ReadonlySet<string> = new Set([
  "cloud-devops",
  "cybersecurity",
  "fractional-cto",
  "iot-platforms",
  "microservices-modernization",
]);

export function isHiddenService(slug: string): boolean {
  return hiddenServiceSlugs.has(slug);
}

/** Sitede gösterilen hizmetler (gizliler hariç), kaynak sırasıyla. */
export const visibleServices: ServiceItem[] = services.filter((service) => !isHiddenService(service.slug));

/** Ana uzmanlık alanı — gösterim sırası (bulut ve güvenlik 11 Kasım 2026'da gizlendi) */
export const pillarSlugs = ["ai-agents"] as const;

/** Kaldırılan hizmetler → yerini alan hizmet. Google'a göre adresler en az 1 yıl yönlenmeli (Kasım 2026'da eklendi). */
export const retiredServiceSlugs: Record<string, string> = {
  "web-mobile-development": "fractional-cto",
  "startup-product-development": "fractional-cto",
  "digital-transformation": "ai-agents",
};

/**
 * MCP `get_service` aracının girdi şeması (enum). Claude ve ChatGPT dizin incelemeleri sürerken DEĞİŞTİRMEYİN:
 * araç şeması değişirse inceleme geçersiz olabilir. İnceleme bitince yeni sürümle güncellenecek.
 */
export const MCP_FROZEN_SERVICE_SLUGS = [
  "ai-agents",
  "fractional-cto",
  "startup-product-development",
  "web-mobile-development",
  "cloud-devops",
  "microservices-modernization",
  "iot-platforms",
  "digital-transformation",
] as [string, ...string[]];

/** Eski ya da güncel bir slug'ı güncel hizmet slug'ına çevirir; bilinmiyorsa undefined. */
export function resolveServiceSlug(slug: string | null | undefined): string | undefined {
  if (!slug) return undefined;
  if (getService(slug)) return slug;
  const target = retiredServiceSlugs[slug];
  return target && getService(target) ? target : undefined;
}

export function resolveService(slug: string | null | undefined): ServiceItem | undefined {
  const resolved = resolveServiceSlug(slug);
  return resolved ? getService(resolved) : undefined;
}

/** Ana alanlar (sabit sırada) */
export const pillars: ServiceItem[] = pillarSlugs.map((slug) => getService(slug)!).filter(Boolean);

/** Çalışma modeli (Fractional CTO) */
export const engagementModelServices: ServiceItem[] = services.filter((service) => service.role === "model");

/** Ana listelerde görünen hizmetler (gizliler hariç) */
export const primaryServices: ServiceItem[] = [...pillars, ...engagementModelServices].filter(
  (service) => !isHiddenService(service.slug),
);

/** Bir alanın derinlemesine alt sayfaları */
export function deepDivesOf(slug: string): ServiceItem[] {
  return visibleServices.filter((service) => service.role === "deep-dive" && service.parent === slug);
}

/* ------------------------------------------------------------------ */
/* Derleme anı doğrulaması                                              */
/* ------------------------------------------------------------------ */
function validateCatalog() {
  const errors: string[] = [];
  const slugs = new Set<string>();
  for (const service of services) {
    if (slugs.has(service.slug)) errors.push(`duplicate service slug "${service.slug}"`);
    slugs.add(service.slug);
    if (service.role === "deep-dive") {
      const parent = service.parent ? getService(service.parent) : undefined;
      if (!parent || parent.role !== "pillar") errors.push(`deep-dive "${service.slug}" needs a pillar parent`);
    }
    for (const offering of service.offerings ?? []) {
      if (offering.serviceSlug && !getService(offering.serviceSlug)) {
        errors.push(`offering "${offering.id}" links to unknown service "${offering.serviceSlug}"`);
      }
    }
  }
  for (const slug of pillarSlugs) {
    if (getService(slug)?.role !== "pillar") errors.push(`pillar "${slug}" missing or not role "pillar"`);
  }
  for (const [old, target] of Object.entries(retiredServiceSlugs)) {
    if (getService(old)) errors.push(`retired slug "${old}" still exists as a service`);
    if (!getService(target)) errors.push(`retired slug "${old}" points to unknown service "${target}"`);
  }
  for (const slug of hiddenServiceSlugs) {
    if (!getService(slug)) errors.push(`hidden slug "${slug}" is not a service`);
  }
  for (const slug of MCP_FROZEN_SERVICE_SLUGS) {
    if (!resolveService(slug)) errors.push(`MCP slug "${slug}" does not resolve to a service`);
  }
  if (errors.length) throw new Error(`Service catalog is inconsistent:\n- ${errors.join("\n- ")}`);
}

validateCatalog();
