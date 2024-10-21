import { useEffect } from 'react';
import config from '../_lib/config';

import { Price } from '@/_types/price';

export function useGetPrices( prices: Price[], setPrices: (arg: Price[])=> void, isLoading: boolean, setIsLoading: (arg: boolean)=> void  ) {
    useEffect( ()=> {

        async function getPrices() {

            const response = await fetch(`${config.serverEndpoint}prices`);
            const data: Price[] = await response.json();

            setPrices([...data]);
            setIsLoading(false);

        }

        getPrices();
        
    } , []);
}