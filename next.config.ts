import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a.cdn-hotels.com",
      },
      {
        protocol: "https",
        hostname: "cdn.aarp.net",
      },
      {
        protocol: "https",
        hostname: "content.skyscnr.com",
      },
      {
        protocol: "https",
        hostname: "humanidades.com",
      },
      {
        protocol: "https",
        hostname: "cdn.britannica.com",
      },
      {
        protocol: "https",
        hostname: "lp-cms-production.imgix.net",
      },
      {
        protocol: "https",
        hostname: "lp-cms-production.imgix.net",
      },
      {
        protocol: "https",
        hostname: "miro.medium.com",
      },
      {
        protocol: "https",
        hostname: "unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
