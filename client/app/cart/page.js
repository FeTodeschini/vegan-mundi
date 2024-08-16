'use client'

import { useContext, useEffect } from "react";
import { StateContext } from "../StateProvider.js";

import SeactionHeader from '../_components/SectionHeader.js';
import Button from "../_components/Button.js";
import Card from "../_components/Card.js"
import { removeFromCart } from '../_lib/functions.js';

export default function ShoppingCart () {
    const { setKeyword, cartQuantity, setCartQuantity, cartItems, setCartItems } = useContext(StateContext)

    useEffect (()=> {
        setKeyword("");
    }, [])

    function emptyCart(){
        setCartItems([]);
        setCartQuantity(0);

        localStorage.setItem('cartItems', JSON.stringify([]));
        localStorage.setItem('cartQuantity', 0);
    }

    return (
        <div class="container">
            <Button size="medium" additionalClass={"btn--back-home"} link={"/"}>&larr; Back to home</Button>

            <div className="cart-buttons">
                <div className="cart-buttons--title">
                    <SeactionHeader title={`${cartQuantity === 0 ? `Your cart is empty ` : 
                                                cartQuantity ===  1 ? ` There is 1 item in your cart - subtotal: $` : 
                                            ` There are ${cartQuantity} items in your cart  - subtotal: $` }`} 
                                    subTitle={"Shopping Cart"}/>                    
                </div>

                {/* Displays the "Empty Cart" and "Checkout' buttons in case the cart is not empty */}
                {cartQuantity > 0 &&
                    <div className="cart-buttons--btn">
                        <Button type={"button"} onClick={()=>emptyCart()}>Empty Cart</Button>
                        <Button type={"button"} bgColor={"yellow"}>Check Out</Button>
                    </div>
                }
            </div>

            {/* All classes selected by the User */}
            <div className="grid-auto-fit">
                {cartItems.map(item=>(
                    <Card 
                        imgSource={item.PRE_SIGNED_URL}
                        imgLink={"/classes"}
                        title={item.TITLE} 
                        // description={item.DESCRIPTION} 
                        key={item.PRE_SIGNED_URL}
                    >
                        <div className="flex-col">
                            <Button bgColor={"green"} type={"button"} size={"medium"} onClick={()=>removeFromCart(cartItems, cartQuantity, setCartItems, setCartQuantity, item.TITLE)}>Remove Item</Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}