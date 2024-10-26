import { ReactNode } from 'react';
import {  CookingClass, SelectedCookingClass, SelectedCookingClassWithPrices } from './cooking-class'

export interface ChildrenProps {
    children?: ReactNode;
}

export interface ModalProps extends ChildrenProps {
    padding: string,
}

export interface SectionHeaderProps {
    title?: string,
    subTitle?: string
}

export interface FilteredClassesProps extends SectionHeaderProps {
    images: CookingClass[],
    resultsFound?: number,
}

export interface GalleryPictures {
    PRE_SIGNED_URL: string,
    LABEL: string
}

export interface UserInfo {
    firstName: string,
    lastName: string,
    email: string
}

// Type for components to receive a single prop of any primitive type (string, number, boolean)
export type PrimitiveTypeProp<T> = {
    [key: string]: T;
};

export type Setter<T> = (value: T | ((prevState: T) => T)) => void;

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