// Which locales serve their own content. "en" always does; "pl" only while the
// Polish version is switched on in Sanity (Site settings -> Polish version ->
// "Polish version live", Anthony 2026-10-28). The flag itself is read by
// polish-live.ts (pages) and proxy.ts (routing) and passed in here, so
// proxy.ts, locale-path.ts and every page's metadata follow the same switch.
//
// No imports here on purpose: this file is used by proxy.ts and by the client
// Header, neither of which can pull in the "server-only" Sanity fetch.
export function hasOwnContent(locale: string, polishLive: boolean): boolean {
  if (locale === "en") return true;
  if (locale === "pl") return polishLive;
  return false;
}

// The locale whose content is actually rendered when visiting `locale` —
// itself if it has its own copy, otherwise the locale standing in for it.
export function servedLocale(locale: string, polishLive: boolean): string {
  return hasOwnContent(locale, polishLive) ? locale : "en";
}
