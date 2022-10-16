import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/productSlice";
import { productApi } from "./features/productApi";
import cartReducer from "./features/cartSlice";
import authReducer from "./features/authSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    auth: authReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});
