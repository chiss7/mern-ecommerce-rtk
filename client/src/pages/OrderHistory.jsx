//import { useGetOrdersByUserQuery } from "../redux/features/productApi";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getOrdersByUser } from "../redux/features/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export const OrderHistory = () => {
  const navigate = useNavigate();
  //const { data, error, isLoading } = useGetOrdersByUserQuery();
  const {
    loading,
    error,
    ordersByUser: orders,
  } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  useEffect(() => {
    dispatch(getOrdersByUser());
    // eslint-disable-next-line
  }, []);

  return loading ? (
    <h1>Loading...</h1>
  ) : error ? (
    <p>{error}</p>
  ) : (
    <>
      {orders.length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "2rem",
          }}
        >
          <h2 style={{}}>No Orders Yet</h2>
        </div>
      ) : (
        <div className="orderhistory-container">
          <table>
            <caption>Order History</caption>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr key={order._id}>
                  <td data-label="Id">{order._id}</td>
                  <td data-label="Date">{order.createdAt.substring(0, 10)}</td>
                  <td data-label="Total">${order.totalPrice}</td>
                  <td data-label="Paid">
                    {order.isPaid ? order.paidAt.substring(0, 10) : "No"}
                  </td>
                  <td data-label="Delivered">
                    {order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : "No"}
                  </td>
                  <td data-label="Actions">
                    <button onClick={() => navigate(`/order/${order._id}`)}>
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
