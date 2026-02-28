import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // IMPORTANT:
  // Do NOT use `output: "export"` (static export) because it disables API routes like /api/public/chat.
};

export default nextConfig;