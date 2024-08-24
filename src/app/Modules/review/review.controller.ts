import { JwtPayload } from "jsonwebtoken";
import { catchAsyncError } from "../../../utils/catchAsyncError";
import sendResponse from "../../../utils/sendResponse";
import User from "../user/user.model";
import reviewService from "./review.service";

export const createReview = catchAsyncError(async (req, res) => {
  const { body } = req;
  const user = req.user as JwtPayload;
  const isUserExist = await User.findById(user._id);
  if (!isUserExist) {
    return sendResponse(res, {
      data: null,
      success: false,
      message: "user doesn't exist",
      statusCode: 404,
    });
  }

  const result = await reviewService.createReviewService(body);
  sendResponse(res, {
    data: result,
    success: true,
    message: "review created successfully",
  });
});
export const getReviews = catchAsyncError(async (req, res) => {
  const limit = req.query.limit || 2;
  const result = await reviewService.getReviewService(Number(limit));
  sendResponse(res, {
    data: result,
    success: true,
    message: "successfully get reviews",
  });
});
