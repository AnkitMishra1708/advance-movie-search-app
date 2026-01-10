import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Collection } from "../models/collection.model.js";

const createCollection = asyncHandler(async (req, res) => {
  const { name, description, type } = req.body;

  if (!name) throw new ApiError(400, "Collection name required");

  const collection = await Collection.create({
    user: req.user._id,
    name,
    description,
    type,
  });

  res.status(201).json(new ApiResponse(201, collection, "Collection created"));
});

const getMyCollection = asyncHandler(async (req, res) => {
  const collections = await Collection.find({ user: req.user._id });

  res
    .status(200)
    .json(new ApiResponse(200, collections, "Collections fetched"));
});

const addToCollection = asyncHandler(async (req, res) => {
  const { mediaId, type } = req.body;

  const collection = await Collection.findById(req.params.id);

  if (!collection) throw new ApiError(404, "Collection not found");

  const exists = collection.items.some(
    (i) => i.mediaId === mediaId && i.type === type
  );

  if (!exists) {
    collection.items.push({ mediaId, type });
    await collection.save();
  }

  res.json(new ApiResponse(200, collection, "Added to collection"));
});

const removeFromCollection = asyncHandler(async (req, res) => {
  const { mediaId, type } = req.body;

  const collection = await Collection.findById(req.params.id);
  if (!collection) {
    throw new ApiError(404, "Collection not found");
  }

  collection.items = collection.items.filter(
    (item) => String(item.mediaId) !== String(mediaId) || item.type !== type
  );

  await collection.save();

  return res
    .status(200)
    .json(new ApiResponse(200, collection, "Removed from collection"));
});

const deleteCollection = asyncHandler(async (req, res) => {
  const collection = await Collection.findById(req.params.id);

  if (!collection) {
    throw new ApiError(404, "Collection not found");
  }

  await collection.deleteOne();

  res.json(new ApiResponse(200, null, "Collection deleted successfully"));
});

export {
  createCollection,
  getMyCollection,
  addToCollection,
  removeFromCollection,
  deleteCollection,
};
