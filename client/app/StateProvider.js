import { createContext, useState } from "react";

export const StateContext = createContext({ });

export default function StateProvider ({ children }) {
    const [keyword, setKeyword] = useState();
    const [cartQuantity, setCartQuantity] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState("");
    const [responseMessage, setResponseMessage] = useState();

    return (
        <StateContext.Provider value={{
            keyword, 
            setKeyword, 
            cartQuantity, 
            setCartQuantity, 
            cartItems, 
            setCartItems, 
            error, 
            setError,
            responseMessage, 
            setResponseMessage}}>
            {children}
        </StateContext.Provider>
    );
};