import { Link, Outlet } from "react-router-dom";

export const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="side-nav">
        <h3>Quick Links</h3>
        <Link to="/admin/summary">Summary</Link>
        <Link to="/admin/products">Products</Link>
        <Link to="/admin/orders">Orders</Link>
        <Link to="/admin/users">Users</Link>
      </div>
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};
