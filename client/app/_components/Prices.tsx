import SectionHeader from './SectionHeader';
import { ArrayProps } from '../_types/global';
import { Price } from '../_types/price';
import '../_styles/prices.css';

export default function Prices({ prices }: ArrayProps<Price>) {

    return (
        <>
            <section className="prices container" id="prices">

                <SectionHeader 
                    title="Affordable prices based on delivery method"
                    subTitle="Pricing"/>

                <div className="prices__list grid-auto-fit grid-auto-fit--wide-items">
                    
                    {prices.map(price=>(

                            <div className={ price.GREAT_VALUE ? "card prices__list-card prices__list-card--great-value": "card prices__list-card prices__card-border"} key={price.DESCRIPTION}>
                                {<img className="icon-medium prices__list-card-icon" src={`assets/${price.ICON}`} alt=""/>}
                                { price.GREAT_VALUE ? <p className="yellow-ribbon prices__list-card-yellow-ribbon">Great Value</p> : ""}
                                <p className="prices__list-card-description">{price.DESCRIPTION}</p>
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