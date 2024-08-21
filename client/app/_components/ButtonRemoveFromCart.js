import Button from "./Button.js";
import { useContext } from "react";
import { StateContext } from "../StateProvider.js";
import { removeFromCart } from "../_lib/CartHelper.js";

export default function ButtonRemoveFromCart(itemTitle) {
    const { cartItems, cartQuantity, setCartItems, setCartQuantity, cartAmount, setCartAmount } = useContext(StateContext);

    return (
        <Button 
            bgColor={"green"} 
            type={"button"} 
            size={"medium"} 
            onClick={()=>removeFromCart(cartItems, 
                cartQuantity, 
                setCartItems, 
                setCartQuantity, 
                cartAmount, 
                setCartAmount, 
                itemTitle.itemTitle)} // itemTitle is received as an object an not as a string, so it is necessary to extract the property itemTitle from itself
        >
                Remove Item
        </Button>
    )
}
