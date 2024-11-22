import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks", "@mui/lab", "@mui/material"],
  },
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },
  // TODO: undo
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
