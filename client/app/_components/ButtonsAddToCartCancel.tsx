import { useContext } from "react";
import { StateContext } from "../StateProvider";
import { useModal } from "./Modal";
import Button from "./Button";
import { SelectedPriceProps } from "@/_types/price";

export default function ButtonsAddToCartCancel ({selectedPrice}: SelectedPriceProps){

    const { setCartQuantity, cartQuantity, cartItems, setCartItems, selectedClass, cartAmount, setCartAmount } = useContext(StateContext);
    const { closeModal } = useModal();

    function onAddToCart() {

        if (!selectedClass || !selectedPrice) return;
        
        // Enriches the selectedClass with the price details (type, description, price and number of students)
        const selectedClassWithPrice = {
            ...selectedClass,
            PRICE_TYPE_ID: selectedPrice.PRICE_ID,
            PRICE_TYPE_DESCRIPTION: selectedPrice.DESCRIPTION,
            PRICE: selectedPrice.PRICE,
            DISCOUNT_PERCENTAGE: selectedPrice.DISCOUNT_PERCENTAGE,
            STUDENTS: selectedPrice.STUDENTS,
        }

        // Converts the cartItems to a string, as local storage only stores strings
        // Before thypescript, the line below had JSON.stringfy([...cartItems, selectedClassWithPrice])
        // After Typescript, the nullish coalescing operator ?? is now being used to avoid warnings in case cartItems is empty
        localStorage.setItem('cartItems', JSON.stringify([...cartItems ?? [], selectedClassWithPrice]));
        localStorage.setItem('cartAmount', (cartAmount + selectedClassWithPrice.PRICE).toString() );
        localStorage.setItem('cartQuantity', (cartQuantity + 1).toString());
        
        if (setCartItems)
             setCartItems([...cartItems ?? [], selectedClassWithPrice]);

        if (setCartQuantity)
            setCartQuantity(items=>items + 1);

        if (setCartAmount)
            setCartAmount(amount=>amount + Number(selectedClassWithPrice.PRICE));

        closeModal();
    }

    return (
        <div className="modal-atc--buttons">
            <Button bgColor={"green"} type={"button"} size={"medium"} onClick={()=>onAddToCart()}>Add to cart</Button>
            <Button type={"button"} size={"medium"} onClick={()=>closeModal()}>Cancel</Button>
        </div>
    )
}