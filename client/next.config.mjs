const nextConfig = {
    reactStrictMode: true,
    disableOptimizedLoading: true,
    optimizeCss: true,
    webpack(config, { isServer }) {
      config.resolve.alias['@'] = path.resolve(__dirname, 'app');
      return config;
    },
  }