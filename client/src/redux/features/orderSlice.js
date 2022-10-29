import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOrderByIdRequest, getOrdersByUserRequest, getOrdersRequest } from "../api";

export const getOrders = createAsyncThunk(
  "order/getOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getOrdersRequest();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getOrder = createAsyncThunk(
  "order/getOrder",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getOrderByIdRequest(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getOrdersByUser = createAsyncThunk(
  "order/getOrdersByUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getOrdersByUserRequest();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    error: "",
    order: {},
    ordersByUser: [],
    orders: [],
  },
  reducers: {
  },
  extraReducers: {
    [getOrders.pending]: (state, action) => {
      state.loading = true;
    },
    [getOrders.fulfilled]: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
      state.error = "";
    },
    [getOrders.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getOrder.pending]: (state, action) => {
      state.loading = true;
    },
    [getOrder.fulfilled]: (state, action) => {
      state.loading = false;
      state.order = action.payload;
      state.error = "";
    },
    [getOrder.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getOrdersByUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getOrdersByUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.ordersByUser = action.payload;
      state.error = "";
    },
    [getOrdersByUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default orderSlice.reducer;
