import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteProduct,
  getProducts,
} from "../../../redux/features/productSlice";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useEffect } from "react";

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    products: data,
    loading,
    error,
  } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
    // eslint-disable-next-line
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteProduct({ id, toast }));
  };

  const rows = data
    ? data.map((item) => {
        return {
          id: item._id,
          imageUrl: item.image.url,
          pName: item.name,
          pDesc: item.description,
          price: item.price.toLocaleString(),
          slug: item.slug,
        };
      })
    : null;

  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    {
      field: "imageUrl",
      headerName: "Image",
      width: 80,
      renderCell: (params) => {
        return (
          <div className="image-container">
            <img src={params.row.imageUrl} alt="" />
          </div>
        );
      },
    },
    { field: "pName", headerName: "Product Name", width: 150 },
    {
      field: "pDesc",
      headerName: "Description",
      width: 350,
    },
    {
      field: "price",
      headerName: "Price",
      width: 80,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 300,
      renderCell: (params) => {
        return (
          <div className="flex justify-between w-full">
            <button
              className="button-red"
              onClick={() => handleDelete(params.row.id)}
            >
              {loading ? "..." : "Delete"}
            </button>
            <button
              className="button-primary"
              onClick={() => navigate(`/admin/products/edit/${params.row.id}`)}
            >
              Edit
            </button>
            <button
              className="button-green"
              onClick={() => navigate(`/${params.row.slug}`)}
            >
              View
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="w-11/12 h-[25rem] m-auto">
      {error ? (
        <div className="text-red-500">Error: {error.message}</div>
      ) : loading ? (
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

export default ProductList;
