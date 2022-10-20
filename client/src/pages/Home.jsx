import { useGetAllProductsQuery } from "../redux/features/productApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cartSlice";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  return (
    <div className="home-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>An error occurred {error.data}</p>
      ) : (
        <>
          <h2>New Arrivals</h2>
          <div className="products">
            {data?.map((product) => (
              <div className="product" key={product._id}>
                <h3>{product.name}</h3>
                <img src={product.image.url} alt={product.name} />
                <div className="details">
                  <span>{product.description}</span>
                  <span className="price">${product.price}</span>
                </div>
                <div>
                  <span>Category: {product.category}</span><br />
                  <span>Rating: {product.rating} stars</span>
                </div>
                <button onClick={() => handleAddToCart(product)}>
                  Add To Cart
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
