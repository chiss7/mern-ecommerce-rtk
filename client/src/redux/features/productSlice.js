import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createProductRequest,
  deleteProductRequest,
  getProductByIdRequest,
  getProductsRequest,
  updateProductRequest,
} from "../api";

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getProductsRequest();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

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

export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getProductByIdRequest(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const res = await deleteProductRequest(id);
      toast.success("Product deleted successfully");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, formForUpdate, toast, navigate }, { rejectWithValue }) => {
    try {
      const res = await updateProductRequest(id, formForUpdate);
      toast.success("Product updated successfully");
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
    products: [],
    product: {},
  },
  reducers: {},
  extraReducers: {
    [getProducts.pending]: (state, action) => {
      state.loading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = "";
    },
    [getProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
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
    [getProductById.pending]: (state, action) => {
      state.loading = true;
    },
    [getProductById.fulfilled]: (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.error = "";
    },
    [getProductById.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = state.products.filter(
        (product) => product._id !== action.payload._id
      );
      state.error = "";
    },
    [deleteProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = "";
    },
    [updateProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default productSlice.reducer;
