import { useEffect } from 'react';

export function useGetPrices( prices, setPrices, isLoading, setIsLoading) {
    useEffect( ()=> {

        async function getPrices() {

            var data = await fetch('http://3.22.160.2:4000/prices');
            data = await data.json();

            setPrices([...data]);
            setIsLoading(false);

        }

        getPrices();
        
    } , []);
}