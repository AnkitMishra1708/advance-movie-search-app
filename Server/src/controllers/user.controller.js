import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      `${error} Something went wrong while generating access or refresh token.`
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, number, password } = req.body;
  if (
    [fullName, email, number, password].some((field) => field?.trim() === "")
  ) {
    return res.status(404).json(new ApiError(400, "All fields are required"));
  }

  const existedUser = await User.findOne({
    $or: [{ email }, { number }],
  });

  if (existedUser) {
    return res
      .status(404)
      .json(new ApiError(409, "User with email or number is already exist!!!"));
  }

  const user = await User.create({
    fullName,
    email,
    password,
    number,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    return res
      .status(500)
      .json(new ApiError(500, "Something went while registering the user"));
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully."));
});

const loginUser = asyncHandler(async (req, res) => {
  const { number, email, password } = req.body;

  if (!number && !email) {
    return res
      .status(404)
      .json(new ApiError(404, "number or email is required."));
  }

  const user = await User.findOne({
    $or: [{ number }, { email }],
  });

  if (!user) {
    return res.status(404).json(new ApiError(404, "user does not exist!!!"));
  }

  if (!password) {
    return res.status(404).json(new ApiError(400, "password is required."));
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return res.status(401).json(new ApiError(401, "Password is invalid."));
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const option = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in Successfully."
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user.id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const option = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  return res
    .status(200)
    .clearCookie("accessToken", option)
    .clearCookie("refreshToken", option)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "current user fetched successfully."));
});

const markAsWatched = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { mediaId, type } = req.body;
  const mediaIdNum = Number(mediaId);

  if (!mediaIdNum) {
    return res
      .status(400)
      .json(ApiError({ message: "Media ID and type required" }));
  }

  const user = await User.findById(userId);

  const alreadyWatched = user.markAsWatched.some((item) => {
    return item.mediaId === mediaIdNum;
  });

  if (!alreadyWatched) {
    await User.findByIdAndUpdate(userId, {
      $addToSet: {
        markAsWatched: { mediaId, type },
      },
    });

    return res.status(200).json(new ApiResponse({ watched: true }));
  } else {
    await User.findByIdAndUpdate(userId, {
      $pull: {
        markAsWatched: { mediaId, type },
        favouriteList: { mediaId, type },
      },
    });

    return res.status(200).json(new ApiResponse({ watched: false }));
  }
});

const favouriteList = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { mediaId, type } = req.body;
  const mediaIdNum = Number(mediaId);

  if (!mediaIdNum) {
    return res
      .status(400)
      .json(ApiError({ message: "Media ID and type required" }));
  }

  const user = await User.findById(userId);

  const alreadyadded = user.favouriteList.some((item) => {
    return item.mediaId === mediaIdNum;
  });

  if (!alreadyadded) {
    await User.findByIdAndUpdate(userId, {
      $addToSet: {
        favouriteList: { mediaId, type },
      },
    });

    return res.status(200).json(new ApiResponse({ added: true }));
  } else {
    await User.findByIdAndUpdate(userId, {
      $pull: {
        favouriteList: { mediaId, type },
      },
    });

    return res.status(200).json(new ApiResponse({ added: false }));
  }
});

const watchList = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { mediaId, type } = req.body;
  const mediaIdNum = Number(mediaId);

  if (!mediaIdNum) {
    return res
      .status(400)
      .json(ApiError({ message: "Media ID and type required" }));
  }

  const user = await User.findById(userId);

  const alreadyadded = user.watchList.some((item) => {
    return item.mediaId === mediaIdNum;
  });

  if (!alreadyadded) {
    await User.findByIdAndUpdate(userId, {
      $addToSet: {
        watchList: { mediaId, type },
      },
    });

    return res.status(200).json(new ApiResponse({ added: true }));
  } else {
    await User.findByIdAndUpdate(userId, {
      $pull: {
        watchList: { mediaId, type },
      },
    });

    return res.status(200).json(new ApiResponse({ added: false }));
  }
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  markAsWatched,
  favouriteList,
  watchList,
};
