import { useContext, useEffect } from 'react';
import { StateContext } from '@/StateProvider';
import { SelectedCookingClassWithPrices } from '@/_types/cooking-class';

export function useGeCartItemsFromLocalStorage() {
    const { setCartQuantity, setCartItems, setCartAmount } = useContext(StateContext);

    useEffect (()=> {
        setCartQuantity(() => {
            return Number(localStorage.getItem('cartQuantity'));
        });
    
        setCartAmount(() => {
            return Number(localStorage.getItem('cartAmount'));
        });
    
        // // convert the string that is in the localStorage into an array (as localStorage only stores strings, adn Typescript enforces strict typing)
        const cartItems = localStorage.getItem('cartItems');
        setCartItems(cartItems ? JSON.parse(cartItems) as SelectedCookingClassWithPrices[] : []);
    
    }, []);
}

