import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  exports: {
    experimental: {
      serverActions: {
        bodySizeLimit: '50mb',
      },
    },
  }
  /* config options here */
};

module.exports = {
  env : {
    BACKEND_URI : process.env.BACKEND_URI,
  },
  experimental : {
    serverActions : {
      bodySizeLimit : '50mb',
    },
  },
}

export default nextConfig;
