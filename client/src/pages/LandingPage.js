import { useContext, useEffect } from "react";
import { StateContext } from "../StateProvider.js";

import Hero from "../components/Hero.js";
import Disclaimer from "../components/Disclaimer.js";
import DeliveryMethods from "../components/DeliveryMethods.js";
import Categories from "../components/Categories.js";
import FreeClasses from "../components/FreeClasses.js";
import Prices from "../components/Prices.js";
import Gallery from "../components/Gallery.js";

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