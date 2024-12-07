import path from 'path';

console.log("Next.js config loaded");

const nextConfig = {
    reactStrictMode: true,
    disableOptimizedLoading: true,
    optimizeCss: true,
    webpack(config, { isServer }) {
      config.resolve.alias['@'] = path.resolve(__dirname, 'app');
      console.log('Webpack Config:', config.resolve.alias);
      return config;
    },
  }