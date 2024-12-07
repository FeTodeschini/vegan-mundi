import path from 'path';

console.log("Next.js config loaded");

const nextConfig = {
    reactStrictMode: true,
    disableOptimizedLoading: true,
    optimizeCss: true,
    webpack(config, { isServer }) {
      if (isServer) {
        console.log("Running server-side build...");
      } else {
        console.log("Running client-side build...");
      }
      config.resolve.alias['@'] = path.resolve(__dirname, 'app');
      console.log('Webpack Config:', config.resolve.alias);
      return config;
    },
  }