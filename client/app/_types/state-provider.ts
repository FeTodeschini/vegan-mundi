import { UserInfo } from './global';
import {  SelectedCookingClass, SelectedCookingClassWithPrices } from './cooking-class'

export type SetCartItems = (items: SelectedCookingClassWithPrices[]) => void
export type SetCartQuantity = (cartQuantity: number | ((prevQuantity: number) => number)) => void
export type SetCartAmount = (cartAmount: number | ((prevcartAmount: number) => number)) => void

export interface StateContextType {
    keyword: string;
    setKeyword: (keyword: string) => void;
    cartQuantity: number;
    setCartQuantity: SetCartQuantity;
    cartItems: SelectedCookingClassWithPrices[];
    setCartItems:SetCartItems;
    cartAmount: number;
    setCartAmount: SetCartAmount;
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
    token: string;
    setToken: (token: string) => void;
}