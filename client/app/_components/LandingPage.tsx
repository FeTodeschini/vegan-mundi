import LandingPageClientFeatures from "./LandingPageClientFeatures";
import Hero from "./Hero";
import Disclaimer from "./Disclaimer";
import DeliveryMethods from "./DeliveryMethods";
import Categories from "./Categories";
import FreeClasses from "./FreeClasses";
import Prices from "./Prices";
import Gallery from "./Gallery";
import { getPrices } from "@/_lib/functions";
import config from '../_lib/config';
import axios from "axios";


export default async function LandingPage (){

    // Fetch data for SSG (Static Site Generation) components
    let response;

    const prices = await getPrices()

    response = await axios.get(`${config.serverEndpoint}delivery-methods`);
    const deliveryMethods = response.data;

    response = await axios.get(`${config.serverEndpoint}classes/categories`);
    const categories = response.data;
    
    return (
        <>
            {/* Get the "keyword" state variable, initializes the localStorage items (cartQuantity and cartItems) and
            the JWT Token in case User is logged in used by client side components */}
            <LandingPageClientFeatures/>
            <main> 
                <Hero />
                <Disclaimer />
                <Categories categories={categories}/>
                <DeliveryMethods deliveryMethods={deliveryMethods}/>
                <FreeClasses />
                <Prices prices={prices}/>
                <Gallery />
            </main>
        </>
    )
}