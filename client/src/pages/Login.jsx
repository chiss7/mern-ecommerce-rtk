import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "../redux/features/authSlice";
import { toast } from "react-toastify";

export const Login = () => {
  // redirect to shipping page 
  const location = useLocation();
  const redirectInUrl = new URLSearchParams(location.search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

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
      dispatch(login({ formValue, navigate, toast, redirect }));
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
        <p>New Customer? <Link to={`/register?redirect=${redirect}`}>Register</Link></p>
      </form>
    </>
  );
};
