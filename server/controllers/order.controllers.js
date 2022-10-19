import Order from "../models/Order.js";

export const placeOrder = {
  createOrder: async (req, res) => {
    try {
      const newOrder = await Order.create({
        orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
        shippingAddress: req.body.shippingAddress,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.userId,
      });
      res.status(201).json(newOrder);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Something went wrong" });
    }
  },
  getOrderById: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ message: "Order not found" });
      res.status(200).json(order);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Something went wrong" });
    }
  },
  approvePay: async (req, res) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
          isPaid: true,
          paidAt: Date.now(),
          paymentResult: {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
          },
        },
        { new: true }
      );
      if (!updatedOrder)
        return res.status(404).json({ message: "Order not found" });
      return res.json({ message: "Order Paid", order: updatedOrder });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Something went wrong" });
    }
  },
};
