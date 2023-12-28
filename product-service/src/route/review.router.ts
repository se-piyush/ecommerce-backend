import express from "express";
import {
  getProductReviews,
  createReviews,
} from "../controller/reviews.controller";

const router = express.Router();

router.get("/:productId/reviews", getProductReviews);
router.post("/:productId/reviews", createReviews);

export default router;
