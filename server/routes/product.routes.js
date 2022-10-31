import { Router } from "express";
import ProductController from "../controllers/product.controllers.js";
import { isAdmin } from "../middlewares/auth.js";

const router = Router();

router.get("/", ProductController.getProducts);
router.post("/", isAdmin, ProductController.createProduct);
router.get("/slug/:slug", ProductController.getProductBySlug);
router.get("/:id", ProductController.getProductById);
router.put("/:id", isAdmin, ProductController.updateProduct);
router.delete("/:id", isAdmin, ProductController.deleteProduct);

export default router;
