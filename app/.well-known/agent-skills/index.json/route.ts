import { sha256Hex, skillDescription, skillMarkdown, skillName } from "@/lib/agent/skill";
import { siteConfig } from "@/lib/site";

/** Agent Skills keşif dizini (https://agentskills.io) */
export const dynamic = "force-static";

export async function GET() {
  return Response.json({
    $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
    skills: [
      {
        name: skillName,
        type: "skill-md",
        description: skillDescription,
        url: `${siteConfig.baseUrl}/.well-known/agent-skills/${skillName}/SKILL.md`,
        digest: `sha256:${await sha256Hex(skillMarkdown)}`,
      },
    ],
  });
}
