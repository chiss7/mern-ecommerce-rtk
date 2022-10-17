import { toast } from "react-toastify";
//import { createOrderRequest } from "../redux/api";

const PayButton = ({ cart }) => {
  const handleCheckout = async (cart) => {
    try {
      //const res = await createOrderRequest(cart);
      /* if (res.data.links[1].href) {
        window.location.href = res.data.links[1].href;
      } */
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <button onClick={() => handleCheckout(cart)}>
        Check Out with PayPal
      </button>
    </>
  );
};

export default PayButton;
