import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById } from "../../redux/features/productSlice";

const Product = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { product, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductById(params.id));
    // eslint-disable-next-line
  }, []);

  return (
    <div className="product-details">
      <div className="product-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="product-details_image_container">
              <img src={product.image?.url} alt="product" />
            </div>
            <div className="product-details_info">
              <h3>{product.name}</h3>
              <p><span>Brand:</span> {product.brand}</p>
              <p><span>Description:</span> {product.description}</p>
              <p><span>Category:</span> {product.category}</p>
              <div className="product-details_info_price">${product.price?.toLocaleString()}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Product;
