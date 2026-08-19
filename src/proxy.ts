import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const locales = ["pl", "en"];
const defaultLocale = "pl";

function getPreferredLocale(request: NextRequest): string {
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });

  const languages = new Negotiator({ headers }).languages();
  return match(languages, locales, defaultLocale);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if path already has a locale prefix
  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameHasLocale) return;

  // Check for explicit locale cookie
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;

  // If user has explicitly chosen English, redirect to /en/...
  if (cookieLocale === "en") {
    request.nextUrl.pathname = `/en${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  // Default: rewrite to /pl/... (Polish served at / without prefix)
  request.nextUrl.pathname = `/pl${pathname}`;
  return NextResponse.rewrite(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip internal paths, static files, images, and common assets
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images/).*)",
  ],
};
