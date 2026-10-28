import { llmsFullText } from "@/lib/markdown";

/** /llms-full.txt — sitenin tüm içeriği (İngilizce) tek Markdown dosyasında; /llms.txt'nin genişletilmiş hâli. */
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsFullText(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
