import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).signed
    }`;
  }
  return req;
});

export const getToursRequest = () => API.get("/product");
export const createProductRequest = (form) => {
  const product = new FormData();
  for (let key in form) {
    product.append(key, form[key]);
  }
  return API.post("/product", product);
};

export const loginRequest = (user) => API.post("/users/login", user);
export const registerRequest = (user) => API.post("/users/register", user);
export const updateUserRequest = (values) => API.put("/users/profile", values);
export const getUserStatsRequest = () => API.get("/users/stats");

/* export const createOrderRequest = async (cart) =>
  await API.post("/payment/create-order", cart); */

export const createOrderRequest = async (order) =>
  await API.post("/orders", order);

export const getPayPalClientIdRequest = async () =>
  await API.get("/api/keys/paypal");
export const approvePayPalRequest = async (details, id) =>
  await API.put(`orders/${id}/pay`, details);

export const getOrderByIdRequest = async (id) => await API.get(`/orders/${id}`);
export const getOrdersByUserRequest = async () => await API.get(`/orders/mine`);
export const getOrderStatsRequest = () => API.get("/orders/stats");
export const getIncomeStatsRequest = () => API.get("/orders/income/stats");
