import { useContext } from 'react';
import Link from 'next/link';
import { StateContext } from "../StateProvider";

import "../_styles/cart.css";

export default function CartIcon () {
    const { cartQuantity, cartAmount } = useContext(StateContext);

    return (
        <div className="shopping-cart-icon">
            <figure className="header-icon-container">
                <Link href="/cart"><img className="header-icon" src='/assets/shopping-cart.png' alt=""/></Link>
                <figcaption className='font-primary-dark uppercase bold header-icon__caption'>${cartAmount}</figcaption>
            </figure>
            <p className="shopping-cart-quantity">{cartQuantity}</p>
        </div>
    )
}