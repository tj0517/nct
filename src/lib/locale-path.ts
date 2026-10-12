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
  /* A bare fragment must not keep the slash: "/en/#contact" is a different URL
     from "/en", so the browser reloads the document instead of scrolling to the
     section, and the hash restore then races hydration and lands at the top.
     "/en#contact" is the same document, so the jump is native and instant. */
  if (path.startsWith("/#")) return `/en${path.slice(1)}`;
  return `/en${path}`;
}
