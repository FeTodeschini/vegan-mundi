import { createContext, useState } from "react";
import { ChildrenProps, StateContextType } from './_types/global';
import { SelectedCookingClass, SelectedCookingClassWithPrices } from './_types/cooking-class';

export const StateContext = createContext<StateContextType>(
    {
        keyword: "",
        setKeyword: () => {},
        cartQuantity: 0,
        setCartQuantity: () => {},
        cartItems: [],
        setCartItems: () => {},
        cartAmount: 0,
        setCartAmount: () => {},
        error: "",
        setError: () => {},
        responseMessage: "",
        setResponseMessage: () => {},
        isModalOpen: false,
        setIsModalOpen: () => {},
        selectedClass: null,
        setSelectedClass: () => {}
    }
);

export default function StateProvider ({ children }: ChildrenProps) {
    const [keyword, setKeyword] = useState<string>("");
    const [cartQuantity, setCartQuantity] = useState<number>(0);
    const [cartItems, setCartItems] = useState<SelectedCookingClassWithPrices[]>([]);
    const [cartAmount, setCartAmount] = useState<number>(Number(0));
    const [error, setError] = useState<string>("");
    const [responseMessage, setResponseMessage] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedClass, setSelectedClass] = useState<SelectedCookingClass | null>(null);

    return (
        <StateContext.Provider value={{
            keyword, 
            setKeyword, 
            cartQuantity, 
            setCartQuantity, 
            cartItems, 
            setCartItems,
            cartAmount,
            setCartAmount, 
            error, 
            setError,
            responseMessage, 
            setResponseMessage,
            isModalOpen,
            setIsModalOpen,
            selectedClass,
            setSelectedClass}}>
            {children}
        </StateContext.Provider>
    );
};