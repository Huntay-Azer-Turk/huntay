import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { MCP_SERVER_VERSION, mcpDescription, mcpDocsPath, mcpEndpoint } from "@/lib/mcp/meta";
import { createMcpServer } from "@/lib/mcp/server";
import { siteConfig } from "@/lib/site";

/**
 * Uzak MCP sunucusu: https://huntayazerturk.com/mcp (Streamable HTTP, durumsuz, kimlik doğrulama yok).
 * ChatGPT, Claude, Gemini vb. bu adresi "bağlayıcı / connector" olarak ekleyebilir.
 * Her istek için yeni bir sunucu + taşıyıcı oluşturulur (durumsuz mod; Cloudflare Workers’a uygun).
 */

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Accept, Authorization, Mcp-Session-Id, Mcp-Protocol-Version, Last-Event-ID",
  "Access-Control-Expose-Headers": "Mcp-Session-Id, Mcp-Protocol-Version",
  "Access-Control-Max-Age": "86400",
};

function withCors(response: Response): Response {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(CORS_HEADERS)) headers.set(key, value);
  headers.set("X-Robots-Tag", "noindex");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

/**
 * Taşıyıcı, POST isteklerinde Accept başlığında hem application/json hem text/event-stream ister.
 * Yanıtlar her zaman JSON olduğundan, eksik başlık gönderen basit istemciler de çalışsın diye tamamlanır.
 */
async function normalizeAccept(request: Request): Promise<Request> {
  const accept = request.headers.get("accept") ?? "";
  if (accept.includes("application/json") && accept.includes("text/event-stream")) return request;
  const headers = new Headers(request.headers);
  headers.set("accept", "application/json, text/event-stream");
  // Gövde metin olarak kopyalanır (akış kopyalamak bazı çalışma ortamlarında hata verir).
  return new Request(request.url, { method: request.method, headers, body: await request.text() });
}

export async function POST(request: Request) {
  const server = createMcpServer();
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  });
  try {
    await server.connect(transport);
    return withCors(await transport.handleRequest(await normalizeAccept(request)));
  } catch (error) {
    console.error("MCP request failed", error);
    return withCors(
      Response.json(
        { jsonrpc: "2.0", error: { code: -32603, message: "Internal server error" }, id: null },
        { status: 500 },
      ),
    );
  } finally {
    // JSON modunda yanıt tamamen hazır olduktan sonra döner; kaynakları serbest bırak.
    await server.close().catch(() => {});
  }
}

/**
 * Durumsuz sunucu SSE akışı açmaz: MCP istemcilerine 405.
 * Tarayıcıdan açan biri içinse kısa bir açıklama döner.
 */
export function GET(request: Request) {
  const accept = request.headers.get("accept") ?? "";
  if (accept.includes("text/event-stream")) {
    return withCors(
      new Response("Method Not Allowed", { status: 405, headers: { Allow: "POST, OPTIONS" } }),
    );
  }
  return withCors(
    Response.json({
      name: siteConfig.name,
      description: mcpDescription,
      version: MCP_SERVER_VERSION,
      endpoint: mcpEndpoint,
      transport: "streamable-http",
      authentication: "none",
      tools: [
        "get_availability",
        "book_intro_call",
        "list_services",
        "get_service",
        "get_profile",
        "search",
        "fetch",
      ],
      documentation: `${siteConfig.baseUrl}${mcpDocsPath}`,
      privacyPolicy: `${siteConfig.baseUrl}/privacy`,
      website: siteConfig.baseUrl,
    }),
  );
}

export function DELETE() {
  return withCors(
    new Response("Method Not Allowed", { status: 405, headers: { Allow: "POST, OPTIONS" } }),
  );
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}
