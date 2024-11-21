import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "../redux/slices/cartSlice";
import reviewReducer from "../redux/slices/reviewSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    review: reviewReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;

export type DispatchType = typeof store.dispatch;