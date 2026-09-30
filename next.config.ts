import type { NextConfig } from "next";

// Served at https://cybersage.dev/works through a rewrite on the main site
// (same pattern as cybersage.dev/pricing). Keep in sync with BASE_PATH in
// src/lib/site.ts.
const BASE_PATH = "/works";

const nextConfig: NextConfig = {
  basePath: BASE_PATH,
  reactCompiler: true,
  poweredByHeader: false,
  images: {
    qualities: [75, 85],
  },
  async redirects() {
    // Direct hits on the deployment root (cybersage-works.vercel.app/) land on the site.
    return [{ source: "/", destination: BASE_PATH, basePath: false, permanent: false }];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
