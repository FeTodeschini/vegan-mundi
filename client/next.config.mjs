const nextConfig = {
    // 7zoutput: 'export', // Outputs a Single-Page Application (SPA) as a Static Site.
    // distDir: './dist', // Changes the build output directory to `./dist/`.
    // missingSuspenseWithCSRBailout: false, // this is necessary to avoid the useSearchParams() in the search page to have to be wrapped in a Suspense Boundary
    reactStrictMode: true,
    disableOptimizedLoading: true,
    optimizeCss: true,
    webpack(config, { isServer }) {
      config.resolve.alias['@'] = path.resolve(__dirname, 'app');
      return config;
    },
  }