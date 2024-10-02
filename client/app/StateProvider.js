import { createContext, useState } from "react";

export const StateContext = createContext({ });

export default function StateProvider ({ children }) {
    const [keyword, setKeyword] = useState();
    const [cartQuantity, setCartQuantity] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [cartAmount, setCartAmount] = useState(Number(0));
    const [error, setError] = useState("");
    const [responseMessage, setResponseMessage] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);

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