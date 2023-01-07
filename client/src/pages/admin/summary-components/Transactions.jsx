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
          <h3 className="font-extrabold text-center text-2xl">Lastest transactions</h3>
          {orders?.map((order) => (
            <div className="flex justify-between bg-sky-300/60 mb-2 rounded-md p-2" key={order._id}>
              <p className="w-1/3">{order.shippingAddress.fullName}</p>
              <p className="w-1/3 text-center">${order.totalPrice.toLocaleString()}</p>
              <p className="w-1/3 text-right">{moment(order.createdAt).fromNow()}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Transactions;
