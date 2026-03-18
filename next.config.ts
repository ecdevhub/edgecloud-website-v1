// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Force everything through Node.js runtime
  // Prevents loading WebAssembly-based edge runtime on startup
  serverExternalPackages: ["mysql2", "bcryptjs", "jsonwebtoken", "drizzle-orm"],
};

export default nextConfig;
