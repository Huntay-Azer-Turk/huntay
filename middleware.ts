import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { markdownForPath } from "./lib/markdown";
import { siteConfig } from "./lib/site";

const intlMiddleware = createMiddleware(routing);

/**
 * 1) AI ajanları sayfayı `Accept: text/markdown` ile isterse sayfanın Markdown sürümü döner
 *    (aynı URL, içerik pazarlığı; tarayıcılar ve arama motorları HTML almaya devam eder).
 * 2) Diğer tüm istekler next-intl dil yönlendirmesinden geçer.
 */
export default function middleware(request: NextRequest) {
  const accept = request.headers.get("accept") ?? "";
  if ((request.method === "GET" || request.method === "HEAD") && /text\/markdown/i.test(accept)) {
    const markdown = markdownForPath(request.nextUrl.pathname);
    if (markdown) {
      const canonical = `${siteConfig.baseUrl}${request.nextUrl.pathname.replace(/\/$/, "") || "/"}`;
      return new NextResponse(request.method === "HEAD" ? null : markdown, {
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          Vary: "Accept",
          "x-markdown-tokens": String(Math.ceil(markdown.length / 4)),
          Link: `<${canonical}>; rel="canonical"`,
        },
      });
    }
  }

  const response = intlMiddleware(request);
  response.headers.append("Vary", "Accept");
  return response;
}

export const config = {
  // `opengraph-image`: dil önekli OG görselleri (/en/opengraph-image) next-intl’in
  // varsayılan dil önekini kaldıran 307 yönlendirmesine takılmadan doğrudan sunulsun.
  // `mcp`: AI asistanları için MCP uç noktası (app/mcp/route.ts) dil yönlendirmesine girmesin.
  // Noktalı yollar (/llms.txt, /.well-known/..., görseller) hiç middleware’e girmez.
  // `admin`: yönetim paneli (app/admin) dil yönlendirmesine girmesin.
  matcher: ["/((?!api|mcp|admin|_next|_vercel|.*opengraph-image|.*\\..*).*)"],
};
