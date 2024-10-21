'use client';

import { useContext, useEffect } from "react";
import { StateContext } from "../StateProvider";

import SeactionHeader from '../_components/SectionHeader';
import Button from "../_components/Button";
import ButtonRemoveFromCart from "../_components/ButtonRemoveFromCart";
import Card from "../_components/Card"

import "../_styles/card.css";

export default function ShoppingCart () {
    const { setKeyword, cartQuantity, setCartQuantity, cartItems, setCartItems, cartAmount, setCartAmount } = useContext(StateContext)

    useEffect (()=> {
        setKeyword("");
    }, [])

    function emptyCart(){
        setCartItems([]);
        setCartQuantity(0);
        setCartAmount(0);

        localStorage.setItem('cartItems', JSON.stringify([]));
        localStorage.setItem('cartQuantity', (0).toString());
    }

    return (
        <div className="container">
            <Button size="medium" additionalClass={"btn--back-home"} link={"/"}>&larr; Back to home</Button>

            <div className="cart-buttons">
                <div className="cart-buttons--title">
                    <SeactionHeader title={`${cartQuantity === 0 ? `Your cart is empty ` : 
                                                cartQuantity ===  1 ? ` There is 1 item in your cart - subtotal: $${cartAmount} ` : 
                                            ` There are ${cartQuantity} items in your cart  - subtotal: $${cartAmount}` }`} 
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

            {/* Display all classes selected by the User */}
            <div className="grid-auto-fit">
                {cartItems.map(item=> (
                    <Card 
                        imgSource={item.PRE_SIGNED_URL}
                        imgLink={"/classes"}
                        title={item.TITLE} 
                        key={item.PRE_SIGNED_URL}
                    >
                        <div className="cart--class-detail card__description">
                                <p>Class Type: <span className="bold">{item.CATEGORY_TITLE}</span></p>
                                <p>Price: <span className="bold">${item.PRICE}</span></p>
                                {item.MULTIPLE_STUDENTS && <p>Students: <span className="bold">{item.STUDENTS}</span></p>}
                        </div>
                        <div className="flex-col">
                            <ButtonRemoveFromCart itemTitle={item.TITLE} />
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}