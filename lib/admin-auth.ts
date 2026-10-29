import { getCloudflareContext } from "@opennextjs/cloudflare";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { headers } from "next/headers";

/**
 * /admin yetkilendirmesi. Kapıyı Cloudflare Access tutar (yalnızca izinli e-posta, e-postaya gelen kodla giriş).
 * Ek güvenlik olarak uygulama, Access'in imzaladığı JWT'yi (Cf-Access-Jwt-Assertion) doğrular ve e-postayı
 * izin listesiyle karşılaştırır. Ayar eksikse panel kapalı kalır (fail closed).
 *
 * Ortam değişkenleri (wrangler.jsonc "vars"):
 * - ACCESS_TEAM_DOMAIN: ör. "huntay.cloudflareaccess.com"
 * - ACCESS_AUD: Access uygulamasının "Application Audience (AUD) Tag" değeri
 * - ADMIN_EMAILS: virgülle ayrılmış izinli e-postalar
 * Yerel geliştirme: .dev.vars içinde ADMIN_DEV_BYPASS=1 (yalnızca localhost isteklerinde geçerli).
 */
type AdminEnv = {
  ACCESS_TEAM_DOMAIN?: string;
  ACCESS_AUD?: string;
  ADMIN_EMAILS?: string;
  ADMIN_DEV_BYPASS?: string;
};

const jwksCache = new Map<string, ReturnType<typeof createRemoteJWKSet>>();

export type AdminCheck = { ok: true; email: string } | { ok: false; reason: string };

export async function checkAdmin(): Promise<AdminCheck> {
  const { env } = await getCloudflareContext({ async: true });
  const cfg = env as unknown as AdminEnv;
  const h = await headers();
  const host = (h.get("host") ?? "").split(":")[0];

  if (cfg.ADMIN_DEV_BYPASS === "1" && (host === "localhost" || host === "127.0.0.1")) {
    return { ok: true, email: "dev@localhost" };
  }

  const team = cfg.ACCESS_TEAM_DOMAIN?.trim();
  const aud = cfg.ACCESS_AUD?.trim();
  const allowed = (cfg.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  if (!team || !aud || allowed.length === 0) {
    return { ok: false, reason: "Admin access is not configured." };
  }

  const token = h.get("cf-access-jwt-assertion");
  if (!token) return { ok: false, reason: "Not signed in through Cloudflare Access." };

  try {
    const issuer = `https://${team}`;
    let jwks = jwksCache.get(issuer);
    if (!jwks) {
      jwks = createRemoteJWKSet(new URL(`${issuer}/cdn-cgi/access/certs`));
      jwksCache.set(issuer, jwks);
    }
    const { payload } = await jwtVerify(token, jwks, { issuer, audience: aud });
    const email = String(payload.email ?? "").toLowerCase();
    if (!allowed.includes(email)) return { ok: false, reason: "This account is not allowed." };
    return { ok: true, email };
  } catch {
    return { ok: false, reason: "Invalid Cloudflare Access token." };
  }
}
