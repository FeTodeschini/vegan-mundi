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