import { mcpRegistryAuthRecord } from "@/lib/mcp/meta";

/**
 * Resmi MCP Registry alan adı doğrulaması (HTTP yöntemi): yalnızca AÇIK anahtar yayımlanır.
 * Kayıt yokken 404 döner.
 */
export const dynamic = "force-static";

export function GET() {
  if (!mcpRegistryAuthRecord) return new Response("Not found", { status: 404 });
  return new Response(mcpRegistryAuthRecord, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
