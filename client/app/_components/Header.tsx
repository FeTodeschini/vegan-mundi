'use client'

import { useContext, useEffect } from "react";
import { StateContext } from "../StateProvider";

import LogoHeader from "./LogoHeader";
import SearchInput from './SearchInput';
import SigninIcon from "./SigninIcon";
import Menu from './Menu';
import CartIcon from './CartIcon';

import { SelectedCookingClassWithPrices } from "@/_types/cooking-class";

import "../_styles/menu.css";

export default function Header() {

    const { setCartQuantity, setCartItems } = useContext(StateContext);

    useEffect (()=> {
        setCartQuantity(() => {
            return Number(localStorage.getItem('cartQuantity'));
        });

        // // convert the string that is in the localStorage into an array (as localStorage only stores strings, adn Typescript enforces strict typing)
        const cartItems = localStorage.getItem('cartItems');
        setCartItems(cartItems ? JSON.parse(cartItems) as SelectedCookingClassWithPrices[] : []);

    }, []);

    return (
        <>
            <div className="header">
                <LogoHeader />
                <div className="header__action-icons">
                    <CartIcon />
                    <SigninIcon />
                    <Menu />
                </div>
                
                <SearchInput placeholder={"What do you want to cook today? (type at least 4 letters)"}/>
            </div>
        </>
    )
}



