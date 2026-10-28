import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { hasOwnContent } from "@/lib/locale-content";
import { getClient } from "@/sanity/client";
import { polishLiveQuery } from "@/sanity/queries";

const locales = ["pl", "en"];

/* The "Polish version live" switch from Sanity (see polish-live.ts, which
   pages use). The proxy runs on every page request, so the answer is kept in
   memory for a minute — the same window the pages' own fetch uses. Any
   failure counts as off: the English site is the safe default. */
const POLISH_LIVE_TTL_MS = 60_000;
let polishLiveMemo: { value: boolean; at: number } | null = null;

async function polishLive(): Promise<boolean> {
  if (polishLiveMemo && Date.now() - polishLiveMemo.at < POLISH_LIVE_TTL_MS) {
    return polishLiveMemo.value;
  }
  let value = false;
  try {
    value = (await getClient()?.fetch<boolean | null>(polishLiveQuery)) === true;
  } catch {
    value = polishLiveMemo?.value ?? false;
  }
  polishLiveMemo = { value, at: Date.now() };
  return value;
}

export async function proxy(request: NextRequest) {
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
  if (hasOwnContent("pl", await polishLive())) {
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
    // Skip internal paths, static files, images, and common assets.
    // Anything served straight out of `public/` must be listed here, or it is
    // redirected into the locale prefix and 404s — `videos/` was added when
    // the teacher intro films landed (Anthony 2026-10-11).
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images/|videos/).*)",
  ],
};
