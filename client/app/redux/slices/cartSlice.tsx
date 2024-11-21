import { CartState } from "../../_types/cart";
import { SelectedCookingClassWithPrices } from "../../_types/cooking-class";
import { createSlice } from "@reduxjs/toolkit";

const initialState: CartState = {
    cartQuantity: 0,
    cartAmount: 0,
    cartItems: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
      addItem(state, action) {
        localStorage.setItem('cartQuantity', (Number(state.cartQuantity) + 1).toString());
        localStorage.setItem('cartAmount', (state.cartAmount + action.payload.PRICE).toString());
        localStorage.setItem('cartItems', JSON.stringify([...state.cartItems, action.payload]));

        state.cartQuantity ++;
        state.cartAmount += action.payload.PRICE;
        state.cartItems = [...state.cartItems, action.payload];
      },
      removeItem(state, action) {
        const removeAmount = Number(state.cartItems.filter(
            (item: SelectedCookingClassWithPrices)=>item.CLASS_ID === action.payload.CLASS_ID).map(
                (item: SelectedCookingClassWithPrices)=> item.PRICE));

        localStorage.setItem('cartQuantity', (Number(state.cartQuantity) - 1).toString());
        localStorage.setItem('cartAmount', (state.cartAmount - removeAmount).toString());
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems.filter((item: SelectedCookingClassWithPrices)=>item.CLASS_ID !== action.payload.CLASS_ID).map(item=> item)));

        state.cartQuantity --;
        state.cartAmount -= removeAmount;
        state.cartItems = state.cartItems.filter((item: SelectedCookingClassWithPrices) => item.CLASS_ID !== action.payload.CLASS_ID);
      },
      emptyCart(state){
        localStorage.setItem('cartItems', JSON.stringify([]));
        localStorage.setItem('cartQuantity', (0).toString());
        localStorage.setItem('cartAmount', (0).toString());

        state.cartQuantity = 0;
        state.cartAmount = 0;
        state.cartItems = [];
      },

      updateCartFromLocalStorage: (state) => {
        const cartItems = localStorage.getItem('cartItems');
        const parsedCartItems = cartItems ? JSON.parse(cartItems) : [];

        const cartQuantity = localStorage.getItem('cartQuantity');
        const cartAmount = localStorage.getItem('cartAmount');

        state.cartQuantity = cartQuantity ? Number(cartQuantity) : 0;
        state.cartAmount = cartAmount ? Number(cartAmount) : 0;
        state.cartItems = parsedCartItems;
      },
    },
});

export const { addItem, removeItem, emptyCart, updateCartFromLocalStorage } = cartSlice.actions;

export default cartSlice.reducer;

