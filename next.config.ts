import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: true,
  async redirects() {
    return [
      // www → non-www (production domain)
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.archiloomstudio.com" }],
        destination: "https://archiloomstudio.com/:path*",
        permanent: true,
      },
      // Legacy / alternate hosts → primary non-www domain
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.archiloom.studio" }],
        destination: "https://archiloomstudio.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "archiloom.studio" }],
        destination: "https://archiloomstudio.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
