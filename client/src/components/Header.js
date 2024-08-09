import { useContext, useEffect } from "react";
import { StateContext } from "../StateProvider.js";
import { Outlet } from 'react-router-dom';

import Logo from './Logo.js';
import SearchInput from './SearchInput.js';
import LoginIcon from "./LoginIcon.js";
import Menu from './Menu.js';
import ShoppingCartIcon from './ShoppingCartIcon.js';
import Footer from './Footer.js';

import "../css/menu.css";

export default function Header() {

    const { setCartQuantity, setCartItems } = useContext(StateContext);

    useEffect (()=> {
        setCartQuantity(() => {
            return Number(localStorage.getItem('cartQuantity'));
        });

        // // convert the string that is in the localStorage into an array (as localStorage only stores strings)
        setCartItems(() => {
            return JSON.parse(localStorage.getItem('cartItems'))
        });

    }, []);

    return (
        <>
            <div className="header">
                <Logo />
                <div className="header__action-icons">
                    <ShoppingCartIcon />
                    <LoginIcon />
                    <Menu />
                </div>
                
                <SearchInput placeholder={"What do you want to cook today? (type at least 4 letters)"}/>
            </div>

            <Outlet />

            {/* <Footer /> */}
        </>
    )
}



