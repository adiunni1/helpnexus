import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Proxy /api/* to the FastAPI backend during development.
  // In production, configure this at the infrastructure level (e.g. Vercel rewrites).
  async rewrites() {
    return [
      {
        source:      "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
