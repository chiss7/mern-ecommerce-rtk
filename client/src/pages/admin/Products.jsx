import { Outlet, useNavigate } from "react-router-dom";

export const Products = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/admin/products/new")}>
        Create Product
      </button>
      <Outlet />
    </div>
  );
};
