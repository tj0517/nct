// Not asserted non-null: a missing project id must not throw at module load,
// or `next build` and every public page would fail on a deployment that has
// no Sanity variables yet. /studio shows a clear message instead.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2024-01-01";
