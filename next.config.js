/** @type {import('next').NextConfig} */
const path = require('path');

const { BASE_URL } = process.env;

const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};

module.exports = nextConfig;
