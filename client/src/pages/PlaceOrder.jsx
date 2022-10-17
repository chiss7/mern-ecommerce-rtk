import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CheckoutSteps from "../components/CheckoutSteps";
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
    <>
      <CheckoutSteps step1 step2 step3 />
      <div className="container">
        <h1>Preview Order</h1>
        <div className="info-container">
          <div className="elements-info">
            <div className="shipping-container box">
              <h2>Shipping</h2>
              <strong>Name: </strong> {shippingAddress.fullName} <br />
              <strong>Address: </strong> {shippingAddress.country},{" "}
              {shippingAddress.city}, {shippingAddress.postalCode},{" "}
              {shippingAddress.address} <br />
              <Link to="/shipping">Edit</Link>
            </div>
            <div className="payment-container box">
              <h2>Payment</h2>
              <strong>Method: </strong> PayPal
            </div>
            <div className="products-container box">
              <h2>Products</h2>
              {cartItems.map((product) => (
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
              <Link to="/cart">Edit</Link>
            </div>
          </div>
          <div className="order-container box">
            <h2>Order Summary</h2>
            <div className="order-container_items">
              <div className="order-items">
                <h4>Products</h4>
                <p>${itemsPrice}</p>
              </div>
              <div className="order-items">
                <h4>Shipping</h4>
                <p>${shippingPrice}</p>
              </div>
              <div className="order-items">
                <h4>Tax</h4>
                <p>${taxPrice}</p>
              </div>
              <div className="order-items">
                <h4>Order Total</h4>
                <p>${totalPrice}</p>
              </div>
              <div className="order-items">
                <button onClick={placeOrderHandler}>Place Order</button>
              </div>
              {loading && <p>Loading...</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
