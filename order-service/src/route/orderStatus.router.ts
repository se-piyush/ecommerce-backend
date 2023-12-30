import express from "express";
import {
  getOrderStatus,
  updateOrderStatus,
} from "../controller/orderStatus.controller";

const router = express.Router();

router.get("/:OrderId/status", getOrderStatus);
router.put("/:OrderId/status", updateOrderStatus);

export default router;
