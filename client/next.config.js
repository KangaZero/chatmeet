/** @type {import('next').NextConfig} */
const webpack = require('webpack');
const {IgnorePlugin} = webpack;

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.experiments = { topLevelAwait: true };
    }
    // Add this line to handle the node:crypto module
    config.plugins.push(new IgnorePlugin({
      resourceRegExp: /^node:/,
    }));
    return config;
}
};

module.exports= nextConfig

