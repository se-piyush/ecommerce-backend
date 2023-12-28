import mongoose, { Schema } from "mongoose";

const reviewsSchema = new Schema<ReviewDocument>(
  {
    product: {
      ref: "Product",
      type: mongoose.Schema.Types.ObjectId,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } // Enable timestamps for createdAt and updatedAt fields
);

const review = mongoose.model<ReviewDocument, ReviewModel>(
  "Review",
  reviewsSchema
);

export default review;
