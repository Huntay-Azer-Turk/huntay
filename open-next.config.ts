import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/**
 * Sayfalar build sırasında üretiliyor (SSG) ve yeniden doğrulama (revalidate) kullanılmıyor.
 * Bu yüzden önceden üretilmiş HTML doğrudan Workers statik varlıklarından okunur ve
 * cache interception ile Next.js sunucusu hiç başlatılmadan döner — ilk bayt süresi (TTFB) düşer.
 * Sayfalara ileride `revalidate` eklenirse R2 önbelleğine geçilmeli:
 * https://opennext.js.org/cloudflare/caching
 */
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
