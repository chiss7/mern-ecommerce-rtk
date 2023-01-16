import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const devEnv = process.env.NODE_ENV !== "production";
export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${
      devEnv
        ? "http://localhost:5000"
        : "https://mern-ecommerce-app-with-paypal.onrender.com/"
    }`,
  }),
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ({
        url: "/orders",
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("profile")).signed,
        },
      }),
      providesTags: ["Orders"],
    }),
    updateOrder: builder.mutation({
      query: ({ id, body }) => ({
        url: `/orders/${id}`,
        method: "PATCH",
        body: body,
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("profile")).signed,
        },
      }),
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("profile")).signed,
        },
      }),
      invalidatesTags: ["Orders"],
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

export const {
  useGetOrdersQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useGetOrderByIdQuery,
  useGetOrdersByUserQuery,
} = orderApi;
