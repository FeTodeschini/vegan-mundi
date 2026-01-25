const config = {
    // Prefer explicit env var, otherwise fall back to IPv4 localhost to avoid IPv6 (::1) connection issues
    serverEndpoint: process.env.NEXT_PUBLIC_SERVER_ENDPOINT || 'http://127.0.0.1:4000/',
    pageSize: process.env.NEXT_PUBLIC_PAGE_SIZE || '12'
};

export default config;