import type { NextConfig } from "next";

// Served at https://works.cybersage.dev (own Vercel project, own subdomain).
const nextConfig: NextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  images: {
    qualities: [75, 85],
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
