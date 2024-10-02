import { useEffect } from 'react';
import config from '../_lib/config.js';

export function useGetPrices( prices, setPrices, isLoading, setIsLoading) {
    useEffect( ()=> {

        async function getPrices() {

            var data = await fetch(`${config.serverEndpoint}prices`);
            data = await data.json();

            setPrices([...data]);
            setIsLoading(false);

        }

        getPrices();
        
    } , []);
}