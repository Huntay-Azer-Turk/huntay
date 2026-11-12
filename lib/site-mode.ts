/**
 * Site kipi (12 Kasım 2026, Huntay: "şimdilik bir şey satmıyoruz, sadece normal bir öz geçmiş olsun").
 *
 * `SELLING_ENABLED = false` → site bir öz geçmiş gibi görünür: menüde, ana sayfada ve alt bilgide hizmet, paket,
 * görüşme planlama, değerlendirme ve asistan bağlantıları yok; bu sayfalar `noindex` ve site haritası dışında.
 * Sayfalar ve MCP araçları (dizin incelemesi için) adresleriyle çalışmaya devam eder. Satışa dönmek için `true` yap.
 */
export const SELLING_ENABLED = false;

/** Satış kipinde görünen, öz geçmiş kipinde gizlenen sayfa yolları (yerelleştirilmemiş, alt yollar dahil). */
export const SALES_PATHS = ["/services", "/packages", "/book", "/assessment", "/assistant"] as const;

export function isSalesPath(path: string): boolean {
  return SALES_PATHS.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}

/** Öz geçmiş kipinde gizlenen satış sayfası mı? */
export function isHiddenSalesPath(path: string): boolean {
  return !SELLING_ENABLED && isSalesPath(path);
}
