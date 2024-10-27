'use client'

import { useContext, useEffect } from "react";
import { StateContext } from "../StateProvider";

export default function LandingPageClientFeatures(){
    const { setKeyword } = useContext(StateContext);
    
    useEffect( ()=> {
        if (setKeyword) {
            setKeyword("");
        }

        //  Creates the localStorage for the Shopping Cart the first time the user loads the page
        if (localStorage.getItem('cartQuantity')===null) {
            localStorage.setItem('cartItems', JSON.stringify([]));
            localStorage.setItem('cartQuantity', String(0));
        }

    } , []);

    return null;
}

