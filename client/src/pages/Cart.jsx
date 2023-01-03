import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  addToCart,
  clearCart,
  decreaseCart,
  removeFromCart,
} from "../redux/features/cartSlice";

export const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleDecreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };

  const handleIncreaseCart = (cartItem) => {
    dispatch(addToCart(cartItem));
  };

  return (
    <>
      <h2 className="text-3xl text-center py-5 font-extrabold">
        Shopping Cart
      </h2>
      {cart.cartItems.length === 0 ? (
        /* cart empty */
        <div className="flex flex-col items-center py-5 gap-2">
          <p>Your cart is currently empty</p>
          <Link
            to="/"
            className="flex gap-2 items-center hover:text-gray-500 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
            <span>Start Shopping</span>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start">
          {/* cart container */}
          <div className="flex flex-col gap-3 justify-center items-center md:w-2/3">
            {cart.cartItems?.map((cartItem) => (
              /* cart item */
              <div
                className="flex flex-col bg-white w-[21rem] sm:w-3/4 min-h-[8rem] shadow-lg rounded-md overflow-hidden lg:flex-row"
                key={cartItem._id}
              >
                <div className="flex lg:w-2/3">
                  {/* cart img */}
                  <img
                    className="w-1/3 h-full object-cover"
                    src={cartItem.image.url}
                    alt={cartItem.name}
                  />
                  {/* cart details */}
                  <div className="my-1 mx-2 w-full lg:w-2/3">
                    {/* title and price */}
                    <div className="flex justify-between items-center font-semibold text-xl sm:text-2xl">
                      <h3 className="overflow-ellipsis overflow-hidden whitespace-nowrap">
                        {cartItem.name}
                      </h3>
                      <div>${cartItem.price}</div>
                    </div>
                    {/* description and cat */}
                    <div>
                      <p className="overflow-ellipsis overflow-hidden whitespace-nowrap sm:mt-7 md:mt-4">
                        {cartItem.description}
                      </p>
                      <p className="overflow-ellipsis overflow-hidden whitespace-nowrap">
                        Category: {cartItem.category}
                      </p>
                    </div>
                  </div>
                </div>
                {/* buttons and total price */}
                <div className="flex justify-between mx-2 my-1 lg:flex-col-reverse lg:border-l lg:m-0 lg:px-2 lg:py-1 lg:w-1/3 lg:items-center">
                  <button
                    className="text-gray-500 hover:text-gray-700 transition"
                    onClick={() => handleRemoveFromCart(cartItem)}
                  >
                    Remove
                  </button>
                  <div className="flex w-20 sm:w-32 md:w-24 lg:w-40 lg:h-10 items-center justify-evenly border rounded-md hover:border-gray-300 transition">
                    <button
                      className="w-full"
                      onClick={() => handleDecreaseCart(cartItem)}
                    >
                      -
                    </button>
                    <div className="font-semibold">{cartItem.cartQuantity}</div>
                    <button
                      className="w-full"
                      onClick={() => handleIncreaseCart(cartItem)}
                    >
                      +
                    </button>
                  </div>
                  <div className="text-center">
                    Total:{" "}
                    <span className="font-extrabold text-xl sm:text-3xl lg:text-2xl">
                      ${cartItem.price * cartItem.cartQuantity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <button
              className="px-3 py-2 w-[21rem] sm:w-3/4 border border-gray-400 rounded-md hover:border-gray-500"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
          </div>

          {/* cart summary */}
          <div className="p-4 flex flex-col items-start md:h-full w-[21rem] sm:w-3/4 md:w-1/3 md:pr-16 lg:pr-24 overflow-hidden gap-2">
            <div className="flex justify-between items-center w-full">
              <p className="font-bold text-lg">Subtotal</p>
              <p className="font-extrabold text-3xl">${cart.cartTotalAmount}</p>
            </div>
            <p className="text-sm">Taxes and shipping calculated at checkout</p>
            {user?.result?._id ? (
              <button
                onClick={() => navigate("/shipping")}
                className="button-primary w-full"
              >
                Proceed to Checkout
              </button>
            ) : (
              <button
                onClick={() => navigate("/login?redirect=/shipping")}
                className="button-primary w-full"
              >
                Login to Check out
              </button>
            )}
            <Link
              to="/"
              className="flex gap-2 items-center justify-center w-full hover:text-gray-500 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
