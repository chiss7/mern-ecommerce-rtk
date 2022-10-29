import { useEffect, useState } from "react";
import { getLastOrdersRequest } from "../../../redux/api";
import { toast } from "react-toastify";
import moment from "moment";

const Transactions = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const res = await getLastOrdersRequest();
        setOrders(res.data);
      } catch (error) {
        toast.error(error.message);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="transactions">
      {isLoading ? (
        <p>Transactions Loading...</p>
      ) : (
        <>
          <h3>Lastest transactions</h3>
          {orders?.map((order) => (
            <div className="transaction" key={order._id}>
              <p>{order.shippingAddress.fullName}</p>
              <p>${order.totalPrice.toLocaleString()}</p>
              <p>{moment(order.createdAt).fromNow()}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Transactions;
