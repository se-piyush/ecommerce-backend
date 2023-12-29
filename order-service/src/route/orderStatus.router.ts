import express from "express";
import {
  getOrderStatus,
  updateOrderStatus,
} from "../controller/orderStatus.controller";

const router = express.Router();

router.get("/:orderId/status", getOrderStatus);
router.post("/:orderId/status", updateOrderStatus);

export default router;
