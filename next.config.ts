import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Low-RAM optimizations to prevent OOM build failure and server crashes
  experimental: {
    cpus: 2,
    memoryBasedWorkersCount: true,
    turbopackMemoryLimit: 2048 * 1024 * 1024,
    webpackMemoryOptimizations: true,
    parallelServerCompiles: false,
    parallelServerBuildTraces: false,
  },
  turbopack: {
    root: process.cwd(),
  },
  allowedDevOrigins: [
    "http://192.168.1.4:3000",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",

      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Vary",
            value: "Accept",
          },
          {
            key: "Content-Signal",
            value: "ai-train=no, search=yes, ai-input=yes",
          },
        ],
      },
      {
        source: "/",
        headers: [
          {
            key: "Link",
            value: '</llms.txt>; rel="service-desc"',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Checker subpath redirects to canonical routes
      {
        source: "/visa-photo-validator/australian-passport-photo-checker",
        destination: "/australian-passport-photo-checker",
        permanent: true,
      },
      {
        source: "/visa-photo-validator/diversity-visa-lottery-photo-checker",
        destination: "/diversity-visa-lottery-photo-checker",
        permanent: true,
      },
      {
        source: "/visa-photo-validator/passport-photo-checker",
        destination: "/passport-photo-checker",
        permanent: true,
      },
      {
        source: "/visa-photo-validator/online-passport-photo-checker",
        destination: "/online-passport-photo-checker",
        permanent: true,
      },
      // Normalize ICAO slashes
      {
        source: "/icao-/-eu-visa-photo-editor",
        destination: "/icao-visa-photo-editor",
        permanent: true,
      },
      {
        source: "/icao-/-eu-passport-photo-editor",
        destination: "/icao-passport-photo-editor",
        permanent: true,
      },
      // Normalize United States -> US
      {
        source: "/united-states-passport-photo-editor",
        destination: "/us-passport-photo-editor",
        permanent: true,
      },
      {
        source: "/united-states-visa-photo-editor",
        destination: "/us-visa-photo-editor",
        permanent: true,
      },
      // Visa silo to root consolidation (Catch-all)
      {
        source: "/visa-photo/:slug",
        destination: "/:slug",
        permanent: true,
      },
      // Silo legacy cleanup
      {
        source: "/photo/:slug",
        destination: "/:slug",
        permanent: true,
      },
      // Global pattern cleanup: *-photo -> *-photo-editor
      {
        source: "/us-passport-photo",
        destination: "/us-passport-photo-editor",
        permanent: true,
      },
      {
        source: "/us-visa-photo",
        destination: "/us-visa-photo-editor",
        permanent: true,
      },
      // Legacy American photo pages -> /us-passport-photo-editor
      {
        source: "/photo-for-american-visa",
        destination: "/us-passport-photo-editor",
        permanent: true,
      },
      {
        source: "/america-passport-photo",
        destination: "/us-passport-photo-editor",
        permanent: true,
      },
      {
        source: "/america-passport-photo-size",
        destination: "/us-passport-photo-editor",
        permanent: true,
      },
      {
        source: "/america-passport-size",
        destination: "/us-passport-photo-editor",
        permanent: true,
      },
      {
        source: "/america-passport-size-photo",
        destination: "/us-passport-photo-editor",
        permanent: true,
      },
      {
        source: "/american-passport-pic",
        destination: "/us-passport-photo-editor",
        permanent: true,
      },
      {
        source: "/american-passport-picture-size",
        destination: "/us-passport-photo-editor",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
