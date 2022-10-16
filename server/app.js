import express from "express";
import morgan from "morgan";
import cors from "cors";
import fileUpload from "express-fileupload";
import productRoutes from "./routes/product.routes.js";
import authRoutes from "./routes/auth.routes.js";
import paymentRoutes from './routes/payment.routes.js'

const app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json());
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
app.get("/", (req, res) => {
  res.send("Welcome to online shop API");
});

export default app;
