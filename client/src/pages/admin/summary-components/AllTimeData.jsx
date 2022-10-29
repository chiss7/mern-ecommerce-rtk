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
    <div className="all-data-main">
      <h3>All Time</h3>
      <div className="all-data-info">
        <div className="all-data-title">Users</div>
        <div className="all-data-data">{!loadingUsers ? users.length : "-"}</div>
      </div>
      <div className="all-data-info">
        <div className="all-data-title">Products</div>
        <div className="all-data-data">{!isLoading ? data.length : "-"}</div>
      </div>
      <div className="all-data-info">
        <div className="all-data-title">Orders</div>
        <div className="all-data-data">{!loadingOrders ? orders.length : "-"}</div>
      </div>
      <div className="all-data-info">
        <div className="all-data-title">Earnings</div>
        <div className="all-data-data">${getEarnings().toLocaleString()}</div>
      </div>
    </div>
  );
};

export default AllTimeData;
