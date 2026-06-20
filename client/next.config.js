const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://127.0.0.1:4000/:path*',
        },
      ];
    },
    // disableOptimizedLoading: true,
    // optimizeCss: true,
  }
  
  module.exports = nextConfig;