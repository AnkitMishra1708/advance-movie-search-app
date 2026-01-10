import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  addToCollection,
  createCollection,
  deleteCollection,
  getMyCollection,
  removeFromCollection,
} from "../controllers/collection.controller.js";

const router = Router();

router.route("/create-collection").post(verifyJwt, createCollection);
router.route("/get-collection").get(verifyJwt, getMyCollection);
router.route("/:id/add-to-collection").post(verifyJwt, addToCollection);
router.route("/:id/remove-from-collection").post(verifyJwt, removeFromCollection);
router.route("/:id/delete-collection").delete(verifyJwt, deleteCollection);

export default router;
