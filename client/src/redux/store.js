import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./features/productApi";
import cartReducer from "./features/cartSlice";
import authReducer from "./features/authSlice";
import payReducer from "./features/paySlice";
import orderReducer from "./features/orderSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    pay: payReducer,
    order: orderReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});
