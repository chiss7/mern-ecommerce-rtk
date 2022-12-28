import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { register } from "../redux/features/authSlice";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";

export const Register = () => {
  // redirect to shipping page
  const location = useLocation();
  const redirectInUrl = new URLSearchParams(location.search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

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
      dispatch(register({ formValue, navigate, toast, redirect }));
    }
  };

  return (
    <div className="bg-sky-100 h-[93.8vh] text-gray-700 flex justify-center items-center">
      <form
        className="bg-white w-4/5 lg:w-1/2 min-h-[10rem] shadow-lg rounded-md overflow-hidden p-5 flex flex-col gap-5 items-center"
        onSubmit={handleSubmit}
      >
        <h2 className="font-semibold text-2xl overflow-ellipsis overflow-hidden whitespace-nowrap text-center">
          Register
        </h2>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          required
          onChange={handleChange}
          className="input"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          required
          onChange={handleChange}
          className="input"
        />
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
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
          <button className="button-primary w-full">Register</button>
        )}
        <p>
          Already have an account?{" "}
          <Link className="text-sky-400" to={`/login?redirect=${redirect}`}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};
