import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import orderRoutes from "./route/order.router";
import publicOrderStatusRouter from "./route/orderStatus.router";
import { authenticateUserMiddleware } from "./middleware/authenticateUser.middleware";
import { health, ready } from "./controller/order.controller";
import { updateOrderStatus } from "./controller/orderStatus.controller";
import BaseError from "./error";

const app = express();
const PORT = parseInt(process.env.PORT || "5000");
const rootApipath = "orders";
// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/health", health);
app.get("/ready", ready);
app.put(`/internal/${rootApipath}/:OrderId/status`, updateOrderStatus);
app.use(`/${rootApipath}`, authenticateUserMiddleware);
app.use(`/${rootApipath}`, orderRoutes);
app.use(`/${rootApipath}`, publicOrderStatusRouter);

app.use((err: BaseError, _req: Request, res: Response, _next: NextFunction) => {
  console.log(err.message);
  return res.status(err.httpCode).send(err.message);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
