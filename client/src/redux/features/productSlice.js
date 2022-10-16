import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getToursRequest } from "../api";

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getToursRequest();
      return res?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    items: [],
    status: null,
    error: "",
  },
  reducers: {},
  extraReducers: {
    [getProducts.pending]: (state, action) => {
      state.status = "pending";
    },
    [getProducts.fulfilled]: (state, action) => {
      state.status = "success";
      state.items = action.payload;
    },
    [getProducts.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload.message;
    },
  },
});

export default productSlice.reducer;
