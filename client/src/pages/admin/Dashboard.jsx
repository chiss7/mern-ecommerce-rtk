import { NavLink, Outlet } from "react-router-dom";
import { FaUsers, FaStore, FaClipboard, FaTachometerAlt } from "react-icons/fa";

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
          <FaTachometerAlt /> Summary
        </NavLink>
        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
        >
          <FaStore /> Products
        </NavLink>
        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
        >
          <FaClipboard /> Orders
        </NavLink>
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
        >
          <FaUsers /> Users
        </NavLink>
      </div>
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};
