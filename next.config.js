/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "api.dicebear.com"],
  },
  // Disable file system cache to prevent locking issues
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 15 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  // Disable webpack persistent caching and handle chunk loading errors
  webpack: (config, { dev }) => {
    // Disable cache for both dev and prod to prevent chunk loading issues
    config.cache = false;

    // Add chunk loading error handling
    config.output = {
      ...config.output,
      chunkLoadingGlobal: "webpackChunkLoad",
      crossOriginLoading: "anonymous",
    };

    // Add error handling for JSON parsing
    config.optimization = {
      ...config.optimization,
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\]node_modules[\\]/,
            name(module) {
              const packageName = module.context.match(
                /[\\]node_modules[\\](.+?)([\\]|$)/,
              )[1];
              return `npm.${packageName.replace("@", "")}`;
            },
          },
        },
      },
    };

    return config;
  },
  // Add output option to fix bootstrap script error
  output: "standalone",
  // Ensure proper script loading
  reactStrictMode: true,
  poweredByHeader: false,
};

if (process.env.NEXT_PUBLIC_TEMPO) {
  nextConfig["experimental"] = {
    // NextJS 13.4.8 up to 14.1.3:
    // swcPlugins: [[require.resolve("tempo-devtools/swc/0.86"), {}]],
    // NextJS 14.1.3 to 14.2.11:
    swcPlugins: [[require.resolve("tempo-devtools/swc/0.90"), {}]],

    // NextJS 15+ (Not yet supported, coming soon)
  };
}

module.exports = nextConfig;
