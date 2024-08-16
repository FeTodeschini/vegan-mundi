import { useContext } from 'react';
import Link from 'next/link';
import { StateContext } from "../StateProvider.js";

import shoppingCart from '../../public/assets/shopping-cart.png';

import "../_styles/shopping-cart.css";

export default function ShoppingCartIcon () {
    const { cartQuantity } = useContext(StateContext);

    return (
        <div className="shopping-cart-icon">
            <figure className="header-icon-container">
                <Link href="/cart"><img className="header-icon" src={shoppingCart.src} alt=""/></Link>
                <figcaption className='font-primary-dark uppercase bold header-icon__caption'>$0.00</figcaption>
            </figure>
            <p className="shopping-cart-quantity">{cartQuantity}</p>
        </div>
    )
}