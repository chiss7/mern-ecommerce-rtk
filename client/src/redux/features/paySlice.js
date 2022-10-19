import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { approvePayPalRequest } from "../api";

export const approvePay = createAsyncThunk(
  "pay/approvePay",
  async ({ details, id }, { rejectWithValue }) => {
    try {
      const res = await approvePayPalRequest(details, id);
      console.log(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const paySlice = createSlice({
  name: "pay",
  initialState: {
    errorPay: "",
    loadingPay: false,
    successPay: false,
  },
  reducers: {
    payReset: (state, action) => {
      state.loadingPay = false;
      state.successPay = false;
    },
  },
  extraReducers: {
    [approvePay.pending]: (state, action) => {
      state.loadingPay = true;
    },
    [approvePay.fulfilled]: (state, action) => {
      state.loadingPay = false;
      state.successPay = true;
      state.errorPay = "";
    },
    [approvePay.rejected]: (state, action) => {
      state.loadingPay = false;
      state.errorPay = action.payload.message;
    },
  },
});

export const { payReset } = paySlice.actions;

export default paySlice.reducer;
