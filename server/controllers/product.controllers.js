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
      return res.status(500).json({ message: "Something went wrong" });
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
      return res.status(500).json({ message: "Something went wrong" });
    }
  },
  getProductBySlug: async (req, res) => {
    try {
      const product = await Product.findOne({ slug: req.params.slug });
      if (!product)
        return res.status(404).json({ message: "Product not found" });
      return res.json(product);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Something went wrong" });
    }
  },
  getProductById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product)
        return res.status(404).json({ message: "Product not found" });
      return res.json(product);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Something went wrong" });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct)
        return res.status(404).json({ message: "Product not found" });
      if (deletedProduct.image.public_id)
        await deleteImage(deletedProduct.image.public_id);
      return res.status(200).json(deletedProduct);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Something went wrong" });
    }
  },
  updateProduct: async (req, res) => {
    console.log(req.body)
    /* try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      return res.status(200).json(updatedProduct);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Something went wrong" });
    } */
  },
};

export default ProductController;
