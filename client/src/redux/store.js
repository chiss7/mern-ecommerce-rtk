import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./features/productApi";
import cartReducer from "./features/cartSlice";
import authReducer from "./features/authSlice";
import payReducer from "./features/paySlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    pay: payReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});
