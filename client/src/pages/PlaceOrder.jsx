import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CheckoutSteps from "../components/CheckoutSteps";
import LoadingSpinner from "../components/LoadingSpinner";
import { saveOrderSummary } from "../redux/features/cartSlice";
import { createOrder } from "../redux/features/cartSlice";

export const PlaceOrder = () => {
  const navigate = useNavigate();
  const { shippingAddress, cartItems, cartTotalAmount } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23
  const itemsPrice = round2(cartTotalAmount);
  const shippingPrice = itemsPrice > 100 ? round2(0) : round2(10);
  const taxPrice = round2(0.12 * itemsPrice);
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const { loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    if (cartItems.length === 0) {
      toast.warning("Please first select a product");
      return navigate("/cart");
    }
    if (
      !shippingAddress.fullName ||
      !shippingAddress.country ||
      !shippingAddress.city ||
      !shippingAddress.address ||
      !shippingAddress.postalCode
    ) {
      toast.warning("Please first select a shipping address");
      return navigate("/shipping");
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(
      saveOrderSummary({
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    );
  }, [dispatch, itemsPrice, shippingPrice, taxPrice, totalPrice]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const order = {
    orderItems: cartItems,
    shippingAddress,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  };

  const placeOrderHandler = () => {
    dispatch(createOrder({ order, toast, navigate }));
  };

  return (
    <div className="bg-sky-100 min-h-[93.8vh] text-gray-700 flex flex-col items-center justify-start">
      <CheckoutSteps step1 step2 step3 />
      <div className="w-4/5 pb-7">
        <h1 className="font-semibold text-2xl overflow-ellipsis overflow-hidden whitespace-nowrap text-center mb-2">
          Order Preview
        </h1>
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="flex flex-col gap-3 md:w-1/2 lg:w-2/3">
            <div className="bg-white w-full min-h-[10rem] md:min-h-[9rem] shadow-lg rounded-md overflow-hidden p-5">
              <h2 className="font-semibold text-xl overflow-ellipsis overflow-hidden whitespace-nowrap mb-2">
                Shipping
              </h2>
              <strong>Name: </strong> {shippingAddress.fullName} <br />
              <strong>Address: </strong> {shippingAddress.country},{" "}
              {shippingAddress.city}, {shippingAddress.postalCode},{" "}
              {shippingAddress.address} <br />
              <Link to="/shipping" className="text-sky-400">
                Edit
              </Link>
            </div>
            <div className="bg-white w-full min-h-[5rem] shadow-lg rounded-md overflow-hidden p-5">
              <h2 className="font-semibold text-xl overflow-ellipsis overflow-hidden whitespace-nowrap mb-2">
                Payment
              </h2>
              <strong>Method: </strong> PayPal
            </div>
            <div className="bg-white w-full min-h-[10rem] shadow-lg rounded-md overflow-hidden p-5">
              <h2 className="font-semibold text-xl overflow-ellipsis overflow-hidden whitespace-nowrap mb-2">
                Products
              </h2>
              {cartItems.map((product) => (
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
                      <div className="px-3 text-gray-500">
                        {product.description}
                      </div>
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
              <Link to="/cart" className="text-sky-400">
                Edit
              </Link>
            </div>
          </div>
          <div className="bg-white w-full min-h-[10rem] md:h-[16rem] md:w-1/2 lg:w-1/3 shadow-lg rounded-md overflow-hidden p-5">
            <h2 className="font-semibold text-xl overflow-ellipsis overflow-hidden whitespace-nowrap mb-2">
              Order Summary
            </h2>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <h4>Products</h4>
                <p className="font-semibold">${itemsPrice}</p>
              </div>
              <div className="flex justify-between">
                <h4>Shipping</h4>
                <p className="font-semibold">${shippingPrice}</p>
              </div>
              <div className="flex justify-between">
                <h4>Tax</h4>
                <p className="font-semibold">${taxPrice}</p>
              </div>
              <div className="flex justify-between">
                <h4>Order Total</h4>
                <p className="font-semibold">${totalPrice}</p>
              </div>

              {loading ? (
                <button
                  className="button-primary w-full flex justify-center items-center"
                  disabled
                >
                  <LoadingSpinner /> Loading...
                </button>
              ) : (
                <button
                  className="button-primary w-full"
                  onClick={placeOrderHandler}
                >
                  Place Order
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
