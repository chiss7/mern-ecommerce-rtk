import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/NavBar";
import AdminRoute from "./components/AdminRoute";
import {
  Cart,
  CreateProduct,
  CreateUser,
  Dashboard,
  Home,
  Login,
  NotFound,
  Order,
  OrderHistory,
  Orders,
  PlaceOrder,
  Product,
  Products,
  Profile,
  Register,
  ShippingAddress,
  Summary,
  Users,
} from "./pages";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./redux/features/authSlice";
import { getTotals } from "./redux/features/cartSlice";
import PrivateRoute from "./components/PrivateRoute";
import ProductList from "./pages/admin/list/ProductList";
import OrderList from "./pages/admin/list/OrderList";
import UserList from "./pages/admin/list/UserList";

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(setUser(user));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  return (
    <div className="App">
      <ToastContainer autoClose={2000} />
      <NavBar />
      <main className="bg-sky-100 text-gray-700 w-full min-h-[calc(100vh-59px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/:slug" element={<Product />} />
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
          <Route
            path="/order/:id"
            element={
              <PrivateRoute>
                <Order />
              </PrivateRoute>
            }
          />
          <Route
            path="/order-history"
            element={
              <PrivateRoute>
                <OrderHistory />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          >
            <Route
              path="summary"
              element={
                <AdminRoute>
                  <Summary />
                </AdminRoute>
              }
            />
            <Route
              path="products"
              element={
                <AdminRoute>
                  <Products />
                </AdminRoute>
              }
            >
              <Route
                index
                element={
                  <AdminRoute>
                    <ProductList />
                  </AdminRoute>
                }
              />
              <Route
                path="new"
                element={
                  <AdminRoute>
                    <CreateProduct />
                  </AdminRoute>
                }
              />
              <Route
                path="edit/:id"
                element={
                  <AdminRoute>
                    <CreateProduct />
                  </AdminRoute>
                }
              />
            </Route>
            <Route
              path="orders"
              element={
                <AdminRoute>
                  <Orders />
                </AdminRoute>
              }
            >
              <Route
                index
                element={
                  <AdminRoute>
                    <OrderList />
                  </AdminRoute>
                }
              />
            </Route>
            <Route
              path="users"
              element={
                <AdminRoute>
                  <Users />
                </AdminRoute>
              }
            >
              <Route
                index
                element={
                  <AdminRoute>
                    <UserList />
                  </AdminRoute>
                }
              />
              <Route
                path="new"
                element={
                  <AdminRoute>
                    <CreateUser />
                  </AdminRoute>
                }
              />
              <Route
                path="edit/:id"
                element={
                  <AdminRoute>
                    <CreateUser />
                  </AdminRoute>
                }
              />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
