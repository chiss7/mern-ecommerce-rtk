import Product from "../models/Product.js";
import fs from "fs-extra";
import { uploadImage, deleteImage } from "../libs/cloudinary.js";

const ProductController = {
  getProducts: async (req, res) => {
    try {
      const products = await Product.find();
      return res.status(200).json(products);
    } catch (error) {
      console.log(error.message);
      return res.status(404).json({ message: "Something went wrong" });
    }
  },
  createProduct: async (req, res) => {
    try {
      let image;
      if (req.files?.image) {
        const response = await uploadImage(req.files.image.tempFilePath);
        await fs.remove(req.files.image.tempFilePath);
        image = {
          url: response.secure_url,
          public_id: response.public_id,
        };
      }

      const newProduct = await Product.create({
        ...req.body,
        image,
      });

      return res.status(201).json(newProduct);
    } catch (error) {
      console.log(error.message);
      return res.status(404).json({ message: "Something went wrong" });
    }
  },
  getProductBySlug: async (req, res) => {
    try {
      const product = await Product.findOne({ slug: req.params.slug });
      if (!product)
        return res.status(404).json({ message: "Product not found" });
      return res.json(product)
    } catch (error) {
      console.log(error.message);
      return res.status(404).json({ message: "Something went wrong" });
    }
  },
  getProductById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product)
        return res.status(404).json({ message: "Product not found" });
      return res.json(product)
    } catch (error) {
      console.log(error.message);
      return res.status(404).json({ message: "Something went wrong" });
    }
  },
};

export default ProductController;
