import type { Locale } from "@/dictionaries";

/**
 * Returns a locale-aware path.
 * Polish (default) → `/path`
 * English → `/en/path`
 */
export function localePath(path: string, locale: Locale): string {
  if (locale === "pl") return path;
  return `/en${path}`;
}
