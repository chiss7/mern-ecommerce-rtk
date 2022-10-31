import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteProduct,
  getProducts,
} from "../../../redux/features/productSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products: data, loading } = useSelector((state) => state.product);

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
      width: 300,
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
      width: 130,
      renderCell: (params) => {
        return (
          <div className="actions">
            <button
              className="delete"
              onClick={() => handleDelete(params.row.id)}
            >
              {loading ? '...' : 'Delete'}
            </button>
            <button
              className="view"
              onClick={() => navigate(`/product/${params.row.id}`)}
            >
              View
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      {loading ? (
        "Loading Table..."
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      )}
    </div>
  );
};

export default ProductList;
