import { Request, Response } from "express";
import Product from "../model/product.model";
import mongoose from "mongoose";
import review from "../model/reviews.model";

export const getProductReviews = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const productId = req.params.productId || "";
    const reviews = await Product.findById(productId);
    return res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createReviews = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { user, rating, title, description }: Review = req.body;
    const productId = req.params.productId;

    const newProduct = new review({
      product: new mongoose.Types.ObjectId(productId),
      title,
      description,
      user,
      rating,
    });

    const savedProduct: ReviewDocument = await newProduct.save();

    return res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
