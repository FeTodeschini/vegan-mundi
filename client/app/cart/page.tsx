'use client';

import { useContext, useEffect } from "react";
import { StateContext } from "../StateProvider";
import SeactionHeader from '../_components/SectionHeader';
import Button from "../_components/Button";
import ButtonRemoveFromCart from "../_components/ButtonRemoveFromCart";
import Card from "@/_components/Card"
import { useRouter } from 'next/navigation';
import { emptyCart } from "@/_lib/CartHelper";
import { format, parseISO } from 'date-fns';
import "../_styles/card.css";

export default function ShoppingCart () {
    const { setKeyword, cartQuantity, cartItems, cartAmount, setCartItems, setCartQuantity, setCartAmount} = useContext(StateContext)
    const router = useRouter(); 

    useEffect (()=> {
        setKeyword("");
    }, [])

    function callCheckout() {
        router.push("/checkout");
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
                        <Button type={"button"} onClick={()=>emptyCart(setCartItems, setCartQuantity, setCartAmount)}>Empty Cart</Button>
                        <Button type={"button"} bgColor={"yellow"} onClick={callCheckout}>Check Out</Button>
                    </div>
                }
            </div>

            {/* Display all classes selected by the User */}
            <div className="grid-auto-fit">
                {cartItems.map((item, index)=> (
                    <Card key={index}>
                        <Card.TopImage imgSource={item.PRE_SIGNED_URL} imgLink={"/classes"} />
                        <Card.Title>{item.TITLE}</Card.Title>
                        <Card.Content>
                            <div className="cart--class-detail card__description">
                                    <p>Delivery: <span className="bold">{item.PRICE_TYPE_DESCRIPTION}</span></p>
                                    {item.CLASS_DATE && <p>Date: <span className="bold">{format((item.CLASS_DATE), 'MM/dd/yyyy')}</span></p>}
                                    <p>Price: <span className="bold">${item.PRICE}</span></p>
                                    {item.MULTIPLE_STUDENTS && <p>Students: <span className="bold">{item.STUDENTS}</span></p>}
                            </div>
                        </Card.Content>
                        <div className="flex-col">
                            <ButtonRemoveFromCart itemTitle={item.TITLE} />
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}