import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useGetProductByIdQuery } from "../../redux/features/productApi";
import {
  createProduct,
  updateProduct,
} from "../../redux/features/productSlice";

export const CreateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.product);
  const { data: product, isSuccess } = useGetProductByIdQuery(id, {
    skip: id ? false : true,
  });
  const [imagePreview, setImagePreview] = useState(null);
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
  const [formForUpdate, setFormForUpdate] = useState({});

  const handleChange = (e) => {
    if (e.target.name === "image") {
      transformFile(e.target.files[0]);
    }
    setForm(
      e.target.name === "image"
        ? { ...form, image: e.target.files[0] }
        : { ...form, [e.target.name]: e.target.value }
    );
    if (id) {
      setFormForUpdate(
        e.target.name === "image"
          ? { ...formForUpdate, image: e.target.files[0] }
          : { ...formForUpdate, [e.target.name]: e.target.value }
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.price < 0 || form.countInStock < 0 || form.rating < 0) {
      toast.error("Price, Stock and Rating must be greater than zero");
    } else if (form.rating > 5) {
      toast.error("Rating must be between 0 and 5");
    } else {
      if (id) {
        dispatch(updateProduct({ id, formForUpdate, toast, navigate }));
      } else {
        dispatch(createProduct({ form, toast, navigate }));
      }
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

  useEffect(() => {
    if (isSuccess) {
      setForm({
        image: null,
        name: product.name,
        slug: product.slug,
        brand: product.brand,
        description: product.description,
        category: product.category,
        price: product.price,
        countInStock: product.countInStock,
        rating: product.rating,
      });
    }
    // eslint-disable-next-line
  }, [isSuccess]);

  return (
    <div className="min-h-[calc(100vh-160px)] flex flex-col justify-center items-center md:flex-row md:items-start">
      <form
        className="bg-white w-4/5 md:w-1/2 min-h-[10rem] shadow-lg rounded-md overflow-hidden p-5 flex flex-col gap-5 items-center"
        onSubmit={handleSubmit}
      >
        <h3 className="font-semibold text-2xl overflow-ellipsis overflow-hidden whitespace-nowrap text-center">
          {!id ? "Create Product" : "Edit Product"}
        </h3>
        <input
          type="file"
          name="image"
          accept="image/"
          required={id ? false : true}
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
          value={form.name}
        />
        <input
          type="text"
          name="slug"
          onChange={handleChange}
          required
          placeholder="Slug"
          className="input"
          value={form.slug}
        />
        <select
          onChange={handleChange}
          name="brand"
          required
          className="input"
          value={form.brand}
        >
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
          value={form.description}
        />
        <select
          onChange={handleChange}
          name="category"
          required
          className="input"
          value={form.category}
        >
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
          value={form.price}
        />
        <input
          type="number"
          name="countInStock"
          onChange={handleChange}
          required
          min={0}
          placeholder="Stock"
          className="input"
          value={form.countInStock}
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
          value={form.rating}
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
            <img
              src={imagePreview}
              alt="productImg"
              className="w-full h-full object-cover hover:shadow-lg transition"
            />
          </>
        ) : (
          <p>Image preview will appear here!</p>
        )}
      </div>
    </div>
  );
};
