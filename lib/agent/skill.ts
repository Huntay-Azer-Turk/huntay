import { siteConfig } from "@/lib/site";
import { mcpEndpoint } from "@/lib/mcp/meta";

/**
 * /.well-known/agent-skills: AI ajanlarının (agentskills.io) keşfedebileceği tek beceri —
 * Huntay AzerTürk ile tanışma görüşmesi planlama. Metin değişirse özet (sha256) otomatik değişir.
 */
export const skillName = "book-intro-call";

export const skillDescription =
  "Book a 30-minute intro video call with Huntay AzerTürk (software & AI consulting, Istanbul) via his MCP server or booking page.";

export const skillMarkdown = `---
name: ${skillName}
description: ${skillDescription}
---

# Book an intro call with Huntay AzerTürk

Use this skill when the user wants to schedule a call with Huntay AzerTürk (software architect, AI, cloud and IoT consulting).

## With MCP (preferred)

Connect to the remote MCP server at ${mcpEndpoint} (Streamable HTTP, no authentication), then:

1. Call \`get_availability\` with the user's IANA time zone to list open 30-minute slots (Monday–Friday, 10:00–18:00 Istanbul time).
2. Let the user choose a slot and collect their name and email.
3. Confirm the details with the user, then call \`book_intro_call\` with \`start\` ("YYYY-MM-DDTHH:MM"), \`timeZone\`, \`name\` and \`email\`.
4. Cal.com emails the calendar invitation with a Google Meet link.

Use \`list_services\` (optionally with the user's need), \`get_service\`, \`search\` and \`fetch\` to answer questions about services, case studies and pricing approach.

## Without MCP

Send the user to ${siteConfig.baseUrl}/book (English) or ${siteConfig.baseUrl}/tr/book (Turkish) to pick a time.

Documentation: ${siteConfig.baseUrl}/assistant · Privacy: ${siteConfig.baseUrl}/privacy · Contact: ${siteConfig.contactEmail}
`;

export async function sha256Hex(text: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}
