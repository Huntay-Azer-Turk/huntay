import { siteConfig } from "@/lib/site";

/**
 * MCP sunucusunun kimlik bilgileri — sunucu, /assistant dokümantasyon sayfası,
 * /.well-known dosyaları ve MCP Registry kaydı aynı değerleri kullanır.
 * Araçlar veya davranış değiştiğinde sürümü artırın (dizinler "material change" bekler).
 */
export const MCP_SERVER_VERSION = "1.1.0";

export const mcpEndpoint = `${siteConfig.baseUrl}/mcp`;

/** Resmi MCP Registry adı (alan adı doğrulamalı ad alanı: com.huntayazerturk). */
export const mcpRegistryName = "com.huntayazerturk/assistant";

export const mcpTitle = siteConfig.name;

/** Registry sınırı 100 karakter. Tanıtım dili yok: ne yaptığını söyler. */
export const mcpShortDescription =
  "Check Huntay AzerTürk's availability, book a 30-minute intro call, and look up his services.";

export const mcpDescription =
  "Check Huntay AzerTürk's availability and book a 30-minute intro video call, and look up his consulting services, case studies and FAQ.";

export const mcpIcons = [
  { src: `${siteConfig.baseUrl}/icons/huntay-512.png`, mimeType: "image/png", sizes: ["512x512"] },
  { src: `${siteConfig.baseUrl}/icons/huntay-192.png`, mimeType: "image/png", sizes: ["192x192"] },
];

export const mcpDocsPath = "/assistant";

export const mcpRepository = {
  url: `${siteConfig.github}/huntay`,
  source: "github",
} as const;

/** MCP Registry HTTP doğrulaması: /.well-known/mcp-registry-auth (yalnızca açık anahtar). */
export const mcpRegistryAuthRecord =
  process.env.MCP_REGISTRY_AUTH_RECORD ?? "v=MCPv1; k=ed25519; p=SjfmoF0d3Z7/ca6oOok5kvBaovUckDPclkr/DCxbnpc=";

/** ChatGPT uygulama dizini alan adı doğrulaması: /.well-known/openai-apps-challenge */
export const openaiAppsChallenge =
  process.env.OPENAI_APPS_CHALLENGE ?? "rUJ89WDvPFhazcd44eaoF7k6Zyu-r7rrM8dX5jY68Wo";
