import { Router } from "express";
import { placeOrder } from "../controllers/order.controllers.js";
import { auth, isAdmin } from "../middlewares/auth.js";

const router = Router();

router.post("/", auth, placeOrder.createOrder);
router.get("/", isAdmin, placeOrder.getOrders);
router.get("/mine", auth, placeOrder.getOrdersByUser);
router.get("/stats", isAdmin, placeOrder.getStats);
router.get("/income/stats", isAdmin, placeOrder.getIncomeStats);
router.get("/week-sales", isAdmin, placeOrder.getWeekSales);
router.get("/:id", auth, placeOrder.getOrderById);
router.patch("/:id", isAdmin, placeOrder.updateOrder);
router.delete("/:id", isAdmin, placeOrder.deleteOrder);
router.put("/:id/pay", auth, placeOrder.approvePay);

export default router;
