import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fix workspace root confusion (you had multiple lockfiles earlier)
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
