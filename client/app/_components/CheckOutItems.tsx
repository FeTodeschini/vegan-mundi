'use client';

import React from 'react';
import SectionHeader from './SectionHeader';
import { SelectedCookingClassWithPrices } from '../_types/cooking-class';
import { useSelector } from 'react-redux';
import { ReduxRootState } from '../_types/redux';

export default function CheckoutItems() {

    const { cartAmount, cartItems } : { cartAmount: number, cartItems: SelectedCookingClassWithPrices[] } = useSelector((state: ReduxRootState)=> state.cart);

    return (
        <>
                <div className="grid-auto-fit">
                    <div>
                        <SectionHeader subTitle="Credit card information"/>
                        <div className="checkout regular-text">
                            <form action="">

                            </form>
                        </div>
                    </div>
                    
                    <div>
                        <SectionHeader subTitle="Classes in your shopping cart"/>
                        <div className="checkout__summary regular-text">
                            {cartItems.map( item => 
                                <div >
                                    <p>{item.TITLE}</p>
                                    <p className="regular-text-small">{item.PRICE_TYPE_DESCRIPTION} - ${item.PRICE}</p>
                                </div>
                            )}
                            <p className="bold">Total: ${cartAmount}</p>
                        </div>
                    </div>
                </div>
        </>
    )
}