import { useState } from "react";
import useSetToken from "../hooks/useSetToken";

export default function Menu() {
    const token = useSetToken();

    const [isVisible, setIsVisible] = useState(false);

    const toggleMenu = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className="menu">
            <img className="header-icon" src="/assets/menu.svg" onClick={toggleMenu} alt="Open menu icon"/>
            <div className={`menu-container ${isVisible ? "menu-container__visible" : "menu-container__hidden"}`}>
                <p className="menu-hamburguer__close" onClick={toggleMenu}>&times;</p>
                <ul className={`menu-items ${isVisible ? "menu-items__visible" : "menu-items__hidden"}`}>
                    {token && (<a href="/classes/myclasses"><li>My Classes</li></a>)}
                    <a href="#"><li>Delivery Methods</li></a>
                    <a href="#"><li>Classes Catalog</li></a>
                    <a href="#free-classes"><li>Free Classes</li></a>
                    <a href="#prices"><li>Prices</li></a>
                    <a href="#"><li>Contact Us</li></a>
                </ul>
            </div>
        </div>
    );
}