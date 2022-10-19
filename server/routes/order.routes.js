import { Router } from "express";
import { placeOrder } from "../controllers/order.controllers.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.post('/', auth, placeOrder.createOrder);
router.get('/:id', auth, placeOrder.getOrderById);
router.put('/:id/pay', auth, placeOrder.approvePay);

export default router;