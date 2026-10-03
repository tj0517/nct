import { ImageResponse } from "next/og";
import { OG_IMAGE_ALT } from "@/lib/seo-locale";

// Shared across every page under [lang] (home + all 7 indexable pages) —
// none of the course-page illustrations in public/images/ are landscape or
// have a solid background, so a small generated brand card is less code
// than cropping/flattening one of them to fit a link-preview shape.
export const alt = OG_IMAGE_ALT;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Copied from globals.css --union-blue/--union-crimson/--union-white: fixed
// brand colours, not the light/dark theme tokens. satori (which renders this)
// cannot read CSS custom properties, so the hex values are duplicated here.
const NAVY = "#012169";
const CRIMSON = "#C8102E";
const WHITE = "#FFFFFF";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: NAVY,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ width: 160, height: 8, background: CRIMSON }} />
        <div
          style={{
            marginTop: 40,
            fontSize: 72,
            fontWeight: 700,
            color: WHITE,
            textAlign: "center",
          }}
        >
          A Nice Cup of Tea
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 32,
            color: CRIMSON,
            textAlign: "center",
          }}
        >
          English Lessons in Warsaw
        </div>
      </div>
    ),
    { ...size }
  );
}
