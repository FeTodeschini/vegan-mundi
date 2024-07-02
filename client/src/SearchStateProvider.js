import { createContext, useState } from "react";

export const SearchStateContext = createContext({});

export default function SearchStateProvider ({ children }) {
    const [keyword, setKeyword] = useState();

    return (
        <SearchStateContext.Provider value={{keyword, setKeyword}}>
            {children}
        </SearchStateContext.Provider>
    );
};