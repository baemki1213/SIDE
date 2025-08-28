const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {},
};

module.exports = createVanillaExtractPlugin(nextConfig);
