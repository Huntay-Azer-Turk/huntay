import { openaiAppsChallenge } from "@/lib/mcp/meta";

/** ChatGPT uygulama dizini alan adı doğrulaması (OpenAI panelinden alınan doğrulama değeri). */
export const dynamic = "force-static";

export function GET() {
  if (!openaiAppsChallenge) return new Response("Not found", { status: 404 });
  return new Response(openaiAppsChallenge, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
