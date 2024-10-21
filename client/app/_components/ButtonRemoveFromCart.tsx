import Button from "./Button";
import { useContext } from "react";
import { StateContext } from "../StateProvider";
import { removeFromCart } from "../_lib/CartHelper";
import { PrimitiveTypeProp } from "../_types/global"

export default function ButtonRemoveFromCart({itemTitle}: PrimitiveTypeProp<string>) {
    const { cartItems, cartQuantity, setCartItems, setCartQuantity, cartAmount, setCartAmount } = useContext(StateContext);

    return (
        <Button 
            bgColor={"green"} 
            type={"button"} 
            size={"medium"} 
            onClick={()=>removeFromCart(
                cartItems, 
                cartQuantity, 
                setCartItems, 
                setCartQuantity, 
                cartAmount, 
                setCartAmount,
                itemTitle)}
        >
                Remove Item
        </Button>
    )
}
