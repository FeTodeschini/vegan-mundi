import { useContext, useEffect } from "react";
import { StateContext } from "./StateProvider.js";

import Hero from "./Hero.js";
import Disclaimer from "./Disclaimer.js";
import DeliveryMethods from "./DeliveryMethods.js";
import Categories from "./Categories.js";
import FreeClasses from "./FreeClasses.js";
import Prices from "./Prices.js";
import Gallery from "./Gallery.js";

export default function LandingPage (){

    const { setKeyword } = useContext(StateContext);
    
    useEffect( ()=> {
        setKeyword("");

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