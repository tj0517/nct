import type { MetadataRoute } from "next";
import { locales } from "@/dictionaries";
import { hasOwnContent } from "@/lib/locale-content";
import { localeMetadata } from "@/lib/seo-locale";
import { siteUrl } from "@/lib/site-url";

// The 7 page paths, unprefixed — same list a new course page would need to
// join regardless of locale. Only locales with their own content (today:
// just "en", see locale-content.ts) are indexable, so this stays empty for
// "pl" until Polish copy lands — no second place to update then.
const PATHS = ["", "/adults", "/business", "/children", "/maths", "/university", "/faq"];

export default function sitemap(): MetadataRoute.Sitemap {
  const indexableLocales = locales.filter(hasOwnContent);

  return indexableLocales.flatMap((locale) =>
    PATHS.map((path) => ({
      url: `${siteUrl}${localeMetadata(locale, path).alternates!.canonical}`,
    }))
  );
}
