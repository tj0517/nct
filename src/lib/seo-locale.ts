import type { Metadata } from "next";
import { servedLocale } from "@/lib/locale-content";
import type { Locale } from "@/dictionaries";

/**
 * `alternates.canonical` + `robots` for a page, driven entirely by the
 * locale-content switch in locale-content.ts:
 * - the locale actually serving the content → canonical to itself, indexable
 * - any other locale (today: "pl") → canonical to the serving locale's
 *   address, `noindex` so Google doesn't treat it as a duplicate
 *
 * `path` is the unprefixed page path, e.g. "" for the home page or "/adults".
 */
export function localeMetadata(
  locale: Locale,
  path: string
): Pick<Metadata, "alternates" | "robots"> {
  const canonicalLocale = servedLocale(locale);
  const metadata: Pick<Metadata, "alternates" | "robots"> = {
    alternates: { canonical: `/${canonicalLocale}${path}` },
  };
  if (locale !== canonicalLocale) {
    metadata.robots = { index: false };
  }
  return metadata;
}
