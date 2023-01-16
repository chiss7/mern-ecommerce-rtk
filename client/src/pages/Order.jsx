import { useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { getPayPalClientIdRequest } from "../redux/api";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { approvePay, payReset } from "../redux/features/paySlice";
import LoadingSpinner from "../components/LoadingSpinner";
import { useGetOrderByIdQuery } from "../redux/features/orderApi";

export const Order = () => {
  const dispatch = useDispatch();
  const { id: orderId } = useParams();
  const {
    data: order,
    error,
    isLoading,
    refetch,
    isFetching,
  } = useGetOrderByIdQuery(orderId, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const id = order?._id;
  const totalPrice = order?.totalPrice;
  const { successPay, loadingPay } = useSelector((state) => state.pay);
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const loadPayPalScript = async () => {
    try {
      const res = await getPayPalClientIdRequest();
      paypalDispatch({
        type: "resetOptions",
        value: {
          "client-id": res.data,
          currency: "USD",
        },
      });
      paypalDispatch({ type: "setLoadingStatus", value: "pending" });
    } catch (error) {
      console.log(error.message);
    }
  };

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID; // PayPal ORDER ID
      });
  };
  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch(approvePay({ details, id }));
        toast.success("Order is paid");
      } catch (error) {
        toast.error(error);
      }
    });
  };
  const onError = (err) => {
    toast.error(err);
  };

  useEffect(() => {
    error && toast.error(error.data.message);
  }, [error]);

  useEffect(() => {
    if (!id || successPay || (id && id !== orderId)) {
      if (successPay) {
        refetch();
        dispatch(payReset());
      }
    } else {
      loadPayPalScript();
    }
    // eslint-disable-next-line
  }, [id, successPay, dispatch, orderId]);

  return isLoading ? (
    <div className="h-[calc(100vh-59px)] flex items-center justify-center py-5">
      <LoadingSpinner msg="Loading..." />
    </div>
  ) : error ? (
    <div className="h-[calc(100vh-59px)] flex justify-center py-5 text-red-500">
      <p>An error occurred {error.data.message}</p>
    </div>
  ) : (
    <div className="min-h-[calc(100vh-59px)] flex flex-col items-center justify-start">
      <div className="w-4/5 pb-7">
        <h1 className="font-semibold text-2xl overflow-ellipsis overflow-hidden whitespace-nowrap text-center my-3">
          Order #{order._id}
        </h1>
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="flex flex-col gap-3 md:w-1/2 lg:w-2/3">
            <div className="bg-white w-full min-h-[10rem] md:min-h-[9rem] shadow-lg rounded-md overflow-hidden p-5">
              <h2 className="font-semibold text-xl overflow-ellipsis overflow-hidden whitespace-nowrap mb-2">
                Shipping
              </h2>
              <strong>Name: </strong> {order?.shippingAddress?.fullName} <br />
              <strong>Address: </strong> {order?.shippingAddress?.country},{" "}
              {order?.shippingAddress?.city},{" "}
              {order?.shippingAddress?.postalCode},{" "}
              {order?.shippingAddress?.address} <br />
              {order?.isDelivered ? (
                <div className="text-center mt-2 bg-green-500 text-gray-100 rounded-md py-2">
                  {isFetching ? 'Loading...' : <>Delivered at {order.deliveredAt}</>}
                </div>
              ) : (
                <div className="text-center mt-2 bg-red-400 text-gray-100 rounded-md py-2">Not Delivered</div>
              )}
            </div>
            <div className="bg-white w-full min-h-[5rem] shadow-lg rounded-md overflow-hidden p-5">
              <h2 className="font-semibold text-xl overflow-ellipsis overflow-hidden whitespace-nowrap mb-2">
                Payment
              </h2>
              <strong>Method: </strong> PayPal
              {order.isPaid ? (
                <div className="text-center mt-2 bg-green-500 text-gray-100 rounded-md py-2">
                  {isFetching ? "Loading..." : <>Paid at {order.paidAt}</>}
                </div>
              ) : (
                <div className="text-center mt-2 bg-red-400 text-gray-100 rounded-md py-2">Not Paid</div>
              )}
            </div>
            <div className="bg-white w-full min-h-[10rem] shadow-lg rounded-md overflow-hidden p-5">
              <h2 className="font-semibold text-xl overflow-ellipsis overflow-hidden whitespace-nowrap mb-2">
                Products
              </h2>
              {order?.orderItems?.map((product) => (
                <div
                  className="flex flex-col border border-gray-300 rounded-md mb-2 lg:flex-row"
                  key={product._id}
                >
                  <div className="lg:flex lg:w-1/2">
                    <img
                      className="w-full h-full lg:w-1/2 xl:w-1/3 lg:rounded-l-md lg:rounded-tr-none object-cover rounded-t-md"
                      src={product.image.url}
                      alt={product.name}
                    />
                    <div className="lg:justify-center lg:flex lg:flex-col">
                      <h3 className="px-3 pt-1 font-semibold">
                        {product.name}
                      </h3>
                    </div>
                  </div>
                  <div className="flex justify-between px-3 pb-1 lg:w-1/2 lg:justify-around lg:items-center">
                    <div>
                      <h4>Quantity: {product.cartQuantity}</h4>
                    </div>
                    <div className="font-semibold">
                      <h4>${product.price}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className={`bg-white w-full min-h-[10rem] md:w-1/2 lg:w-1/3 shadow-lg rounded-md overflow-hidden p-5 ${
              order.isPaid ? "h-[21vh]" : ""
            }`}
          >
            <h2 className="font-semibold text-xl overflow-ellipsis overflow-hidden whitespace-nowrap mb-2">
              Order Summary
            </h2>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <h4>Products</h4>
                <p className="font-semibold">${order.itemsPrice}</p>
              </div>
              <div className="flex justify-between">
                <h4>Shipping</h4>
                <p className="font-semibold">${order.shippingPrice}</p>
              </div>
              <div className="flex justify-between">
                <h4>Tax</h4>
                <p className="font-semibold">${order.taxPrice}</p>
              </div>
              <div className="flex justify-between">
                <h4>Order Total</h4>
                <p className="font-semibold">${order.totalPrice}</p>
              </div>
              {!order.isPaid && (
                <>
                  {isPending ? (
                    <div className="flex items-center justify-center py-5">
                      <LoadingSpinner msg="Loading..." />
                    </div>
                  ) : (
                    <div className="paypal-button">
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      ></PayPalButtons>
                    </div>
                  )}
                  {loadingPay && (
                    <div className="flex items-center justify-center py-5">
                      <LoadingSpinner msg="Loading..." />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
