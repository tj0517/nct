import "server-only";
import { cache } from "react";
import { sanityFetch } from "@/sanity/fetch";
import { polishLiveQuery } from "@/sanity/queries";

/**
 * Whether the Polish version is switched on in Sanity (Site settings ->
 * Polish version). Off — including when the field was never set or Sanity is
 * unreachable — means the site behaves as English-only, so a CMS outage can
 * never put a half-translated page at "/". proxy.ts reads the same field on
 * its own (it cannot use this server-only module).
 */
export const getPolishLive = cache(async (): Promise<boolean> => {
  const live = await sanityFetch<boolean | null>({
    query: polishLiveQuery,
    tags: ["siteSettings"],
  });
  return live === true;
});
