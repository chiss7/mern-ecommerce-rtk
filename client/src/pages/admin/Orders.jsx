import { Outlet, useNavigate } from "react-router-dom";

export const Orders = () => {
  const navigate = useNavigate();
  return (
    <div className="w-9/12 m-auto">
      <div className="flex justify-between items-center my-5">
        <h1
          className="font-extrabold text-2xl cursor-pointer"
          onClick={() => navigate("/admin/orders")}
        >
          Orders
        </h1>
      </div>
      <Outlet />
    </div>
  );
};
