// src/app.ts

import express from "express";
import cookieParser from "cookie-parser";
import productRoutes from "./route/product.router";
import reviewRoutes from "./route/review.router";
import { authenticateUserMiddleware } from "./middleware/authenticateUser.middleware";
import {
  health,
  ready,
  updateProductQuantityById,
} from "./controller/product.controller";
import mongoose, { ConnectOptions } from "mongoose";

const app = express();
const PORT = parseInt(process.env.PORT || "4000");
const mongoUrl = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/ecommerce?authSource=admin`;
// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/health", health);
app.get("/ready", ready);
// this route is for service to service communication only
app.put("/internal/product/:productId/quantity", updateProductQuantityById);

app.use("/product", authenticateUserMiddleware);
app.use("/product", productRoutes);
app.use("/product", reviewRoutes);

mongoose
  .connect(mongoUrl, <ConnectOptions>{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
