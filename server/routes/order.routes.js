import { Router } from "express";
import { placeOrder } from "../controllers/order.controllers.js";
import { auth, isAdmin } from "../middlewares/auth.js";

const router = Router();

router.post("/", auth, placeOrder.createOrder);
router.get("/mine", auth, placeOrder.getOrdersByUser);
router.get("/stats", isAdmin, placeOrder.getStats);
router.get("/income/stats", isAdmin, placeOrder.getIncomeStats);
router.get("/:id", auth, placeOrder.getOrderById);
router.put("/:id/pay", auth, placeOrder.approvePay);

export default router;
