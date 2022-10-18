import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../redux/features/productApi";

export const Order = () => {
  const { id: orderId } = useParams();
  const { data, error, isLoading } = useGetOrderByIdQuery(orderId);

  return isLoading ? (
    <h1>Loading ...</h1>
  ) : error ? (
    <p>An error occurred {error.data.message}</p>
  ) : (
    <>
      <div className="container">
        <h1>Order #{data._id}</h1>
        <div className="info-container">
          <div className="elements-info">
            <div className="shipping-container box">
              <h2>Shipping</h2>
              <strong>Name: </strong> {data.shippingAddress.fullName} <br />
              <strong>Address: </strong> {data.shippingAddress.country},{" "}
              {data.shippingAddress.city}, {data.shippingAddress.postalCode},{" "}
              {data.shippingAddress.address} <br />
              {data.isDelivered ? (
                <div>Delivered at {data.deliveredAt}</div>
              ) : (
                <div className="msg msg-danger">Not Delivered</div>
              )}
            </div>
            <div className="payment-container box">
              <h2>Payment</h2>
              <strong>Method: </strong> PayPal
              {data.isPaid ? (
                <div>Paid at {data.paidAt}</div>
              ) : (
                <div className="msg msg-danger">Not Paid</div>
              )}
            </div>
            <div className="products-container box">
              <h2>Products</h2>
              {data.orderItems.map((product) => (
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
                <p>${data.itemsPrice}</p>
              </div>
              <div className="order-items">
                <h4>Shipping</h4>
                <p>${data.shippingPrice}</p>
              </div>
              <div className="order-items">
                <h4>Tax</h4>
                <p>${data.taxPrice}</p>
              </div>
              <div className="order-items">
                <h4>Order Total</h4>
                <p>${data.totalPrice}</p>
              </div>
              <div className="order-items">
                <button>Place Order</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
