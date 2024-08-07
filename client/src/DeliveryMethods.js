import { useState, useEffect } from 'react';
import { useGetSectionDataWithS3Image } from './hooks/useGetSectionDataWithS3Image.js';
import SectionHeader from './ui-components/SectionHeader.js';
import Button from "./ui-components/Button";
import Card from './ui-components/Card.js';

export default function DeliveryMethods() {

    const [sectionData, setSectionData] = useState([]);

    // Retrieves all delivery methods from the database
    useGetSectionDataWithS3Image(setSectionData, 'delivery-methods')

    return (
            <section className="delivery-methods container">
                <SectionHeader 
                    title="Learn in your preferred environment" 
                    subTitle="Different Delivery Methods"/>

                <div className="grid-auto-fit grid-auto-fit--wide-items">
                    {
                        sectionData.map(item=>
                            <Card
                                title = { <><img src={require(`./assets/${item.ICON}`)} alt="In Person Classes" className="icon-medium" /> {item.TITLE}</>  }
                                description = {item.DESCRIPTION}
                                key= {item.TITLE}
                            >
                                <Button >Learn More &rarr;</Button>
                            </ Card>
                        )
                    }
                </div>
            </section>
    )
}