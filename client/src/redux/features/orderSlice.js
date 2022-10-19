import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOrderByIdRequest, getOrdersByUserRequest } from "../api";

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
  },
  reducers: {
  },
  extraReducers: {
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
