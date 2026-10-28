import { mcpDocsPath, mcpEndpoint } from "@/lib/mcp/meta";
import { siteConfig } from "@/lib/site";

/** RFC 9727 API kataloğu: sitenin makine tarafından kullanılabilir uç noktaları. */
export const dynamic = "force-static";

export function GET() {
  const docs = `${siteConfig.baseUrl}${mcpDocsPath}`;
  return new Response(
    JSON.stringify({
      linkset: [
        {
          anchor: mcpEndpoint,
          "service-desc": [
            { href: `${siteConfig.baseUrl}/.well-known/mcp/server-card.json`, type: "application/json" },
          ],
          "service-doc": [{ href: docs, type: "text/html" }],
          "service-meta": [{ href: `${siteConfig.baseUrl}/privacy`, type: "text/html" }],
        },
        {
          anchor: `${siteConfig.baseUrl}/llms.txt`,
          "service-doc": [{ href: `${siteConfig.baseUrl}/llms-full.txt`, type: "text/plain" }],
        },
      ],
    }),
    { headers: { "Content-Type": "application/linkset+json; charset=utf-8" } },
  );
}
