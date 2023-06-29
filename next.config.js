/** @type {import('next').NextConfig} */
const path = require('path');

const { DEPLOY_ENV, BASE_URL } = process.env;

const nextConfig = {
  reactStrictMode: true,
  env: {
    DEPLOY_ENV,
    BASE_URL,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};

module.exports = nextConfig;
