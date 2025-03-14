import UnoCSS from '@unocss/webpack';
import presetIcons from '@unocss/preset-icons';
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.cache = false;
    config.plugins.push(UnoCSS({ presets: [presetIcons()] }));
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
