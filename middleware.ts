import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // `opengraph-image`: dil önekli OG görselleri (/en/opengraph-image) next-intl’in
  // varsayılan dil önekini kaldıran 307 yönlendirmesine takılmadan doğrudan sunulsun.
  matcher: ["/((?!api|_next|_vercel|.*opengraph-image|.*\\..*).*)"],
};
