import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: [true, "Collection name is required."],
      trim: true,
    },

    description: String,

    type: {
      type: String,
      enum: [
        "movie",
        "movies",
        "Movie",
        "Movies",
        "tv",
        "series",
        "Series",
        "both",
        "all",
        "All",
      ],
      default: "both",
    },

    items: [
      {
        mediaId: Number,
        type: {
          type: String,
          enum: ["movie", "tv", "series"],
        },
      },
    ],

    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Collection = mongoose.model("Collection", collectionSchema);
