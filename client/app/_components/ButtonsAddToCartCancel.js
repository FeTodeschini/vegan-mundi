import { useContext, useState } from "react";
import { StateContext } from "../StateProvider.js";
import { useModal } from "./Modal.js";
import Button from "./Button.js";

export default function ButtonsAddToCartCancel ({selectedPrice}){

    const { setCartQuantity, cartQuantity, cartItems, setCartItems, selectedClass, cartAmount, setCartAmount } = useContext(StateContext);
    const { closeModal } = useModal();

    function onAddToCart() {
        console.log(`selectedPrice: ${JSON.stringify(selectedPrice)}`);

        // Enriches the selectedClass with the price details (type, description, price and number of students)
        const selectedClassWithPrice = {
            ...selectedClass,
            PRICE_TYPE_ID: selectedPrice.PRICE_ID,
            PRICE_TYPE_DESCRIPTION: selectedPrice.DESCRIPTION,
            PRICE: selectedPrice.PRICE,
            MULTIPLE_STUDENTS: selectedPrice.MULTIPLE_STUDENTS,
            STUDENTS: selectedPrice.STUDENTS,
            MIN_STUDENTS_FOR_DISCOUNT: selectedPrice.MIN_STUDENTS_FOR_DISCOUNT,
            DISCOUNT: selectedPrice.DISCOUNT,            
        }

        // Converts the cartItems to a string, as local storage only stores strings
        localStorage.setItem('cartItems', JSON.stringify([...cartItems, selectedClassWithPrice]));
        localStorage.setItem('cartQuantity', cartQuantity + 1);
        localStorage.setItem('cartAmount', cartAmount + selectedClassWithPrice.PRICE );

        setCartItems([...cartItems, selectedClassWithPrice]);
        setCartQuantity(items=>items + 1);
        setCartAmount(amount=>amount + Number(selectedClassWithPrice.PRICE))
        closeModal();
    }

    return (
        <div className="modal-atc--buttons">
            <Button bgColor={"green"} type={"button"} size={"medium"} onClick={()=>onAddToCart()}>Add to cart</Button>
            <Button type={"button"} size={"medium"} onClick={()=>closeModal()}>Cancel</Button>
        </div>
    )
}