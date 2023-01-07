import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner";
import { createProduct } from "../../redux/features/productSlice";

export const CreateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.product);
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
      form.rating < 0
    ) {
      toast.error(
        "Price, Stock and Rating must be greater than zero"
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
    <div className="min-h-[calc(100vh-160px)] flex flex-col justify-center items-center md:flex-row md:items-start">
      <form className="bg-white w-4/5 md:w-1/2 min-h-[10rem] shadow-lg rounded-md overflow-hidden p-5 flex flex-col gap-5 items-center" onSubmit={handleSubmit}>
        <h3 className="font-semibold text-2xl overflow-ellipsis overflow-hidden whitespace-nowrap text-center">Create a Product</h3>
        <input
          type="file"
          name="image"
          accept="image/"
          required
          onChange={handleChange}
          className="input"
        />
        <input
          type="text"
          name="name"
          onChange={handleChange}
          required
          placeholder="Name"
          className="input"
        />
        <input
          type="text"
          name="slug"
          onChange={handleChange}
          required
          placeholder="Slug"
          className="input"
        />
        <select onChange={handleChange} name="brand" required className="input">
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
          className="input"
        />
        <select onChange={handleChange} name="category" required className="input">
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
          className="input"
        />
        <input
          type="number"
          name="countInStock"
          onChange={handleChange}
          required
          min={0}
          placeholder="Stock"
          className="input"
        />
        <input
          type="number"
          name="rating"
          onChange={handleChange}
          required
          min={0}
          max={5}
          placeholder="Rating"
          className="input"
        />
        {loading ? (
          <button
            className="button-primary w-full flex justify-center items-center"
            disabled
          >
            <LoadingSpinner /> Submitting...
          </button>
        ) : (
          <button className="button-primary w-full">Submit</button>
        )}
      </form>
      <div className="my-5 p-5 md:w-1/2">
        {form.image ? (
          <>
            <img src={imagePreview} alt="productImg" className="w-full h-full object-cover hover:shadow-lg transition" />
          </>
        ) : (
          <p>Image preview will appear here!</p>
        )}
      </div>
    </div>
  );
};
