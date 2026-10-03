// Single source of truth: which locales serve their own translated content
// today. Flip "pl" to true once real Polish copy lands (see
// docs/deferred-tasks.md) — proxy.ts, locale-path.ts and every page's
// generateMetadata all follow this map, so that is the only change needed.
//
// No imports here on purpose: this file is used by proxy.ts, which cannot
// import anything that pulls in the "server-only" dictionaries module.
const localesWithOwnContent: Record<string, boolean> = {
  pl: false,
  en: true,
};

export function hasOwnContent(locale: string): boolean {
  return localesWithOwnContent[locale] ?? false;
}

// The locale whose content is actually rendered when visiting `locale` —
// itself if it has its own copy, otherwise the locale standing in for it.
export function servedLocale(locale: string): string {
  return hasOwnContent(locale) ? locale : "en";
}
