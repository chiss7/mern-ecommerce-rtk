import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import { toast } from "react-toastify";
import {
  useCreateUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../redux/features/userApi";

export const CreateUser = () => {
  const { id } = useParams();
  const { data: user, isSuccess } = useGetUserQuery(id, {
    skip: id ? false : true,
  });
  const [createUser, { isLoading: isLoadingCreate }] = useCreateUserMutation();
  const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateUserMutation();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAdmin: false,
  });
  const [formForUpdate, setFormForUpdate] = useState({});

  useEffect(() => {
    if (isSuccess) {
      setForm({
        name: user.name,
        email: user.email,
        password: "",
        confirmPassword: "",
        isAdmin: user.isAdmin,
      });
    }
    // eslint-disable-next-line
  }, [isSuccess]);

  const handleChange = (e) => {
    setForm(
      e.target.name === "isAdmin"
        ? { ...form, isAdmin: e.target.checked }
        : { ...form, [e.target.name]: e.target.value }
    );
    if (id) {
      setFormForUpdate(
        e.target.name === "isAdmin"
          ? { ...formForUpdate, isAdmin: e.target.checked }
          : { ...formForUpdate, [e.target.name]: e.target.value }
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password) {
      if (!form.confirmPassword) {
        return toast.error("Please confirm password");
      }
      if (form.password !== form.confirmPassword) {
        return toast.error("Password should match");
      }
      if (id) {
        updateUser({ id, formForUpdate });
        toast.success("User updated successfully");
        navigate("/admin/users");
      } else {
        if (form.name && form.email && form.password && form.confirmPassword) {
          createUser(form);
          toast.success("User created successfully");
          navigate("/admin/users");
        }
      }
    } else {
      updateUser({ id, formForUpdate });
      toast.success("User updated successfully");
      navigate("/admin/users");
    }
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex justify-center items-center">
      <form
        className="bg-white w-4/5 md:w-1/2 min-h-[10rem] shadow-lg rounded-md overflow-hidden p-5 flex flex-col gap-5 items-center"
        onSubmit={handleSubmit}
      >
        <h3 className="font-semibold text-2xl overflow-ellipsis overflow-hidden whitespace-nowrap text-center">
          {!id ? "Create User" : "Edit User"}
        </h3>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          onChange={handleChange}
          className="input"
          value={form.name}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
          className="input"
          value={form.email}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required={id ? false : true}
          onChange={handleChange}
          className="input"
          value={form.password}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required={id ? false : true}
          onChange={handleChange}
          className="input"
          value={form.confirmPassword}
        />
        <div className="flex gap-2 items-center">
          <input
            type="checkbox"
            name="isAdmin"
            id="isAdmin"
            checked={form.isAdmin}
            onChange={handleChange}
          />
          <label htmlFor="isAdmin">Admin</label>
        </div>
        {isLoadingCreate || isLoadingUpdate ? (
          <button
            className="button-primary w-full flex justify-center items-center"
            disabled
          >
            <LoadingSpinner /> Submitting...
          </button>
        ) : (
          <button className="button-primary w-full">Submit</button>
        )}
      </form>
    </div>
  );
};
