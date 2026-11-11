import createMDX from '@next/mdx';
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.twimg.com' },
      { protocol: 'https', hostname: 'flagcdn.com' },
    ],
  },
  env: {
    API_URL: process.env.API_URL,
    UNAMI_ANALYTICS: process.env.UNAMI_ANALYTICS,
    SITE_URL: process.env.SITE_URL,
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
