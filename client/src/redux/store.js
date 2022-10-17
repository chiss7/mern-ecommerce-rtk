import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./features/productApi";
import cartReducer from "./features/cartSlice";
import authReducer from "./features/authSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});
