import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOrderByIdRequest } from "../api";

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

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    error: "",
    order: {}
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
  },
});

export default orderSlice.reducer;
