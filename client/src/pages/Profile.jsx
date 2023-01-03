import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import { updateUser } from "../redux/features/authSlice";

export const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    name: user.result.name,
    email: user.result.email,
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password) {
      if (!form.confirmPassword)
        return toast.error("Please confirm your password");
      if (form.password === form.confirmPassword) {
        dispatch(updateUser({ form, toast, navigate }));
      } else {
        return toast.error("Password should match");
      }
    } else {
      dispatch(updateUser({ form, toast, navigate }));
    }
  };

  return (
    <div className="h-[calc(100vh-59px)] flex justify-center items-center">
      <form className="bg-white w-4/5 lg:w-1/2 min-h-[10rem] shadow-lg rounded-md overflow-hidden p-5 flex flex-col gap-5 items-center" onSubmit={handleSubmit}>
        <h2 className="font-semibold text-2xl overflow-ellipsis overflow-hidden whitespace-nowrap text-center">Profile</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={form.name}
          className="input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
          className="input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={form.password}
          className="input"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          value={form.confirmPassword}
          className="input"
        />
        {loading ? (
          <button
            className="button-primary w-full flex justify-center items-center"
            disabled
          >
            <LoadingSpinner /> Updating...
          </button>
        ) : (
          <button className="button-primary w-full">Update</button>
        )}
      </form>
    </div>
  );
};
