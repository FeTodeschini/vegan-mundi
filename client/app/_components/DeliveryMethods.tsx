'use client';

import { useState } from 'react';
import { useGetSectionDataWithS3Image } from '../hooks/useGetSectionDataWithS3Image';
import SectionHeader from './SectionHeader';
import Button from "./Button";
import Card from './Card';
import { CookingClassDeliveryMethods } from '@/_types/cooking-class';

export default function DeliveryMethods() {

    const [sectionData, setSectionData] = useState<CookingClassDeliveryMethods[]>([]);

    // Retrieves all delivery methods from the database
    useGetSectionDataWithS3Image(setSectionData, 'delivery-methods')

    return (
            <section className="delivery-methods container">
                <SectionHeader 
                    title="Learn in your preferred environment" 
                    subTitle="Different Delivery Methods"/>

                <div className="grid-auto-fit grid-auto-fit--wide-items">
                    {
                        // Line that hadd to be added after Typescript implementation
                        Array.isArray(sectionData) && sectionData.length > 0 && (
                            sectionData.map(item=>
                                // Line that hadd to be added after Typescript implementation to check if item is SectionDataDeliveryMethods and assert its type
                                item && "ICON" in item ? (
                                    <Card
                                        title = { <><img src={`assets/${item.ICON}`} alt="In Person Classes" className="icon-medium" /> {item.TITLE}</>  }
                                        description = {item.DESCRIPTION}
                                        key= {item.TITLE}
                                    >
                                        <Button >Learn More &rarr;</Button>
                                    </ Card>
                                ) : null
                            )
                        )
                    }
                </div>
            </section>
    )
}