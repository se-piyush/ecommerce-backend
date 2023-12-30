// src/app.ts

import express from "express";
import cookieParser from "cookie-parser";
import productRoutes from "./route/product.router";
import reviewRoutes from "./route/review.router";
import { authenticateUserMiddleware } from "./middleware/authenticateUser.middleware";
import { health, ready } from "./controller/product.controller";

const app = express();
const PORT = 4000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/health", health);
app.get("/ready", ready);
app.use(authenticateUserMiddleware);
app.use("/product", productRoutes);
app.use("/product", reviewRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
