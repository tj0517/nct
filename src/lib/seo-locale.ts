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

// What the shared app/[lang]/opengraph-image.tsx (and twitter-image.tsx,
// which re-exports it) actually shows — used as the alt text wherever that
// image is referenced, independent of which page links to it.
export const OG_IMAGE_ALT = "A Nice Cup of Tea — English Lessons";

/**
 * Open Graph + Twitter Card metadata for a page. Next.js replaces a
 * segment's entire `openGraph`/`twitter` object when that segment sets it at
 * all — it does not merge individual fields with the layout's. That also
 * applies to the image Next auto-attaches from the file-based
 * `opengraph-image.tsx`/`twitter-image.tsx`: once a page below it sets its
 * own `openGraph`/`twitter`, that auto-attached image is replaced away too,
 * so this must re-link it explicitly by its resolved route
 * (`/<locale>/opengraph-image`) rather than relying on inheritance.
 */
export function socialMetadata(
  locale: Locale,
  title: string,
  description: string
): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      title,
      description,
      siteName: "A Nice Cup of Tea",
      type: "website",
      images: [
        {
          url: `/${locale}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: OG_IMAGE_ALT,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: `/${locale}/twitter-image`,
          width: 1200,
          height: 630,
          alt: OG_IMAGE_ALT,
          type: "image/png",
        },
      ],
    },
  };
}
