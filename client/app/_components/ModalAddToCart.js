import { useState } from "react";
import { Modal } from "./Modal";
import { useGetPrices } from "../hooks/useGetPrices";
import SectionHeader from "./SectionHeader";
import ButtonsAddToCartCancel from "./ButtonsAddToCartCancel";
import ItemCounter from "./ItemCounter";

import "../_styles/cart.css"

export default function ModalAddToCart({ modalTitle, modalSubTitle, padding }) {

    const [isLoading, setIsLoading] = useState(true);
    const [prices, setPrices] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState({});
    const [displayItemCounter, setDisplayItemCounter] = useState(false);

    const [studentCounts, setStudentCounts] = useState({});
    
    const handleSetSelectedPrice = (event, price) => {
        setStudentCounts("1");
        setDisplayItemCounter(price.MULTIPLE_STUDENTS);
        setSelectedPrice({
            ...price,
            PRICE: (studentCounts[price.PRICE_ID] || 1) * price.PRICE,
            STUDENTS: studentCounts[price.PRICE_ID] || 1,
            MULTIPLE_STUDENTS: price.MULTIPLE_STUDENTS === 1 ? true : false,
            MIN_STUDENTS_FOR_DISCOUNT: price.MIN_STUDENTS_FOR_DISCOUNT,
            DISCOUNT: price.DISCOUNT,            
        });
    };

    // Handles the decrease or increase of students for a class when User clicks the "-" or "+" button
    const handleStudentCountChange = (count, price) => {
        setStudentCounts((prev) => ({ ...prev, [price.PRICE_ID]: count }));
        const discount = calculateDiscount(price, count);

        // Updates the number of students and recalculates the price based on number of students
        if (selectedPrice.PRICE_ID === price.PRICE_ID) {
            setSelectedPrice((prev) => ({
                ...prev,
                STUDENTS: count,
                PRICE: price.PRICE * count - discount,                
            }));
        }
    };

    function calculateDiscount(price, students) {
        // Discount is only eligible if minimun amount of students per class is reached
        return students >= price.MIN_STUDENTS_FOR_DISCOUNT 
            ? (price.PRICE * students * price.DISCOUNT/100) 
            : 0;
    }

    // Retrieves prices for each type of class from the database
    useGetPrices(prices, setPrices, isLoading, setIsLoading);

    return (
        <Modal padding={padding}>
            <div className="cart-modal">
                <SectionHeader 
                    subTitle={modalSubTitle}
                    title={modalTitle}
                />

                <div className="modal-act--content">
                    {prices.map(price=> {
                        
                        //  Creates an object to enrich the selectedClass with price details based on the type of class selected
                        const studentCount = studentCounts[price.PRICE_ID] || 1;
                        const discount = calculateDiscount(price, studentCount);
                        const adjustedPrice = price.MULTIPLE_STUDENTS ? price.PRICE * studentCount - discount : price.PRICE;
                        return (
                            <div className="modal-atc--content-item bottom-margin--small">
                                <input 
                                    type="radio" 
                                    name="delyveryMethod"
                                    onChange={(event)=>handleSetSelectedPrice(event, price)}/>
                                <label for="delyveryMethod" className='regular-text'>{price.DESCRIPTION}: ${adjustedPrice}</label>
                                {
                                    price.ADDITIONAL_INFO_CART.split("|").map(info => {
                                        return <p className='grid-col-2 regular-text-small' key={info}>{info}</p>
                                    })
                                }
                                {price.MULTIPLE_STUDENTS ? 
                                    <div className="modal-act--students-count top-margin--small grid-col-2" style={{display: displayItemCounter ? "block" : "none"}}>
                                        <p className="regular-text-small bold">How many students?</p>
                                        <div className="modal-atc--item-counter">
                                            <ItemCounter 
                                                initialItems={String(studentCount)}
                                                minItems={1}
                                                maxItems={4}
                                                items={studentCount} 
                                                setItems={(count) => handleStudentCountChange(count, price)} />
                                        </div>
                                    </div> :
                                        ""}
                            </div>
                        )
                    })}
                    <div className="modal-act--schedule regular-text-small">
                        <p>Schedule classes with an Instructor after purchasing them by visiting the "My Classes" page</p>
                    </div>
                </div>
            </div>                
            <ButtonsAddToCartCancel selectedPrice={selectedPrice}
            />
        </Modal>
    )
}
