// Removes an item from the shopping cart (remove the item from the array and decrease the quantity of items in the cart)
export function removeFromCart(cartItems, cartQuantity, setCartItems, setCartQuantity, cartAmount, setCartAmount, removeItemTitle){

    // Gets the price of the item to be removed from the cart
    const removeAmount = cartItems.filter((item)=>item.TITLE === removeItemTitle).map(item=> item.PRICE);

    localStorage.setItem('cartItems', JSON.stringify(cartItems.filter((item)=>item.TITLE !== removeItemTitle).map(item=> item)));
    localStorage.setItem('cartQuantity', cartQuantity - 1);
    localStorage.setItem('cartAmount', cartAmount - removeAmount);

    setCartItems((items)=>items.filter((item)=>item.TITLE !== removeItemTitle).map(item=> item));
    setCartQuantity(quantity=>quantity-1);
    setCartAmount(amount=>amount - removeAmount);
}