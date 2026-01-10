import { Review } from "../models/review.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addReview = asyncHandler(async (req, res) => {
  const { mediaId, type, mediaTitle, posterPath, rating, comment } = req.body;

  if (!comment) throw new ApiError(400, "Comment is required");

  const review = await Review.create({
    user: req.user._id,
    mediaId,
    type,
    mediaTitle,
    posterPath,
    rating,
    comment,
  });

  res
    .status(201)
    .json(new ApiResponse(201, review, "Review added successfully"));
});

export const removeReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    throw new ApiError(404, "Review not found");
  }

  await review.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Review deleted successfully"));
});

export const getReviews = asyncHandler(async (req, res) => {
  const { mediaId, type } = req.params;

  const reviews = await Review.find({ mediaId, type })
    .populate("user", "fullName email")
    .sort({ createdAt: -1 });

  res.json(new ApiResponse(200, reviews, "Reviews fetched"));
});

export const getMyReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ user: req.user._id })
    .populate("user", "fullName")
    .sort({ createdAt: -1 });

  res.status(200).json(reviews);
});
