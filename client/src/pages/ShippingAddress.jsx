import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../redux/features/cartSlice";
import { useNavigate } from "react-router-dom";

export const ShippingAddress = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state) => state.cart);
  const [formValue, setFormValue] = useState({
    fullName: shippingAddress.fullName || "",
    address: shippingAddress.address || "",
    city: shippingAddress.city || "",
    postalCode: shippingAddress.postalCode || "",
    country: shippingAddress.country || "",
  });
  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formValue.fullName &&
      formValue.address &&
      formValue.city &&
      formValue.postalCode &&
      formValue.country
    ) {
      dispatch(saveShippingAddress(formValue));
      navigate('/place-order')
    }
  };

  return (
    <>
      <CheckoutSteps step1 step2 />
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Shipping Address</h2>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          required
          value={formValue.fullName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          required
          value={formValue.country}
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          required
          value={formValue.city}
          onChange={handleChange}
        />
        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          required
          value={formValue.postalCode}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          required
          value={formValue.address}
          onChange={handleChange}
        />
        <button>Continue</button>
      </form>
    </>
  );
};
