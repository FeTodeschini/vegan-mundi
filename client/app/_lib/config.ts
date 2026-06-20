// Use explicit public env var when available. For development only,
// fall back to the local backend. In production we avoid defaulting
// to 127.0.0.1 because that would make client browsers try to
// contact the end user's machine (requests would hang/pending).
const envEndpoint = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;
const devFallback = 'http://127.0.0.1:4000/';
const isServerRuntime = typeof window === 'undefined';

function resolveEndpoint(endpoint: string | undefined): string {
    if (!endpoint) {
        return process.env.NODE_ENV === 'development' ? devFallback : '/';
    }

    // Relative endpoints (for example '/api/') work only in the browser.
    // Server-side code (SSR) needs an absolute URL.
    if (endpoint.startsWith('/')) {
        return isServerRuntime ? devFallback : endpoint;
    }

    return endpoint;
}

const config = {
    serverEndpoint: resolveEndpoint(envEndpoint),
    pageSize: process.env.NEXT_PUBLIC_PAGE_SIZE || '12'
};

export default config;