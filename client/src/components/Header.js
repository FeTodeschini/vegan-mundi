import { useContext, useEffect } from "react";
import { StateContext } from "../StateProvider";
import { Outlet } from 'react-router-dom';

import LogoHeader from "./LogoHeader";
import SearchInput from './SearchInput';
import SigninIcon from "./SigninIcon";
import Menu from './Menu';
import ShoppingCartIcon from './ShoppingCartIcon';
import Footer from './Footer';

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
                <LogoHeader />
                <div className="header__action-icons">
                    <ShoppingCartIcon />
                    <SigninIcon />
                    <Menu />
                </div>
                
                <SearchInput placeholder={"What do you want to cook today? (type at least 4 letters)"}/>
            </div>

            <Outlet />

            {/* <Footer /> */}
        </>
    )
}



