import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createProductRequest } from "../api";

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async ({ form, toast, navigate }, { rejectWithValue }) => {
    try {
      const res = await createProductRequest(form);
      toast.success("Product created successfully");
      navigate("/admin/products");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    error: "",
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [createProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [createProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = "";
    },
    [createProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default productSlice.reducer;
