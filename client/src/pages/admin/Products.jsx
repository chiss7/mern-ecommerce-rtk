import { Outlet, useNavigate } from "react-router-dom";

export const Products = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="admin-headers">
        Products
        <button
          className="primary-button"
          onClick={() => navigate("/admin/products/new")}
        >
          Create Product
        </button>
      </div>
      <Outlet />
    </>
  );
};
