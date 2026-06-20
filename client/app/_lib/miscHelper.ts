import config from './config';

export async function getPrices() {
    const url = `${config.serverEndpoint}prices`;
    let attempts = 0;
    let data: unknown = [];

    // Java-mode services may still be warming up when the first SSR request hits.
    while (attempts < 3) {
        try {
            const response = await fetch(url, { cache: 'no-store' });
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            data = await response.json();
            break;
        } catch {
            attempts += 1;
            if (attempts >= 3) {
                return [];
            }
            await new Promise((resolve) => setTimeout(resolve, 250));
        }
    }

    // Because of Typescript, it is necessary to check if data is an array
    if (Array.isArray(data) && data.length > 0) {
        return [...data];
    }

    return [];
}

export function generateOrderNumber () {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
  
    const randomPart = Math.floor(100000 + Math.random() * 999999); // Ensures 6 digits
  
    return `${year}${month}${day}-${hours}${minutes}-${randomPart}`;
};