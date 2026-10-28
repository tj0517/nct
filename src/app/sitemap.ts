import type { MetadataRoute } from "next";
import { locales } from "@/dictionaries";
import { hasOwnContent } from "@/lib/locale-content";
import { getPolishLive } from "@/lib/polish-live";
import { localeMetadata } from "@/lib/seo-locale";
import { siteUrl } from "@/lib/site-url";

// The 7 page paths, unprefixed — same list a new course page would need to
// join regardless of locale. Only locales with their own content are
// indexable: "en" always, "pl" while the Polish version is switched on in
// Sanity (see locale-content.ts) — no second place to update then.
const PATHS = ["", "/adults", "/business", "/children", "/maths", "/university", "/faq"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const polishLive = await getPolishLive();
  const indexableLocales = locales.filter((locale) => hasOwnContent(locale, polishLive));

  const entries = await Promise.all(
    indexableLocales.flatMap((locale) =>
      PATHS.map(async (path) => ({
        url: `${siteUrl}${(await localeMetadata(locale, path)).alternates!.canonical}`,
      }))
    )
  );
  return entries;
}
