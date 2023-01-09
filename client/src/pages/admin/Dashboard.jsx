import { NavLink, Outlet } from "react-router-dom";
import { FaUsers, FaStore, FaClipboard, FaTachometerAlt } from "react-icons/fa";
import { useState } from "react";

export const Dashboard = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex">
      <div className="fixed bg-sky-800 rounded-r-3xl pt-1">
        <button onClick={() => setOpen(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-plus mx-2"
            width="35"
            height="35"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#fff"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>
      
      {/* aside */}
      <aside
        className={`bg-sky-800 w-72 min-h-[calc(100vh-59px)] text-white py-6 relative top-0 left-0 transition-all duration-300 ${
          open ? "w-72" : "w-0"
        }`}
      >
        <div className={`pb-3 flex items-center justify-evenly text-center text-xl font-bold ${!open && 'hidden'}`}>
          <h3>Quick Links</h3>
          <button className="m-3" onClick={() => setOpen(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-x"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#fff"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className={`flex flex-col gap-3 px-6 ${!open && 'hidden'}`}>
          <NavLink
            to="/admin/summary"
            className={({ isActive }) =>
              isActive ? "link-active link" : "link"
            }
            onClick={() => setOpen(false)}
          >
            <FaTachometerAlt /> Summary
          </NavLink>
          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              isActive ? "link-active link" : "link"
            }
            onClick={() => setOpen(false)}
          >
            <FaStore /> Products
          </NavLink>
          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              isActive ? "link-active link" : "link"
            }
            onClick={() => setOpen(false)}
          >
            <FaClipboard /> Orders
          </NavLink>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              isActive ? "link-active link" : "link"
            }
            onClick={() => setOpen(false)}
          >
            <FaUsers /> Users
          </NavLink>
        </div>
      </aside>
      {/* content */}
      <div className="p-2 flex-1 min-h-[calc(100vh-59px)]">
        <Outlet />
      </div>
    </div>
  );
};
