import Order from "../models/Order.js";
import Product from "../models/Product.js";
import moment from "moment";
import { FROM } from "../config.js";
import { payOrderEmailTemplate, sendMail } from "../utils.js";

export const placeOrder = {
  getOrders: async (req, res) => {
    const query = req.query.new;
    try {
      const orders = query
        ? await Order.find().sort({ _id: -1 }).limit(4)
        : await Order.find().sort({ _id: -1 });
      //console.log(orders);
      if (!orders)
        return res.status(404).json({ message: "There is no order yet" });
      res.status(200).json(orders);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Something went wrong" });
    }
  },
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
      if (order.user.toString() !== req.userId)
        return res
          .status(404)
          .json({ message: "This order does not belong to you" });
      res.status(200).json(order);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Something went wrong" });
    }
  },
  getOrdersByUser: async (req, res) => {
    try {
      const orders = await Order.find({ user: req.userId });
      res.status(200).json(orders);
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
      ).populate("user");
      if (!updatedOrder)
        return res.status(404).json({ message: "Order not found" });

      updatedOrder.orderItems.map((item) =>
        Product.findById(item._id.toString()).then((prod) => {
          prod.countInStock = prod.countInStock - item.cartQuantity;
          prod.save();
        })
      );

      // send email
      const msg = {
        to: updatedOrder.user.email,
        from: FROM,
        subject: "Thanks for your order",
        html: payOrderEmailTemplate(updatedOrder),
      };
      sendMail(msg);

      return res.json({ message: "Order Paid", order: updatedOrder });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Something went wrong" });
    }
  },
  getStats: async (req, res) => {
    const previousMonth = moment()
      .month(moment().month() - 1)
      .set("date", 1)
      .format("YYYY-MM-DD HH:mm:ss");
    try {
      const orders = await Order.aggregate([
        {
          $match: { createdAt: { $gte: new Date(previousMonth) } },
        },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      return res.status(200).json(orders);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Something went wrong" });
    }
  },
  getIncomeStats: async (req, res) => {
    const previousMonth = moment()
      .month(moment().month() - 1)
      .set("date", 1)
      .format("YYYY-MM-DD HH:mm:ss");
    try {
      const income = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: new Date(previousMonth) },
            isPaid: true,
          },
        },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$totalPrice",
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);
      return res.status(200).json(income);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Something went wrong" });
    }
  },
  getWeekSales: async (req, res) => {
    const last7Days = moment()
      .day(moment().day() - 7)
      .format("YYYY-MM-DD HH:mm:ss");
    try {
      const income = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: new Date(last7Days) },
            isPaid: true,
          },
        },
        {
          $project: {
            day: { $dayOfWeek: "$createdAt" },
            sales: "$totalPrice",
          },
        },
        {
          $group: {
            _id: "$day",
            total: { $sum: "$sales" },
          },
        },
      ]);
      return res.status(200).json(income);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Something went wrong" });
    }
  },
  updateOrder: async (req, res) => {
    try {
      const orderUpdated = await Order.findByIdAndUpdate(
        req.params.id,
        req.body.isDelivered
          ? Object.assign(req.body, { deliveredAt: Date.now() })
          : { $unset: { deliveredAt: 1 }, $set: req.body },
        { new: true }
      );
      if (!orderUpdated)
        return res.status(404).json({ message: "Order not found" });
      return res.status(200).json(orderUpdated);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Something went wrong" });
    }
  },
  deleteOrder: async (req, res) => {
    try {
      const orderDeleted = await Order.findByIdAndDelete(req.params.id);
      if (!orderDeleted)
        return res.status(404).json({ message: "Order not found" });
      return res.status(200).json(orderDeleted);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Something went wrong" });
    }
  },
};
