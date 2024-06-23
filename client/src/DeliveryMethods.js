import { useState, useEffect } from 'react';

import SectionHeader from './ui-components/SectionHeader.js';
import Button from "./ui-components/Button";
import Card from './ui-components/Card.js';

export default function DeliveryMethods() {

    const [isLoading, setIsLoading] = useState(true);
    const [deliveryMethods, setDeliveryMethods] = useState([]);

    useEffect( ()=> {

        async function getPrices() {

            var data = await fetch('http://3.22.160.2:4000/delivery-methods');
             data = await data.json();

            setDeliveryMethods([...data]);
            setIsLoading(false);

        }

        getPrices();
        
    } , []);

    return (
            <section className="delivery-methods container">
                <SectionHeader 
                    title="Learn in your preferred environment" 
                    subTitle="Different Delivery Methods"/>

                <div className="grid-auto-fit grid-auto-fit--wide-items">
                    {
                        deliveryMethods.map(method=>
                            <Card
                                title = { <><img src={require(`./assets/${method.ICON}`)} alt="In Person Classes" className="icon-medium" /> {method.TITLE}</>  }
                                description = {method.DESCRIPTION}
                            >
                                <Button >Learn More &rarr;</Button>
                            </ Card>
                        )
                    }
                </div>
            </section>
    )
}