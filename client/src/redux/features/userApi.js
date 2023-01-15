import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const devEnv = process.env.NODE_ENV !== "production";
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${
      devEnv
        ? "http://localhost:5000"
        : "https://mern-ecommerce-app-with-paypal.onrender.com/"
    }`,
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/users",
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("profile")).signed,
        },
      }),
      providesTags: ["Users"],
    }),
    getUser: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("profile")).signed,
        },
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("profile")).signed,
        },
      }),
      invalidatesTags: ["Users"],
    }),
    createUser: builder.mutation({
      query: (user) => ({
        url: "/users/register",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
    updateUser: builder.mutation({
      query: ({ id, formForUpdate }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: formForUpdate,
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("profile")).signed,
        },
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserQuery,
  useDeleteUserMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
} = userApi;
