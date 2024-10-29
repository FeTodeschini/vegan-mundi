'use client'

import { useContext, useEffect } from "react";
import { StateContext } from "../StateProvider";

import LogoHeader from "./LogoHeader";
import SearchInput from './SearchInput';
import SigninIcon from "./SigninIcon";
import Menu from './Menu';
import CartIcon from './CartIcon';
import { useGeCartItemsFromLocalStorage } from "@/hooks/useGetCartItemsFromLocalStorage";
import "../_styles/menu.css";

export default function Header() {

    useGeCartItemsFromLocalStorage()

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



