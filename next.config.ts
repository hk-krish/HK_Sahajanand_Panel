import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...(config.resolve?.alias || {}),
        '@': path.resolve(__dirname, 'src'),
      },
    };
    return config;
  },

  redirects: async () => [
    {
      source: '/',
      destination: '/dashboard',
      permanent: false,
    },
  ],
};

export default nextConfig;
