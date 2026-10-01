import { createClient, type SanityClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "./env";

// `createClient` throws when the project id is missing or malformed. Pages read
// content through this module, so a throw at module load would take down
// `next build` and every public page on a deployment without Sanity variables.
// The client is therefore built lazily and the failure turned into `null`;
// callers fall back to the static dictionary. (NCT-3.01 -> NCT-3.04)
let cached: SanityClient | null | undefined;

export function getClient(): SanityClient | null {
  if (cached !== undefined) return cached;
  try {
    cached = projectId
      ? createClient({ projectId, dataset, apiVersion, useCdn: true })
      : null;
  } catch {
    cached = null;
  }
  return cached;
}
