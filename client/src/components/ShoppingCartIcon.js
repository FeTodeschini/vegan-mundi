import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { StateContext } from "../StateProvider.js";

import shoppingCart from '../assets/shopping-cart.png';

import "../css/shopping-cart.css";

export default function ShoppingCartIcon () {
    const { cartQuantity } = useContext(StateContext);
    const navigate = useNavigate();

    return (
        <div className="shopping-cart-icon">
            <figure className="header-icon-container">
                <img className="header-icon" src={shoppingCart.src} alt="" onClick={()=>navigate("/cart")}/>
                <figcaption className='font-primary-dark uppercase bold header-icon__caption'>$0.00</figcaption>
            </figure>
            <p className="shopping-cart-quantity">{cartQuantity}</p>
        </div>
    )
}