import { createContext, useState } from "react";

export const MenuStateContext = createContext({});

// This is the component that provides the COntext so the variable isMenuVisible can be shared accross different components
export default function MenuStateProvider ({ children }) {

    function useMenuState() {

        const [isMenuVisible, setIsMenuVisible] = useState(false);

        const toggleMenuState = () => {
          setIsMenuVisible(!isMenuVisible);
          console.log("Test 1");
        };

        return {
          isMenuVisible,
          toggleMenuState
        };
    }

    const value = useMenuState();

    return (
        <MenuStateContext.Provider value={value}>
            {children}{console.log(`Value: ${value}`)}
        </MenuStateContext.Provider>
    );
};