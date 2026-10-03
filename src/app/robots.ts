import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

// "/pl" is deliberately left crawlable: those pages carry their own
// noindex + canonical (see seo-locale.ts), and blocking crawl would hide
// that signal from Google rather than just keep it out of the index.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/studio",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
