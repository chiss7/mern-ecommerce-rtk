import { Outlet } from "react-router-dom";

export const Orders = () => {
  return (
    <>
      <div className="admin-headers">
        Orders
      </div>
      <Outlet />
    </>
  )
}
