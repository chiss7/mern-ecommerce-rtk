import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  return user?.result?._id && user?.result?.isAdmin ? (
    children
  ) : (
    <LoadingToRedirect />
  );
};

export default AdminRoute;
