import UnoCSS from '@unocss/webpack';
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config: import('webpack').Configuration) => {
    config.plugins = config.plugins || [];
    config.plugins.push(UnoCSS());
    return config;
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.twimg.com', port: '' },
      { protocol: 'https', hostname: 'flagcdn.com', port: '' },
    ],
  },
  env: {
    API_URL: process.env.API_URL,
    UNAMI_ANALYTICS: process.env.UNAMI_ANALYTICS,
    SITE_URL: process.env.SITE_URL,
  },
};

export default nextConfig;
