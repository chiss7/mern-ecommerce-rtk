import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "/product",
    }),
    getOrderById: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("profile")).signed,
        },
      }),
    }),
    getOrdersByUser: builder.query({
      query: () => ({
        url: "/orders/mine",
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("profile")).signed,
        },
      }),
    }),
  }),
});

export const { useGetAllProductsQuery, useGetOrderByIdQuery, useGetOrdersByUserQuery } = productApi;
