import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { addToCart } from "../redux/features/cartSlice";
import { useGetProductBySlugQuery } from "../redux/features/productApi";
import { useDispatch } from "react-redux";
import Rating from "../components/Rating";

export const Product = () => {
  const params = useParams();
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductBySlugQuery(params.slug);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  return (
    <>
      <div className="flex flex-col items-center">
        {isLoading ? (
          <div className="flex items-center justify-center py-5">
            <LoadingSpinner msg="Loading..." />
          </div>
        ) : error ? (
          <div className="flex justify-center py-5 text-red-500">
            <p>An error occurred {error.data.message}</p>
          </div>
        ) : (
          /* Product */
          <div className="w-11/12 grid md:grid-cols-2 lg:grid-cols-3 gap-2 my-3">
            {/* product img */}
            <img
              className="w-full h-full object-cover lg:col-span-2"
              src={product.image?.url}
              alt="product"
            />
            {/* product general info */}
            <div className="md:ml-4 lg:ml-8">
              <div className="flex justify-between items-center uppercase">
                <h3 className="font-semibold text-2xl overflow-ellipsis overflow-hidden whitespace-nowrap">
                  {product.name}
                </h3>
                <p
                  className={`${
                    product.countInStock > 0
                      ? "bg-green-300 px-2 py-1"
                      : "bg-red-300 px-2 py-1"
                  }`}
                >
                  {product.countInStock > 0 ? "in stock" : "out of stock"}
                </p>
              </div>
              <p>
                <span>Brand:</span> {product.brand}
              </p>
              <p>
                <span>Description:</span> {product.description}
              </p>
              <p>
                <span>Category:</span> {product.category}
              </p>

              <div className="flex justify-between items-center">
                <div className="text-3xl font-bold my-3">
                  ${product.price?.toLocaleString()}
                </div>
                <div className="flex gap-3">
                  <p className="text-gray-400">( {product.rating} stars )</p>
                  <Rating rating={product.rating} />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-truck"
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#374151"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <circle cx="7" cy="17" r="2" />
                  <circle cx="17" cy="17" r="2" />
                  <path d="M5 17h-2v-11a1 1 0 0 1 1 -1h9v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" />
                </svg>
                <div className="flex flex-col">
                  <span>Shipping all over the country</span>
                  <span className="text-gray-400">
                    Know the times and forms of shipping
                  </span>
                </div>
              </div>
              <div className="my-3">
                <span className="text-gray-400">
                  {product.countInStock} available
                </span>
              </div>

              {/* product buttons */}
              <div className="my-2">
                <button
                  className={`button-primary w-full ${
                    product.countInStock === 0 ? "cursor-not-allowed" : ""
                  }`}
                  onClick={() => handleAddToCart(product)}
                  disabled={product.countInStock === 0}
                >
                  {product.countInStock > 0 ? "Add To Cart" : "Out of Stock"}
                </button>
              </div>
            </div>
            {/* product completed info */}
            <div className="md:col-span-2 lg:col-span-3">
              <h3 className="font-semibold text-lg">Description</h3>
              <p className="overflow-ellipsis overflow-hidden">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                sequi vel autem illo iure quaerat hic saepe excepturi laborum,
                omnis ab ratione tempora quod vero recusandae suscipit quidem,
                sapiente magnam. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Velit dolorum in temporibus alias distinctio!
                Iure, quod fugiat molestiae doloribus laboriosam sapiente
                laborum delectus provident, autem deserunt magnam voluptatem
                inventore officia?
              </p>
            </div>
          </div>
          /* to do -> feedback, rating */
        )}
      </div>
    </>
  );
};
