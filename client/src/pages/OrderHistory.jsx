import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getOrdersByUser } from "../redux/features/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";

export const OrderHistory = () => {
  const navigate = useNavigate();
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
    <div className="h-[93.8vh] bg-sky-100 text-gray-700 flex items-center justify-center py-5">
      <LoadingSpinner msg="Loading..." />
    </div>
  ) : error ? (
    <div className="h-[93.8vh] bg-sky-100 flex justify-center py-5 text-red-500">
      <p>An error occurred {error}</p>
    </div>
  ) : (
    <>
      {orders.length === 0 ? (
        <div className="h-[93.8vh] bg-sky-100 text-gray-700 flex items-start justify-center py-5">
          <h2 className="font-semibold text-2xl my-3">No Orders Yet</h2>
        </div>
      ) : (
        <div className="h-[93.8vh] bg-sky-100 text-gray-700 flex items-start justify-center py-5">
          <table className="table">
            <caption className="font-bold text-2xl uppercase">
              Order History
            </caption>
            <thead>
              <tr>
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
                  <td data-label="Actions" className="text-center">
                    <button
                      className="px-2 py-1 rounded-sm bg-sky-200 hover:bg-sky-300 hover:text-gray-100 transition"
                      onClick={() => navigate(`/order/${order._id}`)}
                    >
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
