// Use explicit public env var when available. For development only,
// fall back to the local backend. In production we avoid defaulting
// to 127.0.0.1 because that would make client browsers try to
// contact the end user's machine (requests would hang/pending).
const envEndpoint = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;
const devFallback = 'http://127.0.0.1:4000/';

const config = {
    serverEndpoint: envEndpoint
        ? envEndpoint
        : (process.env.NODE_ENV === 'development' ? devFallback : '/'),
    pageSize: process.env.NEXT_PUBLIC_PAGE_SIZE || '12'
};

export default config;