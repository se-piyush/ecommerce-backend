// src/app.ts

import express from "express";
import cookieParser from "cookie-parser";
import productRoutes from "./route/product.router";
import reviewRoutes from "./route/review.router";
import "./config/passport.config";
import { authenticateUserMiddleware } from "./middleware/authenticateUser.middleware";

const app = express();
const PORT = 4000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use(authenticateUserMiddleware);
app.use("/product", productRoutes);
app.use("/product", reviewRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
