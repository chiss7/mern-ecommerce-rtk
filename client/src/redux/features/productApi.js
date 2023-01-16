import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const devEnv = process.env.NODE_ENV !== "production";
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${
      devEnv
        ? "http://localhost:5000"
        : "https://mern-ecommerce-app-with-paypal.onrender.com/"
    }`,
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "/product",
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("profile")).signed,
        },
      }),
    }),
    getProductBySlug: builder.query({
      query: (slug) => ({
        url: `/product/slug/${slug}`,
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductBySlugQuery,
  useGetProductByIdQuery,
} = productApi;
