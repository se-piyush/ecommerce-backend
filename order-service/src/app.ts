import express from "express";
import cookieParser from "cookie-parser";
import orderRoutes from "./route/order.router";
import orderStatusRoutes from "./route/orderStatus.router";
import "./config/passport.config";
import { authenticateUserMiddleware } from "./middleware/authenticateUser.middleware";

const app = express();
const PORT = 5000;
const rootApipath = "/api/v1/order";
// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use(authenticateUserMiddleware);
app.use(`${rootApipath}`, orderRoutes);
app.use(`${rootApipath}`, orderStatusRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
