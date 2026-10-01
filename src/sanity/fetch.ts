import "server-only";
import { getClient } from "./client";
import type { QueryParams } from "next-sanity";

// Returns `null` instead of throwing when Sanity is unconfigured or
// unreachable, so a CMS outage degrades to the static dictionary rather than
// breaking the page. See `src/lib/get-content.ts`.
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
}): Promise<T | null> {
  const client = getClient();
  if (!client) return null;

  try {
    return await client.fetch<T>(query, params, {
      next: {
        revalidate: 60,
        tags,
      },
    });
  } catch {
    return null;
  }
}
