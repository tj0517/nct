// Single source of truth for the site's absolute base address, shared by
// `metadataBase` (layout.tsx), sitemap.ts and robots.ts so they can never
// drift apart. Vercel provides VERCEL_PROJECT_PRODUCTION_URL automatically on
// every deployment; locally it falls back to http://localhost:3000.
export const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";
