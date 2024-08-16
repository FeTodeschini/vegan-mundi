import { useContext, useEffect } from "react";
import { StateContext } from "../StateProvider.js";

import Hero from "../_components/Hero.js";
import Disclaimer from "../_components/Disclaimer.js";
import DeliveryMethods from "../_components/DeliveryMethods.js";
import Categories from "../_components/Categories.js";
import FreeClasses from "../_components/FreeClasses.js";
import Prices from "../_components/Prices.js";
import Gallery from "../_components/Gallery.js";

export default function LandingPage (){

    const { setKeyword } = useContext(StateContext);
    
    useEffect( ()=> {
        setKeyword("");

        //  Creates the localStorage for the Shopping Cart the first time the user loads the page
        if (localStorage.getItem('cartQuantity')===null) {
            localStorage.setItem('cartItems', JSON.stringify([]));
            localStorage.setItem('cartQuantity', 0);
        }

    } , []);

    return (
        <>
            <main> 
                <Hero />
                <Disclaimer />
                <Categories />
                <DeliveryMethods />
                <FreeClasses />
                <Prices />
                <Gallery />                    
            </main>
        </>
    )
}