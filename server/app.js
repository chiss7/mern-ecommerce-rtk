import express from "express";
import morgan from "morgan";
import cors from "cors";
import fileUpload from "express-fileupload";
import productRoutes from "./routes/product.routes.js";
import authRoutes from "./routes/auth.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import orderRoutes from "./routes/order.routes.js";
import path from "path";
import { PAYPAL_API_CLIENT } from "./config.js";

const app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./upload",
  })
);

// routes
app.use("/users", authRoutes);
app.use("/product", productRoutes);
app.use("/payment", paymentRoutes);
app.use("/orders", orderRoutes);
app.get("/api/keys/paypal", (req, res) => {
  res.send(PAYPAL_API_CLIENT || "sb");
});
/* app.get("/", (req, res) => {
  res.send("Welcome to online shop API");
}); */
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/client/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/client/build/index.html"))
);

export default app;
