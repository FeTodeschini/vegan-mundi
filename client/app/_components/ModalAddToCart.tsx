'use client'

import React from "react";
import { useState } from "react";
import Modal from "./Modal";
import { useGetPrices } from "../hooks/useGetPrices";
import SectionHeader from "./SectionHeader";
import ButtonsAddToCartCancel from "./ButtonsAddToCartCancel";
import ItemCounter from "./ItemCounter";
import { ModalAddToCartProps } from "@/_types/cart";
import { Price, SelectedPrice, initialSelectedPrice } from "@/_types/price";
import { enumDeliveryMethods } from "@/_lib/enums";
import CustomDatePicker from "./CustomDatePicker";
import "../_styles/cart.css"

const ModalAddToCart = React.memo(function ModalAddToCart({ modalTitle, modalSubTitle, closeModal, padding }: ModalAddToCartProps) {

    const [isLoading, setIsLoading] = useState(true);
    const [prices, setPrices] = useState<Price[]>([]);
    const [selectedPrice, setSelectedPrice] = useState<SelectedPrice>(initialSelectedPrice);
    const [displayItemCounter, setDisplayItemCounter] = useState<number|boolean>(0);
    const [displayDatePicker, setDisplayDatePicker] = useState<number | null>(null)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [studentCounts, setStudentCounts] = useState<number[]>([]);
    
    // Defines the price to be charged for the selected based on the class delivery method and number of students that will attend it
    const handleSetSelectedPrice = (price: Price) => {
        // For the in person class, the price is charged based on the quantity of students
        setDisplayItemCounter(price.MULTIPLE_STUDENTS);
        
        // displayDatePicker defines for which price types (AKA "Class delivery method") the DatePicker should be displayed
        setDisplayDatePicker(
            price.PRICE_ID === enumDeliveryMethods.IN_PERSON || price.PRICE_ID === enumDeliveryMethods.ONLINE_WITH_INSTRUCTOR 
                ? price.PRICE_ID 
                : null
        );

        setSelectedPrice({
            ...price,
            PRICE: (studentCounts[price.PRICE_ID] || 1) * price.PRICE,
            STUDENTS: studentCounts[price.PRICE_ID] || 1,
            MULTIPLE_STUDENTS: price.MULTIPLE_STUDENTS === 1 ? true : false,
            MIN_STUDENTS_FOR_DISCOUNT: price.MIN_STUDENTS_FOR_DISCOUNT,
            DISCOUNT_PERCENTAGE: price.DISCOUNT_PERCENTAGE,
        });
    };

    const handleSelectDate = (date: any) => {
        setSelectedDate(date);

        // Add the selected class date to the price array
        setSelectedPrice((prev) => ({
            ...prev,
            CLASS_DATE: date.toISOString().slice(0, 10),
        }));
    }


    // Handles the decrease or increase of students for a class when User clicks the "-" or "+" button
    const handleStudentCountChange = (count: number, price: Price) => {
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

    function calculateDiscount(price: Price, students: number) {
        // Discount is only eligible if minimun amount of students per class is reached
        return students >= price.MIN_STUDENTS_FOR_DISCOUNT 
            ? (price.PRICE * students * price.DISCOUNT_PERCENTAGE/100) 
            : 0;
    }

    // Retrieves prices for each type of class from the database
    useGetPrices( prices, setPrices, isLoading, setIsLoading );

    return (
       <Modal padding={padding} closeModal={closeModal}>
            <div className="cart-modal">
                <SectionHeader 
                    subTitle={modalSubTitle}
                    title={modalTitle}
                />

                <div className="modal-act--content">
                    {prices.map(price=> {
                        
                        //  Creates an object to enrich the selectedClass with price details based on the type of class selected
                        const index = price.PRICE_ID;
                        const studentCount = studentCounts[index] || 1;
                        const discount = calculateDiscount(price, studentCount);
                        const adjustedPrice = price.MULTIPLE_STUDENTS ? price.PRICE * studentCount - discount : price.PRICE;
                        return (
                            <div key={price.PRICE_ID} className="modal-atc--content-item bottom-margin--small">
                                <input 
                                    type="radio" 
                                    name="delyveryMethod"
                                    onChange={()=>handleSetSelectedPrice(price)}/>
                                <label htmlFor="delyveryMethod" className='regular-text'>{price.DESCRIPTION}: ${adjustedPrice}</label>
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
                                                items={String(studentCount)} 
                                                setItems={(count: string) => handleStudentCountChange(Number(count), price)} />
                                        </div>
                                    </div> :
                                        ""}
                                {
                                    (price.PRICE_ID === enumDeliveryMethods.IN_PERSON || price.PRICE_ID === enumDeliveryMethods.ONLINE_WITH_INSTRUCTOR) ?
                                        <div className="grid-col-2 regular-text-small bold top-margin--small" style={{display: displayDatePicker === price.PRICE_ID ? "block" : "none"}}>
                                            <CustomDatePicker 
                                                label={"Class date: "}
                                                selectedDate={selectedDate}
                                                onDateChange={date => handleSelectDate(date)}
                                                key={price.PRICE_ID}
                                            />
                                        </div> 
                                        : ""

                                }
                            </div>
                        )
                    })}
                </div>
            </div>                
            <ButtonsAddToCartCancel selectedPrice={selectedPrice}
            />
        </Modal>
    )
})


export default ModalAddToCart;