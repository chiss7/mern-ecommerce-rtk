import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import decode from "jwt-decode";
import { setLogout } from "../redux/features/authSlice";
import { toast } from "react-toastify";

const NavBar = () => {
  const dispatch = useDispatch();
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const signed = user?.signed;

  if (signed) {
    const decodedToken = decode(signed);
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      dispatch(setLogout());
    }
  }

  const hideMenu = () =>
    document.querySelector("#menu").classList.toggle("hidden");

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-sky-900 p-3">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-stack-2 mr-2"
            width="35"
            height="35"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#ffffff"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <polyline points="12 4 4 8 12 12 20 8 12 4" />
            <polyline points="4 12 12 16 20 12" />
            <polyline points="4 16 12 20 20 16" />
          </svg>
          <Link to={"/"} className="font-semibold text-xl tracking-tight">
            Ecommerce
          </Link>
        </div>

        <div className="block lg:hidden">
          <button
            className="flex items-center px-3 py-2 border rounded text-sky-200 border-sky-400 hover:text-white hover:border-white"
            onClick={hideMenu}
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>

        <div
          id="menu"
          className="w-full flex-grow lg:flex lg:items-center lg:w-auto md:text-center lg:text-right hidden"
        >
          <div className="lg:flex-grow">
            {user?.result?._id && user?.result?.isAdmin ? (
              <>
                <Link
                  className="block mt-4 lg:inline-block lg:mt-0 text-sky-200 hover:text-white mr-4"
                  to="/admin/summary"
                  onClick={hideMenu}
                >
                  Dashboard
                </Link>
                <Link
                  to="/login"
                  onClick={() => {
                    dispatch(setLogout());
                    toast.warning("You have been logged out!");
                    hideMenu();
                  }}
                >
                  <div className="block mt-4 lg:inline-block lg:mt-0 text-sky-200 hover:text-white mr-4">
                    Logout
                  </div>
                </Link>
              </>
            ) : (
              <>
                <Link
                  className="block mt-4 lg:inline-block lg:mt-0 text-sky-200 hover:text-white mr-4"
                  to="/cart"
                  onClick={hideMenu}
                >
                  <div className="items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="35"
                      height="35"
                      fill="currentColor"
                      className="bi bi-cart2 inline-block mr-1"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                    </svg>
                    <span
                      className={`bg-sky-700 px-3 py-1 rounded-full inline-block ${
                        cartTotalQuantity === 0 ? "hidden" : ""
                      }`}
                    >
                      {cartTotalQuantity}
                    </span>
                  </div>
                </Link>
                {user?.result?._id ? (
                  <>
                    <h4 className="block mt-4 lg:inline-block lg:mt-0 text-sky-200 hover:text-white mr-4">
                      {user.result.name}
                    </h4>
                    <Link
                      className="block mt-4 lg:inline-block lg:mt-0 text-sky-200 hover:text-white mr-4"
                      to="/profile"
                      onClick={hideMenu}
                    >
                      Profile
                    </Link>
                    <Link
                      className="block mt-4 lg:inline-block lg:mt-0 text-sky-200 hover:text-white mr-4"
                      to="/order-history"
                      onClick={hideMenu}
                    >
                      Order History
                    </Link>
                    <Link
                      to="/login"
                      onClick={() => {
                        dispatch(setLogout());
                        toast.warning("You have been logged out!");
                        hideMenu();
                      }}
                    >
                      <div className="block mt-4 lg:inline-block lg:mt-0 text-sky-200 hover:text-white mr-4">
                        Logout
                      </div>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to={"/login"}
                      className="block mt-4 lg:inline-block lg:mt-0 text-sky-200 hover:text-white mr-4"
                      onClick={hideMenu}
                    >
                      Login
                    </Link>
                    <Link
                      to={"/register"}
                      className="block mt-4 lg:inline-block lg:mt-0 text-sky-200 hover:text-white mr-4"
                      onClick={hideMenu}
                    >
                      Register
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
