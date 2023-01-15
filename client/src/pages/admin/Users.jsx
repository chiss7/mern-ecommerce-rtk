import { Outlet, useNavigate } from "react-router-dom";

export const Users = () => {
  const navigate = useNavigate();
  return (
    <div className="w-9/12 m-auto">
      <div className="flex justify-between items-center my-5">
        <h1
          className="font-extrabold text-2xl cursor-pointer"
          onClick={() => navigate("/admin/users")}
        >
          Users
        </h1>
        <button
          className="button-primary"
          onClick={() => navigate("/admin/users/new")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-plus"
            width="25"
            height="25"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#ffffff"
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
      <Outlet />
    </div>
  );
};
