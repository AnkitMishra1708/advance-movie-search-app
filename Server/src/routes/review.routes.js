import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  addReview,
  getMyReviews,
  getReviews,
  removeReview,
} from "../controllers/review.controller.js";

const router = Router();

router.route("/add-review").post(verifyJwt, addReview);
router.route("/:id/remove-review").post(verifyJwt, removeReview);
router.route("/get-review/:type/:mediaId").get(verifyJwt, getReviews);
router.route("/get-my-review").get(verifyJwt, getMyReviews);

export default router;
