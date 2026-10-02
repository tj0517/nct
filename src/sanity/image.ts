import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { projectId, dataset } from "./env";

// Built from the plain project config rather than the client, so this module
// never throws when Sanity is unconfigured (see `client.ts`). The default
// export is deprecated in @sanity/image-url — use the named one.
const builder = createImageUrlBuilder({ projectId, dataset });

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * CDN URL for a Sanity image, or `null` when the image or the project id is
 * missing. Width only — the aspect ratio is kept and the crop is done in CSS
 * (`object-cover`), exactly as with the static files these replaced, so the
 * rendered dimensions are unchanged.
 */
export function imageUrl(
  source: SanityImageSource | null | undefined,
  width: number
): string | null {
  if (!source || !projectId) return null;
  try {
    return urlFor(source).width(width).auto("format").url();
  } catch {
    return null;
  }
}
