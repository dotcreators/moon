/** @type {import('next').NextConfig} */
export default {
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
