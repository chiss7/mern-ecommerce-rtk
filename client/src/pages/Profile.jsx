import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
    <form className="register-form" onSubmit={handleSubmit}>
      <h2>Profile</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
        value={form.name}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        value={form.email}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        value={form.password}
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        onChange={handleChange}
        value={form.confirmPassword}
      />
      {loading ? <button disabled>Submitting</button> : <button>Update</button>}
    </form>
  );
};
