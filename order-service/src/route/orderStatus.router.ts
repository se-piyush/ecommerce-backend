import express from "express";
import { getOrderStatus } from "../controller/orderStatus.controller";

const router = express.Router();
router.get("/:OrderId/status", getOrderStatus);

export default router;
