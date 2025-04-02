import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "test-task-api.allfuneral.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
