import { useContext, useEffect } from "react";
import { StateContext } from "../StateProvider.js";
import { Outlet } from 'react-router-dom';

import Logo from './Logo.js';
import SearchInput from './SearchInput.js';
import Login from './Login.js';
import Menu from './Menu.js';
import ShoppingCartIcon from './ShoppingCartIcon.js';
import Footer from './Footer.js';

import "../css/menu.css";

export default function Header({ placeholder }) {

    const { cartItems, setCartQuantity, setCartItems } = useContext(StateContext);

    useEffect (()=> {
        setCartQuantity(Number(localStorage.getItem('cartQuantity')));
        // convert into an array the string that is in the localStorage
        setCartItems(JSON.parse(localStorage.getItem('cartItems')));
    }, []);

    return (
        <>
            <div className="header">
                <Logo />
                <div className="header__action-icons">
                    <ShoppingCartIcon />
                    <Login />
                    <Menu />
                </div>
                
                <SearchInput placeholder={"What do you want to cook today? (type at least 4 letters)"}/>
            </div>

            <Outlet />

            {/* <Footer /> */}
        </>
    )
}



