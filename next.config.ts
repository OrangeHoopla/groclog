import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  exports: {
    experimental: {
      serverActions: {
        bodySizeLimit: '5mb',
      },
    },
  }
  /* config options here */
};

module.exports = {
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
}

export default nextConfig;
