import Icons from "unplugin-icons/webpack";
import withPlaiceholder from "@plaiceholder/next";

/** @type {import('next').NextConfig} */
const config = {
  webpack(config) {
    config.plugins.push(
      Icons({
        compiler: "jsx",
        jsx: "react",
      }),
    );

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.twimg.com',
        port: '',
      }, {
        protocol: 'https',
        hostname: 'flagcdn.com',
        port: ''
      }
    ],
  },
  env: {
    API_URL: process.env.API_URL
  }
};

export default withPlaiceholder(config);
