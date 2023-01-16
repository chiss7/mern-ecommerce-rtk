import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/LoadingSpinner";
import {
  useDeleteOrderMutation,
  useGetOrdersQuery,
  useUpdateOrderMutation,
} from "../../../redux/features/orderApi";

const OrderList = () => {
  const { data, isLoading: isLoadingFetch } = useGetOrdersQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder, { isLoading: isLoadingDelete }] =
    useDeleteOrderMutation();

  const handleDelete = (id) => {
    deleteOrder(id);
    toast.success("Order deleted");
  };

  const rows = data
    ? data.map((item) => {
        return {
          id: item._id,
          oIsDelivered: item.isDelivered,
          oIsPaid: item.isPaid,
          oShippingPrice: item.shippingPrice,
          oTaxPrice: item.taxPrice,
          oTotalPrice: item.totalPrice,
        };
      })
    : null;

  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    {
      field: "oIsDelivered",
      headerName: "Order Delivered",
      width: 200,
      renderCell: (params) => {
        return (
          <select
            onChange={(e) => {
              //handle update
              const body = {
                isDelivered: e.target.value === "true",
              };
              const id = params.row.id;
              updateOrder({ id, body });
              toast.success("Order updated successfully");
            }}
            className="input"
          >
            <option value={params.row.oIsDelivered}>
              {params.row.oIsDelivered ? "Delivered" : "Not Delivered"}
            </option>
            <option value={!params.row.oIsDelivered}>
              {!params.row.oIsDelivered ? "Delivered" : "Not Delivered"}
            </option>
          </select>
        );
      },
    },
    {
      field: "oIsPaid",
      headerName: "Order Paid",
      width: 250,
      renderCell: (params) => {
        return (
          <div
            className={
              params.row.oIsPaid
                ? "bg-green-500 p-2 text-white"
                : "bg-red-400 p-2 text-white"
            }
          >
            {params.row.oIsPaid ? "Paid" : "Not Paid"}
          </div>
        );
      },
    },
    {
      field: "oShippingPrice",
      headerName: "Shipping Price",
      width: 120,
    },
    {
      field: "oTaxPrice",
      headerName: "Tax Price",
      width: 120,
    },
    {
      field: "oTotalPrice",
      headerName: "Total Price",
      width: 120,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 150,
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
          </div>
        );
      },
    },
  ];

  return (
    <div className="w-11/12 h-[25rem] m-auto">
      {isLoadingFetch ? (
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

export default OrderList;
