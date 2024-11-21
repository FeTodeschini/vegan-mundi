import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateCartFromLocalStorage } from '../redux/slices/cartSlice';

export function useGetCartItemsFromLocalStorage() {
    const dispatch = useDispatch();
    
    useEffect (()=> {
        dispatch(updateCartFromLocalStorage())
    }, []);
}

