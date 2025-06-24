import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
import ApiError from "../utils/ApiError.js";
import asyncHnadler from "../utils/asyncHandler.js";

export const verifyJWT = asyncHnadler(async (req, _, next) => {
  const token =
    req.cookies.accessToken ||
    req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorised");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Unauthorised");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
