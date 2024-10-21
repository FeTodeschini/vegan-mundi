import { SelectedCookingClassWithPrices } from "@/_types/cooking-class";

// Removes an item from the shopping cart (remove the item from the array and decrease the quantity of items in the cart)
export function removeFromCart( cartItems: SelectedCookingClassWithPrices[],
        cartQuantity: number,
        setCartItems: (items: SelectedCookingClassWithPrices[]) => void, 
        setCartQuantity: (cartQuantity: number | ((prevQuantity: number) => number)) => void,
        cartAmount: number,
        setCartAmount: (cartAmmount: number | ((prevQuantity: number) => number)) => void,
        removeItemTitle: string
){
    // Gets the price of the item to be removed from the cart
    const removeAmount = Number(cartItems.filter((item)=>item.TITLE === removeItemTitle).map(item=> item.PRICE));

    localStorage.setItem('cartItems', JSON.stringify(cartItems.filter((item)=>item.TITLE !== removeItemTitle).map(item=> item)));
    localStorage.setItem('cartQuantity', (Number(cartQuantity) - 1).toString());
    localStorage.setItem('cartAmount', (cartAmount - removeAmount).toString());

    const updatedCartItems = cartItems.filter((item) => item.TITLE !== removeItemTitle);
    setCartItems(updatedCartItems)
    setCartQuantity((cartQuantity: number) => cartQuantity - 1);
    setCartAmount((cartAmmount: number) => cartAmmount - removeAmount);
}