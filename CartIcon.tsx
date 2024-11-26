import Link from 'next/link';
import { useSelector } from 'react-redux';
import "../_styles/cart.css";
import { ReduxRootState } from '../_types/redux';

export default function CartIcon () {
    const { cartAmount, cartQuantity } = useSelector((state: ReduxRootState)=> state.cart);
    return (
        <div className="shopping-cart-icon">
            <figure className="header-icon-container">
                <Link href="/cart"><img className="header-icon" src='/assets/shopping-cart.png' alt="Shopping cart icon"/></Link>
                <figcaption className='font-primary-dark uppercase bold header-icon__caption'>${cartAmount}</figcaption>
            </figure>
            <p className="shopping-cart-quantity">{cartQuantity}</p>
        </div>
    )
}