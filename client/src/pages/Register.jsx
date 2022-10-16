import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../redux/features/authSlice";
import { toast } from "react-toastify";

export const Register = () => {
  const [formValue, setFormValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValue.password !== formValue.confirmPassword) {
      return toast.error("Password should match");
    }
    if (
      formValue.firstName &&
      formValue.lastName &&
      formValue.email &&
      formValue.password &&
      formValue.confirmPassword
    ) {
      dispatch(register({ formValue, navigate, toast }));
    }
  };

  return (
    <>
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
          onChange={handleChange}
        />
        {loading ? <button disabled>Submitting</button> : <button>Register</button>}
      </form>
    </>
  );
};
