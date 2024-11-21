'use client';

import { useContext, useEffect } from "react";
import { StateContext } from "../StateProvider";
import SeactionHeader from '../_components/SectionHeader';
import Button from "../_components/Button";
import ButtonRemoveFromCart from "../_components/ButtonRemoveFromCart";
import Card from "../_components/Card"
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { useDispatch, useSelector } from "react-redux";
import { ReduxRootState } from "../_types/redux";
import { emptyCart } from "../redux/slices/cartSlice"
import { SelectedCookingClassWithPrices } from "../_types/cooking-class";
import "../_styles/card.css";

export default function ShoppingCart () {
    const { setKeyword } = useContext(StateContext)
    const { cartQuantity, cartAmount, cartItems } : { cartQuantity: number, cartAmount: number, cartItems: SelectedCookingClassWithPrices[] } = useSelector((state: ReduxRootState)=> state.cart);
    
    const router = useRouter(); 
    const dispatch = useDispatch();
 
    useEffect (()=> {
        setKeyword("");
    }, [])

    function callCheckout() {
        router.push("/checkout");
    }

    return (
        <div className="container section-cart">
            <Button size="medium" additionalClass={"btn--back-home"} link={"/"}>&larr; Back to home</Button>

            <div className="cart-toolbar">
                <div className="cart-buttons--title">
                    <SeactionHeader title={`${cartQuantity === 0 ? `Your cart is empty ` : 
                                                cartQuantity ===  1 ? ` There is 1 item in your cart - subtotal: $${cartAmount} ` : 
                                            ` There are ${cartQuantity} items in your cart  - subtotal: $${cartAmount}` }`} 
                                    subTitle={"Shopping Cart"}
                                    titleAdditionalClass={"cart-header"}
                    />                    
                </div>

                {/* Displays the "Empty Cart" and "Checkout' buttons in case the cart is not empty */}
                {cartQuantity > 0 &&
                    <div className="cart-buttons--btn">
                        {/* <Button type={"button"} onClick={()=>emptyCart(setCartItems, setCartQuantity, setCartAmount)}>Empty Cart</Button> */}
                        <Button type={"button"} onClick={()=>dispatch(emptyCart())}>Empty Cart</Button>
                        <Button type={"button"} bgColor={"yellow"} onClick={callCheckout}>Check Out</Button>
                    </div>
                }
            </div>

            {/* Display all classes selected by the User */}
            <div className="grid-auto-fit--cart">
                <div className="grid-auto-fit">
                    {cartItems.map((item)=> (
                        <Card key={item.TITLE}>
                            <Card.TopImage imgSource={item.PRE_SIGNED_URL} imgLink={"/classes"} />
                            <Card.Title>{item.TITLE}</Card.Title>
                            <Card.Content>
                                <div className="cart--class-detail card__content">
                                        <p>Delivery: <span className="bold">{item.PRICE_TYPE_DESCRIPTION}</span></p>
                                        {item.CLASS_DATE && <p>Date: <span className="bold">{format((item.CLASS_DATE), 'MM/dd/yyyy')}</span></p>}
                                        <p>Price: <span className="bold">${item.PRICE}</span></p>
                                        {item.MULTIPLE_STUDENTS && <p>Students: <span className="bold">{item.STUDENTS}</span></p>}
                                </div>
                            </Card.Content>
                            <Card.Content>
                                <div className="flex-col">
                                    <ButtonRemoveFromCart item={item} />
                                </div>
                            </Card.Content>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}