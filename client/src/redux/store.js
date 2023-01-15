import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./features/productApi";
import cartReducer from "./features/cartSlice";
import authReducer from "./features/authSlice";
import payReducer from "./features/paySlice";
import orderReducer from "./features/orderSlice";
import productReducer from "./features/productSlice";
import { userApi } from "./features/userApi";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    pay: payReducer,
    order: orderReducer,
    product: productReducer,
    [productApi.reducerPath]: productApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware, userApi.middleware),
});
