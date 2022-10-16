import { Router } from "express";
import ProductController from "../controllers/product.controllers.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.get("/", ProductController.getProducts);
router.post("/", ProductController.createProduct);
router.get("/slug/:slug", ProductController.getProductBySlug);
router.get("/:id", ProductController.getProductById);

export default router;
