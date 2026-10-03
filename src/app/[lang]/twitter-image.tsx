// Twitter Card uses a separate file convention from Open Graph; re-exporting
// avoids duplicating the drawing code in opengraph-image.tsx for an
// identical image.
export { default, alt, size, contentType } from "./opengraph-image";
