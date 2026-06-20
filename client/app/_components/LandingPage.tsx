import LandingPageClientFeatures from "./LandingPageClientFeatures";
import Hero from "./sections/Hero";
import Disclaimer from "./common-ui/Disclaimer";
import DeliveryMethods from "./sections/DeliveryMethods";
import Categories from "./sections/Categories";
import FreeClasses from "./sections/FreeClasses";
import Prices from "./sections/Prices";
import Gallery from "./sections/Gallery";
import { getPrices } from "../_lib/miscHelper";
import config from '../_lib/config';
import axios from "axios";

async function getSectionArray(endpoint: string) {
    try {
        const response = await axios.get(`${config.serverEndpoint}${endpoint}`);
        return Array.isArray(response.data) ? response.data : [];
    } catch {
        return [];
    }
}

export default async function LandingPage (){

    // Fetch data for SSG components; fail open during backend switchovers.
    const prices = await getPrices();
    const deliveryMethods = await getSectionArray('delivery-methods');
    const categories = await getSectionArray('classes/categories');
    
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