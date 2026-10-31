import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // Load the Daytona SDK with plain Node.js require. When bundled, its file upload breaks
  // ("form-data is not available in the node runtime").
  serverExternalPackages: ["@daytona/sdk"],
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
