import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../../../redux/features/userApi";

const UserList = () => {
  const {
    data,
    isLoading: isLoadingFetch,
    error: errorFetch,
  } = useGetAllUsersQuery();
  const [deleteUser, { isLoading: isLoadingDelete }] = useDeleteUserMutation();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    deleteUser(id);
    toast.success("User deleted successfully");
  };

  const rows = data
    ? data.map((item) => {
        return {
          id: item._id,
          uName: item.name,
          uEmail: item.email,
          uIsAdmin: item.isAdmin,
          uVerified: item.verified,
        };
      })
    : null;

  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "uName", headerName: "Full Name", width: 200 },
    {
      field: "uEmail",
      headerName: "Email",
      width: 250,
    },
    {
      field: "uIsAdmin",
      headerName: "Admin Account",
      width: 120,
      renderCell: (params) => {
        return (
          <div
            className={
              params.row.uIsAdmin
                ? "bg-green-500 p-2 text-white"
                : "bg-red-400 p-2 text-white"
            }
          >
            {params.row.uIsAdmin ? "Admin" : "Normal"}
          </div>
        );
      },
    },
    {
      field: "uVerified",
      headerName: "Verified Account",
      width: 120,
      renderCell: (params) => {
        return (
          <div
            className={
              params.row.uVerified
                ? "bg-green-500 p-2 text-white"
                : "bg-red-400 p-2 text-white"
            }
          >
            {params.row.uVerified ? "Verified" : "Unverified"}
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 250,
      renderCell: (params) => {
        return (
          <div className="flex justify-evenly w-full">
            <button
              className="button-red"
              onClick={() => {
                handleDelete(params.row.id);
              }}
            >
              {isLoadingDelete ? (
                <div className="flex justify-center items-center">
                  <LoadingSpinner msg={"Loading..."} />
                </div>
              ) : (
                "Delete"
              )}
            </button>
            <button
              className="button-primary"
              onClick={() => navigate(`/admin/users/edit/${params.row.id}`)}
            >
              Edit
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="w-11/12 h-[25rem] m-auto">
      {errorFetch ? (
        <div className="text-red-500">Error: {errorFetch.error}</div>
      ) : isLoadingFetch ? (
        <div className="flex justify-center">
          <LoadingSpinner msg={"Loading..."} />
        </div>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          className="bg-white/50"
        />
      )}
    </div>
  );
};

export default UserList;
