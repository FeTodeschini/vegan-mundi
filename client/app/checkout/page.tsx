'use client';

import Button from "../_components/Button";
import { FormEvent, useContext } from "react";
import CheckoutItems from "@/_components/CheckOutItems";
import SectionHeader from "@/_components/SectionHeader";
import { emptyCart } from "@/_lib/CartHelper";
import { useRouter } from "next/navigation";
import { StateContext } from "../StateProvider";
import axios from "axios";
import { generateOrderNumber } from "@/_lib/functions";
import config from "../_lib/config";
import "../_styles/card.css";
import "../_styles/typography.css";

export default function Page () {

    const { cartItems, userInfo, setError, orderNumber, error, setOrderNumber, setCartItems, setCartQuantity, setCartAmount } = useContext(StateContext)

    const router = useRouter();

    function backToCart(){
        router.push("/cart");
    }

    const handleCheckOut = async (e: FormEvent) => {
        e.preventDefault();

        async function addOrder(): Promise<string | null>{

            const orderNumber = generateOrderNumber();
            setOrderNumber(orderNumber);
    
            const classes = cartItems.map(data => ({
                ORDER_NUMBER: orderNumber,
                EMAIL: userInfo!.email,
                CLASS_ID: data.CLASS_ID,
                DELIVERY_METHOD_ID: data.PRICE_TYPE_ID, //
                NUM_STUDENTS: data.STUDENTS,
                PRICE: data.PRICE,
                DISCOUNT_PERCENTAGE: data.DISCOUNT_PERCENTAGE,
                CLASS_DATE: data.CLASS_DATE,
            }));

            const orderData = {
                orderNumber,
                email: userInfo!.email,
                classes
            }
    
            try {
                // Persist the order to the database
                await axios.post(`${config.serverEndpoint}order/add`, orderData);
                setError("")
                emptyCart(setCartItems, setCartQuantity, setCartAmount)
            }
            catch (err: any){
                if (err.response) {
                    const message = err.response.data.message || "An error occurred while adding your order."
                    setError(message);
                } else {
                    setError("An unexpected error occurred.");
                }
            }

            router.push("/checkout/confirmation");
            return null;
        }

        await addOrder()
    }

    return (
        <div className="container">
            <Button size="medium" additionalClass={"btn--back-home"} link={"/"}>&larr; Back to home</Button>
            <div className="cart-buttons">
                <div className="cart-buttons--title">
                    <SectionHeader title={"Checkout"} />                    
                </div>

                <div className="cart-buttons--btn">
                    <Button type={"button"} onClick={backToCart}>Back to Cart</Button>
                </div>
                <div className="cart-buttons--btn">
                    <Button type={"button"} bgColor={"yellow"} onClick={handleCheckOut}>Confirm Order</Button>
                </div>
            </div>
            <CheckoutItems/>
        </div>
    )
}