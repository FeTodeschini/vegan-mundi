'use client';

import Button from "../_components/Button";
import { FormEvent, useContext, useState } from "react";
import CheckoutItems from "../_components/CheckOutItems";
import SectionHeader from "../_components/SectionHeader";
import { useRouter } from "next/navigation";
import { StateContext } from "../StateProvider";
import { emptyCart } from "../redux/slices/cartSlice";
import axios from "axios";
import { SelectedCookingClassWithPrices } from "../_types/cooking-class";
import { useDispatch, useSelector } from "react-redux";
import { ReduxRootState } from "../_types/redux";
import { generateOrderNumber } from "../_lib/miscHelper";
import config from "../_lib/config";
import "../_styles/layout.css";
import "../_styles/card.css";
import { isUserLogged } from "@/_lib/accountHelper";
import { checkTokenExpiration } from "@/_lib/tokenHelper";

export default function Page () {

    const { token, userInfo, setUserInfo, setToken, setError, setResponseMessage, orderNumber, setOrderNumber } = useContext(StateContext)
    const { cartItems } : { cartItems: SelectedCookingClassWithPrices[] } = useSelector((state: ReduxRootState)=> state.cart);

    const dispatch = useDispatch()
    
    const router = useRouter();

    const [isTokenValid, setIsTokenValid] = useState(false);

    // If token is expired, redirects user to the login page
    // useCheckTokenExpiration(token, setIsTokenValid);

    function backToCart(){
        router.push("/cart");
    }

    const handleCheckOut = async (e: FormEvent) => {
        e.preventDefault();

        //  Check if user is logged in
        if (!isUserLogged( userInfo!.email, setResponseMessage, router, `For checking out, please sign in or create an account. ` +
            ` Your items will be kept in your cart.`)) {
            return null;
        }

        //  Check once more if the token is valid, just in case it was valid when page was loaded, but user took too long to click "Confirm Order"
        await checkTokenExpiration(token, setUserInfo, setToken, setIsTokenValid, setResponseMessage, router);
        if (!isTokenValid){
            return null
        };

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
                dispatch(emptyCart());
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
        if (isTokenValid) {
            await addOrder()
        }
    }

    return (
        <div className="container section-checkout">
            <Button size="medium" additionalClass={"btn--back-home"} link={"/"}>&larr; Back to home</Button>
            <div className="cart-toolbar">
                <div className="cart-buttons--title">
                    <SectionHeader 
                        title={"Checkout"}
                        titleAdditionalClass={"cart-header"}
                    />                    
                </div>

                <div className="cart-buttons--btn">
                    <Button type={"button"} onClick={backToCart}>Back to Cart</Button>
                    <Button type={"button"} bgColor={"yellow"} onClick={handleCheckOut}>Confirm Order</Button>
                </div>
            </div>
            <CheckoutItems/>
        </div>
    )
}
