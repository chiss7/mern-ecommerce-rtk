import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/NavBar";
import {
  Cart,
  CheckoutSuccess,
  Home,
  Login,
  NotFound,
  PlaceOrder,
  Register,
  ShippingAddress,
} from "./pages";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./redux/features/authSlice";
import { getTotals } from "./redux/features/cartSlice";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(setUser(user));
  }, []);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  return (
    <div className="App">
      <ToastContainer />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/shipping"
          element={
            <PrivateRoute>
              <ShippingAddress />
            </PrivateRoute>
          }
        />
        <Route
          path="/place-order"
          element={
            <PrivateRoute>
              <PlaceOrder />
            </PrivateRoute>
          }
        />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
