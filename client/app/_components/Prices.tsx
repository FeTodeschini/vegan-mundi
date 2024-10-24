import React, { useState } from 'react';
import Image from 'next/image.js';
import SectionHeader from './SectionHeader';
import { useGetPrices } from '../hooks/useGetPrices';

import '../_styles/prices.css';

import { Price } from '@/_types/price';

export default function Prices() {

    const [isLoading, setIsLoading] = useState(true);
    const [prices, setPrices] = useState<Price[]>([]);
    
    useGetPrices( prices, setPrices, isLoading, setIsLoading );

    // checks if API call is still being executed. If this line is ommited, than a runtime error (as freeClasses array will be empty) will occur when page is refreshed or user hits the browser's back button
    if (isLoading){
        return(<p>loading...</p>);
    }
    else {

        return (
            <>
                <section className="prices container" id="prices">

                    <SectionHeader 
                        title="Affordable prices based on delivery method"
                        subTitle="Pricing"/>

                    <div className="prices__list grid-auto-fit grid-auto-fit--wide-items">
                        
                        {prices.map(price=>(

                                <div className={ price.GREAT_VALUE ? "card prices__list-card prices__list-card--great-value": "card prices__list-card"} key={price.DESCRIPTION}>
                                    {/* {<Image fill={true} className="icon-medium prices__list-card-icon" src={price.ICON} alt=""/>} */}
                                    { price.GREAT_VALUE ? <p className="yellow-ribbon prices__list-card-yellow-ribbon">Great Value</p> : ""}
                                    <p className="heading-tertiary prices__list-card-description">{price.DESCRIPTION}</p>
                                    <p className='prices__list-card-price'>${price.PRICE}</p>
                                    
                                        {
                                            price.ADDITIONAL_INFO.split("|").map(info => {
                                                return <p className='prices__list-card-additional-info' key={info}>{info}</p>
                                            })
                                        }
                                </div>
                            )
                        )}
                        
                    </div>
                </section>
            </>
        )

    }
 
}