const withNextIntl = require("next-intl/plugin")("./src/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = withNextIntl({});

module.exports = {
  ...nextConfig,
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Resolve the `fs` module for client-side (browser) builds
    //  ==> HIGHjs requires the `fs` module
    config.resolve.fallback = {
      fs: false,
    };

    // Call the next-intl plugin webpack function to add the necessary configurations
    return nextConfig.webpack(config, {
      buildId,
      dev,
      isServer,
      defaultLoaders,
      nextRuntime,
      webpack,
    });
  },
};
