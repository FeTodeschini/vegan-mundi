import { useContext } from "react";
import { StateContext } from "../StateProvider";
import Button from "./Button";
import { SelectedPriceProps } from "@/_types/price";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/slices/cartSlice"

export default function ButtonsAddToCartCancel ({selectedPrice}: SelectedPriceProps){

    const { selectedClass, setIsModalOpen } = useContext(StateContext);

    const closeModal = () => {setIsModalOpen(false);};
    const dispatch = useDispatch();
    
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
            CLASS_DATE: selectedPrice.CLASS_DATE
        }

        dispatch(addItem(selectedClassWithPrice));
        setIsModalOpen(false);
    }

    return (
        <div className="modal-atc--buttons">
            <Button bgColor={"green"} type={"button"} size={"medium"} onClick={()=>onAddToCart()}>Add to cart</Button>
            <Button type={"button"} size={"medium"} onClick={()=>closeModal()}>Cancel</Button>
        </div>
    )
}