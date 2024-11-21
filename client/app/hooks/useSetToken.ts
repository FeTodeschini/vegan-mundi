'use client';

import { StateContext } from "../StateProvider";
import { useContext, useEffect } from "react";

export default function useSetToken() {
    const { setToken, token } = useContext(StateContext);

    // Get the JWT token from localStorage, as the token state variable is erased when page is refreshed or route changes
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    return token;
}