import SectionHeader from './SectionHeader';
import Button from "./Button";
import Card from './Card';
import { CookingClassDeliveryMethods } from '@/_types/cooking-class';
import { ArrayProps } from '@/_types/global';

export default function DeliveryMethods({ deliveryMethods }: ArrayProps<CookingClassDeliveryMethods>) {

    return (
            <section className="delivery-methods container">
                <SectionHeader 
                    title="Learn in your preferred environment" 
                    subTitle="Different Delivery Methods"/>

                <div className="grid-auto-fit grid-auto-fit--wide-items">
                    {
                        // Line that had to be added after Typescript implementation
                        Array.isArray(deliveryMethods) && deliveryMethods.length > 0 && (
                            deliveryMethods.map((item, index)=>
                                // Line that hadd to be added after Typescript implementation to check if item is SectionDataDeliveryMethods and assert its type
                                item && "ICON" in item ? (
                                    <Card key={index}>
                                        <Card.Title>
                                            {<div className="align-items-flex--c">
                                                <img src={`assets/${item.ICON}`} alt="In Person Classes" className="icon-medium" />{item.TITLE}
                                            </div>}
                                        </Card.Title>
                                        <Card.Description>{item.DESCRIPTION}</Card.Description>                                        
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