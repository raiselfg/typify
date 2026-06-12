import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui", "lodash"],
  },
  reactCompiler: true,
};

export default nextConfig;
