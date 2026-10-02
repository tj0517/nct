import type { Locale } from "@/dictionaries";
import { hasOwnContent } from "@/lib/locale-content";

/**
 * Returns a locale-aware path.
 * Polish (once it has its own content) → `/path`
 * Polish (today, no own content yet) → `/en/path`, so visitors land directly
 * on the English page instead of taking the proxy's redirect hop.
 * English → `/en/path`
 */
export function localePath(path: string, locale: Locale): string {
  if (locale === "pl" && hasOwnContent("pl")) return path;
  return `/en${path}`;
}
