import mongoose from "mongoose";
import { IReview } from "./review.interface";

const reviewShcema = new mongoose.Schema<IReview>(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
const Review = mongoose.model("Review", reviewShcema);
export default Review;
// 668eaf8a3a7a67489a47b701
