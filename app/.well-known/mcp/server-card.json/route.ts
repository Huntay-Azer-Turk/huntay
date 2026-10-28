import {
  MCP_SERVER_VERSION,
  mcpDescription,
  mcpDocsPath,
  mcpEndpoint,
  mcpIcons,
  mcpRegistryName,
  mcpRepository,
  mcpShortDescription,
  mcpTitle,
} from "@/lib/mcp/meta";
import { siteConfig } from "@/lib/site";

/**
 * MCP Server Card (taslak standart, SEP-1649/2127): istemcilerin sunucuyu bağlanmadan tanıması için.
 * Alanlar MCP Registry server.json biçimini izler; serverInfo/transport/capabilities eski taslaklar için.
 */
export const dynamic = "force-static";

export function GET() {
  return Response.json(
    {
      $schema: "https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json",
      name: mcpRegistryName,
      title: mcpTitle,
      description: mcpShortDescription,
      version: MCP_SERVER_VERSION,
      websiteUrl: `${siteConfig.baseUrl}${mcpDocsPath}`,
      repository: mcpRepository,
      remotes: [{ type: "streamable-http", url: mcpEndpoint }],
      icons: mcpIcons,
      supportedProtocolVersions: ["2025-11-25", "2025-06-18", "2025-03-26"],
      serverInfo: { name: "huntayazerturk", title: mcpTitle, version: MCP_SERVER_VERSION, description: mcpDescription },
      transport: { type: "streamable-http", endpoint: mcpEndpoint },
      capabilities: { tools: { listChanged: false }, resources: { listChanged: false }, prompts: { listChanged: false } },
      authentication: { required: false },
      documentation: `${siteConfig.baseUrl}${mcpDocsPath}`,
      privacyPolicy: `${siteConfig.baseUrl}/privacy`,
      contact: siteConfig.contactEmail,
    },
    { headers: { "Access-Control-Allow-Origin": "*" } },
  );
}
