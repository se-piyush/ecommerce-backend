import { Request, Response } from "express";
import Product from "../model/product.model";
import mongoose from "mongoose";

export const getProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const filter = <Record<string, string>>(
      JSON.parse(<string>req.query.filter || "{}")
    );

    const isFilterInvalid = Object.keys(filter).find((filterKey) =>
      ["category", "title", "id"].includes(filterKey)
    );

    if (!isFilterInvalid) {
      return res
        .status(400)
        .send('only allowed filters are "category","title" and "id"');
    }
    let products: IProduct[];

    if (filter.id) {
      products = await Product.find({
        _id: new mongoose.Types.ObjectId(filter.id),
      });
    } else {
      products = await Product.find(filter);
    }

    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for the specified category." });
    }

    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      title,
      description,
      price,
      category,
      quantity,
      imageUrl,
      tags,
    }: IProduct = req.body;

    const newProduct: IProductDocument = new Product({
      title,
      description,
      price,
      category,
      quantity,
      imageUrl,
      tags,
    });

    const savedProduct: IProductDocument = await newProduct.save();

    return res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProductQuantityById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const productId: string = req.params.productId;

    const product: IProduct | null = await Product.findById(productId)
      .select("quantity")
      .exec();

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    return res.status(200).json({ quantity: product.quantity });
  } catch (error) {
    console.error("Error fetching product quantity by ID:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProductQuantityById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const productId: string = req.params.productId;
    const newQuantity: number = req.body.quantity;

    const updatedProduct = await Product.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(productId),
        quantity: { $gte: newQuantity },
      },
      { $inc: { quantity: -newQuantity } },
      { returnDocument: "after" }
    ).exec();

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product cannot be updated." });
    }

    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product quantity by ID:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const health = (req: Request, res: Response) => res.status(200).send();

export const ready = (req: Request, res: Response) => {
  // LATER
  // check the db connection
  return res.status(200).send();
};
