import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  markAsWatched,
  favouriteList,
  watchList,
} from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJwt, logoutUser);

router.route("/current-user").get(verifyJwt, getCurrentUser);

router.route("/mark-as-watched").post(verifyJwt, markAsWatched);

router.route("/favourite-list").post(verifyJwt, favouriteList);

router.route("/watch-list").post(verifyJwt, watchList);

export default router;