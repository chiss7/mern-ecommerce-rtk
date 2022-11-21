import { useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { getPayPalClientIdRequest } from "../redux/api";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { approvePay, payReset } from "../redux/features/paySlice";
//import { getOrder } from "../redux/features/orderSlice";
import { useGetOrderByIdQuery } from "../redux/features/productApi";

export const Order = () => {
  const dispatch = useDispatch();
  const { id: orderId } = useParams();
  //const { order, loading, error } = useSelector((state) => state.order);
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
    error && toast.error(error);
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
    <h1>Loading ...</h1>
  ) : error ? (
    <p>An error occurred {error}</p>
  ) : (
    <>
      <div className="container">
        <h1>Order #{order._id}</h1>
        <div className="info-container">
          <div className="elements-info">
            <div className="shipping-container box">
              <h2>Shipping</h2>
              <strong>Name: </strong> {order?.shippingAddress?.fullName} <br />
              <strong>Address: </strong> {order?.shippingAddress?.country},{" "}
              {order?.shippingAddress?.city},{" "}
              {order?.shippingAddress?.postalCode},{" "}
              {order?.shippingAddress?.address} <br />
              {order?.isDelivered ? (
                <div className="msg msg-success">
                  Delivered at {order.deliveredAt}
                </div>
              ) : (
                <div className="msg msg-danger">Not Delivered</div>
              )}
            </div>
            <div className="payment-container box">
              <h2>Payment</h2>
              <strong>Method: </strong> PayPal
              {order.isPaid ? (
                <div className="msg msg-success">
                  {isFetching ? "Loading..." : <>Paid at {order.paidAt}</>}
                </div>
              ) : (
                <div className="msg msg-danger">Not Paid</div>
              )}
            </div>
            <div className="products-container box">
              <h2>Products</h2>
              {order?.orderItems?.map((product) => (
                <div className="product-card" key={product._id}>
                  <div className="cart-product">
                    <img src={product.image.url} alt={product.name} />
                    <div>
                      <h3>{product.name}</h3>
                      <p>{product.description}</p>
                    </div>
                  </div>
                  <div className="product-quantity">
                    <h4>{product.cartQuantity}</h4>
                  </div>
                  <div className="product-price">
                    <h4>${product.price}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="order-container box">
            <h2>Order Summary</h2>
            <div className="order-container_items">
              <div className="order-items">
                <h4>Products</h4>
                <p>${order.itemsPrice}</p>
              </div>
              <div className="order-items">
                <h4>Shipping</h4>
                <p>${order.shippingPrice}</p>
              </div>
              <div className="order-items">
                <h4>Tax</h4>
                <p>${order.taxPrice}</p>
              </div>
              <div className="order-items">
                <h4>Order Total</h4>
                <p>${order.totalPrice}</p>
              </div>
              {!order.isPaid && (
                <>
                  {isPending ? (
                    <p>Loading...</p>
                  ) : (
                    <div className="paypal-button">
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      ></PayPalButtons>
                    </div>
                  )}
                  {loadingPay && <p>Loading...</p>}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
