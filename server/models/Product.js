import mongoose from "mongoose";

const Product = mongoose.model("Product", {
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { url: String, public_id: String },
});

export default Product;
