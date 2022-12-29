import { useGetAllProductsQuery } from "../redux/features/productApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

export const Home = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  return (
    <div className="bg-sky-100 md:min-h-[93.8vh] text-gray-700">
      <h2 className="text-3xl text-center pt-5 font-extrabold">New Arrivals</h2>
      {isLoading ? (
        <div className="h-[88vh] flex items-center justify-center py-5">
          <LoadingSpinner msg="Loading..." />
        </div>
      ) : error ? (
        <div className="h-[88vh] flex justify-center py-5 text-red-500">
          <p>An error occurred {error.data.message}</p>
        </div>
      ) : (
        <>
          <div className="md:h-[80vh] flex items-center justify-center gap-8 flex-col md:flex-row md:flex-wrap sm:py-3">
            {data?.map((product) => (
              /* product card */
              <div
                className="bg-white w-72 min-h-[10rem] shadow-lg rounded-md overflow-hidden"
                key={product._id}
              >
                {/* product img */}
                <Link to={`/${product.slug}`}>
                  <img
                    className="w-full h-full object-cover hover:shadow-lg transition"
                    src={product.image.url}
                    alt={product.name}
                  />
                </Link>

                {/* product body */}
                <div className="p-5 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    {/* product title */}
                    <Link to={`/${product.slug}`}>
                      <h2 className="font-semibold text-2xl overflow-ellipsis overflow-hidden whitespace-nowrap">
                        {product.name}
                      </h2>
                    </Link>
                    {/* product price */}
                    <span className="text-xl font-bold">${product.price}</span>
                  </div>

                  {/* product details */}
                  <span>{product.description}</span>
                  <div className="flex justify-between">
                    <span>Category: {product.category}</span>
                    <span>{product.rating} stars</span>
                  </div>

                  {/* product button */}
                  <div className="mt-2">
                    <button
                      className={`button-primary w-full ${
                        product.countInStock === 0 ? "cursor-not-allowed" : ""
                      }`}
                      onClick={() => handleAddToCart(product)}
                      disabled={product.countInStock === 0}
                    >
                      {product.countInStock > 0
                        ? "Add To Cart"
                        : "Out of Stock"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
