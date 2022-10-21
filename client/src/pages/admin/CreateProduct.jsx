import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createProduct } from "../../redux/features/productSlice";

export const CreateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.product);
  const [form, setForm] = useState({
    image: null,
    name: "",
    slug: "",
    brand: "",
    description: "",
    category: "",
    price: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const handleChange = (e) => {
    if (e.target.name === "image") {
      transformFile(e.target.files[0]);
    }
    setForm(
      e.target.name === "image"
        ? { ...form, image: e.target.files[0] }
        : { ...form, [e.target.name]: e.target.value }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      form.price < 0 ||
      form.countInStock < 0 ||
      form.rating < 0 ||
      form.numReviews < 0
    ) {
      toast.error(
        "Price, Stock, Rating and NumReviews must be greater than zero"
      );
    } else if (form.rating > 5) {
      toast.error("Rating must be between 0 and 5");
    } else {
      dispatch(createProduct({ form, toast, navigate }));
    }
  };

  // Only for image preview
  const transformFile = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
    } else {
      setImagePreview(null);
    }
  };

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  return (
    <div className="createProduct-container">
      <form className="createProduct-form" onSubmit={handleSubmit}>
        <h3>Create a Product</h3>
        <input
          type="file"
          name="image"
          accept="image/"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="name"
          onChange={handleChange}
          required
          placeholder="Name"
        />
        <input
          type="text"
          name="slug"
          onChange={handleChange}
          required
          placeholder="Slug"
        />
        <select onChange={handleChange} name="brand" required>
          <option value="">Select Brand</option>
          <option value="puma">Puma</option>
          <option value="nike">Nike</option>
          <option value="tommy">Tommy</option>
          <option value="supreme">Supreme</option>
        </select>
        <input
          type="text"
          name="description"
          onChange={handleChange}
          required
          placeholder="Description"
        />
        <select onChange={handleChange} name="category" required>
          <option value="">Select Category</option>
          <option value="shoes">Shoes</option>
          <option value="t-shirt">T-shirt</option>
          <option value="shirt">Shirt</option>
          <option value="pants">Pants</option>
        </select>
        <input
          type="number"
          name="price"
          onChange={handleChange}
          required
          min={0}
          placeholder="Price"
        />
        <input
          type="number"
          name="countInStock"
          onChange={handleChange}
          required
          min={0}
          placeholder="Stock"
        />
        <input
          type="number"
          name="rating"
          onChange={handleChange}
          required
          min={0}
          max={5}
          placeholder="Rating"
        />
        <input
          type="number"
          name="numReviews"
          onChange={handleChange}
          required
          min={0}
          placeholder="Number of reviews"
        />
        <button className="primary-button">Submit</button>
      </form>
      <div className="image-preview">
        {form.image ? (
          <>
            <img src={imagePreview} alt="productImg" />
          </>
        ) : (
          <p>Image preview will appear here!</p>
        )}
      </div>
    </div>
  );
};
