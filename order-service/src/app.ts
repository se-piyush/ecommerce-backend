import express from "express";
import cookieParser from "cookie-parser";
import orderRoutes from "./route/order.router";
import orderStatusRoutes from "./route/orderStatus.router";
import { authenticateUserMiddleware } from "./middleware/authenticateUser.middleware";
import { health, ready } from "./controller/order.controller";

const app = express();
const PORT = parseInt(process.env.PORT || "5000");
const rootApipath = "/orders";
// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/health", health);
app.get("/ready", ready);
app.use(authenticateUserMiddleware);
app.use(`${rootApipath}`, orderRoutes);
app.use(`${rootApipath}`, orderStatusRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
