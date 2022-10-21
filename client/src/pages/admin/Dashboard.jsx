import { NavLink, Outlet } from "react-router-dom";

export const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="side-nav">
        <h3>Quick Links</h3>
        <NavLink
          to="/admin/summary"
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
        >
          Summary
        </NavLink>
        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
        >
          Orders
        </NavLink>
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
        >
          Users
        </NavLink>
      </div>
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};
