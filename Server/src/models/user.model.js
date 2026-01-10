import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      unique: true,
      required: [true, "Phone number is required!"],
      set: (val) => {
        if (!val.startsWith("+91")) {
          return `+91${val}`;
        }
        return val;
      },
    },
    markAsWatched: {
      type: [
        {
          mediaId: {
            type: Number,
            required: true,
          },
          type: {
            type: String,
            enum: ["movie", "tv", "series"],
            required: true,
          },
        },
      ],
      default: [],
    },
    favouriteList: {
      type: [
        {
          mediaId: {
            type: Number,
            required: true,
          },
          type: {
            type: String,
            enum: ["movie", "tv"],
            required: true,
          },
        },
      ],
      default: [],
    },
    watchList: {
      type: [
        {
          mediaId: {
            type: Number,
            required: true,
          },
          type: {
            type: String,
            enum: ["movie", "tv"],
            required: true,
          },
        },
      ],
      default: [],
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    collections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
