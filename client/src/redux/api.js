import axios from "axios";

const devEnv = process.env.NODE_ENV !== "production";
const API = axios.create({
  baseURL: `${
    devEnv
      ? "http://localhost:5000"
      : "https://mern-ecommerce-app-with-paypal.onrender.com/"
  }`,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).signed
    }`;
  }
  return req;
});

export const getProductsRequest = () => API.get("/product");
export const createProductRequest = (form) => {
  const product = new FormData();
  for (let key in form) {
    product.append(key, form[key]);
  }
  return API.post("/product", product);
};
export const getProductByIdRequest = (id) => API.get(`/product/${id}`);
export const deleteProductRequest = (id) => API.delete(`/product/${id}`);
export const updateProductRequest = (id, form) =>
  API.put(`/product/${id}`, form);

export const loginRequest = (user) => API.post("/users/login", user);
export const registerRequest = (user) => API.post("/users/register", user);
export const updateUserRequest = (values) => API.put("/users/profile", values);
export const getUserStatsRequest = () => API.get("/users/stats");
export const getUsersRequest = () => API.get("/users");

/* export const createOrderRequest = async (cart) =>
  await API.post("/payment/create-order", cart); */

export const createOrderRequest = async (order) =>
  await API.post("/orders", order);
export const getOrdersRequest = async () => API.get("/orders");
export const getLastOrdersRequest = async () => API.get("/orders/?new=true");

export const getPayPalClientIdRequest = async () =>
  await API.get("/api/keys/paypal");
export const approvePayPalRequest = async (details, id) =>
  await API.put(`orders/${id}/pay`, details);

export const getOrderByIdRequest = async (id) => await API.get(`/orders/${id}`);
export const getOrdersByUserRequest = async () => await API.get(`/orders/mine`);
export const getOrderStatsRequest = () => API.get("/orders/stats");
export const getIncomeStatsRequest = () => API.get("/orders/income/stats");
export const getWeekSalesRequest = () => API.get("/orders/week-sales");
