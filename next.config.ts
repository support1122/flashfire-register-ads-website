import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  // Production: load _next/static from the register deployment when HTML is served
  // from another host (e.g. www rewrite). In dev, assetPrefix must be unset or the
  // browser requests chunks from that URL and gets 404 (wrong build / no dev server).
  assetPrefix: isDev
    ? undefined
    : (process.env.NEXT_PUBLIC_ASSET_PREFIX ??
      "https://flashfire-register-ads-website.vercel.app"),
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev",
      },
      {
        protocol: "https",
        hostname: "logo.clearbit.com",
      },
      {
        protocol: "https",
        hostname: "www.google.com",
      },
    ],
  },
};

export default nextConfig;
