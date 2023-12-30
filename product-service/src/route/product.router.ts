import express from "express";
import {
  createProduct,
  getProductQuantityById,
  getProducts,
  updateProductQuantityById,
} from "../controller/product.controller";

const router = express.Router();

router.get("/list", getProducts);
router.post("/create", createProduct);
router.get("/:productId/quantity", getProductQuantityById);
router.put("/:productId/quantity", updateProductQuantityById);

export default router;
