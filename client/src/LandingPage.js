import { useEffect, useState } from "react";
import Header from "./ui-components/Header.js";
import Hero from "./Hero.js";
import Disclaimer from "./Disclaimer.js";
import DeliveryMethods from "./DeliveryMethods.js";
import ClassesCategories from "./ClassesCategories.js";
import DarkBackground from "./DarkBackground.js";
import FreeClasses from "./FreeClasses.js";
import Prices from "./Prices.js";
import Gallery from "./Gallery.js";
import Footer from "./ui-components/Footer.js";
import SearchInput from "./ui-components/SearchInput.js";
import FilteredClasses from "./ui-components/FilteredClasses.js";

export default function LandingPage (){

    const [filterResult, setFilterResult] = useState([]);
    const [filterKeyWord, setFilterKeyWord] = useState("");
    const [filterExecuted, setFilterExecuted] = useState(false);

    function HTMLHeader() {
        return (
            <header>
                <title>Vegan Mundi - Vegan Cooking Classes</title>
                <meta name="description" content="Learn how to make your own healthy, yummy ad sustainable in incredibly fun and affordable classes. Online or in person classes in Tampa, United States"></meta>
            </header>
        )
    }

    return (
        <>
            <HTMLHeader />

            <body>
             
                <Header>
                    <SearchInput
                        placeholder={"What do you want to cook today? (type at least 4 letters)"}
                        setFilterKeyWord={ setFilterKeyWord }
                        setFilterResult={ setFilterResult } 
                        setFilterExecuted={ setFilterExecuted }
                        />
                </ Header>
                <DarkBackground />

                <main> 
                {filterExecuted ?
                    <FilteredClasses filterKeyWord={ filterKeyWord } filterResult={filterResult} setFilterExecuted={ setFilterExecuted }/>
                :
                    <>
                        <Hero />
                        <Disclaimer />
                        <ClassesCategories />
                        <DeliveryMethods />
                        <FreeClasses />
                        <Prices />
                        <Gallery />                    
                    </>
                }
                </main>

                <Footer />
            </body>
        </>
    )
}