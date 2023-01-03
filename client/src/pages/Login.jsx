import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "../redux/features/authSlice";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";

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
    <div className="h-[calc(100vh-59px)] flex justify-center items-center">
      <form
        className="bg-white w-4/5 lg:w-1/2 min-h-[10rem] shadow-lg rounded-md overflow-hidden p-5 flex flex-col gap-5 items-center"
        onSubmit={handleSubmit}
      >
        <h2 className="font-semibold text-2xl overflow-ellipsis overflow-hidden whitespace-nowrap text-center">
          Login
        </h2>
        <input
          type="text"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
          className="input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
          className="input"
        />
        {loading ? (
          <button
            className="button-primary w-full flex justify-center items-center"
            disabled
          >
            <LoadingSpinner /> Submitting...
          </button>
        ) : (
          <button className="button-primary w-full">Login</button>
        )}
        <p>
          New Customer?{" "}
          <Link className="text-sky-400" to={`/register?redirect=${redirect}`}>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};
