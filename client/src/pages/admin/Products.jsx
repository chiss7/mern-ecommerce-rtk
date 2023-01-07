import { Outlet, useNavigate } from "react-router-dom";

export const Products = () => {
  const navigate = useNavigate();
  return (
    <div className="w-9/12 m-auto">
      <div className="flex justify-between items-center my-5">
        <h1 className="font-extrabold text-2xl">Products</h1>
        <button
          className="button-primary"
          onClick={() => navigate("/admin/products/new")}
        >
          Create Product
        </button>
      </div>
      <Outlet />
    </div>
  );
};
