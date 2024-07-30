import { createContext, useState } from "react";

export const StateContext = createContext({});

export default function StateProvider ({ children }) {
    const [keyword, setKeyword] = useState();
    const [cartQuantity, setCartQuantity] = useState(0);
    const [cartItems, setCartItems] = useState([]);

    return (
        <StateContext.Provider value={{keyword, setKeyword, cartQuantity, setCartQuantity, cartItems, setCartItems}}>
            {children}
        </StateContext.Provider>
    );
};