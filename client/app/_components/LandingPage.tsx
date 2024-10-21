'use client'

import { useContext, useEffect } from "react";
import { StateContext } from "../StateProvider";
import Hero from "./Hero";
import Disclaimer from "./Disclaimer";
import DeliveryMethods from "./DeliveryMethods";
import Categories from "./Categories";
import FreeClasses from "./FreeClasses";
import Prices from "./Prices";
import Gallery from "./Gallery";

export default function LandingPage (){

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

    return (
        <>
            <main> 
                <Hero />
                <Disclaimer />
                <Categories />
                <DeliveryMethods />
                <FreeClasses />
                <Prices/>
                <Gallery />                    
            </main>
        </>
    )
}