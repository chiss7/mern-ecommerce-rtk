import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/features/authSlice";
import { toast } from "react-toastify";

export const Login = () => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
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
    if (formValue.email && formValue.password) {
      dispatch(login({ formValue, navigate, toast }));
    }
  };

  return (
    <>
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
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
        {loading ? <button disabled>Submitting</button> : <button>Login</button>}
      </form>
    </>
  );
};
