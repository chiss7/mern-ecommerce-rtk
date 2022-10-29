import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createOrderRequest } from "../api";

export const createOrder = createAsyncThunk(
  "cart/createOrder",
  async ({ order, toast, navigate }, { rejectWithValue }) => {
    try {
      const res = await createOrderRequest(order);
      toast.success("Order created successfully");
      navigate(`/order/${res.data._id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    orderSummary: localStorage.getItem("orderSummary")
      ? JSON.parse(localStorage.getItem("orderSummary"))
      : {},
    error: "",
    loading: false,
  },
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (itemIndex >= 0) {
        if(state.cartItems[itemIndex].cartQuantity === state.cartItems[itemIndex].countInStock){
          toast.error(`${state.cartItems[itemIndex].name} out of stock!`)
          return;
        }
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.info(
          `${state.cartItems[itemIndex].name} increased to cart quantity!`
        );
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.name} added to cart!`);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      const nextCartItems = state.cartItems.filter(
        (cartItem) => cartItem._id !== action.payload._id
      );
      state.cartItems = nextCartItems;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error(`${action.payload.name} removed from cart!`);
    },
    decreaseCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem._id === action.payload._id
      );
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        toast.info(`Decreased ${action.payload.name} cart quantity!`);
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (cartItem) => cartItem._id !== action.payload._id
        );
        state.cartItems = nextCartItems;
        toast.error(`${action.payload.name} removed from cart!`);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart: (state, action) => {
      state.cartItems = [];
      toast.error(`Cart cleared!`);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    getTotals: (state, action) => {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem(
        "shippingAddress",
        JSON.stringify(state.shippingAddress)
      );
    },
    saveOrderSummary: (state, action) => {
      state.orderSummary = action.payload;
      localStorage.setItem("orderSummary", JSON.stringify(state.orderSummary));
    },
  },
  extraReducers: {
    [createOrder.pending]: (state, action) => {
      state.loading = true;
    },
    [createOrder.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.removeItem("cartItems");
      localStorage.removeItem("shippingAddress");
      localStorage.removeItem("orderSummary");
      state.cartItems = [];
      state.shippingAddress = {};
      state.orderSummary = {};
      state.error = "";
    },
    [createOrder.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  decreaseCart,
  getTotals,
  saveShippingAddress,
  saveOrderSummary,
} = cartSlice.actions;

export default cartSlice.reducer;
