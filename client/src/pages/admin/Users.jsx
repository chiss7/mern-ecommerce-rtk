import { Outlet, useNavigate } from "react-router-dom";

export const Users = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="admin-headers">
        Users
        <button
          className="primary-button"
          onClick={() => navigate("/admin/users/new")}
        >
          Create User
        </button>
      </div>
      <Outlet />
    </>
  );
}
