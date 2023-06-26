/** @type {import('next').NextConfig} */

const { DEPLOY_ENV, BASE_URL } = process.env;

const nextConfig = {
  reactStrictMode: true,
  env: {
    DEPLOY_ENV,
    BASE_URL,
  },
};

module.exports = nextConfig;
