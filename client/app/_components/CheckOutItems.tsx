'use client';

import React from 'react';
import SectionHeader from './SectionHeader';
import { SelectedCookingClassWithPrices } from '../_types/cooking-class';
import { useSelector } from 'react-redux';
import { ReduxRootState } from '../_types/redux';
import '../_styles/form.css';
import '../_styles/layout.css';

export default function CheckoutItems() {

    const { cartAmount, cartItems } : { cartAmount: number, cartItems: SelectedCookingClassWithPrices[] } = useSelector((state: ReduxRootState)=> state.cart);

    return (
        <>
                <div className="checkout-container">
                    <div className="checkout__credit-card">
                        <SectionHeader subTitle="Credit card information"/>
                            <form action="" className="checkout__form regular-text">
                                <label htmlFor="firstName" className='form-label'>First Name:</label>
                                <input className="form-input" id="firstName" required/>
                                <label htmlFor="lastName" className='form-label'>Last Name:</label>
                                <input className="form-input" id="last" required/>
                                <label htmlFor="cardNumber" className='form-label'>Card number:</label>
                                <input className="form-input" id="cardNumber" required/>
                            </form>
                    </div>
                    
                    <div className="checkout__summary">
                        <div>
                            <SectionHeader subTitle="Classes in your shopping cart"/>
                            <div className="checkout__summary--items regular-text">
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
                </div>
        </>
    )
}