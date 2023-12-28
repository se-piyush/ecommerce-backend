import mongoose, { Document, Schema } from "mongoose";
import { ProductCatagory } from "../enums";

const productSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      enum: Object.values(ProductCatagory),
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    seller: {
      type: String,
    },
    reviews: [
      {
        user: {
          type: String,
          ref: "User",
          unique: true,
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        comment: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } // Enable timestamps for createdAt and updatedAt fields
);

// Create the Product model
const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
