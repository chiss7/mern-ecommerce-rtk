import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../redux/features/authSlice";
import { getOrders } from "../../../redux/features/orderSlice";
import { useGetAllProductsQuery } from "../../../redux/features/productApi";

const AllTimeData = () => {
  const { data, isLoading } = useGetAllProductsQuery();
  const { orders, loading: loadingOrders } = useSelector((state) => state.order);
  const { users, loading: loadingUsers } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
    dispatch(getUsers());
    // eslint-disable-next-line
  }, []);

  const getEarnings = () => {
    let acum = 0;
    orders?.forEach((order) => {
      if(order.isPaid){
        acum += order.totalPrice;
      }
    })
    return acum;
  }

  return (
    <div className="mt-4 mb-4">
      <h3 className="text-2xl font-extrabold text-center">All Time</h3>
      <div className="flex justify-between bg-sky-300/40 rounded-md mb-2 p-2">
        <div className="all-data-title">Users</div>
        <div className="font-bold">{!loadingUsers ? users.length : "-"}</div>
      </div>
      <div className="flex justify-between bg-sky-300/60 rounded-md mb-2 p-2">
        <div className="all-data-title">Products</div>
        <div className="font-bold">{!isLoading ? data.length : "-"}</div>
      </div>
      <div className="flex justify-between bg-sky-300/40 rounded-md mb-2 p-2">
        <div className="all-data-title">Orders</div>
        <div className="font-bold">{!loadingOrders ? orders.length : "-"}</div>
      </div>
      <div className="flex justify-between bg-sky-300/60 rounded-md mb-2 p-2">
        <div className="all-data-title">Earnings</div>
        <div className="font-bold">${getEarnings().toLocaleString()}</div>
      </div>
    </div>
  );
};

export default AllTimeData;
