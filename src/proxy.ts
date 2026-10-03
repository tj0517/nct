import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { hasOwnContent } from "@/lib/locale-content";

const locales = ["pl", "en"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Sanity Studio is not localised — rewriting it to /pl/studio gives a 404
  if (pathname === "/studio" || pathname.startsWith("/studio/")) return;

  // Check if path already has a locale prefix
  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameHasLocale) return;

  // Once "pl" has its own content, serve it at the unprefixed path as before.
  if (hasOwnContent("pl")) {
    request.nextUrl.pathname = `/pl${pathname}`;
    return NextResponse.rewrite(request.nextUrl);
  }

  // Until then, the unprefixed path has nothing of its own to rewrite to —
  // send it to the English address with a temporary (307) redirect.
  request.nextUrl.pathname = `/en${pathname}`;
  return NextResponse.redirect(request.nextUrl, 307);
}

export const config = {
  matcher: [
    // Skip internal paths, static files, images, and common assets
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images/).*)",
  ],
};
