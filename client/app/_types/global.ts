import { ReactNode } from 'react';
import {  CookingClass, SelectedCookingClass, SelectedCookingClassWithPrices } from './cooking-class'

// Type for components to receive a single prop of any primitive type (string, number, boolean)
export type PrimitiveTypeProp<T> = {
    [key: string]: T;
};

// Type for components to receive a single array prop 
export type ArrayProps<T> = {
    [key: string]: T[];
};

export type ObjectProperty = {
    [key: string]: string;
};

export type Setter<T> = (value: T | ((prevState: T) => T)) => void;

export interface StateObject<T> {
    [key: string | number]: T | ((value: T) => void);
}

export interface HTMLElementsProps {
    [key: string]: string[];
}

export interface ChildrenProps {
    children?: ReactNode;
}

export interface FilteredClassesProps {
    images: CookingClass[];
    resultsFound?: number;
    title: string;
    subTitle: string;
    dataLoaded: boolean;
}

export interface UserInfo {
    firstName: string,
    lastName: string,
    email: string
}

export interface CustomDatePickerProps {
    label: string;
    selectedDate: Date | null;
    onDateChange: (date: Date | null, event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void;
}


export interface StateContextType {
    keyword: string;
    setKeyword: (keyword: string) => void;
    cartQuantity: number;
    setCartQuantity: (cartQuantity: number | ((prevQuantity: number) => number)) => void;
    cartItems: SelectedCookingClassWithPrices[];
    setCartItems: (items: SelectedCookingClassWithPrices[]) => void;
    cartAmount: number;
    setCartAmount: (cartAmount: number | ((prevcartAmount: number) => number)) => void;
    error: string;
    setError: (error: string) => void;
    responseMessage: string;
    setResponseMessage: (responseMessage: string) => void;
    isModalOpen: boolean;
    setIsModalOpen: (isModalOpen: boolean) => void;
    selectedClass: SelectedCookingClass | null;
    setSelectedClass: (selectedClass: any) => void;
    userInfo: UserInfo | undefined,
    setUserInfo: (userInfo: UserInfo) => void;
    orderNumber: string;
    setOrderNumber: (orderNumber: string) => void;
    token: string;
    setToken: (token: string) => void;
}