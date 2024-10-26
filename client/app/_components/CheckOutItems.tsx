'use client';

import React, { useContext } from 'react';
import SectionHeader from './SectionHeader';
import { StateContext } from '@/StateProvider';

export default function CheckoutItems() {

    const { cartItems, cartAmount, userInfo, setError, setResponseMessage } = useContext(StateContext)

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
                        <div className="checkout regular-text">
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