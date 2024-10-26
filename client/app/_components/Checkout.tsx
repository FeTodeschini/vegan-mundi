import { FormEvent, useContext } from "react";
import Button from "./Button";
import CheckoutItems from "./CheckOutItems";
import SectionHeader from "./SectionHeader";
import { emptyCart } from "@/_lib/CartHelper";
import { useRouter } from "next/navigation";
import { StateContext } from "../StateProvider";
import axios from "axios";
import { generateOrderNumber } from "@/_lib/functions";
import config from "../_lib/config";
import { CheckoutProps } from "@/_types/cart";

export default function Checkout({setOrderNumber, orderNumber, setIsPaymentConfirmed, isPaymentConfirmed}: CheckoutProps) {
    const { setCartItems, setCartAmount, setCartQuantity, cartItems, userInfo, setError, error, setResponseMessage } = useContext(StateContext)
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
                CLASS_DATE: ''
            }));
    
            const orderData = {
                orderNumber,
                email: userInfo!.email,
                classes
            }
    
            try {
                // Add the order
                await axios.post(`${config.serverEndpoint}order/add`, orderData);
                setError("")
                setIsPaymentConfirmed(true)
            }
            catch (err: any){
                if (err.response) {
                    const message = err.response.data.message || "An error occurred while adding your order."
                    setError(message);
                } else {
                    setError("An unexpected error occurred.");
                }
                setIsPaymentConfirmed(false)
            }
            return null;
        }

        await addOrder()
    }

    return (
        <>
            <Button size="medium" additionalClass={"btn--back-home"} link={"/"}>&larr; Back to home</Button>
            <div className="cart-buttons">
                <div className="cart-buttons--title">
                    <SectionHeader title={"Checkout"} />                    
                </div>

                <div className="cart-buttons--btn">
                    <Button type={"button"} onClick={backToCart}>Back to Cart</Button>
                </div>
                <div className="cart-buttons--btn">
                    <Button type={"button"} bgColor={"yellow"} onClick={handleCheckOut}>Confirm Payment</Button>
                </div>
            </div>

            <CheckoutItems/>
        </>
    )
}