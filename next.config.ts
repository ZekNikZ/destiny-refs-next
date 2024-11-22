import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks", "@mui/lab", "@mui/material"],
  },
  // TODO: undo
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
