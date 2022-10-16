import { Router } from "express";
import { Payment_PayPal } from "../controllers/payment.controller.js";

const router = Router();

router.post("/create-order", Payment_PayPal.createOrder);
router.get("/capture-order", Payment_PayPal.captureOrder);
router.get("/cancel-order", Payment_PayPal.cancelOrder);

export default router;
