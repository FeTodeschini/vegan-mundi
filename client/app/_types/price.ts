import { Dispatch, SetStateAction } from "react";

export interface Price {
    PRICE_ID: number,
    DESCRIPTION: string,
    PRICE: number,
    ICON: string,
    GREAT_VALUE: number,
    ADDITIONAL_INFO: string,
    MULTIPLE_STUDENTS: number | boolean,
    MIN_STUDENTS_FOR_DISCOUNT: number,
    DISCOUNT_PERCENTAGE: number,
    ADDITIONAL_INFO_CART: string,
}

export interface SelectedPrice extends Price{
    STUDENTS: number
}

export interface SelectedPriceProps {
    selectedPrice: SelectedPrice
}

export interface GetPrices {
    prices: Price[],
    setPrices: Dispatch<SetStateAction<Price[]>>,
    isLoading: boolean,
    setIsLoading: Dispatch<SetStateAction<boolean>>
}

export const initialPrice: Price = {
    PRICE_ID: 0,
    DESCRIPTION: '',
    PRICE: 0,
    ICON: '',
    GREAT_VALUE: 0,
    ADDITIONAL_INFO: '',
    MULTIPLE_STUDENTS: 0,
    MIN_STUDENTS_FOR_DISCOUNT: 0,
    DISCOUNT_PERCENTAGE: 0,
    ADDITIONAL_INFO_CART: '',
}

export const initialSelectedPrice: SelectedPrice = {
    ...initialPrice,
    STUDENTS: 1,
};