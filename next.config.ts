import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Teacher and testimonial photos are served from the Sanity image CDN
    // (NCT-3.04). Scoped to that one host and its `/images` path; the query
    // string is left open because the CDN encodes width and format there.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
