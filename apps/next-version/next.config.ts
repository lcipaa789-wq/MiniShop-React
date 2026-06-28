import type { NextConfig } from "next";
//allows Next.js <Image> to load images from external domains

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",

        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "utfs.io", // Uploadthing CDN domain
      },
    ],
  },
};

export default nextConfig;
